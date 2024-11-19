---
layout: post
title: "Solargraph vs Ruby LSP: which one to choose?"
date:   2023-11-10 13:08:42 +0200
categories: posts
image: /images/blog/solargraph-rubylsp.png
description: A summary of the differences between Solargraph and Ruby LSP with pros and cons, the state of Ruby Language Servers and which one you should use.
---

As a passionate Ruby and Ruby on Rails developer, I’ve been using Visual Studio Code as my primary IDE for over five years. Back then, **Solargraph** was the only practical choice for a Ruby Language Server, providing much-needed support for our developer experience.

Fast forward to today: Shopify has introduced **Ruby LSP**, and after a year of iteration, it’s become a serious contender. The time has come to evaluate which tool is better suited for modern Ruby development.

<div style="border-radius: 6px; padding: 1em; background-color: rgba(52, 183, 67, 0.12); display: flex; align-items: center; margin: 3em 0;">
  <div style="padding-right: 1em; font-size: x-large;">💡</div>
  <div>
    <p style="margin: 0; line-height: 1.5;">Looking for a broader overview? Check out my other guide:</p>
    <a href="/posts/setup-ruby-vscode" style="font-weight: 600;">Best Visual Studio Code Extensions and Settings for Ruby and Rails</a>
  </div>
</div>

### What is a Language Server Protocol?
Before diving into Solargraph and Ruby LSP, let’s take a moment to understand **Language Server Protocol (LSP)**.

LSP is a standardized protocol for facilitating communication between an Integrated Development Environment (IDE) and a language server, enhancing the development experience. In simple terms, LSP acts as a bridge between your code and your IDE. It's like having a coding buddy that helps with autocompletion, error checking, and code formatting, making your development journey smoother.

### A Bit of History
Solargraph is a veteran in the Ruby world, as it has been released in March 2017. For years, it's been the go-to choice for Ruby developers, including myself. Powered by YARD documentation, it became the de-facto standard, offering hints and syntax suggestions within Visual Studio Code.

Ruby LSP is the newcomer, it is developed by Shopify, a major player in the Ruby community and Ruby LSP aims to provide a more modern and scalable solution in the long run. It's the shiny new toy in the Ruby development playground, backed by the expertise of a reputable company.

## Differences between Solargraph and Ruby LSP
While both Solargraph and Ruby LSP serve the same purpose, their approach, performance, and extensibility differ significantly. Let’s break it down.

### Solargraph: The Long-Standing Veteran

![Solargraph](/images/blog/vscode/solargraph.webp)

Solargraph relies on YARD documentation from your codebase and external gems. It's been my loyal companion, although not always perfect, especially when dealing with the magic of Ruby on Rails. Performance-wise, it's been a smooth ride on both Mac and Linux, with a few tricks up its sleeve to speed things up.

The installation process involves a series of steps to have everything set up correctly:
1. install the solargraph VSCode extension
2. install the solargraph and yard gems
3. run `solargraph download-core`
4. run `yard gems`: optional but recommended, it will index
5. run `yard config --gem-install-yri` to generate YARD documentation automatically when you install new gems
You can find more info about the Solargraph/YARD coexistence in the [official doc]([text](https://solargraph.org/guides/yard))

Note that there have been a few changes in the Solargraph CLI commands in the latest releases and the official documentation is not at its best.

#### Strengths of Solargraph
- Reliable performance
- Long-standing compatibility with legacy Ruby versions

#### Limits of Solargraph
- Slower updates due to community-based maintenance
- Limited support for advanced Rails features and autocompletion
- `Go to definition` works half of times, at least in my experience

While Solargraph remains a solid choice, its slower development pace means it might not always keep up with modern Ruby needs.

### Ruby LSP

![RubyLSP](/images/blog/vscode/ruby_lsp.webp)

On the other hand, Ruby LSP is backed by a big Ruby player such as Shopify. Ruby LSP is also designed to be more extendible and customizable, offering the possibility to create third party extensions to make it work with RSpec [ruby-lsp-rspec](https://github.com/st0012/ruby-lsp-rspec) and [ruby-lsp-rails](https://github.com/Shopify/ruby-lsp-rails) for Rails syntax suggestions.

#### Recent Improvements

When I first tried Ruby LSP in early 2024 I've personally experienced it used to run `bundle install` with an annoying loading message that slowed down my machine everytime the Gemfile was changed. This was because Ruby-LSP used to download dependencies in its folder to properly work.

Good news, as of November 2024 it doesn't seem to be the case anymore since it doesn't show the alert anymore and also checking out the hidden `.ruby-lsp` folder I can't see the gems. I suspect they managed to make it smarter, in fact I did not notice any performance issue in my recent experience.

#### Strengths of Ruby LSP

1. Extendibility: [ruby-lsp-rspec](https://github.com/st0012/ruby-lsp-rspec) and [ruby-lsp-rails](https://github.com/Shopify/ruby-lsp-rails) just make our life easier and finally close the gap between VSCode and RubyMine. I absolutely recommend these extensions which saved me so much time so far
2. `Go to definition` working like 99% of the times. In rare occasions it got stuck and wasn't ot able to navigate to the file but it took a few seconds or a `Reload windows` to work again
3. Navigating to partials and templates is finally supported! By clicking on the string, such as `shared/navbar.html.erb` you will navigate to the right file
4. Just work out of the box, at least for me. No weird trick or anything, it automatically detected my ruby installation with **rbenv**

#### Limits of Ruby LSP

While utilizing Ruby LSP, I observed two limitations:

1. ~~**The absence of the Go to definition**~~ This has been solved 🎉
2. **Ruby LSP exclusively supports Ruby versions greater than or equal to 3.0** since it's using Prism, as documented in this [Github issue](https://github.com/Shopify/ruby-lsp/issues/1688). Keep in mind that Ruby 2.7.8 reached its end of life on March 31, 2023, and even the 3.0.x version is in EOL. However, in real-world scenarios, many of us may still be operating with legacy versions in our job environments. Just keep this in mind before investing time in Ruby LSP.

Nonethless, if you like to use Ruby LSP, I discovered a workaround for older Ruby versions, [as explained from Shopify on Github](https://github.com/Shopify/ruby-lsp/blob/74d2ab0926198ac2771b35b79d4f81574365497a/vscode/README.md?plain=1#L138) which makes your Ruby LSP use a different Ruby version than your project. This might cause some headache but it's worth trying in my opinion.

![RubyLSP-error](/images/blog/solargraph-vs-rubylsp/error.png)

### Choosing Your Coding Companion

<div>
  <img src="/images/blog/solargraph-rubylsp.png" style="margin: auto;">
  <figcaption align="center">(just joking, the Ruby community is the best ♥️)</figcaption>
</div>

**As of November 2024 I absolutely recommend going with Ruby-LSP**, it offers more features, it's well supported and it's improving a lot over time. Even if you are stuck on Ruby < 3.0, give it a try and if it doesn't work you can always fallback to Solargraph.

### Looking Ahead

The future of Ruby development looks bright. Shopify’s dedication to Ruby LSP, combined with the community’s enthusiasm, is driving innovation. With tools like Rails, Hotwire, and Turbo also evolving rapidly, it’s an exciting time to be a Ruby developer.

### The Verdict
Both Solargraph and Ruby LSP have their strengths, but Ruby LSP is quickly becoming the go-to solution for modern Ruby development.

With Shopify’s backing and regular updates, it’s clear that Ruby LSP is here to stay. Whether you’re working on cutting-edge Rails apps or maintaining legacy projects, these tools will continue to improve your workflow.

Happy coding!
