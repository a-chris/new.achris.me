---
layout: intro
---

<b style="font-size:x-large;">Ehi, welcome to my website! I'm Christian</b>

I'm a passionate software developer from Italy and I love working on side projects to create my own products.

I am experienced in several aspects of software development: from monolith to microservices, data-intensive applications, background jobs at a scale, CI/CD solutions and static website generation (like this one!).

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
<div class="grid">
  <% site.metadata.skills.each do |skill| %>
    <%= render 'skill', skill: %>
  <% end %>
</div>

