# Build Prompt — Café Landing Page

> Paste this into Antigravity's agent panel as your first message, after adding
> `AGENTS.md`, `design.md`, `architecture.md` and `tasks.md` to the repo root.

---

Build a café landing page web app. Read `AGENTS.md`, `design.md` and
`architecture.md` in the repo root first and follow them exactly. Work through
`tasks.md` phase by phase, and stop after each phase so I can review.

## What it is

A single scrollable landing page for a fictional independent coffee shop called
**Kettle & Crumb**, plus a small password-protected admin page where the owner
adds menu items and edits prices. Menu items live in MongoDB. Everything else
(address, hours, gallery, phone) is hard-coded in one config file.

## Stack

- Next.js 15, App Router, **JavaScript only — no TypeScript**
- Tailwind CSS v4 (tokens in `globals.css`, no `tailwind.config.js`)
- shadcn/ui for Button, Input, Textarea, Card, Dialog, Label, Sonner
- MongoDB Atlas via the official `mongodb` driver — **no Mongoose**
- Deployed on Vercel

## Public page — sections in order

1. **Hero** — full-bleed photo, café name, one-line tagline, a live "Open now /
   Closed" indicator computed from the hours config, and two buttons:
   "See the menu" and "Find us". Sticky nav bar on top with smooth scroll links.
2. **Menu** — items pulled from MongoDB, grouped by category (Coffee, Tea,
   Pastries, Food). Each item shows name, one-line description and price.
   Items flagged as a daily special get a small badge.
3. **Opening hours** — the week laid out as a list, today's row highlighted.
4. **Location** — address, phone, email, an embedded Google Maps iframe and a
   "Get directions" link.
5. **Gallery** — 6 images in a responsive grid, lazy-loaded, with alt text.
6. **Footer** — quick links, social links, copyright, back-to-top button.

## Admin

- `/admin/login` — one password field. Correct password sets an httpOnly cookie.
- `/admin` — table of all menu items with add, edit, delete and a
  "mark as daily special" toggle. Redirects to the login page if the cookie is
  missing. A "Log out" button clears it.
- Images are entered as a pasted URL. There is no file upload anywhere.

## Rules I care about most

- **Keep it simple.** This is a college mini project. A reviewer should be able
  to read any file in under two minutes. Prefer boring, obvious code.
- No state management library, no data-fetching library, no auth library, no
  animation library. `useState` and `fetch` are enough.
- The home page is a server component that reads MongoDB directly through a
  helper function. Do not build an API route just for reading the menu.
- Every file under 150 lines. Split a section into its own component before it
  gets longer.
- Seed the database with about 12 realistic menu items so the page is never empty.

## Before you start

Confirm you have read `AGENTS.md` and `design.md`, then list the files you plan
to create. Wait for my go-ahead before writing code.
