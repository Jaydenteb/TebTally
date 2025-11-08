# TebTally Hub

A minimal Next.js app that serves as the parent brand home for the TebTally suite (tebtally.com). It links to individual product apps (SpellTally, WritingTally, TrackTally) and is the natural place to add marketing pages, pricing, signup, and centralized identity (SSO) later.

## Quick Start

1) Install deps

```bash
npm install
```

2) Dev server

```bash
npm run dev
```

Visit http://localhost:3000.

## Environment

Optionally point the app cards to live subdomains or local ports via env vars:

- `NEXT_PUBLIC_SPELLTALLY_URL` (e.g. https://spelltally.tebtally.com or http://localhost:3001)
- `NEXT_PUBLIC_WRITETALLY_URL` (e.g. https://writetally.tebtally.com or http://localhost:3002)
- `NEXT_PUBLIC_TRACKTALLY_URL` (e.g. https://tracktally.tebtally.com or http://localhost:3003)

If not set, the UI falls back to local dev defaults.

## Scripts

- `npm run dev` – Next.js dev server
- `npm run build` – production build
- `npm run start` – start production server

## Notes

- This is intentionally lean. As TebTally matures, add:
  - Centralized identity (IdP) integration at `id.tebtally.com`
  - Marketing pages, pricing, docs, and legal
  - License/seat management UI
  - Shared design system tokens/components
