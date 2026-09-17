# Design QA — Arcadia redevelopment

- Source visual truth: `/Users/shubhamingale/.codex/attachments/731070a0-6c89-494b-b82b-64313e9ed152/pasted-text.txt`
- Implementation: `http://localhost:4173/`
- Desktop screenshot: `arcadia-desktop.png`
- Content screenshot: `arcadia-content.png`
- Mobile screenshot: `arcadia-mobile.png`
- Updated transparent navbar screenshot: `hero-nav-transparent.png`
- Updated scrolled navbar screenshot: `navbar-scrolled.png`
- Final transparent navigation screenshot: `hero-nav-final.png`
- Second-section evidence: `trusted-second-section.png`
- Partner ticker evidence: `our-partners-ticker.png`
- Application carousel desktop evidence: `applications-carousel-final.png`
- Application carousel mobile evidence: `applications-carousel-mobile.png`
- Application reference comparison: `applications-comparison.png`
- Final container-alignment evidence: `applications-aligned-final.png`
- Vehicles mega-menu evidence: `vehicles-mega-menu.png`
- Vehicles hover-state evidence: `vehicles-mega-hover.png`
- Vehicles mobile accordion evidence: `vehicles-mega-mobile.png`
- Vehicles reference comparison: `vehicles-menu-comparison.png`
- Combined comparison evidence: `arcadia-comparison.png`
- Desktop viewport: 1440 × 1000 CSS px
- Mobile viewport: 390 × 844 CSS px
- State: initial hero with supplied background film constrained to seconds 4–19; transparent and scrolled navigation states tested.

## Reference comparison

The supplied reference is a written design system rather than a fixed page mockup. `arcadia-comparison.png` places its visualized tokens and rules beside the rendered homepage. The implementation follows the required Canopy, Mint Pulse, Cream Paper, sage-border, 16px-card, 8px-button, DM Sans, light-display-weight, flat/no-shadow system. The hero retains the supplied SAVYGREENTECH film because that is a durable project requirement.

## Findings

- P0: none.
- P1: none.
- P2: none after responsive QA.
- P3: the hero uses real video rather than Arcadia's default gradient-only hero. This is intentional and preserves the client's explicit background-film requirement; the Arcadia system is carried by the evergreen overlay, navigation, typography, mint primary action, and every following surface.

## Functional and accessibility checks

- Background film begins at 4 seconds and resets at 19 seconds. A timed browser test measured 4.35 seconds immediately after one full 15-second segment, confirming the loop.
- The hero video fills its viewport with `object-fit: cover`.
- The navbar is transparent with white text over the hero and becomes white with dark text after scrolling.
- The transparent navbar has no bottom border. Verified computed `border-bottom-style: none`.
- Navigation order verified as About, Applications, Vehicles, Technology, Contact, and the discussion CTA.
- `Our Partners` is verified as the second direct section after the hero.
- The second section is now titled `Our Partners` and contains a continuous ticker built from 21 unique locally served WebP logos. Both repeated groups render without broken images; the duplicate group is hidden from assistive technology.
- The ticker pauses on hover/focus and disables animation for reduced-motion users.
- The Applications section matches the supplied reference anatomy: centered heading and introduction, horizontal photographic cards, square crops, title and supporting copy below, partial next-card visibility, and circular arrow controls.
- All eight card descriptions come directly from the published SAVYGREENTECH Projects page. Images use the closest relevant real SAVYGREENTECH vehicle photographs available in the project.
- Desktop and mobile Next controls advance the carousel; touch/trackpad scrolling uses scroll snapping. Desktop advanced from scroll position 120 to 468 and mobile from 16 to 352 in browser tests.
- The mobile layout presents one primary card plus a visible preview of the next card, with no page-level horizontal overflow.
- The first application card now aligns exactly with the shared section container. Browser measurement: card left `112.5px`, container left `112.5px`, difference `0px`, initial carousel scroll position `0`.
- Vehicles opens a full-width dark mega-menu with the six published product models and real thumbnails. Club Cart hover verification shows the reference-matched bordered surface and revealed arrow.
- The menu works on desktop hover/click, supports Escape and focus transitions, exposes `aria-expanded`, and becomes a tappable accordion inside the mobile navigation.
- Desktop and mobile open states were verified with no browser console warnings or errors.
- The hero title is constrained to a 950px maximum width.
- Pause and play controls work and have accessible labels.
- Mobile menu opens, closes, and its Vehicles link reaches `#vehicles`.
- Desktop and mobile screenshots show no overlap, clipping, or unusable controls.
- Semantic headings, alt text, keyboard-focusable controls, and reduced-motion fallback are present.
- Browser console: no warnings or errors.
- Production build: passed.
- Sites packaging tests: passed.

## Comparison history

1. Desktop design-system pass: palette, typography, radii, borders, spacing, and CTA hierarchy match the supplied reference; no P0/P1/P2 issue found.
2. Mobile pass at 390 × 844: navigation collapses correctly, primary actions become full-width, headline remains readable, and film controls remain reachable.

final result: passed

---

# Design QA — About purpose editorial layout (2026-09-11)

- Source visual truth: `/var/folders/v9/p8jy6m854s70xj2d6fmpj1dr0000gn/T/TemporaryItems/NSIRD_screencaptureui_td9oYx/Screenshot 2026-09-11 at 12.12.05.png`
- Source dimensions: 1968 × 1286 px; client-normalized display 1952 × 1275 px.
- Implementation: `http://127.0.0.1:5173/about#focus-title`
- Implementation screenshot: Codex in-app browser capture for this task; the browser API did not expose a filesystem path.
- Viewport: 1265 × 710 CSS px at device scale factor 1.
- State: desktop, first and second purpose rows captured in their default state.

## Comparison evidence

- The reference and rendered implementation were visually compared at the content-region level. The reference is a directional layout target, so the existing SAVYGREENTECH type system and approved copy were intentionally preserved.
- Row 1 visibly confirms text-left/image-right. Row 2 visibly confirms image-left/text-right. Runtime geometry confirms row 3 returns to text-left/image-right.
- All three image assets loaded successfully at useful source resolution.

## Findings

- No actionable P0/P1/P2 differences remain.
- Typography: current SAVYGREENTECH family, weights, and hierarchy remain consistent with the homepage.
- Spacing/layout: equal grid tracks, generous whitespace, subtle dividers, 16px image radii, and the requested alternating rhythm are present.
- Colors: white background, black headings, slate copy, and electric-blue bullets remain within the approved palette.
- Image quality: the three generic sustainability images were replaced with real SAVYGREENTECH vehicles in an Indian resort, industrial, and road context.
- Copy: all approved purpose titles, descriptions, and supporting points remain unchanged.

## Comparison history

1. Earlier implementation repeated text-left/image-right and used generic imagery.
2. Fixed by alternating the even row and replacing all three assets with India-relevant SAVYGREENTECH vehicle photography.
3. Post-fix evidence confirms the requested text/image, image/text, text/image pattern and complete image loading.

## Implementation checklist

- [x] Three alternating editorial rows
- [x] India-relevant SAVYGREENTECH imagery
- [x] Existing content and motion preserved
- [x] Responsive single-column fallback
- [x] Production build completed

final result: passed

---

# Design QA — Homepage vehicle Bento update (2026-09-10)

- Source visual truth: `https://www.mercedes-benz.co.in/passengercars.html`, “Our Recommendations” card treatment.
- Implementation: `http://127.0.0.1:4174/#vehicles`, captured in Codex In-app Browser tab 2.
- Viewport: 470 × 729 CSS px in the available In-app Browser surface; desktop grid geometry was also validated from computed grid tracks.
- Source pixels / density: In-app Browser capture; source rendered in its available narrow responsive state. No density normalization was needed for the focused card-anatomy comparison.
- Implementation screenshot: browser-rendered inline capture from tab 2; the CUA surface does not expose a filesystem path.
- State: scrolled white header, vehicle grid at rest; Applications vertical wheel gesture tested with the pointer over the rail.

## Full-view and focused comparison evidence

The implementation carries over the source’s image-led dark card anatomy, bottom readability treatment, rounded media boundary, concise hierarchy, and compact action while retaining SAVYGREENTECH typography and accents. Both card regions were opened and captured in the In-app Browser. A combined data-URL comparison board was blocked by browser URL security policy, so the two visible captures were compared directly. Image crop, gradient, type hierarchy, action, radius, and clipping were readable in both.

## Findings

- No remaining P0/P1/P2 visual issues in the requested vehicle section.
- P3: supplied vehicle photography varies in lighting and includes existing branding marks; accepted because the project requires real SAVYGREENTECH assets.

## Required fidelity surfaces

- Typography: existing Outfit hierarchy retained; white titles and restrained supporting copy stay readable.
- Spacing/layout: 20px gutters, 16px radii, 2 / 3 / 2 desktop structure, and consistent lower copy zones.
- Colors/tokens: alternate surface is `#e7e7e7`; dark image gradient and electric-blue/mint accents retained.
- Image quality: real vehicle assets remain full-cover and clipped; no drawn substitutes introduced.
- Copy/content: six published descriptions retained; seventh card is explicitly Coming Soon/In development.

## Interaction and runtime checks

- Image zoom remains clipped by the card radius.
- Vertical scrolling over Applications advanced the document from `scrollY 2928.5` to `6591`; mandatory rail snapping is removed.
- Production build passed; Sites worker suite passed 4/4.
- Console had no runtime errors; the stale missing `.video-toggle` GSAP target was removed.

## Comparison history

1. P1 found: the first render overlapped rows because legacy `grid-auto-rows: 300px` remained active under new minimum heights.
2. Fix: changed the grid to content-sized automatic rows.
3. Post-fix evidence: seven cards occupy separate rows in the intended 2 / 3 / 2 structure with no overlap.

final result: passed

## About page homepage-system alignment — 2026-09-08

- Replaced the About-only static editorial hero and 104px type scale with the homepage's full-height video hero, overlay, delayed video reveal, bottom-left composition, and 78px maximum heading scale.
- Standardized About headings to the homepage's centered 56px section pattern, body copy to 18px, card titles to 22px, 16px corners, and the established 80px top / 96px bottom section rhythm.
- Reordered the page to Story, Impact, Partners, Team, Purpose, and Start a Conversation so the visual cadence alternates Porcelain, Midnight, Porcelain, Eucalyptus Mist, Porcelain, and Midnight.
- Preserved the approved four-person leadership row, supplied portraits and LinkedIn links, homepage partner ticker, metrics, conversion section, and footer.
- Desktop render inspection confirmed consistent hierarchy, container alignment, balanced team and purpose cards, and no horizontal overflow. Browser console contains no warnings or errors.
- TypeScript validation, production build, and Sites packaging tests pass.

final result: passed

## About page — 2026-09-08

- Latest refinement: the supplied About video replaces the homepage hero film on this route. Story and Team heading copy is simplified, and the Purpose area now follows the supplied flat editorial reference with three divider-separated copy/image rows and no enclosing cards.

- Content source: `https://www.savygreentech.com/about`
- Visual source: the approved current homepage at `http://127.0.0.1:4174/`, including its navigation, palette, typography, cards, Impact, Partners, conversion section, and footer.
- New route: `http://127.0.0.1:4174/about`
- The page introduces SAVYGREENTECH with a dark, image-backed brand hero; an editorial company story; three published company-focus cards; the existing Impact section; a four-person leadership grid; Partners; and the existing conversion/footer sequence.
- Source content was condensed for scanning without changing the published roles, claims, audiences, or capabilities.
- Visual comparison confirmed the About route uses the same container width, Noto Sans hierarchy, Midnight/Deep Teal foundation, Lime and Electric Blue accents, light-green section surface, 16px cards, hairline borders, pill CTAs, and restrained scroll motion as the homepage.
- Desktop inspection confirmed readable hierarchy, balanced cards, intact logo ticker, working navigation targets, and no visible horizontal overflow or broken imagery.
- Production build, TypeScript validation, and Sites packaging tests pass.

final result: passed

## In The News sticky-column refinement — 2026-09-08

- The section now contains seven factual EV stories.
- Every image uses the same 18:9 ratio and every story title uses one consistent size.
- The featured story sticks beneath the header while the six-story, two-column right grid scrolls to the section boundary.
- The sticky behavior remains section-scoped and releases before the contact section.

final result: passed

## In The News editorial iteration — 2026-09-08

- Source visual: `/var/folders/v9/p8jy6m854s70xj2d6fmpj1dr0000gn/T/TemporaryItems/NSIRD_screencaptureui_j9Ckh1/Screenshot 2026-09-08 at 17.09.45.png`
- Scope: new homepage section directly below Process.
- The layout follows the reference hierarchy with one large lead story and four supporting stories arranged as a two-row editorial mosaic.
- All five stories use real EV imagery and factual India-focused titles and summaries linked to the corresponding source.
- Cards remain flat and borderless, with generous whitespace, restrained image zoom, 16px image corners, and the established electric-blue text-action treatment.
- GSAP applies the existing staggered card entrance pattern and reduced-motion behavior remains unchanged.

final result: passed

## Vehicles editorial-card iteration — 2026-09-08

- Source visual: `/var/folders/v9/p8jy6m854s70xj2d6fmpj1dr0000gn/T/TemporaryItems/NSIRD_screencaptureui_wWSJZl/Screenshot 2026-09-08 at 16.28.10.png`
- Scope: homepage Vehicles section only; desktop-first implementation.
- The section retains the approved three-column grid and supplied SAVYGREENTECH vehicle photography.
- Each card now follows the reference hierarchy: wide image, title, concise description, then uppercase text-style Explore action with directional arrow.
- Descriptions use only the already documented published vehicle purposes and are clamped to two lines.
- Cards remain flat and editorial with no enclosing surface, overlay, or shadow; image corners and spacing follow the existing brand system.
- The Explore action has a visible hover/focus arrow movement and routes internally to the contact conversion point.
- Rendered inspection confirmed aligned columns, consistent image height, two-line copy behavior, and clear separation from the following Applications section.
- Production build, TypeScript validation, and Sites packaging tests pass.

final result: passed
