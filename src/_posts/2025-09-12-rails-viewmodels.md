---
layout: post
title:  "View Models in Rails: An experiment to solve the chaos"
date:   2025-09-12 9:08:42 +0200
categories: articles
image: /images/blog/rails-viewmodels/landing.webp
description: "Learn how View Models can help you clean up messy Rails views, improve performance, and make your code more maintainable."
---

> Rails views start simple, but they can quickly turn into a mess. Business logic creeps in, performance suffers, and suddenly your views are making decisions they shouldn't.

Since Rails first appeared, one thing that's barely changed is how we build and render views. If you've worked with Rails, you're familiar with those ERB files following the CRUD pattern - index/show/edit and so on. Usually, you're rendering one Model at a time, or at most something related to the user.

As your application grows, you add new Models and relationships. Before you know it, you're accessing them directly in your views. Then a few hours later, you've started adding business logic to your views:

```erb
<%% if current_user.subscription.active? %>
...
<%% end %>
```

This might seem reasonable at first. I was personally okay with it too! But after years of working this way, I started noticing all this logic scattered across views and partials. It was becoming a real mess.

Even worse, Ruby code was mixed with HTML, class names, inline CSS, and inline JavaScript!

No more!

## The Pain Points

If you've worked on a Rails app that's grown beyond a simple CRUD application, you've probably run into these problems:

### Several Models or variables accessed in views

This is probably the biggest issue: we tend to access multiple ActiveRecord models or variables containing them to the point where it's practically impossible to track what's used where.

```ruby
def show
  @current_user = User.last
  @articles = @current_user.articles(since: 1.month.ago)
  @friends = ...
  @suggested_friend = ...
end
```

Later on in the view:

```erb
<%% if @current_user %>
  <%% @articles.each do |p| %>
    <%%= render partial: "post_with_friends", friends: @friends %>
    <p>Like count: <%%= Like.count(aggregate_id: articles.aggregates.last.id) %></p>
  <%% end %>
<%% end %>
```

Some are instance variables from the controller, others are direct calls to ActiveRecord Models because you might not have a clear relationship between the two entities.

![mess](/images/blog/rails-viewmodels/mess.png)

### Business Logic Sneaking Into Views

Another major pain point: Views should be about presentation, but they often become decision-makers.

```erb
<%% if user.articles.where(published: true).count > 0 && user.subscription.active? %>
  <div class="premium-content">
    <%%= render partial: "premium_content" %>
  </div>
<%% end %>
```

Even without mentioning the Single Responsibility Principle, your view is now making business decisions about who should see what content.

We might try to fix this by creating a new scope or method in the Model, but that's not really a fix—it's just postponing the problem. Eventually, you'll need to limit the number of records or manipulate them in a way that's specific to a single view, and that's not a Model's responsibility.

### Performance Issues

Ever noticed your pages getting slower as your app grows? It might be those innocent-looking view snippets:

```erb
<%% @users.each do |user| %>
  <div class="user-card">
    <h3><%%= user.name %></h3>
    <p>Articles: <%%= user.articles.count %></p>  <!-- N+1 query alert! -->
    <p>Last active: <%%= user.last_active_at.strftime("%B %d, %Y") %></p>
  </div>
<%% end %>
```

That harmless `user.articles.count` creates an N+1 query that can bring your app to its knees as your user base grows.

### Lack of Centralization

When business rules are scattered across views, making changes becomes a treasure hunt:

```erb
<!-- In users/show.html.erb -->
<%% if user.premium? && user.verified? %>

<!-- In articles/index.html.erb -->
<%% if current_user.premium? && current_user.email_verified? %>

<!-- In dashboard/index.html.erb -->
<%% if current_user.subscription.status == "active" && current_user.verified_at.present? %>
```

Notice how the same business rule is implemented three different ways? Good luck updating that logic consistently!

### Testing Becomes a Nightmare

How do you test view logic? It's hard to isolate, hard to mock, and often requires slow integration tests.

Here are a few options:

### System Testing

![God please no](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTB2cmc1Nm94NzE4YThlMGUzYWdxYzJrcDI2eng2cjRqY3U3M2lheiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vyTnNTrs3wqQ0UIvwE/giphy.gif)

We don't do this anymore. As DHH says, stop writing so many system tests - you should only have a few to test the general behavior of your app. They're not feasible for testing various field value combinations to figure out how your view renders.

### Partial Rendering Testing

We can test views in isolation, right? Yes, but I don't want to test the view itself, because the interesting part is in the data. The view is data-driven, so I'm more interested in testing the data that the controller outputs.

The important bit is understanding when the `current_user` might be `nil`, not why the view isn't rendering the user profile, which is just a direct consequence.

> If I can remove any logic from the view and make it behave 1-to-1 with the controller, I can test that the ERB file doesn't contain errors and the controller output is correct. That gives me 99.99% assurance the view will render as expected.


## Experimenting with View Models

A View Model sits between your controller and view, handling all the presentation logic and data preparation. Think of it as a specialized object that knows exactly what your view needs.

### What Is a View Model?

In its simplest form, a View Model is a plain Ruby class that:

1. Takes in your model**S** and any other context
2. Provides methods that your view can call
3. (Optional) Handles all the presentation decisions
4. Is the only DTO used in your views for that request

Here's a basic example:

```ruby
UserProfileViewModel = Data.define(:current_user, :show_premium_content) do
  def display_name
    current_user.full_name || current_user.username
  end
end
```

### How to Use It in Your Controller

```ruby
class ProfilesController < ApplicationController
  def show
    user = User.find(params[:id])
    @vm = UserProfileViewModel.new(
      current_user:,
      articles: current_user.articles.since(1.month.ago),
      show_premium_content: current_user.subscription.active?
    )
  end
end
```

### And in Your View

```erb
<div class="profile-header">
  <h1><%%= @vm.display_name %></h1>
  <p>Member since <%%= @vm.current_user.created_at %></p>
</div>

<%% if @vm.show_premium_content %>
  <div class="premium-content">
    <%%= render partial: "premium_content" %>
  </div>
<%% end %>

<div class="recent-articles">
  <%% @vm.articles.each do |article| %>
    <%%= render partial: "article", locals: { article: article } %>
  <%% end %>
</div>

<%%= render(partial: "invoices", current_user:) %>
```

## The Benefits

### Centralized Logic and Unidirectional Flow

All your presentation decisions live in one place: the controller.
Need to change how premium content access works? Update it in one method, not across dozens of views.

This leads to a unidirectional flow with the Controller doing the heavy lifting of putting all the pieces together, calling Models and ServiceObjects to get all the required information, building a ViewModel, and passing it to the view.

![not a mess](/images/blog/rails-viewmodels/not_mess.png)

### Better Performance

View Models let you eagerly load exactly what you need:

```ruby
  @vm = UserProfileViewModel.new(
    current_user:,
    articles: current_user.articles.includes(:comments).since(1.month.ago),
    show_premium_content: false
  )
```

Need this logic in multiple controller routes?
You can:
- Move it into the `UserProfileViewModel`
- Create a ServiceObject

### Semantic Clarity

Your view doesn't need to know *why* premium content is shown, just *if* it should be shown:

```erb
<%% if @vm.show_premium_content %>
  <!-- content here -->
<%% end %>
```

The method name clearly communicates intent, not implementation details. This means that if some users have been nice to us, we can show them premium content by updating the code in the controller, without changing the view.

## Implementation Guidelines

### Where to Put Your ViewModels

I like to create a dedicated directory and a view model for each route my app is rendering:

```
app/
  view_models/
    user_profile_view_model.rb
    dashboard_view_model.rb
    post_show_view_model.rb
    post_index_view_model.rb
```

### Type Safety for Extra Confidence

(Just an idea, I haven't tested it personally)

If you're using Sorbet, RBS or other type checking tools, View Models are a perfect place to add type annotations:

```ruby
# With Sorbet
class UserProfileViewModel
  extend T::Sig

  sig { params(current_user: User, Boolean).void }
  def initialize(user, current_user)
    @user = user
    @current_user = current_user
  end

  sig { returns(String) }
  def display_name
    @user.full_name || @user.username
  end
end
```

### Testing Made Easy

View Models are just plain Ruby objects, which makes them incredibly easy to test:

```ruby
RSpec.describe UserProfileViewModel do
  describe "#show_premium_content" do
    it "returns true for active subscribers viewed by admins" do
      current_user = create(:user, :with_active_subscription)
      show_premium_content = true

      view_model = UserProfileViewModel.new(current_user:)
      expect(view_model.show_premium_content).to be true
    end
  end
end
```

But the interesting part is how we test the ViewModel generated from the controller using request specs:

```ruby
describe "GET /user/profile" do
  context "when user signed in" do
    before { sign_in user }

    it "renders the profile page" do
      get user_profile_path

      expect(assigns[:vm]).to be_a UserProfileViewModel
      expect(assigns[:vm].current_user).to eq(user)
      expect(assigns[:vm].articles).to eq(user.articles.first(10))
      expect(assigns[:vm].show_premium_content).to be(true)

      expect(response).to render_template(:profile)
    end
  end

  context "when NOT signed in" do
    it "do NOT render the profile page" do
      get user_profile_path
      expect(assigns[:vm]).to eq(
        UserProfileViewModel.new(
          current_user: user,
          articles: []
          show_premium_content: false
        )
      )
      expect(response).not_to render_template(:profile)
    end
  end
end
```

## Alternatives and Trade-offs

View Models aren't the only solution to these problems. Here are some alternatives:

### Presenters/Decorators (Draper)

Decorators wrap a single model and add presentation methods:

```ruby
class UserDecorator < Draper::Decorator
  def display_name
    object.full_name || object.username
  end
end
```

Good for simple presentation logic tied to a single model but less ideal for complex views that pull data from multiple models.

### View Components (ViewComponent)

GitHub's ViewComponent library lets you create reusable view components with their own logic:

```ruby
class UserCardComponent < ViewComponent::Base
  def initialize(user:)
    @user = user
  end

  def premium?
    @user.subscription.active?
  end
end
```

Good for reusable UI elements that appear across many pages but less ideal for page-specific presentation logic.

### Cells

Cells are mini-controllers for parts of your UI:

```ruby
class UserCell < Cell::ViewModel
  def show
    render
  end

  def premium?
    model.subscription.active?
  end
end
```

Good for complex, reusable UI components with their own templates but less ideal for simple presentation logic.
This is the closest one to my vision of ViewModels, but it strongly links the UI and logic, adds a new dependency, and introduces a new way of doing things.

## When to Use View Models

View Models shine when:

1. Your views access multiple models
2. You have complex presentation logic
3. You want to improve performance with eager loading
4. You need to test your presentation logic thoroughly

They might be overkill for:

1. Very simple CRUD applications
2. Views that only display a single model with minimal logic

Personally, I'm introducing them in [Coney.app](https://coney.app), one of my most active side projects. I've already converted dozens of routes to this pattern and I'm really happy with the results. I've discovered many edge cases that are now covered by tests, making the application more reliable.

### Next Steps

I'm considering using [Literal](https://literal.fun) to add type checks to the ViewModels to make them even safer.
I'm also trying to build some conventions around this pattern and might create a gem in the future to share what worked in my case.

## Wrapping Up

View Models aren't a silver bullet, but they're a powerful tool for keeping your Rails views clean, performant, and maintainable. They really shine in complex applications where views pull data from multiple sources and need to make presentation decisions.

The best part? You can introduce them gradually. Start with your most complex views, create View Models for them, and see the difference it makes. You don't need to refactor your entire application at once.

Have you tried using View Models in your Rails applications? What worked (or didn't) for you? Try refactoring one complex view with a View Model—you might never want to go back to the old way!
