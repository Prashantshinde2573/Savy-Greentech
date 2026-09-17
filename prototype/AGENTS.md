# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## SAVYGREENTECH prototype decisions

- The neutral alternate section surface is Grey `#e7e7e7` across the current site; it replaces the previous cream/light-green surface token.
- The current homepage Vehicles range uses seven image-led Bento cards on a three-column desktop grid: row one is 2/3 + 1/3, row two is three equal cards, and row three is 1/3 + 2/3. Every card has a 440px minimum height. Existing six vehicles retain their published descriptions and conversion actions; the seventh is a clearly marked Coming Soon development card. Cards use a prominent black lower gradient with dedicated copy space, white text, 16px radii, and restrained clipped image zoom.
- The Applications carousel must never capture vertical mouse-wheel or trackpad scrolling. Keep vertical page scrolling native while preserving horizontal drag/controls; do not restore mandatory scroll snapping.

- The About page uses the client-supplied `/assets/about-hero.mp4` as its dedicated full-cover hero background. Its Story heading has no eyebrow; Team uses `Our Team` with `The people powering our progress.` as the description; and `Electric mobility with a clear purpose.` is a flat three-row editorial layout without dividers, alternating text/image, image/text, text/image and using India-specific Savy EV imagery rather than generic sustainability photography. Purpose rows use compact 36px vertical padding on desktop and 28px on mobile.
- The About page must use the homepage as its direct visual system: the same full-height video hero anatomy and 78px maximum hero title scale, centered 56px section headings, 18px body copy, 80px/96px section rhythm, 16px card radii, and alternating Porcelain, Midnight, and Eucalyptus Mist surfaces. Its content order is Story, Impact, Partners, Team, Purpose, then Start a Conversation.
- `/about` extends the approved homepage design system. It uses the published SAVYGREENTECH About-page story, focus pillars, and four-person leadership content, followed by the homepage Impact, Partners, Start a Conversation, and footer treatments. The page is designed to establish company credibility and move prospects toward contact.
- About leadership cards use supplied real portraits and LinkedIn links for Chandan Mundhra and Dhawal Soni. Lokendra Agarwal and Jitendra Adhyaru temporarily use neutral professional placeholder portraits until approved photography is supplied.
- The About leadership section uses a single four-column editorial row on desktop: equal square portraits with 16px corners, followed only by the person’s name and role. It has no enclosing card surface, border, description, or numbering.
- The video-backed contact conversion section has a minimum height of 70vh with its complete text and CTA group centered horizontally and vertically.
- The Process section uses a horizontal four-step timeline with connected numbered circles; each step places its title and description below the number. On first entering the viewport, the electric-blue connector grows from the initially solid first circle and fills each subsequent circle as it reaches it. It has no CTA or imagery, and reduced-motion mode shows the completed state immediately.
- Vehicle card descriptions are collapsed and invisible by default. Hovering a card, or focusing a control within it, expands and fades in the two-line description without changing the card or grid height; leaving reverses the transition.
- The first two homepage news stories are the 2021 Savë–ADS Foundation EV-skills partnership and the February 2026 Industrial Product Monitor premium electric-mobility feature, in that order.
- News imagery must directly correspond to its story. News 1 uses the supplied ADS Foundation signing photograph and News 2 uses the supplied Savy vehicle-lineup image; the remaining cards retain their story-specific publication or event images.
- On the About page, the hero and story form one cinematic scroll sequence: the full-height hero video stays sticky, its headline fades fully within the first 25% of the story's upward entrance, and the video progressively blurs and darkens while the background-free, two-column story section scrolls over it. The story heading is “The Indian Custom EV Manufacturer”. Mobile and reduced-motion modes use normal document flow.
- Homepage CTA buttons use a 100px pill radius at rest and transition to an 8px radius on hover or keyboard focus.
- `In The News` sits directly after `Our process` and uses a flat editorial layout: one sticky lead story on the left while seven supporting stories scroll in a two-column grid on the right. All eight cards cover verified positive SAVYGREENTECH/Savy Electric features, use each linked publication's own locally stored image, title and source-grounded summary, and link back to the respective publication.

- The `Start a conversation` contact section uses `/assets/hero.mp4` as its muted, looping, full-cover background on the homepage and About page. A dark green overlay must preserve text contrast and finish in Midnight Canopy `#071C1B` at the bottom so it blends seamlessly into the footer.

- Latest Vehicles section card anatomy: three-column editorial grid with real vehicle image clipped inside a 16px-radius media frame, title, a maximum two-line published Products-page description, and an electric-blue text-style `Explore now` action. On hover the image zoom remains clipped, the action turns black, and its arrow rotates 45 degrees. This replaces the earlier image-only overlay cards on the homepage; the Vehicles mega-menu remains unchanged.

- Latest hero video is the user-supplied hero-bg.mov, converted to /assets/hero-bg.mp4. Loop the full clip, muted and full-cover; retain the canopy fade-in and overlay. This replaces the golf-cart video and its 4–19 second trim.

- Latest hero layout: left-aligned copy at the bottom of the standard container, 72px bottom padding, white eyebrow, and no visible video pause CTA. This supersedes the earlier centered hero direction.

- The hero uses `SAVe_3_5_AE.mp4` as a full-bleed background video, never as a visible link, thumbnail, or player.
- Play and loop only the 4–19 second segment of the hero video.
- The navbar overlays the hero transparently with white text, then becomes white with dark text after scrolling.
- Keep the hero video full-cover and constrain the hero title to a 1000px maximum width on desktop.
- Transparent navbar has no bottom border. Link order is About, Applications, Vehicles, Technology, Contact, then the discussion CTA.
- `Our Partners` is the second homepage section, directly after the hero, using the supplied sponsor logos in a continuous ticker carousel.
- Applications use a horizontally scrollable photographic card carousel matching the supplied reference; imagery must clearly relate to each application title.
- The first Applications card must align exactly with the standard page container gutter while the right edge remains open for the next-card preview.
- Vehicles uses a white desktop mega-menu with four columns and all six vehicles. Image-led cards follow the brand system: 16px corners, sage hairline borders, title-case Noto Sans names below images, and cream/Canopy hover feedback without shadows. The header stays white while open.
- Use the real SAVYGREENTECH vehicle photographs from the live Products page; do not generate substitute vehicle imagery.
- Use only content published on savygreentech.com or explicitly supplied by the client. Do not invent case studies, statistics, payloads, certifications, warranties, testimonials, or clients.
- Brand name is `SAVYGREENTECH`; use the supplied circular green-to-cyan lightning logo.
- Follow the supplied Arcadia visual system: DM Sans, warm cream and flat-white surfaces, Canopy `#104336`, Mint Pulse `#0fff87`, sage hairline borders, 16px cards, 8px buttons, and no shadows.
- The Vehicles homepage section uses a desktop-first asymmetric six-image gallery. Each tile shows only the vehicle name over the image; specifications, descriptions, and per-card text links are omitted.
- The homepage hero uses `/assets/golf-cart.mp4` as its full-cover background video and retains the 4–19 second loop.
- Opening the desktop Vehicles mega menu switches both the menu and fixed header to a white background with dark text.
- Homepage interactions must not link to `https://www.savygreentech.com`; use internal section targets or direct contact actions instead.
- GSAP animates the About metrics once when the row reaches 82% of the viewport: Established counts down from 2026 to 2014, and the remaining metrics count from zero to their displayed totals over 1.6 seconds.
- The desktop homepage uses an Arcadia-inspired motion system: staggered hero copy on load, 30px scroll reveals for section text, 36px staggered card entrances, `power4.out` easing, and restrained brightness hover feedback. Motion is skipped when reduced motion is requested.
- Browser metadata uses `/assets/logo.jpeg` for the favicon and `Savy GreenTech` as the document title.
- Homepage section order places Vehicles before Applications. Backgrounds alternate across adjacent sections: Partners white, About cream, Vehicles white, Applications cream, then Engineering wash.
- The footer uses the brand green background and follows this order: practical information grid, full `SAVYGREENTECH` golf-video text mask with both edge letters visible and no top margin, then the copyright row.
- The masked footer wordmark uses a tightly cropped vertical canvas and fills the viewport width with 24px clearance on both sides.
- Desktop content sections use 96px top and bottom padding. The Applications carousel has only right-aligned arrow controls and no text CTA.
- Homepage conversion CTAs use the label `Get in Touch`. The hero content is centered and does not include the supporting sentence beneath its title. All section titles use weight 500, and `Our Partners` is presented as a section title rather than an eyebrow.
- Use Noto Sans for site UI typography. Partner logos remain monochrome, including on hover, and the ticker does not pause on hover or focus. Preserve reduced-motion behavior.
- The hero has only the `Explore Our Vehicles` CTA, with a dark green video overlay for readable centered text. Keep `Get in Touch` in the navigation and contact section only.
- Partner logos sit centered inside equal 220px square, subtly tinted boxes with 24px rounded corners. Preserve each logo's proportions within a consistent image area.
- About is a cards-only four-stat section: no heading, introduction, or CTA. Use the supplied `stat1.webp` background, large white counters at the top and white sentence-case labels below, with 24px rounded corners. Retain the existing counter animations and values.
- Latest stats are 500+ Vehicles Deployed, 2 Lakh+ Tons of CO₂ Saved, 100+ Satisfied Clients, and 10+ States Covered, in that order; all count from zero. Stats now precede Partners on white with 200px minimum-height cards. Partners uses a cream background, white boxes, and full-color logos.
- Omit the standalone Technology cards section ("Designed for Indian conditions."). Keep Custom Engineering and its `#technology` navigation target.
