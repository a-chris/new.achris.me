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
        <a href="<%= project.relative_url %>" style="font-family:'Merriweather';"><%= project.data.title %></a>
        <br/>
        <% project.data.technologies.map do |tech| %>
          <span class="tag"><%= tech %></span>
        <% end %>
        <p><%= project.data.description %></p>
      </footer>
    </article>
  <% end %>
</div>

