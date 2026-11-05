# Sok Sophea - Developer Portfolio (React.js)

An interactive, responsive developer portfolio built with React.js, TypeScript, and Vite, configured for instant deployment to Vercel.

## Features

- **Storm Atmospheric Canvas**: Procedural rain and real-time lightning engine with stepped leaders, double-pulse return strokes, and cooling electric-blue afterglow.
- **Floating Tech Orbs**: Kinetic technology icons with collision boundaries and mouse-evasion physics.
- **Interactive 3D Cards**:
  - Avatar with mouse-driven 3D tilt and spinning conic chromatic ring.
  - 3D skill cards with rotating tech emblems, orbit rings, and particle fields.
  - 3D laptop frames showcasing interactive SVG app previews for 6 featured projects.
- **Responsive Navigation**: Hash-based client routing between Home, About, Portfolio, and Contact sections with mobile drawer navigation.
- **Contact Form**: Real-time validation with fallback email client (`mailto:`) integration and embedded Google Maps for NTTI location.
- **Accessibility & Motion Preferences**: Fully supports `prefers-reduced-motion` and keyboard accessibility with skip links.

## Getting Started

### Local Development

```bash
npm install
npm run dev
```

The application runs on `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

Build output is written to `dist/`.

## Deploying to Vercel

This repository includes `vercel.json` configured with:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **SPA Rewrites**: `/(.*)` redirected to `/index.html`

To deploy:
1. Push your repository to GitHub or GitLab.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Select the Vite framework preset or keep default settings.
4. Click **Deploy**.