---
layout: default
title: Posts
---

<div class="max-w-5xl">
  <div class="flex flex-col space-y-4">
    <% collections.posts.resources.each do |post| %>
      <article class="card lg:card-side bg-base-100 shadow-xl">
          <figure class="p-2 max-lg:max-h-32 lg:max-w-60">
            <img class="object-cover lg:aspect-[4/3] rounded-xl" src="<%= post.data.image %>" alt="<%= post.data.title %>"/>
          </figure>
          <div class="card-body p-4 lg:p-8">
            <h2 class="max-md:text-lg card-title">
              <a class="link link-hover" href="<%= post.relative_url %>">
                <%= post.data.title %>
              </a>
            </h2>
            <p><%= post.data.description %></p>
            <p class="text-sm text-gray-600">
              <relative-time datetime="<%= post.data.date.iso8601 %>">
                <%= post.data.date.strftime("%d %B %Y") %>
              </relative-time>
            </p>
          </div>
      </article>
    <% end %>
  </div>
</div>

