---
layout: page_no_title
title: Posts
---

<% collections.posts.resources.each do |post| %>
  <article class="post-article">
    <img src="<%= post.data.image %>">
    <div>
      <a href="<%= post.relative_url %>" style="font-family:'Merriweather';">
        <%= post.data.title %>
      </a>
      <p><%= post.data.description %></p>
    </div>
  </article>
<% end %>
