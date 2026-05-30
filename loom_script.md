# CampusIQ — Loom Video Speaking Script

Use this structured script as your guide while recording your walkthrough video. It has been aligned 100% with the technical architecture of your codebase.

---

## ⏱️ Section 1: Opening (0:00 - 0:30)
**Visual Focus**: Show the gorgeous landing page of your live site at **[college-discovery-alpha.vercel.app](https://college-discovery-alpha.vercel.app)**.

> "I built CampusIQ — a college discovery platform for Indian students to search, compare, and save colleges. I chose Track B, Full Stack role, and focused on 4 core features: listing directories with advanced search and filters, dedicated college detail routes, a side-by-side comparison matrix, and user authentication with a secured shortlist. Let me walk you through the codebase architecture."

---

## ⏱️ Section 2: Database Design (0:30 - 1:30)
**Visual Focus**: Open **[`prisma/schema.prisma`](file:///C:/Users/manye/.gemini/antigravity/scratch/college-discovery/college-discovery/prisma/schema.prisma)** in your IDE and point to the model definitions.

> "Our relational database schema is built around 6 core models. College is the central entity, maintaining one-to-many relationships with Courses, Placements, and Reviews. 
>
> If you look here at the SavedCollege model, it acts as a junction table between the User and College. I implemented a unique constraint directly at the database level on `userId` plus `collegeId` — this guarantees that a student can never save the same college twice, securing data integrity at the database layer rather than relying on application logic.
>
> Additionally, I made a deliberate engineering tradeoff: instead of normalizing recruiter names into a separate table, I stored top recruiters as a JSON string inside the Placement model. This keeps the schema lightweight and maximizes read-performance since our platform does not query colleges by individual recruiter profiles. If we needed to run analytics on recruiters in production later on, we could easily normalize it."

---

## ⏱️ Section 3: API Design (1:30 - 3:00)
**Visual Focus**: Open the search route **[`src/app/api/colleges/route.ts`](file:///C:/Users/manye/.gemini/antigravity/scratch/college-discovery/college-discovery/src/app/api/colleges/route.ts)** or the comparison route **[`src/app/api/compare/route.ts`](file:///C:/Users/manye/.gemini/antigravity/scratch/college-discovery/college-discovery/src/app/api/compare/route.ts)**.

> "All endpoints are designed as standard Next.js Route Handlers. The main colleges search API parses 6 distinct query filters and constructs a dynamic Prisma where clause. It handles pagination gracefully using skip/take parameters, returning both the matched dataset and the total count so the client-side pagination component can calculate pages dynamically.
>
> Moving to comparison, the compare API handles up to 3 college IDs. I enforce this check on the server side to protect our database against malicious request payloads. 
>
> Finally, our saved shortlist API enforces authentication: it validates the user session using next-auth and throws a clean 401 unauthenticated code rather than returning empty arrays, allowing our frontend to capture the state and redirect the user to login."

---

## ⏱️ Section 4: Frontend Architecture (3:00 - 4:30)
**Visual Focus**: Open the browser, go to **[`/colleges`](https://college-discovery-alpha.vercel.app/colleges)**, click on filters, and toggle the comparison bar.

> "For the frontend, I used a hybrid mix of React Server Components and Client Components. The explorer listing and detailed pages are Server Components. They query Prisma directly on the server, which gives us near-instant initial page loads and excellent SEO indexability.
>
> Interactive filters are Client Components that write directly to the URL search parameters. This design pattern ensures that filter combinations are fully bookmarkable and shareable, which is a superior UX pattern compared to local React state.
>
> For state persistence, the comparison bar uses a Zustand store connected to the localStorage persist middleware — ensuring a user's chosen colleges survive accidental tab closes or page reloads. The shortlisted colleges utilize React Query to handle background caching and clean cache invalidation. When you click to save a college, it instantly invalidates the saved colleges query keys, causing the grid to refetch and update optimistically."

---

## ⏱️ Section 5: A Decision I'd Change (4:30 - 5:00)
**Visual Focus**: Show the review alert box inside the browser or open **[`src/components/college/ReviewsSection.tsx`](file:///C:/Users/manye/.gemini/antigravity/scratch/college-discovery/college-discovery/src/components/college/ReviewsSection.tsx)**.

> "One engineering choice I'd do differently in the next iteration: our review index currently relies on verified seeded data. In a real-world product, I'd implement a secure POST API for review submission with rate-limiting constraints to enforce one review per user per college. I laid out the base database models for reviews, and left a deliberate placeholder in the ReviewsSection component to show this conscious scope boundary."

---

## ⏱️ Section 6: Closing (5:00 - 5:30)
**Visual Focus**: Show the live URL again and your GitHub repository.

> "The platform is fully compiled and deployed on Vercel, and handles database connections securely using environment variables. Total build time was about 3 days. I'm happy to go deeper on any specific part of the code or database architecture!"
