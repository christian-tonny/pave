# Pave

**Find the career path that fits you.**

Pave asks someone about their actual situation in Rwanda — their S4–S6 combination, what
people already come to them for, how much study they can commit to, whether they have a
laptop, where they can be for the next two years — and gives them back one path they can
start, with the opportunities to apply to, the schools that lead there, and what to do this
week.

Not a personality label. Not American salary averages. A next step.

---

## Links

- **Live prototype:** [opportunitymap.vercel.app](https://opportunitymap.vercel.app) *(deployed under the previous name)*
- **Repo:** [github.com/irachrist1/pave](https://github.com/irachrist1/pave)

Pave was previously called OpportunityMap, and before that Spark. Those are renames of the
same project, not separate products.

---

## The frozen MVP

Three things, and nothing else ships until they are good:

1. **Sign up with Clerk.**
2. **The onboarding interview** — twelve questions that find the path fitting *this* person,
   Rwanda-aware throughout.
3. **Results that can be acted on** — a fit summary, opportunities to apply to,
   universities and teaching institutions (when they are not in tertiary yet), and clear next
   steps on that path.

The wider idea is a marketplace — people find work worth their dedication, companies find
talent that means it, schools find students who chose them on purpose. The copy says so. Only
the person's side is built.

### Explicitly not in this MVP

Career simulations, mentor matching as the front door, a Dream Bar, curriculum GPS, the
company and university admin sides, and any personality label without a next step attached.
The existing careers library, assessments, mentor booking and dashboards are still in the
repo and still work — they are just no longer the front door.

---

## The three surfaces

| Route | What it is |
| --- | --- |
| `/` | The landing page. Brand first, one promise, one call to action into Clerk sign-up. No dashboard in the hero, no invented statistics. |
| `/interview` | The interview. One question per screen, answers saved as you go, single-select auto-advances, `1`–`9` and `Enter` work. |
| `/interview/results` | The path. Fit summary, why it fits, what pulls against it, the route on, schools, where to apply, and this week's steps. |

Signing up sends you to `/interview`; signing in as a student sends you to `/interview`,
which forwards to your results if you have already finished.

---

## How the interview works

Everything lives in `lib/pave/`:

| File | Responsibility |
| --- | --- |
| `types.ts` | The shared vocabulary: traits, stages, combinations, commitments, routes. |
| `interview.ts` | The thirteen questions (twelve are asked — one is conditional on your stage), and how answers fold into traits and facts. |
| `paths.ts` | Twelve career paths that exist in Rwanda today, each with a degree, diploma, short-course or on-the-job route. |
| `institutions.ts` | Rwandan programmes: University of Rwanda, the IPRC network, ALU, Kepler, AUCA, RICA, TTCs, iCPAR, RTB centres and others. |
| `opportunities.ts` | Where to apply: employers, placements, boards (JobInRwanda, the MIFOTRA portal), and funding. |
| `match.ts` | Scoring. Trait affinity against each path, then adjusted for combination, money, device access, place, motive and risk appetite. |
| `storage.ts` | Answers in `localStorage`, so a refresh or a walk to better signal never costs someone their interview. |

**Scoring, in one paragraph.** A path's score is mostly cosine similarity between what a
person is drawn to and what the path is made of. That is then moved by circumstance: does a
route exist for the study they can commit to, does the work exist where they can be, does the
path need a laptop they do not have, does their combination open the usual door. The
circumstance term saturates instead of accumulating without limit, so a well-fitting path
lands in the high eighties rather than everything piling against a ceiling. Penalties surface
in the UI as *Worth knowing* rather than being hidden.

**What is deliberately honest about it:** a TVET diploma or a certified trade is a real
answer, phone-only access rules some paths out and says so, and every path names the money it
starts at — in RWF, monthly, as a range.

---

## Running it

```bash
npm install
cp .env.local.example .env.local   # then fill in Clerk and Convex
npm run dev                        # http://localhost:3000
```

You need:

- a **Clerk** application (publishable key + secret key) for sign-up and sign-in
- a **Convex** deployment (`npx convex dev`) for the existing careers, assessment, mentor and
  dashboard features

The landing page, the interview and the results screen do not read from Convex. The interview
is answered and scored in the browser, so the core flow works before any data is seeded.

Checks:

```bash
npm run typecheck
npm run lint
npm run build
```

---

## Data honesty

`lib/pave/institutions.ts` and `lib/pave/opportunities.ts` are curated from public
information about real Rwandan institutions and organisations. Fees, intakes and openings
change constantly, so:

- tuition figures are indicative annual amounts in RWF, and `null` where quoting one would be
  misleading
- opportunities are employers, programmes and boards — not scraped postings
- the results screen and the footer both tell people to confirm with the institution
- **verify links, programme names and deadlines before a public launch**

---

## What is next

- Persist interviews and results to Convex per account, so a path follows someone across devices
- Institution and employer verification pass over the curated data
- The company and school sides of the marketplace
- Connect the results screen to the existing careers library and mentors where it genuinely helps

---

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind · Clerk · Convex · Resend

`rules.md` still applies: add rather than delete, and ask before removing working features.
