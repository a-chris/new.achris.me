class Shared::Navbar < Bridgetown::Component
  # Single source of truth for the top bar, so the two menus can never drift.
  # The wordmark is the home link, which is why `/` is not in this list.
  NAV_ITEMS = [
    ['projects', '/projects'],
    ['blog', '/posts'],
    ['events', '/events']
  ].freeze

  def initialize(metadata:, resource:)
    @metadata = metadata
    @resource = resource
  end

  def nav_items
    NAV_ITEMS
  end

  # Also matches children, so a post at /posts/view-models/ still highlights
  # "writing".
  def nav_active?(path)
    current = @resource&.relative_url.to_s

    current == path || current.start_with?("#{path}/")
  end
end
