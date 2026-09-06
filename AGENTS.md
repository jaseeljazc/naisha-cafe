# AGENTS.md

Rules for any AI agent working in this repository. Read this before every task.

## Project

A café landing page and a small admin panel for editing the menu. Academic mini
project — the grading criterion is clarity, not sophistication.

## Stack (do not substitute)

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15, App Router |
| Language | JavaScript. **No TypeScript, no `.ts`/`.tsx` files.** |
| Styling | Tailwind CSS v4, tokens declared with `@theme` in `app/globals.css` |
| Components | shadcn/ui (only the ones listed below) |
| Database | MongoDB Atlas, official `mongodb` driver |
| Fonts | `next/font/google` |
| Icons | `lucide-react` |

Allowed shadcn components: `button`, `input`, `textarea`, `label`, `card`,
`dialog`, `sonner`. Do not add others without asking.

## Hard rules

1. **No new dependencies** beyond the table above. If a problem seems to need a
   library, write ten lines of plain JavaScript instead and explain why.
2. **No Mongoose.** Use the raw driver with a shared client in `lib/mongodb.js`.
3. **No auth library.** Admin access is one password from an environment
   variable plus one httpOnly cookie. Nothing more.
4. **No file uploads.** Images are URLs typed into a text field.
5. **Every file stays under 150 lines.** Split before you exceed it.
6. **One component per file**, named the same as the file.
7. **No `useEffect` for data fetching on the public page.** The home page is a
   server component and reads the database directly.
8. `'use client'` only where there is genuine interactivity: the nav toggle, the
   admin forms, the back-to-top button.
9. **No inline styles and no raw hex values in JSX.** Use the Tailwind tokens
   defined in `globals.css`.
10. **No `any`-style escape hatches, no `eslint-disable`, no `@ts-ignore`.**

## Code style

- Function declarations for components: `export default function MenuSection() {}`
- `async/await`, never `.then()` chains.
- Comment only where the reason is not obvious from the code. No comment blocks
  above every function.
- Descriptive names over short ones: `formatPrice`, not `fp`.
- Wrap every database call and every `fetch` in `try/catch` and show the user a
  readable message on failure.
- Currency is Indian Rupees. Store price as a Number, format as `₹120`.

## Folder structure

```
app/
  layout.js              root layout, fonts, Toaster
  page.js                the landing page (server component)
  globals.css            Tailwind import + @theme tokens
  admin/
    layout.js            checks the cookie, redirects if absent
    page.js              admin dashboard
    login/page.js        password form
  api/
    admin/login/route.js
    admin/logout/route.js
    products/route.js            GET, POST
    products/[id]/route.js       PUT, DELETE
components/
  site/                  Navbar, Hero, Menu, Hours, Location, Gallery, Footer
  admin/                 ProductTable, ProductForm, LoginForm
  ui/                    shadcn output — do not hand-edit
lib/
  mongodb.js             cached client
  products.js            getProducts, createProduct, updateProduct, deleteProduct
  auth.js                isAdmin(), cookie name constant
  utils.js               cn(), formatPrice(), isOpenNow()
data/
  site.js                café name, address, hours, gallery, socials
scripts/
  seed.js                inserts the sample menu items
```

## Definition of done for any task

- `npm run build` passes with no errors and no warnings.
- The page works at 375px, 768px and 1440px.
- Keyboard focus is visible on every interactive element.
- No `console.log` left behind.
- No hard-coded secrets. Secrets live in `.env.local`, documented in
  `.env.example`.

## Ask before doing

Stop and ask me if a task seems to require: a new dependency, a schema change, a
second database collection, or breaking any rule above.
