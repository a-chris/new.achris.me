---
layout: post
title:  Cheap Hosting Multiple SaaS Applications on a VPS
date:   2024-04-24 9:08:42 +0200
categories: posts
image: https://i.postimg.cc/zXPyQGGG/image.png
description: Best Visual Studio Code extensions and settings to work with Ruby and Ruby on Rails and bring several RubyMine features.
---


TODO: who I am

I like running SaaS applications and working on side projects. I have a few SaaS applications that I run on a single VPS. I have been doing this for a few years now and I have learned a lot about how to optimize resource usage and save money. During these years I learned to pick the simplest tools for the job and to avoid over-engineering, since you don't have too much time for side projects while also having a fulltime job.

When you start a new project, in particular for side businesses, you have to be careful about how much you spend on hosting. You don't want to spend too much money on hosting, especially if you are not sure if the project will be successful. You also don't want to spend too much time on managing the server, since you have a fulltime job and you want to spend your free time on developing the project.

At this point, you should never start with expensive technologies such as AWS and other hosting providers. You could waste a lot of money on super reliable technologies that you didn't need to.

So, the Javascript/Typescript guys usually start with a React/NextJS app and just host it on free providers such as Vercel. But if you use different technologies or you need background processing or more complex stuff, you have to reach out to hosting like Heroku, Render, Fly.io.

I don't like them. They are too expensive for side projects, you have to pay for every little thing such as the DB, the cache, the worker processes, hosting files etc..

During the years I learned how to host multiple SaaS applications on a single VPS,and I'm now hosting 6 SaaS applications on a single VPS for a total monthly cost of 6€!

In this article I will explain how I did it and how you can do it too, nothing to be scared of, it's easier than you think.

## Why Host Multiple SaaS on One VPS?
Explain the benefits of consolidating SaaS applications onto a single server.
Discuss cost savings, easier management, and resource optimization.

Hosting your side projects or even side business on a VPS is one of the best ways to save money.
First of all because you can host multiple applications on a single server.
Second, because you can optimize resource usage and save money on the server itself.
Third, and this can be a pro or a con, because you can learn a lot about how to manage a server and how to optimize resource usage, which is a valuable skill to have.

In my case we are speaking about a single VPS with 2GB of RAM and 2 CPU. This is enough to host multiple SaaS applications, as long as they are not too resource intensive.

I managed to host 6 SaaS applications on this server, and I will explain how I did it in this article.

## Explaining the architecture

The architecture is nothing special, it's basically how the web works but nobody explained to us (at least to me).

The main components are:
- A **reverse proxy** handling the incoming requests and routing them to the correct application
- The **applications** themselves, running on different ports accessible only from the server, not bound to the public IP
- A **database server**, running on a different port and accessible only from the server
- A **cache server**, running on a different port and accessible only from the server

You can add more components as you need, for example I have worker processes and a few admin dashboards.

![Architecture](https://i.postimg.cc/zXPyQGGG/image.png)

Now, the trick is to use the right tools for the job, considering that you don't have too much time to spend on this for setting up and maintaining the server. You need something that just works!

Let's see the tools I use.

### Web Applications

For the ones new to this website, I've been a professional web developer for 5 years now, I went from Java, to Javascript/React, to, finally, Ruby on Rails.
I've been using Rails for 3 years now and I must admit it's the easier way to build web applications, especially if you are a solo developer because it comes with a complete set of tools to build a web application, from the database, assets management, frontend, background processing, etc..

You can use whatever tech stack you prefer or you are used to but my suggestion is to go with something batteries included, because you probably are not building something revolutionary or the next Google. You want to accomplish your goal with standard, battle tested, well known technologies which allow you to go stright to the point of your product.

Other well known web framework with this mindsets are: Django, Laravel, NestJS.

Now, I have 6 Ruby on Rails application running on my VPS, all of them run with a simple `bundle exec rails -s -p <port>`, for example:
- [DiscoRocks](https://disco.rocks) runs on port 3001
- [Coney](https://coney.app) runs on port 3002
- [tiTrovo.casa](https://titrovo.casa) runs on porto 3003
- and so on..

They are not bound to `0.0.0.0`, this means that they are not directly accessibly from the public internet. That's why we need a reverse proxy solution.

### Reverse Proxy

A reverse proxy is the entry point of every one of your web applications, we need it to be fast and reliable. Extra point if it's also easy to configure.

I use **[Caddy](https://caddyserver.com/)** as a reverse proxy. I found out about Caddy several years ago and I never looked back. It's super easy to use, it's fast, it's secure, it's reliable. **It also handle SSL certificates automatically!**

Here is an example of a Caddy configuration which handle request for this very website and a SaaS application called DiscoRocks on the same server.:

```
# Caddyfile

achris.me, www.achris.me {
	root * achris/output
	file_server
	redir /it /
	redir /en /
	redir /it/projects /projects
	redir /en/projects /projects
}
disco.rocks, disco.rocks {
	reverse_proxy 127.0.0.1:<port>
	encode gzip zstd
}
```

Which basically means:

> when you receive a request on the domain disco.rocks, direct it to 127.0.0.1:<<port>>


That's it. No need to deep dive into the configuration, edge cases, SSL configuration, etc.. Caddy just works out of the box.

### Persisting Files

This highly depends on the projects you are running, in my case I had no critical files to store, just a bunch of avatar images and a few files uploaded by the users. I use the server's disk to store these files with a predios backup strategy. No S3, no cloud storage, no extra costs.

Thanks to Rails ActiveStorage, if my business grows and I need to store more files, I can easily move to a cloud storage solution by just changing a few lines of code. I suppose this is also possible with other web frameworks but I'm not sure how easy it is.

### Database and Caching
As you see from the diagram, I'm using Postgres as a database and Redis for caching. Nothing special, I prefer to run these type of services in a Docker container because they are ready out of the box and I can avoid to go around into my system editing various `/etc` files.

Postgres in particular contains a around ~10 millions of records, I didn't have to daily tweak or do something in particular, just having some good indexes and writing decent code. I daily backup Postgres with a script.

## Performance and Optimizations

On average, the usage of my VPS is ~1.2GB of RAM and more or less the same in amount in Swap. CPU usage is around ~5%, with spikes up to 50% when I have several background jobs running at the same time.

Here is the `htop` screenshot.

![htop](https://i.postimg.cc/sXwvsTmz/htop.webp)

I also used to monitor the usage statistics on IONOS website, my VPS provider, but sadly it looks like they removed them a few days ago.

This may be a section stricly related to Ruby on Rails but I suggest you to look around for similar tricks in your preferred language/web framework.

Basically, the two most important optimizations I made to host all these websites are:

Using **jemalloc** as a memory allocator designed to reduce memory fragmentation and improve scalability on multi-core systems. It also recommended by the latest Ruby on Rails gruide for optimazing performances.

Running the **worker process in the same process of web server**, which means that I'm not running two separate processes (or instances) of the web service, but instead I'm running only one instance that handles boths web requests and background jobs. This is not heavily recommended but it works very well with a few thousands of jobs and it saves you a lot of RAM (and headaches).

## Cons
single point of failure
scalability
-> creare worker process a parte
-> migrare SaaS con troppe richieste su un altro server
