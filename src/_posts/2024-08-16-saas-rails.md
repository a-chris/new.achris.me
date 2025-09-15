---
layout: post
title:  "Inside SaaS: Running a SaaS with Ruby on Rails"
date:   2024-08-16 9:08:42 +0200
categories: posts
image: /images/blog/inside-saas/landing.webp
description: My experience with running a SaaS with Ruby on Rails, PostgreSQL, GoodJob, TailwindCSS, AlpineJS, and more. The pros, cons, and the lessons learned along the way.
---

This is the first episode of *Inside SaaS*, where I share my experience running a SaaS business. Today, we’ll dive into the technical side of using Ruby on Rails in production—its strengths, weaknesses, and a few lessons I've picked up along the way.

While Ruby on Rails might not be the hottest framework, it's still a powerful tool for developers. If you’re considering Rails or just curious about using it in a SaaS environment, here’s what I’ve learned after 3.5 years of working with it.

**A bit of background**

I started my SaaS journey in November 2023, building on my full-stack development experience. Having run several open-source projects since 2021, this was my first time charging for a service. Today’s post will focus on how Ruby on Rails helped me navigate the technical challenges of running a SaaS.

So far, I’ve built three SaaS products:

<div class="space-y-4">
  <div class="card card-compact card-bordered bg-white cursor-pointer border-2 hover:border-gray-300" onclick="window.open('https://coney.app', '_blank');">
    <div class="card-body">
      <div class="flex flex-row">
        <img lazy src="https://coney.app/favicon.png" class="!my-auto size-12 md:size-20">
        <div class="ml-4">
          <a href="https://coney.app" target="_blank" class="block">
            <h4 class="card-title !text-2xl !mt-0">Coney.app</h4>
          </a>
          <p class="text-muted !text-lg !m-0">Simplifying Personal Finance</p>
          <p class="text-muted text-sm !m-0">Share expenses with others, sync to Google Sheets, manage budgets and track recurring costs!</p>
        </div>
      </div>
    </div>
  </div>
</div>


## The Good

### The Ruby Ecosystem Is Still Strong

Ruby may no longer be the hottest language around, but don’t be fooled—there’s still a library or tool for every need. Ruby has a very solid ecosystem of battle-tested libraries and tools that have been used to solve real-world problems for decades. Whether I’m working with APIs, managing file uploads, or adding background jobs, I’ve never struggled to find well-maintained gems that just work with a few lines of configuration.

Admittedly, the only times I’ve had to write custom code were for very specific use cases, like integrating with a proprietary API that didn’t provide a Ruby client but even then, Ruby’s flexibility made it a breeze to create a custom solution.

### Rails: The One-Person Ultra Fast Prototyping Framework

When DHH calls Rails the “one-person framework,” he’s not exaggerating. I’ve also worked with Spring Boot, NextJS, and Phoenix, but I would still choose Rails any day for building a side business, personal projects, or anything else that won’t be the next Google. Rails makes it possible to build something substantial without needing a team. Whether it’s scaffolding or convention over configuration, Rails truly shines when you’re iterating quickly.

### Active Record is a Blessing

I can’t say this enough—Active Record is a game-changer. Rails’ ORM makes database interactions feel almost too easy. Writing queries directly in Ruby feels natural, and you get so much for free (migrations, associations, validations, etc.). It’s one of those features that make you wonder how you’d manage without it.

I've recently worked with Ecto in Phoenix, and while it’s a great library, it’s not as polished as Active Record. I found myself missing the simplicity and power of Active Record.

From great power comes great responsibility, though. It’s easy to write inefficient queries or spaghetti code 🍝 so you need to be mindful of what you’re doing. For example, I do my best to avoid writing AR queries in views, even just team.users. Instead, I write them in the controller and expose them with instance variables!

```ruby
# controller
@users = team.users
```

### Performance: Surprisingly Solid

I’ve been running four different SaaS services with a few thousand active users and 10k background jobs/day on a single server with 2GB RAM and 2 CPU, and Rails handles it like a champ. Ruby might not be the fastest language, but Rails paired with something like PostgreSQL can still give you smooth performance without needing a massive infrastructure.

With YJIT enabled, Ruby 3.2.x, Rails 7  and GoodJob running in the same process of Puma, each service consumes around 250MB of RAM and 2% CPU on average. CPU usage spikes to 10% when running background jobs, but it’s still very manageable.

Apart from applying best practices, I didn’t spend time optimizing performance, so I think I have a lot of room to grow the business without the need to upgrade the VPS.

This can make a huge difference when you’re bootstrapping a business and need to keep costs low.

### PostgreSQL: The Final Database Boss

PostgreSQL is the Swiss Army knife of databases. From handling text searches to storing JSONB data, arrays, and even vectors, it’s versatile enough to meet almost any requirement. No need for multiple databases when PostgreSQL has you covered.

### TailwindCSS: You will love it

Writing CSS classes in the HTML? What a dumb idea! I thought for 4 years until I gave TailwindCSS a try. It’s a utility-first CSS framework that makes it easy to build beautiful designs without writing a single line of CSS. It’s a game changer for me, and I can’t imagine going back to writing CSS from scratch.

I started my projects using some minimal CSS frameworks like Bulma or Pico.css, but I always ended up writing custom CSS since day one. I had a lot of components missing and even when I had 10 active users I started to see the limits of these UI frameworks. You always end up fighting them, resetting their style, handling hover, shadows, and so on.

Out of desperation, I finally decided to give TailwindCSS a try when I first saw DaisyUI and I was amazed by how easy it was to build a beautiful UI, even with custom themes. DaisyUI hides most of the complexity of TailwindCSS and makes it even easier to use, so you end up having

```html
<button class="btn btn-primary btn-sm">Primary</button>
```

instead of kilometer-long classes like

```html
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md outline-1 ...">Primary</button>
```

---


## The Bad

Drink some water, because it’s about to get salty. This is where I share my very personal opinions about the not-so-great parts of using Rails and some of its most common libraries/mindsets.

### The Rails CRUD Mindset Feels Old-School

As much as I love Rails, the classic CRUD mindset can make every app feel like a glorified CRM. I know it’s super easy to set up a custom route but I feel like Rails is pushing me to use the classic CRUD routes and it feels outdated.

Nowadays people are used to more dynamic and interactive web apps thanks to React, NextJS, and all those frontend frameworks, and Rails can feel a bit static in comparison. I’ve had to work around this by using a lot of JavaScript, a bit of Turbo, and having a mix of REST APIs and form submission requests.

### The 2013 Website Experience in 2024

Building a website in the classic, non-reactive way feels a bit archaic now. Turbo helps, but it can’t fully replace the reactivity of frameworks like React. Plus, so many modern themes and libraries are React-first, which means more limitations when you’re sticking with vanilla Rails.

### Turbo: Cool, But Comes with Trade-Offs

<img lazy src="https://i.imgflip.com/90hkjb.jpg" class="m-auto">

Turbo was supposed to be the magic bullet, but it has its flaws. Documentation can be frustratingly vague, and we also need a Master’s Degree to understand the differences and commonalities between Turbo, Turbostream, Strada, Stimulus, and how to use them together.

For me, one of the most annoying experiences has been working with JavaScript inside Turbo. Turbo and Turbostream add a new set of DOM events to listen for and it adds A LOT of edge cases, even just to initialize a JS library like ChartJS or Tagify.

To make an example, here is how I had to initialize a Tagify select component inside a Turbo frame:

```html
<div id="tagify_container" class="form-control w-full">
  <div class="label"> <span class="label-text">label</span> </div>
  <textarea name="name" id="id" required value="value" placeholder="placeholder" class="textarea textarea-bordered"></textarea>
</div>

<script>
  function setupTagify() {
    if (document.querySelector('#tagify_container tags') != null) {
      // used to initialize Tagify only once across turbo navigation
      console.log("Tagify already initialized");
      return null;
    }

    const whitelist = [...];
    const tagify = new Tagify(
      document.querySelector('#tagify_container textarea'),
      {
        whitelist,
        // other things here...
      }
    );
  }
  document.addEventListener('turbo:load', setupTagify, { once: true });
  document.addEventListener('DOMContentLoaded', setupTagify, { once: true });

  setupTagify();
</script>
}

```

This caused me a week-long headache with bugs and errors in production! I reached this solution, which is not perfect but seems to be working, it still prints a few `Tagify already initialized`.

Repeat with me: **Initializing a JS library SHOULD NOT be this hard.**

### Stimulus: Not Always a Perfect Fit

Stimulus can be neat, and theoretically it’s not strictly tied to Rails but let’s be blunt: almost nobody is going to use it outside of Rails. It’s great for building a set of components over a common behavior, indeed the only sane way to use it has been with Stimulus Components. I import the components I need and I’m ready to go.

Apart from that, I prefer using AlpineJS for every other JS or client-side interactions, it's more flexible, has more features and I build components without the need to create extra JS files.

### Chart.js and Chartkick: The Struggles

<img lazy src="https://i.imgflip.com/30q1jt.png" class="m-auto max-h-96">

Chart.js is powerful but a bit of a headache. The documentation is like a puzzle and has very few examples. It’s even worse if you compare it to other libraries like Recharts. However, I used it with Chartkick, which also led to endless customization battles. I found myself writing custom plugins to work around limitations.

I don’t see how Chartkick can be useful in a real-world application. It’s too limited and the documentation is not clear. The default theme is unattractive, the colors in the tooltip are hidden, and there’s no native way to bring them back. Any tooltip customization is forbidden, and the animations are turned off by default. To pass a different color to each dataset, I had to clone the repo and look into the code to find a way to do it.

I calculated that while working on Coney.app, which is a personal finance website with several charts and statistics, a good 20% of my time was spent fighting with Chartkick and Chart.js.

### Not having strong types

I've worked with interpreted languages for most of my career. I really appreciate Ruby and JavaScript (`1 + "2"` anyone?) as I can build things at lightning speed with them (though I can’t say the same for Python). However, I find myself needing to write way more tests. There have been plenty of times where I thought, "It’s fine, no bugs can happen here," only to have JavaScript fail to load on the frontend or encounter a 500 error when submitting a form—just one of many sketchy bugs I've faced.

Hard lesson learned: This is a critical issue for B2C applications, where a single bug can result in lost money or trust. I need to be more diligent with testing and careful with my code.

### Finding a Good Vanilla JS Library for Advanced Select Components

Advanced select components shouldn’t be so hard to implement, but finding a good vanilla JS library was tricky. Tagify worked, but customizing it to fit themes and specific use cases felt more difficult than it should have been.

## What I Could Have Done Differently

Looking back, there are a few things I wish I’d approached differently:

- **Starting with TailwindCSS** from day one: I could have saved a lot of time and frustration by using TailwindCSS from the start. It’s easy to use, customizable, and works well with Rails.
- **Starting with AlpineJS**: I’d skip Stimulus entirely and go straight to AlpineJS. It’s more powerful, easier to use, and not so specific to Rails.
- **Exploring React or Lit for the Frontend**: While I don’t want to build a full Single Page Application, mixing React with Rails could have been a smart move. It would have made dealing with charts and interactive components easier thanks to React’s robust ecosystem and reactivity.
- **Writing more tests**, particularly more controller tests: The service layer is mostly quiet; controllers are where the 💩 happens. I must admit GitHub Copilot and other AI tools are a huge help here, scaffolding initial tests or helping with edge cases.

Running a SaaS with Rails has been a journey—one filled with moments of joy and frustration. But overall, Rails remains a strong choice for getting a product to market quickly, even if it comes with some trade-offs.

## Conclusion

Rails is still a great choice for building web apps, but you have to master it and its ecosystems. We have a library for almost anything you could think of, but sometimes they are going to fight your specific use case.

Have you built something similar, a SaaS with Rails? I’m curious to hear your experiences. Feel free to reach out or check out my work. Happy coding!
