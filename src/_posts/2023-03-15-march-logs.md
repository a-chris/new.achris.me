---
layout: post
title: What I learned in March 2023
date: 2023-04-19 13:08:42 +0200
categories: posts
image: /images/blog/logs.webp
description: Summary of what I learned in March as a Software Developer while working for my job and side projects
---

## GitHub Graph API sucks

I tried to use GitHub's Graph API for a new project: **Github Project Recap**, a Slack application that sends a daily recap (usually in the morning) of the GitHub project cards that haven't been closed yet, so you can have a quick summary before the standup and see at a glance if someone has too much or too little work.

Therefore, GitHub's Graph API can be confusing and challenging to navigate. There are numerous entities/models, and it's not clear how to get to the model that we're interested in.

After several days of research, I finally figured out how to get the name of the column where the card is located!

```graphql
fieldValueByName(name: "Status") {
	... on ProjectV2ItemFieldSingleSelectValue {
		name
	}
}
```

## GraphQL aliases

Speaking of GraphQL, while working with the (unwieldy) GitHub APIs, I came across aliases in GraphQL, so you can request a field and give it an **alias**, or request the same field multiple times with different aliases, which seems to be very useful if you need multiple  `fieldValueByName` fields:
```graphql
column: fieldValueByName(name: "Status") {
	... on ProjectV2ItemFieldSingleSelectValue {
		name
	}
}
size: fieldValueByName(name: "Size") {
	... on ProjectV2ItemFieldSingleSelectValue {
		name
	}
}
```

Without the aliases the previous query does not work.

## Ruby on Rails daemon quirks

When running Ruby on Rails with the `d` command (i.e., as a daemon), the reference to the project folder is lost. As a result, running `Dir.pwd` or `pwd` will simply return `/`. Although it makes sense, it took me hours to figure out the problem!

## Linux commands

The command `lsof -i :3000 -t` directly returns the process ID to kill, making it very convenient to use with `kill -9 $(lsof -i :3000 -t)`. So I turned it into a function and added it to my `.bashrc` file.

```bash
killp () { kill -9 $(lsof -i :$1 -t) }

```
