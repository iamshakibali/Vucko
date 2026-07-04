# README.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- **Install:** `npm install`
- **Dev Server:** `npm run dev` (runs on http://localhost:3000)
- **Build:** `npm run build`
- **Production Server:** `npm run start` 
- **Lint:** `npm run lint`

## Architecture & Tech Stack
- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript (strict mode)
- **Styling:** CSS Modules (`*.module.css`) + global variables (`app/globals.css`). Theming is handled via CSS custom properties and a `data-theme` attribute on the `<html>` tag (toggled via local state + `localStorage`).
- **Animation:** GSAP 3 is the primary animation library (e.g., used for scroll-driven animations and mouse effects).
- **Fonts:** Geist Sans (configured via `geist/font/sans` in `app/layout.tsx`).
- **Tooling:** Agentation is active in development mode (injected in `app/layout.tsx`).

## Structure
- `app/`: Next.js App Router (layout, page, global styles).
- `components/`: React components and their co-located CSS Modules. Use `'use client'` at the top of these if they use hooks or GSAP animations.
- `public/`: Static assets (SVGs, videos).

## Conventions
- Use the `@/` path alias for absolute imports from the root (e.g., `import Header from "@/components/Header"`).
- Stick to CSS Modules rather than adding CSS-in-JS solutions.
- Component files and their corresponding CSS modules should be co-located in the `components/` directory.
