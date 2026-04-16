# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start Vite frontend (port 5173)
pnpm dev:server   # Start Express backend (port 3001)
pnpm dev:all      # Start both concurrently
pnpm build        # Production build
pnpm lint         # ESLint
pnpm preview      # Preview production build
```

## Architecture

This is a React + Vite SPA for a real estate agency (RueHomes), deployed to Vercel. There is **no SSR** — `vercel.json` rewrites all routes to `index.html`.

### Two-process local dev

- **Frontend** (`pnpm dev`): Vite on port 5173, proxies `/api` to `http://localhost:3001`
- **Backend** (`server.js`): Express on port 3001, handles Instagram and email endpoints

In production on Vercel, the API routes are served by Vercel Serverless Functions in `api/` (not `server.js`).

### Data flow

- **Properties**: fetched client-side from Hygraph (GraphQL CDN, no auth token required). All queries are defined in `src/services/hygraph.js`.
- **Email**: contact/property inquiry forms POST to `/api/send-email` → Brevo SMTP API
- **Instagram feed**: GET `/api/instagram` → Instagram Graph API (requires long-lived token, expires every 60 days)

### Environment variables

Required in `.env.local` (never committed):
```
VITE_HYGRAPH_ENDPOINT=    # Public CDN endpoint, no token needed
VITE_HYGRAPH_TOKEN=       # Optional, leave empty for public reads
VITE_GOOGLE_MAPS_KEY=     # Google Maps embed
INSTAGRAM_USER_ID=        # Instagram Business account ID
INSTAGRAM_ACCESS_TOKEN=   # Long-lived token (60-day expiry, must be manually renewed)
BREVO_API_KEY=            # Brevo SMTP API key
BREVO_SENDER_EMAIL=       # Defaults to info@ruehomes.com
BREVO_SENDER_NAME=        # Defaults to RueHomes
```

### Routing

All routes defined in `src/App.jsx`. Current pages:
- `/` → Home
- `/propiedades` → Properties listing
- `/propiedad/:id` → Property detail
- `/vender` → Sell
- `/tailored-services` → Tailored Services
- `/la-agencia` → Agency
- `/contacto` → Contact
- `/politica-privacidad` → Privacy Policy

### Styling

Tailwind CSS v4 + global CSS variables in `src/styles/variables.css`. Custom utility classes in `src/styles/components.css`. Custom colors (e.g. `text-marron`, `text-marron-light`) are defined as CSS variables.

### Custom hooks

- `src/hooks/useProperties.js` — fetches and caches properties from Hygraph
- `src/hooks/useFilters.js` — manages property filter state (city, type, bedrooms, price range)

### Hygraph CMS

Properties are managed in Hygraph (app.hygraph.com, project: Rue Homes). Content must be **Published** (not just saved) to appear on the site. See `HYGRAPH_GUIDE.md` for the full schema and content management workflow.
