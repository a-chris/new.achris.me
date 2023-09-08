---
layout: page_no_title
title: Projects
---

<div class="grid-container">
  <% collections.projects.resources.each do |project| %>
    <article class="project-article">
      <header>
        <a href="<%= project.relative_url %>">
          <img src="<%= project.data.image %>">
        </a>
      </header>
      <footer>
        <div class="title-container">
          <a class="project-title" href="<%= project.relative_url %>">
            <%= project.data.title %>
          </a>
          <% if project.data.website %>
            <a href="<%= project.data.website %>">
              <img src="/images/common/link.svg" style="width:15px;margin:0 0 3px 8px;" />
            </a>
          <% end %>
          <% if project.data.github %>
            <a href="<%= project.data.github %>">
              <img src="/images/contacts/github.svg" style="width:15px;margin:0 0 3px 8px;" />
            </a>
          <% end %>
        </div>
        <% project.data.technologies.map do |tech| %>
          <span class="tag"><%= tech %></span>
        <% end %>
        <p><%= project.data.description %></p>
      </footer>
    </article>
  <% end %>
</div>

