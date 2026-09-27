# Strike Homepage Clone + Sale Experience

A recreation of the [Strike](https://strikes.in/) homepage with a sale offer built *into* the
page as a discoverable feature, instead of a banner, popup, or modal that appears on load.

## Setup

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into /dist
npm run preview  # preview the production build
```

Requires Node 18+.

### Demo mode (for recording the submission video)

The real countdown is a genuine 24-hour timer, which is correct for production but impossible to
show finishing inside a demo video. Opening the site with a `?demoDuration=` query param
compresses the same logic into a few seconds, without touching a real visitor's saved timer:

```
http://localhost:5173/?demoDuration=45   # this tab's offer now expires in 45 seconds
```

- It uses its own `localStorage` key, so a real visitor's actual 24h countdown is never affected.
- Refreshing during a demo still respects the compressed countdown (same persistence rule as the
  real one) — it doesn't reset it. If you want a clean re-take, use the **restart countdown**
  control that appears inside the modal only in this mode.
- Remove the query param (or just don't add it) for the real 24-hour experience.

## The idea

Strike is a coding-practice platform aimed at people who like solving things themselves rather
than being handed an answer — the whole homepage narrative is "we don't spoon-feed you, we build
your ability to think." A discount banner slapped on top of that page would contradict its own
pitch. So the sale needed to be something a student *discovers* and half-solves, not something
pushed at them.

Two things carry the offer, both grown out of homepage content that's already there instead of
new decoration bolted on top:

1. **The "why do students actually quit" section** (the honest, non-preachy motivation graph +
   "typical course vs. this course" comparison) ends by directly asking the reader a question —
   *"curious what happens if something actually catches that spike this time?"* — and points them
   at a floating wrench icon that's been pulsing quietly on the page the whole time.
2. **The wrench icon** is themed as a dev-tool "update available" indicator (pulsing ring, green
   dot), matching Strike's coder-audience visual language. Clicking it runs a two-second fake
   terminal install (`strike --check-updates` → patch found → applying...) before revealing the
   offer — a small, on-brand moment of curiosity instead of an instant popup.

Once revealed, the offer behaves like a real flash sale rather than a static graphic: it clearly
states the discount and the course it applies to, gives a copyable code, shows a live countdown,
and — to actually make it *sell* instead of just *display* — a "codes claimed today" counter that
fills in as people redeem, borrowing the same honest-scarcity idea real checkout flows use
(a visible cap + a live count), without a fake "437 people are viewing this" number that isn't
real. If the user closes it, the wrench keeps pulsing so they can reopen it anytime before it
expires; once time is up, it flips to a plainly "expired" state — the code struck through,
uncopyable — because a sale that never actually ends isn't urgent.

Right where the "not another walkthrough" section makes its curiosity pitch, a second interactive
piece (`AIJobsSection.jsx`) makes the stakes concrete: three character personas — "copies the
steps," "asks why it works," "builds real, messy things" — that a visitor can click through, each
paired with an honest verdict on whether that habit is something AI already does as well (the
"stuck" persona) or something it can't touch (the two curious/building personas). A small robot
mascot next to the heading reacts (glows red vs. green) to whichever persona is selected, tying
the whole thing back to "this is why the curiosity-first approach in the course matters" instead
of just asserting it in a sentence. Every character here is drawn as SVG in the same hand-coded
mascot style already used elsewhere on the page (see *Technical approach*) rather than pulled from
a stock-image CDN, so the cast stays visually consistent with the rest of the site.

## User flow

`Scroll through "why students quit" section` → `Read the direct question + hint about the wrench
icon` → `Notice the wrench has been pulsing this whole time` → `Click it` → `Watch a 2-second
terminal "patch install" animation (curiosity beat)` → `Offer revealed: discount, course, code,
countdown, and a live "claimed today" counter` → `Copy code (counter ticks up, "copied" confirms)`
→ `Close anytime, reopen anytime — wrench keeps pulsing while still active` → `Timer keeps
running in the background, persisted, even after a refresh or closing the tab` → `Once it hits
zero: automatically flips to an expired, non-copyable state, on next open or already-open modal`.

## Feature checklist

- [x] Homepage recreated: navbar, hero, code-editor mock, "Why Choose Us", "Not another
      walkthrough" section, motivation/learning-journey narrative, mentors, reviews marquee, FAQ
      accordion, footer, and a secondary "collaboration" tab
- [x] "Will AI take your job?" interactive persona picker — reinforces the curiosity narrative
      right where it's introduced (see *The idea* below)
- [x] "One student, two versions" — a 3-stage before/after mini-story (confused → takes a course
      → curious problem-solver) with its own mascot per stage
- [x] Mentor cards point at real photo slots (`/img/inst1.png`, `/img/inst2.png` — see
      `public/img/README.md`) with an automatic fallback to a drawn mascot avatar if a photo is
      missing or fails to load, so the card never shows a broken-image icon. Hovering/tapping a
      card reveals that mentor's org + bio; hovering/tapping the section title itself crossfades
      "Meet With Our Mentors" into "Your Guru Ji"
- [x] The "Courses" nav tab is a real, populated course grid (not a stub), each card with its own
      demo purchase flow (see below) — the other nav tabs (Practice, CodeArena, Quiz, System
      Design, Contests) intentionally stay as an honest "still being built" state, matching the
      homepage's own "no filler modules" message
- [x] Every graph (the decline curve, the recovery curve, and the "our course vs. a typical
      course" comparison) has a small rider icon that walks the actual curve — using real SVG arc
      length, not a straight-line timeline, so it paces with the shape of the line — and its
      mood/caption changes across the journey (junoon → doubt → drifting, or confused → revising
      → bought in). The static point-markers on both graphs also reveal their own caption on
      hover/tap, so every icon on these graphs — moving or still — explains itself
- [x] Demo purchase flow, twice over: the homepage course card, and every card on the Courses
      grid. Each is independently purchasable, persists via `localStorage`, and completing one
      shows a shared "Thanks for your trust" confirmation popup. The homepage card also links
      straight through to the full Courses grid ("Explore more courses →")
- [x] The STRIKE40 coupon is wired to the one course it's actually described as applying to (DSA
      + Gen AI): once the code has been copied from the sale modal, that course's card on the
      Courses page shows the discounted price live (original struck through), instead of the
      discount being a number that only ever exists inside the modal
- [x] Offer clearly states the discount (40%) and the exact product it applies to (DSA + Gen AI
      course)
- [x] Coupon code provided (`STRIKE40`), shown in a copyable, monospaced field
- [x] Live countdown timer (hours/minutes/seconds), ticking every second
- [x] Refreshing does not reset the countdown — persisted via a fixed `expiresAt` timestamp in
      `localStorage`, not a relative counter that restarts
- [x] One-click copy to clipboard, with inline "Copied!" feedback and a graceful fallback if the
      Clipboard API is unavailable
- [x] Dismiss/close control (✕ button and click-outside-to-close)
- [x] Expired state: code shown struck-through and uncopyable; re-opening after expiry always
      shows "expired," never the offer
- [x] Responsive: modal, wrench trigger, and every homepage section adapt down to mobile widths
- [x] Motion is intentionally minimal and cheap: a couple of SVG stroke/opacity/transform
      animations and one reveal sequence — no scroll-triggered animation spam, and everything
      respects `prefers-reduced-motion`
- [x] "Codes claimed today" scarcity counter, stable per calendar day and incremented locally on
      redemption (see *Known limitations* for what this is and isn't)
- [x] `?demoDuration=` override so the full countdown → expiry → "no longer redeemable" flow can
      be shown inside a short demo recording without waiting 24 real hours

## Technical approach

- **Stack**: React 18 + Vite + Tailwind CSS. No backend — this is a front-end-only
  implementation, since the task asks for a coupon/offer *experience*, not real checkout
  processing.
- **Persistence**: `useSaleTimer` (in `src/hooks/useSaleTimer.js`) stores a single
  `{ expiresAt, redeemed }` object in `localStorage`. `expiresAt` is an absolute timestamp set
  once on first visit, so a refresh recomputes "time left" against that same fixed target instead
  of restarting the countdown — this is what satisfies the "refresh should not reset the
  countdown" requirement.
- **Expiry**: derived, not stored — every render compares `Date.now()` against `expiresAt`, so
  there's no separate "expired" flag that can fall out of sync with the actual time left.
- **Demo override**: the same hook reads an optional `?demoDuration=<seconds>` query param. When
  present, it swaps in a shorter duration and a *separate* `localStorage` key
  (`strike_sale_v2_demo`), so a demo link can never overwrite or corrupt a real visitor's saved
  24-hour countdown. A `resetDemo()` escape hatch (only exposed in demo mode) lets a re-take
  restart the compressed timer.
- **Scarcity counter**: seeded deterministically from the calendar date (not `Math.random()`, so
  it doesn't jump around on every reload), stored alongside a `claimedByMe` flag so a single
  browser only ever increments the shared count once, on its own redemption.
- **Highlight component**: `src/components/Highlight.jsx` is a small reusable `<mark>` wrapper
  (soft green background chip, not just colored text) used anywhere a phrase needs to visually
  stand out inside a paragraph — colored text alone tended to disappear on this page since green
  is already the accent color for borders, icons, and buttons everywhere else.
- **Component split**: `WrenchTrigger` (the hint) and `SaleModal` (the reveal + offer + expired
  view), under `src/components/sale/`, are isolated from the homepage sections, so the sale logic
  can be lifted out or reused elsewhere without touching the clone itself.
- **Graphs**: `src/lib/smoothPath.js` turns hand-authored point arrays into rounded SVG paths
  (used by the motivation/learning-journey sections) instead of pulling in a charting library for
  what are really just two illustrative lines.
- **Illustration style**: every character on the page (the learning-journey mascot, the surprise
  reveal mascot, the three personas + robot in `AIJobsSection.jsx`, the mentor avatars, and the
  before/after student in `StudentJourney.jsx`) is the same small, hand-coded SVG language — a
  circle head, two dot eyes, one mouth path, reused with different strokes/accessories per
  character — rather than raster images from a CDN or a generator, so everything stays visually
  consistent and stays inside this single front-end build.

## Known limitations

- The coupon code is static and cosmetic — there's no real checkout/payment integration, since
  none was in scope. Every "Purchase" button (homepage demo card and every Courses-page card) is
  the same: a local, demo-only flow — it writes a flag to `localStorage` and shows a confirmation
  popup, no real payment is taken anywhere on the site.
- The "codes claimed today" number is a **local, honest-feeling scarcity cue, not a real shared
  counter** — it's seeded per calendar date and only increases when *this* browser redeems. It is
  not synced across visitors or backed by a server, because there's no backend in this build. In a
  real product this would come from an actual redemptions API.
- Countdown duration (24 hours) and the demo override are both handled client-side in
  `useSaleTimer.js`; in a real product the campaign end time would come from a backend-configured
  value instead of being set on first visit in the browser.
- Homepage sections are visually recreated but not functionally wired beyond the sale experience
  (nav links don't route to real pages) — only the homepage + sale experience were in scope.
- No automated tests were added given the scope/timeline of the assignment.
- Only the "Courses" nav tab is fully built out; the remaining tabs (Practice, CodeArena, Quiz,
  System Design, Contests) intentionally show an honest placeholder rather than filler content —
  building each of those out properly was out of scope for this task's timeline.
