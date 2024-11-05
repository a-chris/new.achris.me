---
layout: default
title: Projects
---

<div class="max-w-6xl">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
    <% collections.projects.resources.each do |project| %>
      <article class="card bg-base-100 drop-shadow-xl">
        <figure><img class="aspect-video object-cover" src="<%= project.data.image %>" alt="<%= project.data.title %>" /></figure>
        <div class="card-body p-4">
          <%# TITLE %>
          <h2 class="max-md:text-lg card-title">
            <%= project.data.title %>
            <!-- <a class="link-hover" href="<%= project.relative_url %>"> -->
            <!-- </a> -->
          </h2>

          <%# TECHNOLOGIES %>
          <div class="inline-flex flex-wrap space-x-2">
            <% project.data.technologies.map do |tech| %>
              <div class="badge badge-sm badge-ghost"><%= tech %></div>
            <% end %>
          </div>

          <%# DESCRIPTION %>
          <p><%= project.data.description %></p>

          <%# ACTIONS %>
          <div class="card-actions justify-end items-center">
            <% if project.data.website %>
              <a class="btn btn-sm bg-blue-100 hover:bg-blue-300 flex space-x-1" href="<%= project.data.website %>">
                <span>Link</span>
                <img src="/images/common/link.svg" style="width:15px;" />
              </a>
            <% end %>

            <% if project.data.github %>
              <a class="btn btn-sm flex space-x-1" href="<%= project.data.github %>">
                <span>GitHub</span>
                <img src="/images/contacts/github.svg" style="width:15px;" />
              </a>
            <% end %>
          </div>
        </div>
      </article>
    <% end %>
  </div>
</div>
