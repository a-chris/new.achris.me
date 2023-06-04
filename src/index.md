---
# Feel free to add content and custom Front Matter to this file.

layout: intro
---

I'm a passionate software developer, I enjoy staying up-to-date with technology and explore new ways to solve problems. During my years of experience I had the opportunity work on every aspect of software development: monolith and microservices, data-intensive applications, millions of background jobs and CI/CD solutions.

My reliability makes me a point of reference for both teams and business as I am capable of collaborating with others but also solving problems independently.

I believe that technology is meant to make people's lives easier, and as developers, it's our responsibility to achieve this goal.

I'm available for small projects and collaboration, don't esitate to reach to me.

### My Journey
<%= render 'timeline', timeline: site.metadata.timeline %>

### Languages
<div style="display:flex;justify-content:space-evenly;">
  <% site.metadata.languages.each do |l| %>
    <div style="text-align:center;">
      <img src="/images/languages/<%= l.downcase  %>.svg" style="width:50px;height:50px;">
      <p><%= l %></p>
    </div>
  <% end %>
</div>

### Skills
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px, 1fr));grid-gap:2em;">
  <% site.metadata.skills.each do |skill| %>
    <%= render 'skill', skill: %>
  <% end %>
</div>

