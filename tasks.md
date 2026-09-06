# tasks.md

Seven phases. Finish one, run `npm run build`, show me the result, wait for
approval. Do not start the next phase on your own.

These map to the sprints in the project presentation, so the same list doubles
as your sprint log.

---

## Phase 1 — Foundation

- [x] `npx create-next-app@latest` — App Router, Tailwind, ESLint,
      **JavaScript (answer "No" to TypeScript)**, no `src/` directory
- [x] `npx shadcn@latest init`, then add: button, input, textarea, label, card,
      dialog, sonner
- [x] Load Instrument Serif and Karla in `app/layout.js` via `next/font/google`
- [x] Write the `@theme` token block in `app/globals.css` from `design.md`
- [x] Create `.env.example` and `.env.local`
- [x] Create empty folders: `components/site`, `components/admin`, `lib`, `data`,
      `scripts`

**Done when:** the default page renders on the paper background in Karla.

---

## Phase 2 — Database

- [x] `npm install mongodb`
- [x] `lib/mongodb.js` — cached client
- [x] `lib/products.js` — the four functions
- [x] `scripts/seed.js` — 12 realistic items, run it
- [x] Confirm the documents exist in Atlas

**Done when:** a temporary script logs 12 products from the database.

---

## Phase 3 — Hero, nav and site data

- [x] `data/site.js` filled in with real-looking café details
- [x] `lib/utils.js` — `formatPrice`, `isOpenNow`
- [x] `components/site/Navbar.js` — sticky, smooth-scroll links, mobile toggle
- [x] `components/site/Hero.js` — photo, name, tagline, live open indicator,
      two buttons, the one staggered fade-up on load

**Done when:** the hero fills the screen at 375px and 1440px and the open/closed
line changes if you edit today's hours in `data/site.js`.

---

## Phase 4 — Menu

- [x] `app/page.js` reads `getProducts()` on the server
- [x] `components/site/MenuSection.js` — grouped by category, dot leaders,
      right-aligned tabular prices, special badge
- [x] Empty state when there are no items

**Done when:** all seeded items render grouped, two columns on desktop, one on
mobile, with no layout shift.

---

## Phase 5 — Hours, location, gallery, footer

- [x] `components/site/Hours.js` — today's row highlighted
- [x] `components/site/Location.js` — details plus lazy Maps iframe
- [x] `components/site/Gallery.js` — six lazy square images with alt text
- [x] `components/site/Footer.js` — links, socials, back-to-top

**Done when:** every nav link scrolls to its section and the whole page is
finished visually.

---

## Phase 6 — Admin

- [x] `lib/auth.js`
- [x] `POST /api/admin/login`, `POST /api/admin/logout`
- [x] `app/admin/login/page.js` — password form, error message on 401
- [x] `app/admin/layout.js` — cookie guard and redirect
- [x] `app/api/products/route.js` — GET and POST with `isAdmin()` guard
- [x] `app/api/products/[id]/route.js` — PUT and DELETE with guard
- [x] `components/admin/ProductTable.js` and `ProductForm.js` in a dialog
- [x] Toasts on save, delete and failure; `router.refresh()` after each

**Done when:** adding an item in `/admin` makes it appear on `/` after a reload,
and visiting `/admin` in a private window redirects to the login page.

---

## Phase 7 — Polish and submit

- [x] Check 375 / 768 / 1440 px
- [x] Tab through the whole page — focus visible everywhere
- [x] `prefers-reduced-motion` disables the hero animation
- [x] Remove every `console.log`
- [x] `npm run build` clean
- [x] `README.md` updated with real setup steps
- [ ] Deploy to Vercel with the two environment variables set

**Done when:** the deployed URL works and the admin login works on it.

---

## Not in scope

Do not build any of these, even if they seem useful: online ordering, a cart,
user accounts, a reviews section, a blog, a contact form that sends email,
image uploads, dark mode, internationalisation, a newsletter signup, analytics.
