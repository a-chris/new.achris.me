---
layout: post
title: Integrating a Blog section to your Rails app using Markdown in minutes
date:   2024-01-25 13:08:42 +0200
categories: posts
image: /images/blog/add-blog-to-rails-in-minutes/workflow.png
description: A tutorial on seamlessly integrating a Markdown-based blog section into your Rails app that I used on my projects.
---

Having a blog on your website is a fantastic way to attract new visitors and ensure search engines, like Google, index your content. I recently faced this challenge while working on my web app, [tiTrovo.casa](https://titrovo.casa), a free service assisting users in finding homes to rent or buy in Italy.

Recognizing the value of sharing experiences, especially when dealing with complex topics like Italian bureaucracy, I decided to add a blog section. People often seek practical advice from those who've been through similar situations, and having personally navigated the intricacies of the Italian system, I knew a blog could be immensely helpful.

## Defining Our Objectives

The idea is to create articles quickly using Markdown, a user-friendly and familiar format. These Markdown files will collectively form the article list within the blog section.

A functional blog section should have an index page listing all available articles, each with its title, description, images, and additional information. Clicking on an article should smoothly transition the user to the dedicated article page, styled with our custom CSS. For a modern touch, we might even consider adding share buttons at the end.

![Blog Workflow](/images/blog/add-blog-to-rails-in-minutes/workflow.png)

## Tools of the Trade

So, how do we achieve all of this using just Markdown files?

Here's our roadmap:
1. Parse Markdown files and convert them to HTML.
2. Make Rails dynamically recognize routes.
3. Extract information from Markdown files: title, description, image, and article URL.
4. Customizing the article page.

Let's dive into step 1.

### Parsing Markdown Files and Converting to HTML

To accomplish this, we'll leverage the [Redcarpet](https://github.com/vmg/redcarpet) gem, a straightforward tool for Markdown conversion.
Following the gem's README, we can use the following code snippet:

```ruby
markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, extensions)
markdown.render("This is *markdown*, indeed.")
```

This converts Markdown to HTML, and we can further customize the HTML generation with extensions if needed. For this tutorial, we'll keep it simple.

To automate the processing of .md files with Redcarpet in a Rails application, let's create our **MarkdownToHtml**:

```ruby
# lib/converters/markdown_to_html.rb

module Converters
  class MarkdownToHtml
    def call(template, source)
      markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML)

      "#{markdown.render(source).inspect}.html_safe"
    end
  end
end
```

Next, create an initializer to bind the Markdown converter to files with the .md extension:

```ruby
# config/initializers/converters.rb

require 'converters/markdown_to_html'

ActionView::Template.register_template_handler(:md, Converters::MarkdownToHtml.new)
```

With these configurations, Rails is ready to process Markdown files placed in the `app/views/blog/` folder.

To view it in your browser, add the required route:

```ruby
# config/routes.rb

get 'blog/my_first_article', to: 'blog#my_first_article'
```

And create the Rails controller, **BlogController** in this case:

```ruby
# app/controllers/blog_controller.rb

def my_first_article; end
```
At this point, creating the `app/views/blog/my_first_article.md` file should display its content in the browser. 😁


### 2. Making Rails Recognize Dynamic Routes

Instead of manually adding a new route and action for each article, let's make the routes dynamic.

Open the routes file and add two routes: the index and the article "show" page:

```ruby
# config/routes.rb

get 'blog', to: 'blog#index'
get 'blog/:any', to: 'blog#article'
```

Now, create the `article` action in the BlogController:

```ruby
# app/controllers/blog_controller.rb

def index; end

def article
  render params[:any].to_sym
end
```

Magic! This setup renders the right article based on the `params[:any]` provided in the URL.

For now, the index action is empty, but we'll fill it in the next step.

### 3. Extracting Information from the Markdown File

To collect article information, we'll utilize front matter!

### What is front matter?

In the world of Markdown, front matter is a powerful tool that allows you to embed metadata or configuration settings directly within your document. This metadata is typically placed at the beginning of a Markdown file and is enclosed by triple dashes (---).

```yaml
---
title: My Awesome Blog Post
author: John Doe
date: 2024-01-25
tags:
  - Markdown
  - Front Matter
  - Blogging
---

# Heading 1

This is the content of my blog post. Front matter provides a convenient way to include additional information about the document, such as the title, author, date, and tags.
```

In this example, the front matter contains metadata such as the title of the blog post, the author's name, the publication date, and a list of tags associated with the content. This structured information can be leveraged by various systems and tools to enhance the presentation and organization of your Markdown documents.

Front matter is commonly used in static site generators, blogging platforms, and other applications that process Markdown files to provide a richer and more customizable user experience.

### Integrating front matter

At the beginning of each Markdown file, include front matter with blog post information you want to display in the posts list. Common fields include:

```yaml
---
title: Article title
image: "/blog/article_image.png"
description: description
# other information here
---
```

Parse these front matter fields using the [front_matter_parser](https://github.com/waiting-for-dev/front_matter_parser) Ruby gem, like this:

```ruby
content = File.read('article.md')
parsed = FrontMatterParser::Parser.new(:md).call(content)

parsed.front_matter # contains title, image, description and other fields
```

and integrate this into our BlogController:

```ruby
  def index
    blog_folder = 'app/views/blog'

    # Array<{ title:, description:, image:, url: }>
    @articles = Dir.new(blog_folder)
                   .children
                   .select { _1.ends_with?('md') }
                   .map do |filename|
                     fm = FrontMatterParser::Parser.parse_file("#{blog_folder}/#{filename}").front_matter
                     fm.merge!(url: "blog/#{filename.gsub('.md', '')}")
                     fm.with_indifferent_access
                   end
  end
```

We've added the url for each blog post since we dynamically calculate the equivalent of the show page, allowing users to navigate to that page when clicking on a blog post.

![ugly version](/images/blog/add-blog-to-rails-in-minutes/ugly.png)

### 4. Customizing for the article page.

With our fully functional blog section showcasing a list of available posts and the ability to navigate to individual post pages, let's add the finishing touches for a polished user experience. In this step, we'll focus on customizing the article page by introducing custom CSS styling and incorporating a social sharing feature using AddToAny.

Here's how we make these enhancements to the `MarkdownToHtml`:

```ruby
module Converters
  class MarkdownToHtml
    TEMPLATE_CONTENT = <<-HTML
      <div class="post-page">

        ${content}

        <!-- AddToAny BEGIN -->
        <div class="a2a_kit a2a_kit_size_32 a2a_default_style">
          Condividi su
          <a class="a2a_button_x"></a>
          <a class="a2a_button_whatsapp"></a>
          <a class="a2a_button_facebook"></a>
          <a class="a2a_button_telegram"></a>
          <a class="a2a_button_linkedin"></a>
        </div>
        <script>
            var a2a_config = a2a_config || {};
            a2a_config.num_services = 5;
        </script>
        <script async src="https://static.addtoany.com/menu/page.js"></script>
          <!-- AddToAny END -->
        </div>
      </div>
    HTML

    def call(template, source)
      markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML)

      # remove the front matter information
      sanitized_source = source.gsub(/---([\S\s]*)---/, "").strip

      html = TEMPLATE_CONTENT.gsub("${content}", markdown.render(sanitized_source))

      "#{html.inspect}.html_safe"
    end
  end
end
```

In this modification, we've introduced the `${content}` placeholder in the HTML template, acting as a marker for the Markdown content. This placeholder gets replaced with the actual HTML-rendered content using the gsub method.

Additionally, we've removed the front matter information from the source to prevent it from appearing in the final HTML.

To make the page visually appealing, create a CSS file, for example, `app/assets/stylesheets/blog.scss`, and define styles for elements inside `.post-page`:

```scss
.post-page {
  margin: auto;
  padding-top: 2em;

  @media (min-width: $mobile-width) {
    max-width: 800px;
  }

  h1 {
    font-size: 2em;
    text-align: center;
    margin-top: 0.8em;
    margin-bottom: 0.8em;
  }

  h2 {
    font-size: 1.6em;
    margin-top: 2em;
    margin-bottom: 0.7em;
  }

  p {
    line-height: 2;
    font-size: 19px;
  }

  img {
    aspect-ratio: 5/3;
    object-fit: cover;
    height: 100%;
    border-radius: 8px;
    margin-top: 0.8em;
  }

  .a2a_kit {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3rem;
    margin-top: 3rem;

    a {
      margin: 0 0.3rem;
    }
  }
}
```

This CSS file defines styles for various elements within .post-page, ensuring a visually pleasing layout for your blog posts.

Feel free to customize these styles further to match your design preferences. As your blog takes shape, these enhancements will contribute to a delightful reading experience.

![nice version](/images/blog/add-blog-to-rails-in-minutes/nice.png)

### Conclusion

In conclusion, with this step-by-step guide, you've empowered your Rails application with a dynamic and Markdown-driven blog section. By seamlessly integrating Redcarpet for Markdown conversion, creating dynamic routes, and utilizing front matter for rich metadata, you've crafted an engaging space for sharing valuable content.

Now, as your blog section takes shape, remember that this is just the beginning. Explore further customization, experiment with styling, and continue sharing your insights. Whether you're a seasoned developer or just starting, the versatility of Markdown brings a user-friendly approach to content creation.

Feel the satisfaction of providing practical advice, sharing experiences, and connecting with your audience.

If you have questions, feedback, or encounter any challenges along the way, don't hesitate to reach out on [Twitter](https://twitter.com/achris_15). Happy blogging!

