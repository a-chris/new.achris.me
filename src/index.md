---
layout: intro
---

<b>Ehi, welcome to my website! I'm Christian, a software developer from Italy.</b>

I'm a passioante software developer and I explore new ways to solve problems. I had the opportunity work on several aspect of software development: monolith and microservices, data-intensive applications, millions of background jobs, CI/CD solutions and static website generation (like this one!). My reliability makes me a point of reference for both teams and business as I am capable of collaborating with others but also solving problems autonomously.

Feel free to contact me for your next-big-thing project or just small collaborations.

<aside class="callout">
  💡 I believe that technology is meant to make people's lives easier, and as developers, it's our responsibility to achieve this goal!
</aside>

### My Journey
<%= render 'timeline', timeline: site.metadata.timeline %>

### Languages
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(100px, 1fr));grid-gap:1.2em;">
  <% site.metadata.languages.each do |l| %>
    <div style="text-align:center;">
      <img src="/images/languages/<%= l.downcase  %>.svg" style="width:50px;height:50px;">
      <p style="font-size:80%;"><%= l %></p>
    </div>
  <% end %>
</div>

### Skills
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px, 1fr));grid-gap:2em;">
  <% site.metadata.skills.each do |skill| %>
    <%= render 'skill', skill: %>
  <% end %>
</div>

