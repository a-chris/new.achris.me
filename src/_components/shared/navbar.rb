class Shared::Navbar < Bridgetown::Component
  # Single source of truth for the mobile dropdown and the desktop menu, so the
  # two can no longer drift apart.
  NAV_ITEMS = [
    ['home', '/'],
    ['projects', '/projects'],
    ['tech stories', '/posts']
  ].freeze

  def initialize(metadata:, resource:)
    @metadata = metadata
    @resource = resource
  end

  def nav_items
    NAV_ITEMS
  end

  # `/` matches only the homepage. The others also match their children, so a
  # post at /posts/view-models/ still highlights "tech stories".
  def nav_active?(path)
    current = @resource&.relative_url.to_s

    return current == '/' if path == '/'

    current == path || current.start_with?("#{path}/")
  end
end
