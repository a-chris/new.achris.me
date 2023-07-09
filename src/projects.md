---
layout: page_no_title
title: Projects
---

<div class="grid-container">
  <% collections.projects.resources.each do |project| %>
    <article class="project-article">
      <header>
        <img src="<%= project.data.image %>">
      </header>
      <footer>
        <div style="padding-left: 1em;">
          <a href="<%= project.relative_url %>" style="font-family:'Merriweather';"><%= project.data.title %></a>
          <p><%= project.data.description %></p>
          <p><%= project.data.technologies.join(', ') %></p>
        </div>
      </footer>
    </article>
  <% end %>
</div>

