---
layout: intro
---

**Hi there! Welcome to my website.** I'm Christian, a software developer from Italy 🇮🇹🍝🍕


I'm truly enthusiastic about technology in all its forms. I enjoy exploring new languages and frameworks, enhancing performance, and solving real-world problems that impact people.

I've been coding since the age of 15, and I'm truly enthusiastic about technology in all its forms. I enjoy exploring new languages and frameworks, enhancing performance, and solving real-world problems that impact people.

In my free time, I love building software for personal projects and engaging in small DIY endeavors. I also enjoy reading books on software development and philosophical works, influenced by my background in humanism.

I hope you find this website interesting. Feel free to connect with me on social networks for your next big project, potential collaborations, or simply a friendly chat 🙇🏻‍♂️

<aside class="text-center bg-orange-100 border-l-4 border-orange-500 text-orange-800 p-4 rounded-sm border-">
  💡 I believe that technology is designed to simplify people's lives.
</aside>


<h3 class="text-center mt-16">My Journey</h3>
<%= render 'timeline', timeline: site.metadata.timeline %>

<h3 class="text-center mt-16">Languages</h3>
<div class="flex flex-wrap justify-center space-x-12">
  <% site.metadata.languages.each do |lang| %>
    <div class="flex flex-col justify-center items-center">
      <img src="/images/languages/<%= lang.downcase  %>.svg" class="w-[40px] lg:w-[50px] h-[40px] lg:h-[50px] m-0" style="margin-bottom:0;">
      <p class="text-sm lg:text-base"><%= lang %></p>
    </div>
  <% end %>
</div>

<h3 class="text-center mt-16">Skills</h3>
<div class="grid grid-cols-1 gap-4">
  <div>
    <div class="flex flex-col md:flex-row md:items-center">
      <img src="/images/intro/backend.webp" class="w-40 m-0" />
      <h3 class="md:mt-12" style="margin: 0.2rem 0;">Backend</h3>
    </div>
    <p syle="margin-top:0 !important;">
      While Ruby on Rails is my preferred solution for web application development, I've also gained experience with ExpressJS, Spring Boot, and Django throughout my career, university studies, and side projects.
      <br/>
      You could say I'm specialized in integrating third-party APIs and building REST and GraphQL APIs to be used by clients worldwide.
    </p>
  </div>

  <div>
    <div class="flex flex-col md:flex-row md:items-center">
      <img src="/images/intro/website.webp" class="w-40 m-0" />
      <h3 class="md:mt-12" style="margin: 0.2rem 0;">Frontend</h3>
    </div>
    <p syle="margin-top:0 !important;">
      I've spent most of my career as a full stack developer diving into React and the essentials of HTML, CSS, and JavaScript.
      <br/>
      More recently, I've ventured into the wonderful world of Hotwire, Turbo, and HTMX to bring an extra spark to my projects.
    </p>
  </div>

  <div>
    <div class="flex flex-col md:flex-row md:items-center">
      <img src="/images/intro/database.webp" class="w-40 m-0" />
      <h3 class="md:mt-12" style="margin: 0.2rem 0;">Data</h3>
    </div>
    <p syle="margin-top:0 !important;">
      I have primarily worked with relational databases such as Postgres, MySQL, and SQLite. On occasion, I have also explored non-relational solutions like MongoDB and graph databases like Neo4j when the situation called for it.
    </p>
  </div>

  <div>
    <div class="flex flex-col md:flex-row md:items-center">
      <img src="/images/intro/automation.webp" class="w-40 m-0" />
      <h3 class="md:mt-12" style="margin: 0.2rem 0;">Automation</h3>
    </div>
    <p syle="margin-top:0 !important;">
      I have always had a strong passion for automating the boring stuff and repetitive tasks. Scripting and web scraping have been particularly enjoyable for me, especially when combined with creating Telegram and WhatsApp Bots and Channels, along with Email or SMS notifications.
       <br/>
      I frequently utilize Docker, even integrating it into open-source projects, and have experience setting up CI/CD pipelines like CircleCI.
    </p>
  </div>
</div>

