# Kettle & Crumb — Café Landing Page

A single-page website for an independent coffee shop, with a small
password-protected admin panel for managing the menu.

Mini project, Department of Computer Applications, MES College of Engineering,
Kuttippuram. Built by Kadheeja Naisha (MES25MCA-2029).

## What it does

The public page shows, on one scrollable screen: a hero with the café name and a
live open/closed indicator, the full menu with prices, the week's opening hours,
the address with an embedded map, and a photo gallery.

The owner opens `/admin`, enters a password, and can add menu items, edit names,
descriptions and prices, delete items, and mark an item as the daily special.
Changes appear on the public page immediately.

## Stack

Next.js 15 (App Router, JavaScript) · Tailwind CSS v4 · shadcn/ui · MongoDB Atlas

## Running it locally

You need Node 18.18 or newer and a free MongoDB Atlas cluster.

```bash
git clone <your-repo-url>
cd cafe-landing-page
npm install
```

Copy the environment template and fill in both values:

```bash
cp .env.example .env.local
```

```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/?retryWrites=true
ADMIN_PASSWORD=pick-something
```

Load the sample menu, then start the dev server:

```bash
node scripts/seed.js
npm run dev
```

Open http://localhost:3000 for the site and http://localhost:3000/admin for the
panel.

## Deploying

Push to GitHub, import the repo on Vercel, add `MONGODB_URI` and
`ADMIN_PASSWORD` as environment variables, and deploy. In Atlas, allow access
from anywhere (`0.0.0.0/0`) so Vercel's servers can connect.

## Project files for the AI agent

| File | Purpose |
| --- | --- |
| `BUILD_PROMPT.md` | The prompt used to start the build |
| `AGENTS.md` | Rules the agent follows on every task |
| `design.md` | Colours, type, layout and copy rules |
| `architecture.md` | Data model, API contract, auth flow |
| `tasks.md` | The seven build phases |

## A note on the admin password

Access control is one shared password compared against an environment variable,
stored afterwards in an httpOnly cookie. There is no hashing, no per-user
account and no rate limiting. That is a deliberate choice to keep the project
readable and within scope. A production site would need hashed credentials, real
sessions and login throttling.

## Methodology

Built following Agile Scrum. Requirements were written as user stories, and the
work was split into short sprints — roughly one section of the page per sprint,
reviewed with the product owner before the next began. `tasks.md` is the sprint
log.

Product owner: Nowshad CV, Assistant Professor, Department of Computer
Applications.
