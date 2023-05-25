---
layout: post
title: How to deploy a React and ExpressJS monorepository to Heroku
date: 2020-08-14 13:08:42 +0200
categories: posts
image: /images/blog/react-heroku.webp
description: Deep dive into the Heroku build phases in order to deploy an application built on top of React, Express and Yarn Workspaces from a single GitHub repository
---

Hi everyone, today I'd like to share my experience about deploying a Single Page Application on Heroku, however this is not a simple case, because my application is built on top of React, ExpressJS and Yarn Workspaces to fit everything in a single GitHub repository. I encountered this case while working on an assignment project for the University of Bologna, the monorepository format was mandatory so I has to fix this issue to move forward with the project.

You probably already know Heroku for its being developer friendly, easy to use and its free tier, then we have React, the currently most used Javascript frontend library and ExpressJS, the most famous Javascript backend framework.
Everything seems fine so far, we have three opinionated and very solid technologies, what can go wrong if we try to mix them togheter in a monorepository? It will be a long way for a successful deployment.

If you are in the same situation I was then you already know what React and Express are, so I will try to cut to the chase.
Before to dive into the issues I encountered and the solution I have found, let's recap few main concepts.

### What's a Single Page Application?
A Single Page Application consists of a bundle of HTML, CSS, Javascript and assets which will be sent to the client (the user's browser) when the page is loaded and from that point the client follow its own workflow and navigation, mostly built in Javascript, while sending and receiving data from the backend by using background HTTP requests. In React we can obtain this bundle by runinng the `build script` command.

### What's a monorepository?
A monorepository consists of a single repository (project folder) that contains both frontend and backend source code. in Having a monorepository means that client and server, in this case React and Express, stay in the same repository. Of course there are pros and cons of having a monorepository but in my case it was a requirement so I had no choise.

Moreover, Yarn helps us to build a monorepository by using Workspaces which allow us to:
- share common node packages between client and server but at the same time having different `package.json` for each one
- follow a "standard" directories structure
- have indipendent configurations for client and server (such as tsconfig, babel, etc..)

Here's how my repository looks like using Yarn Workspaces:
```
my-project
├── node_modules
├── client
│   ├── build
│   ├── package.json
│   └── ...
├── server
│   ├── package.json
│   └── ...
├── package.json
└── ...
```


## First attempt to deploy
Being naive, I though
> Hey, let's add some code to the Procfile and that's it

so I wrote something like:
```
web: yarn --cwd "client" build && yarn --cwd "server" start
```

and that's how I got my first failed deployment.

## The problem

Considering that we are building a Single Page Application, we need to generate the React bundle everytime the code changes and we want to deploy it. However Heroku will just deploy our GitHub repository that does not contain the bundle itself, so we have two options:
- 1. Add the bundle directory to the repository and commit everytime the bundle changes. (You do not want to do this, really)
- 2. Instruct Heroku to generate the bundle everytime we deploy the application. (right choose [x])

By using Heroku we won't be able to put a web server like Nginx or Apache to distribuite the bundle to clients, it needs to be Express to send the bundle to clients. Moreover we have to respect Heroku deployment phases.

## Heroku deployment phases
This is the tricky part that took me a few hours to understand why my deployments were failing due to the limits of Heroku deployment phases which consist of:
1. Uploading the code: nothing interesting here
2. Build the project: it generates the React bundle and, if needed, other types of build and compilation (e.g. if you are using Typescript, at this time all your code will be transpiled to Javascript).
During this phase Heroku will use the Slug Compiler to generate slugs:
> Slugs are compressed and pre-packaged copies of your application optimized for distribution to the dyno manager.

And to do this it runs the **build script** placed in the root package.json.
> The maximum allowed slug size (after compression) is 500 MB.

as stated in the official documentation, but we do not have to worry about it because, for example, a medium React project takes around ~50MB **after compression**.
3. Release (i.e. executing) the application: here we cannot build anything because we cannot take more than 500MB of memory. At this time we should already have the React bundle and the Express code in Javascript.
During this step Heroku executes the **Procfile** if available in the repository, otherwise it runs the `start script` of the package.json file.


## The solution

**The mistake I did was that I was trying to build the React bundle during the Release phase and, being uncompressed, it took more than 500MB of memory.**

To not add another difficulty I will only use Javascript in my project, however with a few changes this solution will work for Typescript projects too.
1. First of all we need to check that each package.json is well configured.
Here is how the **root package.json** should be:
```
"private": true,
	"workspaces": [
			"server",
			"client"
	]
```
while server/package.json should have
```
"name": "server",
"scripts": {
	"start": "node index.js"
}
```
and client/package.json should have
```
"name": "client",
"scripts": {
	"start": "react-scripts start",
	"build": "react-scripts build"
}
```
as you probably understood, client and server names should be exact the same in both package.json and subdirectories, i.e. if you choose to call your client as **react-client** then you have to change the directory name, its own package.json and the root package.json in the workspaces array.

2. In the root package.json we write the `build` script that will generate the frontend bundle during the deployment:
```
"scripts": {
	"build": "yarn workspace client build"
}
```
3. This step is not really required to make things work but it's better to have a well organized project. So, I like to move the `build` directory generated by React, which is placed in client/build, to the root of the project because it seems not good to me that the server navigates into the client directory.
To do this we can create a new Javascript file, called `postbuild.js` in the client directory, where we put these lines of code:
```
const fs = require('fs');
fs.rmdirSync('../build', { recursive: true });
fs.renameSync('build', '../build');
```
and we define the postbuild script in **client/package.json**:
```
"postbuild": "node postbuild.js"
```
This script will be automatically called by Heroku just after the client bundle has been generated but before the execution of the code.
4. As I've already said, it must be Express to send the bundle to clients, so we have to declare where Express can find this bundle. If you have followed the previous step, it will be in the root directory of the project, ergo, its relative path from the perspective of Express will be `../build`.
So, our server/index.js should contain:

```
const express = require('express');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static('../build'))

app.get('/hello', (req, res) => {
	res.send('Hello World!')
})

app.listen(PORT, () => console.log('Server started!'));
```

5. Last but not least, we need to define how Heroku can run our application, specifically how to run our Express server, there are two ways of doing this:
Simply add a `start script` in the root **package.json** with the following:

```
"start": "yarn workspace server start"
```

this script will automatically be executed by Heroku during the release step.
Now, create a **Procfile** in the root directory of the project, this file allow us to specify more complex actions to be executed during the release of the application, e.g. it would be really useful if our project had used Typescript.
In this case we could write:
```
web: yarn --cwd "server" node index.js
```
this code just run `node index.js` inside the **server** directory.
6. At the end the structure of the project will be something like:

```
  my-project
  ├── node_modules
  ├── Procfile
  ├── build
  │   └── ...
  ├── client
  │   ├── package.json
  │   ├── postbuild.js
  │   └── ...
  ├── server
  │   ├── package.json
  │   └── ...
  ├── package.json
  └── ...
```

## Sample project
Finally, I built a simple GitHub project that contains every piece of code I wrote here to show you how everything is organized, you can also use it as a starter project if you want to build something with the same technologies: [react-express-workspaces-heroku](https://github.com/a-chris/react-express-workspaces-heroku)

I've also open-sourced the original project that lead me to discover this problem, it is using Typescript and can be useful in case you need a more complex example: [Reackathon](https://github.com/a-chris/Reackathon)

## Bibliography
- [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces)
