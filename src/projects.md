---
layout: default
title: Projects
---

<div class="band">
  <div class="shell">
    <section class="pt-12 py-12">
      <h1 class="display">
        <span class="block">Things I built, and what they are for</span>
      </h1>

      <p class="lead mt-6">
        Ruby gems I maintain, side products people actually use, and the odd
        experiment that escaped the lab. Every card links to the code or the
        real thing.
      </p>
    </section>
  </div>
</div>

<div class="band-raised pt-14 pb-20 md:pt-20 md:pb-28">
  <div class="max-w-6xl mx-auto px-6 md:px-10">
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
              <a class="btn btn-sm flex space-x-1 border border-line bg-surface-2 hover:border-line-interactive" href="<%= project.data.website %>">
                <span>Link</span>
                <img src="/images/common/link.svg" style="width:15px;" alt="" />
              </a>
            <% end %>

            <% if project.data.github %>
              <a class="btn btn-sm flex space-x-1" href="<%= project.data.github %>">
                <span>GitHub</span>
                <img src="/images/contacts/github.svg" style="width:15px;" alt="" />
              </a>
            <% end %>
          </div>
        </div>
      </article>
    <% end %>
  </div>
</div>
</div>
