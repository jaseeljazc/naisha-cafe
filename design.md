# design.md

The visual specification. Follow it exactly. Where it is silent, choose the
quieter option.

## The idea

A café's most characteristic object is its menu board — chalk or enamel, hung
behind the counter, read at a glance. The page borrows that: hairline rules,
prices aligned hard right, dot leaders running between name and price. It is a
menu you scroll rather than a website with a menu section in it.

The one bold moment is the hero. Everything after it stays quiet.

## Colour

Declare these in `app/globals.css` inside `@theme`. Never write a hex value
anywhere else.

| Token | Hex | Use |
| --- | --- | --- |
| `--color-ink` | `#221A12` | Text, hero overlay, footer background |
| `--color-paper` | `#F2ECE0` | Page background |
| `--color-milk` | `#FFFCF6` | Cards, menu surface, inputs |
| `--color-leaf` | `#2E5A3C` | Buttons, links, focus rings, today's hours row |
| `--color-ochre` | `#B07D2B` | Daily-special badge only. Nowhere else. |
| `--color-muted` | `#7A6A57` | Descriptions, captions, footer text |
| `--color-line` | `#DED3C1` | All rules, borders and dividers |

Deep green against warm brown is the palette of an old awning and a tiled
counter. It is deliberately not the cream-and-terracotta pairing that every
café template uses.

Never use pure black or pure white. Never use a gradient. Shadows are limited to
the sticky nav after scroll and the admin dialog — nowhere else.

## Type

Two families, loaded through `next/font/google`.

- **Instrument Serif** (400, plus italic) — display. Café name, section
  headings, prices.
- **Karla** (400, 500, 700) — body, buttons, nav, all admin UI.

Scale, in the `@theme` block:

| Role | Size / line-height | Family |
| --- | --- | --- |
| Hero name | `clamp(3rem, 11vw, 7.5rem)` / 0.92 | Instrument Serif |
| Section heading | `clamp(2rem, 5vw, 3.25rem)` / 1.05 | Instrument Serif |
| Item name | `1.125rem` / 1.3 | Instrument Serif |
| Price | `1.125rem` / 1.3, tabular numerals | Instrument Serif |
| Body | `1rem` / 1.6 | Karla |
| Small / caption | `0.875rem` / 1.5 | Karla |

Rules:
- Sentence case everywhere. **No all-caps labels**, including on buttons and
  eyebrows.
- No eyebrow text above headings.
- Do not colour or italicise a single word inside a heading for emphasis.
- Body copy stays under 70 characters per line: `max-w-[62ch]`.
- Prices use `font-variant-numeric: tabular-nums` so the right edge lines up.

## Layout

Container: `max-w-6xl`, `px-6` on mobile, `px-10` from `md` up.
Vertical rhythm between sections: `py-20` mobile, `py-28` from `md`.
Everything is left-aligned. Nothing is centred except the footer's bottom line.

Border radius is used sparingly and at two values only: `rounded-lg` (8px) on
buttons and inputs, `rounded-none` on everything else. Photographs are square-
cornered.

### Hero

```
┌────────────────────────────────────────────┐
│  Kettle & Crumb            menu hours find │  ← sticky nav, transparent
│                                            │
│                                            │
│  Kettle &                                  │  ← Instrument Serif, huge
│  Crumb                                     │
│                                            │
│  Slow coffee and warm bread, since 2019.   │
│  ● Open now — until 7 pm                   │  ← green dot, live
│                                            │
│  [ See the menu ]  Find us →               │
└────────────────────────────────────────────┘
     full-bleed photo, ink overlay at 55%
```

Full viewport height on desktop, `min-h-[85svh]` on mobile. The photo sits
behind an `--color-ink` overlay so text passes contrast. The open/closed
indicator is computed from `data/site.js` hours, not hard-coded — it is the most
useful fact a café can put on a screen and it earns the top of the page.

One motion moment on the whole site: the hero name and tagline fade up on load,
staggered by 80ms. No scroll-triggered animation anywhere else, no hover lift on
cards. Respect `prefers-reduced-motion`.

### Menu

Two columns from `md` up, one on mobile. Grouped by category, category name in
Instrument Serif above a hairline rule.

```
Coffee
────────────────────────────────────────────
Filter of the day ......................  ₹120
  Ethiopian, washed, notes of citrus

Cortado ................................  ₹140
  Double espresso cut with warm milk        [special]
```

Each row: name and price on one line separated by a dotted leader, description
on the line below in `--color-muted`. No card, no border, no shadow around
individual items — only the hairline under each row in `--color-line`.

The special badge is a small `--color-ochre` text label, not a pill, not a
coloured background.

### Opening hours

A seven-row list, day left, time right, hairline between rows. Today's row gets
a `--color-leaf` left border and slightly darker text. Closed days say "Closed",
not a dash.

### Location

Two columns from `md`: address, phone, email and directions link on the left;
the Google Maps iframe on the right at `aspect-[4/3]`, `border border-line`,
`loading="lazy"`. One column stacked on mobile, map second.

### Gallery

Six images, `grid-cols-2` on mobile, `grid-cols-3` from `md`. All `aspect-square`,
`object-cover`, `loading="lazy"`, real alt text describing the photo. No
lightbox, no hover overlay — the grid is the whole feature.

### Footer

`--color-ink` background, `--color-paper` text. Quick links, social links, the
address repeated, copyright line, and a back-to-top button at the right.

## Admin

The admin pages are plain and unstyled beyond shadcn defaults on a `--color-paper`
background. They are a tool, not a showpiece. Table of items, a dialog for
add/edit, a confirm dialog for delete, a toast on every success and failure.
Do not spend design effort here.

## Copy

Write the café's real words. No lorem ipsum, no placeholder text shipped.

- Buttons say what happens: "See the menu", "Save item", "Delete item",
  "Log out". Never "Submit", never "Click here", never a trailing arrow glyph in
  the label.
- Empty menu state: "No items yet. Add the first one from the admin panel."
- Failed login: "That password is not correct." Not "An error occurred."
- Toast after saving says "Item saved" — matching the button that caused it.

## Accessibility floor

Focus ring is a 2px `--color-leaf` outline with a 2px offset, visible on every
interactive element. All images have alt text. The map iframe has a `title`.
Contrast of body text on paper and paper on ink both clear 4.5:1. The mobile nav
toggle is a real `<button>` with `aria-expanded`.
