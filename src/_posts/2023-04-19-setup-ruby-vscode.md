---
layout: post
title:  Best VS Code extensions and settings for Ruby and Rails
date:   2023-11-06 13:08:42 +0200
categories: posts
image: /images/blog/ruby-vscode.webp
description: The best Visual Studio Code extensions and settings to work with Ruby and Ruby on Rails, bring several RubyMine features.
---

I started using Ruby three years ago and Visual Studio Code has been my preferred IDE since day one. Coming from a Java background, I initially tried using RubyMine: it had several feature I was missing on VS Code but it was resource-expensive and I didn't like the UI (I know it has improved recently).

**So I looked for the best VS Code extentions and settings to work with Ruby and Ruby (and Ruby on Rails) to also brings some of the RubyMine features I was missing.**

I am currently using these extensions on both MacOS and Linux (Ubuntu/Fedora) but I'm confident that everything should work fine on Windows as well.

Here are the extensions that save me a lot of time every day and make programming with Ruby ~~less painful~~ a pleasure! I will also share my JSON settings so that you can have everything running in 10 minutes 🚀

## Copy Ruby Reference

First we go with [Copy Ruby Reference](https://marketplace.visualstudio.com/items?itemName=mickey.code-copy-ruby-ref), a mind blowing extension for Ruby developers, time saver extension that add a new option in the right-click menù, called "copy Ruby reference" that allows to copy the whole name of a Ruby class even if it is made of multiple modules!

![CopyRubyReference](/images/blog/vscode/ruby_reference.webp)

So you will get `Strategies::Advertisement::Fetchers::Unnotified` in your clipboard, ready to be pasted and used in your code.

## Solargraph

![Solargraph](/images/blog/vscode/solargraph.webp)

Solargraph is an essential extension for working with Ruby, as it allows VS Code to understand your code and provide helpful features like intellisense, code completion, and inline documentation.

If you have already installed and configured Solargraph then you can jump to the tip section, otherwise follow the steps to install it.

### Installing Solargraph

[Solargraph](https://marketplace.visualstudio.com/items?itemName=castwide.solargraph) requires its Ruby gem to work properly, so we have to install it with:

```
gem install solargraph
```

and then install the Ruby Solargraph extension for Visual Studio Code.

Now we need to set the Solargraph configurations in VS Code: first of all, we need to know where solargraph gem is located, so we run

```
which solargraph
```

and copy the result that in my case is `/home/chri/.rbenv/shims/solargraph` because I'm using **rbenv** (it is not important at the moment).

Open the **VS Code JSON Settings** and paste the following lines:
```
"solargraph.commandPath": "...",
"solargraph.formatting": true
```

where `commandPath` is the path you obtain by running `which solargraph`.

### Solargraph tips

Now that Solargraph is ready to work, open a terminal inside the folder of your Ruby project and run:

```
solargraph bundle
```

let it go, it may take a few minutes depending on your project size.

This magic command makes Solargraph analyze your project and all of its gems to download all the needed documentation. This will make the intellisense and code suggestions much smarter because it allows VS Code to understand the variables and return types, methods definitions, etc.. that you are working with.

You have to run this command in each one of your Ruby projects and you can run it periodically once you have installed new gems or made substantial changes to the project.

## Ruby LSP

![RubyLSP](/images/blog/vscode/ruby_lsp.webp)

[Ruby LSP](https://marketplace.visualstudio.com/items?itemName=Shopify.ruby-lsp) is the new suggested extension to work with Ruby by the [VS Code docs](https://code.visualstudio.com/docs/languages/ruby). I must admit I was full of hope when I first went to install it but it was a bit delusional. Don't get me wrong, it must be hard to work with a magic language like Ruby but this extension is not ready to fully replace Solargraph.

Pro:
- Easy to install. It does it all by itself, no need to run `gem install solargraph` or whatever.
- It also replaces **rubocop** as formatter if well configured
- It can use **rbenv** by default with `"rubyLsp.rubyVersionManager": "rbenv"`
- Faster than the old Ruby extension
- Debugging and breakpoints out of the box, to be honest I did not test this feature since I'm a heady **byebug** user but it could be really appreciated if you come from RubyMine

Cons:
- I do not see any suggestion while writing code, like at all
- The `Go to definition` also, `cmd+click`, sometimes do not work
- Every time you change the **Gemfile.lock** a popup appears on the bottom-right of VS Code to update the gems/documentation/whatever_it_is_doing, it could be annoying if you have many gems and it slow down your machine

So, it has its pros and is going to the right direction, this will probably be the future of Ruby on VS Code but at the moment it does not offer any life-changing feature while having some annoying downturns. It's up to you whether to use it or not, give it a chance and let me know what you think.

# Ruby Interpolation Autocomplete

![RubyInterpolationAutocomplete](/images/blog/vscode/ruby_int_compl.webp)

[Ruby Interpolation Autocomplete](https://marketplace.visualstudio.com/items?itemName=ghbozz.hashtag) is a small but well-appreciated extention that automatically add the `#{}` when you first type `#` inside a Ruby string.

This only work for strings with double apex `"` or backtick ```.

or looking for "sticky" in the UI Settings.

## ColorTabs

![ColorTabs](/images/blog/vscode/color_tabs.webp)

[ColorTabs](https://marketplace.visualstudio.com/items?itemName=orepor.color-tabs-vscode-ext) is the gem that I use to quickly recognize test files because it gives a different color to the current open tab of Visual Studio Code based on a series of regular expressions set by the user. In this case, my project uses RSpec for the test suite and I want the tabs to become green when a test is open in Visual Studio Code. In case you do not know, RSpec test files have the **_spec** suffix at the end of the name, that's the way I'm using to recognize them.

`my_file.rb` => becomes => `my_file_spec.rb`

Here is my configuration:

```
"colorTabs.ignoreCase": true,
"colorTabs.titleBackground": true,
"colorTabs.titleLabel": true,
"colorTabs.config": [
  {
    "regex": ".*spec.*",
    "color": "#007f00"
  }
]
```

you can replace `".*spec.*"` with the prefix used by your test suite. It is also possible to declare multiple patterns by adding multiple JSON objects with these fields:

```
{
  "regex": "...",
  "color": "..."
}
```

## Switch to test

![Switch to test](/images/blog/vscode/switch_to_test.webp)

[Switch to test](https://marketplace.visualstudio.com/items?itemName=eskimoblood.create-test) is a useful extension that allows you to quickly create a test file and switch between a file and its corresponding test file. For example, if your source file is located at `app/services/awesome/service/file.rb`, your test file will be created at `spec/services/awesome/service/file_test.rb`.

Although this extension was not specifically developed for Ruby, but rather for Javascript and Typescript, it works well with Ruby by adjusting a few settings.

Here's my configuration for using it with Ruby and RSpec:

```
"createTest.testFolder": "spec",
"createTest.testFileExtension": "_spec.rb",
"createTest.srcFileExtension": " .rb",
"createTest.srcFolder": "app",
"createTest.testFileTemplate": [
  "require 'rails_helper'",
  "",
  "RSpec.describe CLASS_NAME do",
  "",
  "end"
],
```

the `testFileTemplate` takes an array of elements because each element is a newline. The `srcFolder` is used to ignore the `app` folder of the Ruby on Rails project, if we omit this setting then the extension will create the test file in `app/spec/services/awesome/service/file_test.rb` that would be wrong.

Now this extension gives you two commands you can run:
- `Create test` that will instantly create the test, using the given template, for the file that is open at the moment or open the test file if it already exists (and is located in the right path)
- `Go to Test` that will only try to open the test file related or display an error if the test file does not exist

You can basically run `Create test` all the time and forget about the other command. That's my workflow.
Super handy, I'm loving this extension because now I can create the test with one click, no more time wasted to create nested folders for my file or copy-paste the RSpec boilerplate!

## Bust a gem
![Bust a gem](/images/blog/vscode/bust_a_gem.webp)

Using RubyMine we can just click on a gem inside your project to see its source code and what it is doing under the hood, with VS Code this is not possible anymore.. wait! We have **Bust a gem**!

Bust a gem is an awesome extension that allows us to step into the source code of a gem by clicking on the method we are interested in, as we usually do to see the definition of our methods.

It requires a bit of configuration to work as expected, you can follow the official documentation to set it up but let me summarize it for you:

1. Install the extension
2. Install the `ripper-tags` gem with

```
gem install ripper-tags
```

3. Open your Ruby project in Visual Studio Code and run the command `Bust-A-gem: Rebuild Tags`
4. Let it run, it may take a few minutes if your project is really big
5. The command will create a `TAGS` file into the root of your project, I suggest you to add this file into the `.gitignore` to avoid pushing it to the online repository, your colleagues will appreciate it.
6. Profit!💸💸💸

Now you can see the source code of a method by looking for its definition or you can open the full source code of an installed gem by running the `Bust-A-Gem: Open Gem...` command in Visual Studio Code.

## Rails Open Partials

![Rails Open Partials](/images/blog/vscode/rails_open_partials.webp)

As you can guess Rails Open Partials is a tiny extension that recognizes Rails view partials and opens them when you click on their name.
For example, clicking on the following code
```ruby
render partial: 'contents/report_item'
```
will open the `_report_item.html.erb` file.

This extension requires no configuration however I noticed it conflicts with Solargraph sometimes so it leads to the definition of a method instead of the partial file. Anyway, I put it on the list because you may find it useful, depending on your project setup.

# VS Code Settings

## Sticky Scroll

This is not a VS Code extension but a brand new feature of the editor. It makes the classname and method name to become sticky (stay on top) even while scrolling down, so we always know which method we are reading.

![StickyScroll](/images/blog/vscode/sticky_scroll.webp)

you can enable it by editing your JSON configuration with the following line:

```json
"editor.stickyScroll.enabled": true
```

## Emmet autocomplete

Did you know that you can have Emmet autocomplete in `erb` files?
No? Me too! It took me 3 years to find out. Now I'm regretting all the time I wasted so much time manually writingthe css elements and classes..

Emmet declares dynamic snippets so that you can just write `.grid` and it will replaced by `<div class="grid"></div>`.
But this happens only for HTML files, unless you tell Emmet that you want it to work with ERB too!

Here's the line you should add to the JSON settings to make Emmet works with ERB files (or whatever format you are using)

```json
"emmet.includeLanguages": { "erb": "html", "ruby": "html" }
```

Emmet comes with VS Code, no need to install any particular extension.

---

That's all at the moment 🙂
I periodically update this post when I discover new extentions or useful settings, for example the Sticky Scroll one has been added only in mid-2023!

I hope you guys enjoyed this post, if you have any extension or setting fo suggest just reach out to me on Twitter or Mastodon I will be happy to give you the credits 🥰
