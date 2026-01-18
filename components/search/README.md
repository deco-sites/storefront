# Search Components

This directory contains the search components for the storefront, including the searchbar and suggestions functionality.

## Features

### 1. Enhanced Search Suggestions

The search suggestions component now includes:
- **Improved UI/UX**: Better visual design with hover states and transitions
- **Search term suggestions**: Quick access to popular or related search terms
- **Product suggestions**: Visual product carousel with relevant items
- **Responsive design**: Optimized for both mobile and desktop

### 2. Keyboard Shortcuts

The searchbar supports the following keyboard shortcuts:
- **⌘K** (Mac) or **Ctrl+K** (Windows/Linux): Open the search modal
- The shortcut works from anywhere on the page
- Visual indicator (⌘K badge) shown in the desktop search input

### 3. Multi-Platform Support

The search suggestions can be powered by different commerce platforms:

#### VTEX Intelligent Search
To use VTEX's built-in intelligent search suggestions:

1. Ensure your site is configured with `platform: "vtex"` in `apps/site.ts`
2. In the Header section configuration (deco.cx admin), set the searchbar loader to:
   - **Loader**: `loaders/suggestions/vtex.ts`
   - **Count**: Number of suggestions to show (default: 4)

#### Algolia Search
To use Algolia for search suggestions:

1. Install and configure the Algolia app in your deco.cx site
2. In the Header section configuration, set the searchbar loader to:
   - **Loader**: `loaders/suggestions/algolia.ts`
   - Configure Algolia-specific parameters as needed

#### Custom Implementation
You can also create your own custom suggestion loader by:
1. Creating a new loader file in `/loaders/`
2. Ensuring it returns data matching the `Suggestion` type from `apps/commerce/types.ts`:
   ```typescript
   interface Suggestion {
     searches: Array<{ term: string }>;
     products: Product[];
   }
   ```

## Components

### Searchbar/Form.tsx
The main searchbar component that handles:
- User input
- Form submission
- HTMX-powered suggestions (no JavaScript shipped by default)
- Keyboard shortcuts (⌘K / Ctrl+K)
- Search analytics events

### Searchbar/Suggestions.tsx
The suggestions display component that shows:
- Search term suggestions with icons
- Product carousel with full product cards
- Loading states via HTMX indicators
- Responsive layout

## Usage

The searchbar is typically used in the Header section:

```tsx
<Searchbar
  placeholder="What are you looking for?"
  loader={/* Your chosen suggestion loader */}
/>
```

## Customization

### Styling
The components use Tailwind CSS and DaisyUI classes. You can customize:
- Colors via DaisyUI theme
- Spacing and layout via Tailwind classes
- Transitions and hover effects

### Behavior
- **HTMX delay**: Suggestions trigger after 300ms of typing (configurable in Form.tsx)
- **Search route**: Results redirect to `/s?q={term}` (configurable via `ACTION` constant)
- **Analytics**: Search events are automatically sent to `window.DECO.events`

## Performance

- **Zero JavaScript**: The basic search form works without any JavaScript
- **Progressive Enhancement**: Suggestions and keyboard shortcuts enhance the experience
- **HTMX**: Efficient partial updates without full page reloads
- **Image Lazy Loading**: Product images in suggestions are lazy-loaded
