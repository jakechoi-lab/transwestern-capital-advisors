# TransWestern Capital Advisors - React Website

A modern, modular React application for TransWestern Capital Advisors, LLC, migrated from vanilla HTML/CSS/JS to a maintainable React architecture.

## Features

- **Modular Architecture**: Reusable components (NavBar, Footer) shared across all pages
- **React Router**: Single-page application with seamless navigation
- **Static Build**: Optimized for deployment to any static hosting service
- **Preserved Functionality**: All animations, interactions, and canvas visualizations from the original site
- **Local Assets**: All images served locally instead of from CDNs

## Project Structure

```
React/
├── public/
│   └── assets/          # Local image assets
├── src/
│   ├── assets/          # Image imports and mappings
│   ├── components/      # Reusable components (NavBar, Footer)
│   ├── pages/           # Page components
│   ├── styles/          # Global CSS styles
│   └── main.jsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Dependencies
└── vite.config.js       # Build configuration
```

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

Run the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## Building for Production

1. Build the static site:
```bash
npm run build
```

This creates a `dist` directory with optimized static files.

2. Preview the production build locally:
```bash
npm run preview
```

## Deployment

The built site in the `dist` directory can be deployed to any static hosting service:

### Option 1: Drag-and-Drop Hosting (Netlify Drop, Vercel, etc.)
1. Run `npm run build`
2. Drag the entire `dist` folder to the hosting service

### Option 2: GitHub Pages
1. Build the site: `npm run build`
2. Deploy using GitHub Pages or gh-pages package

### Option 3: Traditional Web Hosting
1. Build the site: `npm run build`
2. Upload the contents of the `dist` directory to your web server

### Important: Opening index.html Directly

**Note**: If you double-click on `dist/index.html` to open it directly in your browser, you may see a blank page. This is normal behavior for single-page applications. Instead:

1. **For testing**: Use `npm run preview` to test the built site locally
2. **For deployment**: Upload to a web server or hosting service
3. **For development**: Use `npm run dev` to run the development server

The app uses HashRouter to make it compatible with static hosting, so URLs will have `#` in them (e.g., `yoursite.com/#/bridge-platform`).

## Troubleshooting

### CSS Not Loading / Blank Content
If you see the site structure but no styling or blank content:

1. **Check CSS Import**: The CSS is imported via `src/styles/index.css` which imports `global.css`
2. **Rebuild**: Run `npm run build` to ensure CSS is properly bundled
3. **Browser Cache**: Hard refresh (Ctrl+F5 or Cmd+Shift+R) to clear cache
4. **Check Console**: Open browser developer tools for any error messages

### Images Not Showing
- Current placeholder SVG images are in `public/assets/`
- Replace with actual PNG files from your original assets directory
- Images are referenced via `/assets/filename.png` paths

### Development vs Production
- **Development**: `npm run dev` - CSS is loaded dynamically
- **Production**: `npm run build` then `npm run preview` - CSS is bundled
- **Static Deploy**: Upload entire `dist/` folder contents to hosting service

## Important Notes

### Images
- All images are configured in `src/assets/images.js`
- **IMPORTANT**: You need to copy the actual PNG files from the `/assets` directory (mentioned in your original project structure) to `public/assets/`
- Currently placeholder files exist at `public/assets/` - replace these with the actual image files:
  - `logotransparen_capital_advisors.png`
  - `logotransparent_bridge.png`
  - `logo_bank_transparent_nooutline.png`
  - `logotransparent_notext.png`
  - `logotransparent_financial_solutions.png`
  - `logotransparent_portfolio_engineering.png`
  - `logotransparent_transwestern.png`
  - `thumbnails_logo_bank_transparent.png`
  - `full_span_bridge.png`
  - `full_span_bridge_transparent_edge.png`
- External images that should be downloaded and saved locally are listed in `src/assets/images.js` under `externalImages`

### Navigation
- The navigation is standardized across all pages using the NavBar component
- Mobile menu functionality is fully preserved

### Animations
- All scroll animations are preserved with data-animation attributes
- Canvas animations (ocean waves, data visualizations) are implemented in React

### Analytics
- Class names and IDs are preserved for existing analytics integrations

## Browser Support

The site supports all modern browsers and includes:
- Responsive design for mobile/tablet/desktop
- Touch support for mobile interactions
- Fallbacks for older browsers

## Maintenance

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route in `src/App.jsx`
3. Update navigation in `src/components/NavBar.jsx`

### Updating Styles
- Global styles are in `src/styles/global.css`
- Component-specific styles can be added as needed

### Managing Images
1. Add new images to `public/assets/`
2. Update `src/assets/images.js` with the new image path
3. Import and use in components

## License

© 2025 TransWestern Capital Advisors LLC. All Rights Reserved.