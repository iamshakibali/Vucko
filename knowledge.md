# Project knowledge

This file gives context about your project: goals, commands, conventions, and gotchas.

## Quickstart
- **Install:** `npm install` (or `pnpm install` / `bun install`)
- **Dev:** `npm run dev` → http://localhost:3000
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Start (prod):** `npm run start`

## Architecture
- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript (strict)
- **Styling:** CSS Modules (`*.module.css`) with CSS custom properties for theming
- **Font:** Geist Sans via `geist/font/sans` (loaded in `app/layout.tsx`)
- **Animation:** GSAP 3 (`gsap`) — used in Hero for scroll-driven expansion + mouse trail
- **Key directories:**
  - `app/` — App Router layout + pages + globals CSS
  - `components/` — React components (Header, Hero, Showcase) with co-located CSS Modules
  - `public/` — static assets (SVG logo, video)
- **Pages:** Single landing page at `app/page.tsx` (Header → Hero → Showcase)

## Conventions
- **Formatting/linting:** Standard Next.js ESLint (`next lint`)
- **Components:** Default exports, co-located CSS Modules, `'use client'` directive for interactive components
- **Imports:** Use `@/*` path alias (maps to project root) — e.g. `import Header from "@/components/Header"`
- **Assets:** Next.js `<Image>` and `<video>` components; remote images from `images.unsplash.com` allowed in config
- **State:** Local state via `useState`/`useEffect` + `localStorage` for theme persistence
- **Theming:** Light/dark mode via `data-theme` attribute on `<html>`, toggle stored in `localStorage`

## Things to avoid
- Don't add new CSS-in-JS libraries — project uses CSS Modules
- Don't add client-side routing libraries — uses Next.js App Router native navigation
- Don't remove the Agentation dev toolbar (`app/layout.tsx`)
