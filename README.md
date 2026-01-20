# Storefront — deco.cx template

A modern, high-performance e-commerce storefront template built on [deco.cx](https://deco.cx).

## What is this?

This is a production-ready e-commerce storefront starter that combines:

- **[deco.cx](https://deco.cx)**: A composable commerce platform for building lightning-fast, edge-native storefronts
- **[Fresh](https://fresh.deno.dev/)**: A next-generation web framework with islands architecture (no build step, no client-side hydration overhead)
- **[Deno](https://deno.com/)**: A modern, secure runtime for JavaScript and TypeScript
- **[Preact](https://preactjs.com/)**: A fast 3kB alternative to React with the same modern API

## Features

Out of the box, this template includes:

- Pre-built e-commerce components (product listings, cart, checkout, search, wishlist)
- Mobile-first responsive design with Tailwind CSS
- Integration with major e-commerce platforms via deco.cx apps
- SEO-optimized with server-side rendering
- Real-time previews with deco.cx Admin
- HTMX support for enhanced interactivity
- Performance-optimized with edge delivery

## Quick Start

### Prerequisites

- [Deno](https://docs.deno.com/runtime/manual/getting_started/installation/) installed on your system

### Running locally

1. Clone this repository
2. Start the development server:

```sh
deno task start
```

This command will:
- Install all dependencies automatically
- Start the development server with hot module reloading
- Make your site available at `http://localhost:8000`

### Alternative development modes

- `deno task play` - Run with local storage only (for offline development)
- `deno task dev` - Run development server directly
- `deno task build` - Build for production
- `deno task preview` - Preview production build

## Project Structure

```
.
├── sections/         # Page sections (Hero, Product Grid, Footer, etc.)
├── components/       # Reusable UI components (Header, Cart, Search, etc.)
├── actions/          # Server-side actions (add to cart, checkout, etc.)
├── loaders/          # Data loaders for fetching content
├── routes/           # Fresh routes and pages
├── static/           # Static assets (images, fonts, etc.)
└── sdk/             # TypeScript SDK for external integrations
```

## Development

### Recommended VSCode Extensions

- [Deno](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno) - Essential for Deno development
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Autocomplete for Tailwind classes

### Updating Dependencies

Keep your dependencies up-to-date:

```sh
deno task update
```

### Code Quality

Run formatting, linting, and type checking:

```sh
deno task check
```

## Customization

This template is designed to be fully customizable:

1. **Edit sections** - Modify or create new sections in the `sections/` directory
2. **Customize components** - Update UI components in `components/` to match your brand
3. **Configure integrations** - Connect to your preferred e-commerce platform via deco.cx apps
4. **Style with Tailwind** - Adjust `tailwind.config.ts` for your design system
5. **Add custom logic** - Create loaders and actions for custom data fetching and mutations

## Deployment

This storefront is optimized for edge deployment. Deploy to:

- **[Deno Deploy](https://deno.com/deploy)** - Recommended for global edge deployment
- **Any Deno-compatible hosting** - Works anywhere Deno runs

## Resources

- [deco.cx Documentation](https://www.deco.cx/docs/en/overview)
- [Troubleshooting Guide](https://deco.cx/docs/en/reference/troubleshooting)
- [Glossary](https://deco.cx/glossary)
- [Community Discord](https://deco.cx/discord)

## Contributing

Contributions are welcome! This template is part of the deco.cx ecosystem.

To contribute to the broader platform:
- [deco.cx core](https://github.com/deco-cx/deco/)
- [deco.cx apps](https://github.com/deco-cx/apps/)

## License

This project is licensed under the terms specified in the [LICENSE](./LICENSE) file.
