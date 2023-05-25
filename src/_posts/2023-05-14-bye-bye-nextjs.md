---
layout: post
title:  Bye bye NextJS
date:   2023-05-14 13:08:42 +0200
categories: posts
image: /images/blog/bye-bye-nextjs.jpg
description: Reasons why I'm migrating my website from NextJS to Bridgetown.
---

I started this personal website about three or four years ago with the idea to create an online CV to share with recruiters. Initially, I built it with NextJS because I had a strong background in Javascript/Typescript, and as a Full-Stack developer, NextJS seemed like a sane version of React, especially with its routing experience.

Deploying the website was a breeze - just push to master, and Vercel does the rest. Puff, your website will be online in no time.

However, when it came to creating a blog section, it was particularly hard. Despite looking into existing libraries and documentation, I ended up re-inventing a sort of Front Matter but in JSON format, which I put in each of the mdx blog posts I wrote.

Something like this:
```
export const meta = {
  title: "Amazing title",
  content: "In this article I will talk about...",
  image: "land.webp",
  keywords: "interesting stuff",
  date: "2023-04-19"
}
```

Then I tried to add internationalization because I wanted the homepage to be in both Italian and English, while the blog section had to be in English only. So, I created my own **useTranslation** hook with a few lines of code. That was the most fun thing I did for this website, to be honest.

I wrote about this solution in a previous post: [Build your own useTranslation hook with Next.js](/blog/build_your_own_use_translation)

Once you have added internationalization, you will likely want a good sitemap that allows Google to understand the website structure and available languages. I built my own solution with a Javascript script that runs after each build, but it wasn't a pleasure to work on.

That said, I'm ditching NextJS. While I still like Javascript/Typescript, I don't like the ecosystem because everything seems to be a beta release, things keep changing every x months and it's not worth staying up-to-date if my everyday language is Ruby. I've spent the last two years working with Ruby, and it's been a good alternative that gets the job done.

While I could have maintained the website without rewriting it from scratch, there are a few things about NextJS that made me mad in the past.

## Image madness

In the past, the NextJS Image component has been a pure pain, it used to create inner span, it was hard to style the image or its container, it was almost impossible give the image the right size!
I know they came up with a new Image component recently, but I'm not yet convinced, I just want a `<img>`.

The previous version of the NextJS Image component used to create inner spans, making it hard to style the image or its container, and it was almost impossible to give the image the right size. Even the new Image component hasn't convinced me yet. It was a huge pain to work with.

## SEO

The SEO score is one of the main reasons people choose NextJS, and that was my reason, too. I want my website to be fast, have good Google positioning, and a satisfactory score. Unfortunately, despite spending tens of hours trying to optimize these scores, I couldn't achieve the desired result.

These are the stats from Vercel:

![Vercel Score](bye_bye_nextjs/vercel_score.png)

## Deploying on Vercel

From what I understand, deploying a NextJS website on Vercel optimizes caching, providing similar results to a CDN. While I expected it to be fast, that wasn't always the case. I found my website took more than 2 seconds to load on a cold start, after it wasn't loaded for several hours.

Vercel provides some useful insights, such as speed and analytics. Still, I wasn't happy when I received a warning that I would need to pay for the analytics feature in the future because my website received 400 visitors in a month. Like, really? Is that a huge number for you Vercel? Are you running out of space on the DB because of my 400 visits?

Fortunately, I replaced their analytics with a self-hosted solution, built by me: [Faenz](https://github.com/a-chris/faenz)

## Sitemap

I won't go into too much detail about this. Writing and maintaining the script to generate the sitemap was a pain. However, I can't remember why I ended up writing it from scratch instead of using this library [Next Sitemap](https://www.npmjs.com/package/next-sitemap).

Okay, so what am I going to use instead of NextJS?

## Enter Bridgetown

Bridgetown is a Ruby site generator that I recently used for a blog and have been impressed with the results and developer experience.

Here are a few pros of Bridgetown compared to NextJS:
- Sitemap and internationalization come out of the box.
- Blog setup is also included.
- It's easy to customize with existing plugins or by creating your own.
- Excellent SEO scores without any additional optimization efforts.
- No images madness. Just copy the images to the `images` folder and use them.
- Generates a static bundle of assets that can be easily deployed to a VPS with a script.

To sum up, I'm not saying NextJS is bad and you shouldn't use it. It was the right tool for my website initially, but now I'm migrating away because it's not worth maintaining. At the end of the day, I realized that NextJS is reinventing what Jekyll was doing ten years ago. It may be more reactive and front-end centered, but if you're looking to build something simple and static, there are better solutions out there.
