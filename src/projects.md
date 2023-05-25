---
layout: page_no_title
title: Projects
---

<% collections.projects.resources.each do |project| %>
  <article class="project-article">
    <img src="<%= project.data.image %>">
    <div style="padding-left: 1em;">
      <a href="<%= project.relative_url %>" style="font-family:'Merriweather';"><%= project.data.title %></a>
      <p><%= project.data.description %></p>
      <p><%= project.data.technologies.join(', ') %></p>
    </div>
  </article>
<% end %>
