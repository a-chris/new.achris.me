---
layout: default
title: Blog
---

<% posts = collections.posts.resources %>
<% latest = posts.first %>
<% reading_time = ->(post) { [(post.content.to_s.split(/\s+/).size / 220.0).ceil, 1].max } %>

<div class="band">
  <div class="shell">
<section class="pt-12 py-12">
    <h1 class="display">
      Boring stories from my job and side projects
    </h1>

    <p class="lead mt-6 max-w-[56ch]">
      Notes from my own work: what broke, what I would do again, and the parts
      of this job that never make it into a changelog.
    </p>
  </section>

  <%# LATEST. One post gets an image, because one image is a signal and nine
      mismatched ones are noise. %>
  </div>
</div>

<div class="band-raised pt-14 pb-0 md:pt-20">
  <div class="shell">
<section class="section section-grid">
    <div class="rail">
      <p class="index-num" aria-hidden="true">01</p>
      <h2 class="rail-label mt-2">Latest</h2>
    </div>
    <div>
      <a
        class="grid gap-6 no-underline md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-8"
        href="<%= latest.relative_url %>"
      >
        <img
          class="photo aspect-[16/10]"
          src="<%= latest.data.image %>"
          alt="<%= latest.data.title %>"
          loading="lazy"
        />
        <div>
          <p class="meta">
            <%= latest.data.date.strftime("%Y-%m-%d") %>
            · <%= reading_time.call(latest) %> min read
          </p>
          <p class="mt-2 font-serif text-[1.625rem] leading-tight text-ink">
            <%= latest.data.title %>
          </p>
          <p class="mt-3 text-[15px] leading-relaxed text-ink-2">
            <%= latest.data.description %>
          </p>
        </div>
      </a>
    </div>
  </section>

  <%# ARCHIVE %>
  <section class="section section-grid">
    <div class="rail">
      <span class="rail-mark" aria-hidden="true"></span>
      <p class="index-num mt-3" aria-hidden="true">02</p>
      <h2 class="rail-label mt-2">All posts</h2>
    </div>
    <div class="w-full md:max-w-[720px] md:mx-auto">
      <% posts.drop(1).each do |post| %>
        <a class="spec-row no-underline" href="<%= post.relative_url %>">
          <span class="spec-key w-24 md:w-40">
            <%= post.data.date.strftime("%Y-%m-%d") %>
          </span>
          <span class="spec-title"><%= post.data.title %></span>
          <span class="spec-meta hidden md:ml-auto md:inline">
            <%= reading_time.call(post) %> min read
          </span>
        </a>
      <% end %>
    </div>
  </section>
  </div>
</div>
