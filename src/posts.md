---
layout: page_no_title
title: Posts
---

<% collections.posts.resources.each do |post| %>
  <article class="post-article">
    <img src="<%= post.data.image %>">
    <div style="padding-left: 1em;">
      <a href="<%= post.relative_url %>" style="font-family:'Merriweather';font-size:120%;">
        <%= post.data.title %>
      </a>
      <p><%= post.data.description %></p>
    </div>
  </article>
<% end %>
