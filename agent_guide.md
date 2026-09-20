# Agent Guide — tour-trip-front

This file is a guide for AI agents and developers working on this codebase. It documents project structure, conventions, and commands.

## Overview

A React + Vite frontend for a tour/trip booking admin application (internship project). The app is an admin dashboard with modules for tours, bookings, customers, guides, destinations, categories, schedules, and auth. UI is built with Tailwind CSS, icons from `lucide-react` / `react-icons`, and charts from `recharts`. Linting uses Oxlint (not ESLint).

## Stack

- React 19, Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite` plugin, configured in `vite.config.js` and `index.css`)
- react-router-dom v7 (declarative routes in `src/App.jsx`)
- recharts for charts
- Oxlint for linting (`npm run lint`)

## Commands

- `npm run dev` — start dev server with HMR
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — run Oxlint

## Project structure

```
src/
  App.jsx             # all routes defined here (BrowserRouter/Routes/Route)
  main.jsx            # entry point
  index.css           # Tailwind entry + global styles
  assets/             # static assets (images)
  components/
    admin/            # admin layout, sidebar, etc. (AdminLayout)
    booking/, payment/, review/, schedule/, tour/
    common/           # shared/reusable components
    layout/
  constants/          # shared constants
  context/            # React context providers
  data/               # static/mock data
  hooks/              # custom hooks
  pages/              # page-level components
    admin/            # admin feature pages grouped by domain:
      tours/, bookings/, customers/, guides/, destinations/,
      categories/, auth/ (login, register, forgot, verify), Dashboard.jsx
  routes/
  services/           # API layer (api.js wrapper + domain services)
  utils/              # helper utilities
```

## Conventions

- JSX/JavaScript only — this is not a TypeScript project.
- Components/pages live under `src/pages/<domain>/...`. Feature pages are grouped one directory per domain under `src/pages/admin/`.
- API calls go through the `apiFetch` wrapper in `src/services/api.js`; domain-specific calls are wrapped in service files under `src/services/` (e.g. `tourService.js`, `destinationService.js`).
- API base URL comes from `VITE_API_BASE_URL` (falls back to `http://localhost:3000/api`). Secrets and environment values live in `.env`, never commit them.
- All routes are declaratively registered in `src/App.jsx` under the `AdminLayout` route. Add new admin pages there.
- Styling uses Tailwind utility classes; match the style of neighboring page components.
- Icons: `lucide-react` (preferred) or `react-icons`.
- Do not add code comments unless the surrounding code already comments that style (the API wrapper is an exception).

## Linting rules (`.oxlintrc.json`)

- `react/rules-of-hooks`: error
- `react/only-export-components`: warn (with `allowConstantExport`)
- Plugins: `react`, `oxc`

Always run `npm run lint` after changes and fix any new warnings/errors before finishing.

## Notes

- Verify the solution after changes by running the build (`npm run build`) and lint (`npm run lint`). There is no test framework configured.