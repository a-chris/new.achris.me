---
# Feel free to add content and custom Front Matter to this file.

layout: default
---


Hi everyone! I'm Christian, a 26-year-old software developer from Italy. I'm very curious and passionate about everything related to computers and technology. I love staying up to date and explore new technologies in order to build a skillset that allows me to solve any type of problem.

I believe that by sharing our experiences, we can all move faster and achieve greater success in both our personal and professional lives. That's why I'm the one who writes the project documentation, even if nobody has asked for it. In my opinion, even a small hint can save a collegue hours of struggling. Sometimes I write blog posts when I feel I have something worth sharing.

One of my biggest interests is automating boring stuff as I believe that we created computers to make our lives easier, not the other way around.

I'm available for collaborations and small projects. Feel free to reach out to me on Mastodon or Twitter.

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
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(450px, 1fr));grid-gap:2em;">
  <% site.metadata.skills.each do |skill| %>
    <%= render 'skill', skill: %>
  <% end %>
</div>

