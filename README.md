# CampusIQ — College Discovery Platform

A modern college discovery and comparison platform built with Next.js 14. Browse thousands of colleges, filter by criteria that matter to you, and compare institutions side by side to make informed decisions about your education.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js v5 |
| Client State | Zustand |
| Server State | React Query (TanStack Query) |
| Icons | Lucide React |

## Features

- **Search & Filter** — Full-text search with multi-faceted filters (location, fees, rating, course type) synced to URL params for shareable results.
- **College Profiles** — Rich detail pages with stats, placement data, top recruiters, and course information rendered as Server Components.
- **Side-by-Side Compare** — Add up to 4 colleges to a persistent compare tray and view them in a structured comparison table.
- **Responsive Design** — Fully responsive from mobile to desktop with skeleton loading states and error boundaries at every route.

## Architecture Decisions

### URL Search Params for Filters

All filter state on the colleges listing page lives in URL search params rather than client-side state. This means every filtered view is a unique, shareable URL. Server Components read the params directly, so filtered queries run on the server with zero client-side JS required for the initial render.

### Zustand for Compare State

The compare feature uses Zustand with `persist` middleware backed by `localStorage`. This keeps selected colleges available across page navigations without requiring authentication or a database round-trip. The store is intentionally decoupled from server state — it only holds college IDs and minimal display data.

### Server Components for Pages

Page-level components are React Server Components by default. Data fetching happens at the server boundary using Prisma directly, eliminating the need for API routes in most read paths. Client Components are pushed to the leaf nodes (interactive filters, compare buttons, tabs) to minimize the JS bundle.

### JSON String for Top Recruiters

The `topRecruiters` field on the College model is stored as a JSON string rather than a separate relation table. This is a deliberate trade-off: recruiter data is display-only, never queried independently, and varies wildly in structure across colleges. A JSON column avoids join overhead and keeps the schema simple for what is essentially embedded metadata.

## Local Setup

```bash
# Clone and install
git clone <repo-url>
cd college-discovery
npm install

# Set up environment
cp .env.local.example .env.local
# Edit .env.local with your database credentials

# Initialize database
npx prisma generate
npx prisma db push

# Seed sample data (if available)
npx prisma db seed

# Start development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Random string used to encrypt session tokens |
| `NEXTAUTH_URL` | Canonical URL of the deployment (e.g. `http://localhost:3000`) |

## What I'd Build Next

- **Saved Colleges** — Authenticated users can bookmark colleges and receive a personalized dashboard with saved searches.
- **College Reviews** — User-submitted reviews with ratings, verified student badges, and moderation tooling.
- **Admission Predictor** — A probability estimator based on historical cutoff data, exam scores, and category reservations.
- **Map View** — Geographic exploration with clustered markers, radius search, and campus boundary overlays using Mapbox GL.
- **Push Notifications** — Alerts for application deadline reminders, new reviews on saved colleges, and fee structure changes.
