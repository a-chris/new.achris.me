---
layout: post
title: "Solargraph vs Ruby LSP: which one to choose?"
date:   2023-11-10 13:08:42 +0200
categories: posts
image: /images/blog/solargraph-rubylsp.png
description: A summary of the differences between Solargraph and Ruby LSP with pros and cons, the state of Ruby Language Servers and which one you should use.
---

As a Ruby and Ruby on Rails enthusiast, I've been using Visual Studio Code as main IDE for the past three years. During this time, my go-to Ruby language server has been Solargraph, which has served me well. However, the winds of curiosity recently led me to explore Ruby LSP, the newcomer in the Ruby development scene and I though to write this post to share my recent experience.

### What is a Language Server Protocol?
Before we dive into the Solargraph vs. Ruby LSP debate, it's crucial to grasp the concept of **Language Server Protocol (LSP)**. LSP is a standardized protocol for facilitating communication between an Integrated Development Environment (IDE) and a language server, enhancing the development experience.
In simple terms, LSP acts as a bridge between your code and your IDE. It's like having a coding buddy that helps with autocompletion, error checking, and code formatting, making your development journey smoother.

### A Bit of History
Solargraph is a veteran in the Ruby world, as it has been released in March 2017. For years, it's been the go-to choice for Ruby developers, including myself. Powered by YARD documentation, it became the de-facto standard, offering hints and syntax suggestions within Visual Studio Code.

Ruby LSP is the newcomer, it is developed by Shopify, a major player in the Ruby community and Ruby LSP aims to provide a more modern and scalable solution in the long run. It's the shiny new toy in the Ruby development playground, backed by the expertise of a reputable company.

## Differences between Solargraph and Ruby LSP
Now that we've covered the basics, let's dive into the differences between Solargraph and Ruby LSP. The two language servers are similar in many ways, but they differ in a few key areas, including performance, installation process and extensibility.

### Solargraph: YARD-ing the Way

![Solargraph](/images/blog/vscode/solargraph.webp)

Solargraph relies on YARD documentation from your codebase and external gems. It's been my loyal companion, although not always perfect, especially when dealing with the magic of Ruby on Rails. Performance-wise, it's been a smooth ride on both Mac and Linux, with a few tricks up its sleeve to speed things up.

<div style="border-radius:6px;padding:1em;background-color:rgba(52,183,67,.12);display:flex;margin:3em 0;">
  <div style="padding-right:1em;font-size:x-large;">💡</div>
  <div>
    For the curious minds, I've shared performance-enhancing and configuration tips in another tutorial
    <a href="/posts/setup-ruby-vscode">Best Visual Studio Code extensions and settings for Ruby and Rails.</a>
  </div>
</div>


The installation process involves a series of steps to have everything set up correctly:
1. install the solargraph VSCode extension
2. install the solargraph and yard gems
3. run "solargraph download-core"
4. run "yard gems": optional but recommended, it will index
5. run "yard config --gem-install-yri" to generate YARD documentation automatically when you install new gems
You can find more info about the Solargraph/YARD coexistence in the [official doc]([text](https://solargraph.org/guides/yard))

Note that there have been a few changes in the Solargraph CLI commands in the latest releases and the official documentation is not at its best.

#### Limits of Solargraph
Solargraph it's not dead and it's still largely used, even among my colleagues and myself, but it is living a slow development phase since it's backed by the Ruby community instead of having a big company behind. It remains a valid and well working solution.

### Ruby LSP

![RubyLSP](/images/blog/vscode/ruby_lsp.webp)

On the other hand, Ruby LSP takes a different route, making use of RBS for hints and syntax suggestions. RBS proves to be a more accurate and comprehensive type system compared to YARD. Ruby LSP is designed to be more extendible and customizable, offering the possibility to create third party extensions to make it work with RSpec [ruby-lsp-rspec](https://github.com/st0012/ruby-lsp-rspec) and [ruby-lsp-rails](https://github.com/Shopify/ruby-lsp-rails) for Rails syntax suggestions.

Performance-wise, I've personally experienced that it used to run `bundle install` with an annoying loading message that made my computer slow everytime the Gemfile was changed. Good news, it doesn't show the alert anymore but if you open the Ruby LSP output in VS Code you will be able to see that it still downloads the dependencies. I suspect they managed to make it smarter, in fact I did not notice any performance issue in my recent experience.

#### Limits of Ruby LSP

While utilizing Ruby LSP, I observed two limitations:

1. **The absence of the `Go to definition`** feature makes code navigation in your project more challenging when relying on Ruby LSP. Honestly, it's a big deal for me because I daily use that feature.
2. **Ruby LSP exclusively supports Ruby versions greater than or equal to 3.0**. It's worth noting that Ruby 2.7.8 reached its end of life on March 31, 2023, and even the 3.0.x version is scheduled for end of life on March 31, 2024. However, in real-world scenarios, many of us may still be operating with legacy versions in our job environments. Just keep this in mind before investing time in Ruby LSP.

**UPDATE: ** after deep diving on Reddit, I discovered a workaround for the Ruby version, as explained a piece of documentation from Shopify on Github. [Take a look](https://github.com/shopify/vscode-ruby-lsp?tab=readme-ov-file#using-a-custom-gemfile) if you want to use Ruby LSP with older Ruby versions.

![RubyLSP-error](/images/blog/solargraph-vs-rubylsp/error.png)

### Choosing Your Coding Companion

![RubyLSP](/images/blog/solargraph-rubylsp.png)
<figcaption align = "center">(just joking, the Ruby community is the best ♥️)</figcaption>

If you're working on legacy projects with Ruby < 3.0, Solargraph is still your go-to companion. On the flip side, if your project involves modern Ruby versions and, RBS, go for Ruby LSP. Its accuracy and comprehensiveness make it a delight for such setups.

**Hold on, there is more. I suggest you to install both of them!**

Since they work in different ways, they should not conflict and you can benefit from the best of both at the same time: Solargraph for YARD and and `Go to definition`, Ruby LSP for RBS and a very good RSpec integration in VSCode, at the same time.

### What About the Future?
The future looks bright for Ruby LSP, with the backing of Shopify and the community's enthusiasm. It's still in its early stages, but it's gaining popularity, and I'm excited to see what the future holds.

### The Verdict
Solargraph and Ruby LSP are both great language servers, and I can't pick a clear winner. Solargraph is still a reliable choice for most of projects, while Ruby LSP is the go-to choice for projects that provide RBS.

In conclusion, I'm excited about the evolution of Ruby development tools, especially with Shopify's dedication to the Ruby ecosystem and the recent Rails, Hotwire and Turbo updates. The future looks promising, and I anticipate seeing Ruby LSP become the new standard for Ruby Language Servers.

I'm also aware of [Fuzzy Ruby Server](https://marketplace.visualstudio.com/items?itemName=Blinknlights.fuzzy-ruby-server), which provides useful features like references, renaming, jump to the definitions for methods and variables. Let me know if you have tried it and if I should mention it in this comparison 😎
