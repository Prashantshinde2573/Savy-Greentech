# SAVYGREENTECH Homepage Design Direction

## Status

Selected structural direction: Lo-fi option 1, **Solution-Led Journey**.

Design reference: https://zeromesh.framer.website/

This document defines the homepage design system and content rules before implementation.

## Primary objective

Within the first screen, a visitor must understand that SAVYGREENTECH designs and manufactures custom electric vehicles for business, institutional and operational requirements.

The page should guide the visitor through:

**What SAVYGREENTECH builds → where the vehicles are used → available vehicles → customization and technology → company proof → consultation.**

## Content-source rule

Use only information currently published on savygreentech.com or explicitly supplied by the client.

Do not invent or infer:

- Case-study outcomes
- Cost or fuel savings
- Payload capacities
- Seating capacities not published on the website
- Certifications or regulatory approvals, except the published Tuk Tuk ë 4+1 on-road approval
- Warranty duration
- Manufacturing capacity
- Delivery timelines
- Customer testimonials
- Client relationships that cannot be confirmed
- Technical specifications beyond the published vehicle data

If a required fact is unavailable, omit it or use a neutral label such as **Custom configurations available**.

Keep copy concise. Avoid generic phrases when a factual statement is available.

## Brand

- Brand name: **SAVYGREENTECH**
- Logo: https://www.savygreentech.com/images/main-icon.jpeg
- Primary spelling in headings and navigation: **SAVYGREENTECH**
- Legal/company spelling where required: **Savy Greentech Pvt. Ltd.**
- Core proposition: **Custom Electric Vehicles Built Around Your Requirements**
- Established: **2014**

## Reference-site interpretation

Borrow the following principles from ZeroMesh:

- Cinematic full-screen opening media
- Dark, confident first impression
- Large editorial typography
- Short copy blocks rather than dense card grids
- Strong black/white section contrast
- Large horizontal image and video areas
- Restrained accent color
- Simple text-link CTAs with arrows
- Alternating editorial layouts instead of repetitive component cards
- Generous vertical rhythm

Do not copy ZeroMesh branding, cybersecurity imagery, wording, red accent system or exact layouts.

## Visual system

### Color

- Midnight Canopy: `#071C1B` — hero overlays, footer and high-contrast corporate sections
- Deep Teal: `#103330` — secondary dark surfaces and supporting brand moments
- Neon Lime: `#CCF434` — primary CTA, counters, active indicators and energy cues
- Electric Blue: `#3DCEEE` — hover, focus, links and technology details
- Eucalyptus Mist: `#ECF3EC` — alternating light-green sections
- Electric Mist: `#EAF7FA` — optional technology and innovation surfaces
- Porcelain: `#F8FAF7` — primary page background
- Pure White: `#FFFFFF` — cards, menus and clean content surfaces
- Carbon: `#121817` — primary text on light backgrounds
- Slate: `#5C6865` — secondary text and descriptions
- Sage Grey: `#CEDAD5` — borders, dividers and form fields

Use an approximate 60/25/10/5 balance: 60% light backgrounds, 25% dark foundations, 10% neutral text and borders, and 5% bright brand accents. Neon Lime communicates energy and action; Electric Blue communicates technology and engineering. Each component should have one dominant accent rather than using both equally.

Primary CTA: Neon Lime with Midnight text, changing to Electric Blue on hover. On visually busy media, a white CTA may be used when it provides stronger contrast.

Approved gradients:

- Brand: `linear-gradient(120deg, #CCF434 0%, #69EBA9 45%, #3DCEEE 100%)`
- Dark: `linear-gradient(135deg, #071C1B 0%, #103330 60%, #123F4A 100%)`
- Glow: `radial-gradient(circle, rgba(204,244,52,.22) 0%, rgba(61,206,238,.12) 45%, transparent 72%)`

The overall impression should be Indian engineering confidence with global clean-technology sophistication. Express India through manufacturing, operational imagery and factual company storytelling—not through decorative national-color motifs.

### Typography

- Use one modern grotesk sans-serif family throughout.
- Display headings: bold or semibold, tight tracking, short lines.
- Desktop hero heading: approximately `72–96px` depending on viewport.
- Section headings: approximately `48–64px`.
- Body copy: `16–20px`, maximum readable line length around 60–65 characters.
- Eyebrows and metadata: `12–14px`, uppercase, increased tracking.
- Avoid centered paragraphs except for compact metrics or logos.

### Grid and spacing

- Desktop design width: `1440px`.
- Content container: `1280px` maximum, centered.
- Grid: 12 columns.
- Section padding: `120–160px` vertically on desktop.
- Use full-width media bands where appropriate.
- Avoid narrow half-screen page rendering and unused horizontal space.
- Use border lines and spacing before using cards or shadows.

### Shapes and surfaces

- Mostly square or subtly rounded corners (`0–12px`).
- No glassmorphism.
- No large soft shadows.
- No card-within-card patterns.
- Use cards only for vehicles or clearly independent objects.
- Use thin neutral dividers and large whitespace for separation.

### Motion

- Motion should feel controlled and mechanical rather than playful.
- Use short fades, masked text reveals and slow media scaling.
- Respect `prefers-reduced-motion`.
- Avoid scroll effects that duplicate sections, delay content visibility or break full-page rendering.

## Hero video specification

Video source:

https://www.savygreentech.com/videos/SAVe_3_5_AE.mp4

Behavior:

- Full-viewport first section.
- Video fills the media area using `object-fit: cover`.
- Set `muted`, `autoplay`, `loop`, `playsinline` and `preload="metadata"`.
- On `loadedmetadata`, set `video.currentTime = 1.5` before playback.
- Every loop should restart at `1.5` seconds, not at `0`.
- Add a dark overlay only as strong as required for readable copy.
- Provide a poster/fallback state.
- Do not delay the headline until the entire video downloads.

Hero content:

- Brand: **SAVYGREENTECH**
- Heading: **Custom Electric Vehicles Built Around Your Requirements**
- Supporting copy: **We design and manufacture custom electric vehicles tailored to your business, application, and operational requirements.**
- Primary CTA: **Explore Our Vehicles**
- Secondary CTA: **Discuss Your Requirement**

## Homepage structure and approved content

### 1. Header

- Supplied logo
- Wordmark: **SAVYGREENTECH**
- Navigation: Vehicles, Applications, Technology, About, Contact
- Primary action: **Discuss Your Requirement**

Keep the navigation over the hero initially. Transition to a solid dark header after scrolling.

### 2. Hero video

Use the approved hero video specification and exact hero content above.

### 3. Company introduction and proof

Heading: **Electric Vehicles Engineered for Real Roads and Real Requirements**

Copy: **India's trusted manufacturer of electric three-wheelers, campus carts and special-purpose/customized EVs.**

Published proof:

- **500+** Vehicles Deployed
- **100+** Satisfied Clients
- **10+** States Covered
- **Since 2014**

Do not show the “2 Lakh+ Tons of CO₂ Saved” claim until its methodology is confirmed.

### 4. Solutions by application

Heading: **Built for the Way You Operate**

Use the applications published on the website:

- Golf Courses & Resorts
- University & School Campuses
- Airports & Defence
- Townships & Communities
- Industrial Logistics
- Government Projects
- Tourism & Sightseeing
- Agriculture Mobility

Present these as an editorial horizontal sequence or large media-led rows, not eight identical cards.

CTA: **Explore Applications**

### 5. Vehicle range

Heading: **Our Electric Vehicle Range**

Published vehicles and specifications:

| Vehicle | Power | Top speed | Range | Published purpose |
|---|---:|---:|---:|---|
| Classic Golf | 2 kW | 25 km/h | 75 km | Campus and internal transportation |
| Club Cart | 2 kW | 25 km/h | 75 km | Premium campus and resort transportation |
| Electruck | 1.5 kW | 25 km/h | 75 km | Cargo loading and material movement |
| Vintage Elite | 2 kW | 25 km/h | 75 km | Premium and VIP campus movement |
| Tuk Tuk ë | 1.5 kW | 25 km/h | 70–120 km | Passenger transport; configurations from 2+1 to 8+1 |
| Dump Truck | 1.5 kW | 25 km/h | 70–120 km | Waste collection and municipal sanitation |

Use a large image-led carousel or editorial grid. Show no more than four vehicles at once.

CTAs: **View Vehicle** and **View All Vehicles**

### 6. Custom engineering

Heading: **Built Around Your Requirements**

Copy: **Configure vehicles to match your exact needs.**

Only use published customization areas:

- Battery and custom EV solutions
- Lithium-ion battery systems
- Lead-acid battery options
- Custom EV system integration
- Application-specific solutions

CTA: **Discuss a Custom EV**

Do not list unconfirmed seating, payload, accessories, body styles or range customization as guaranteed options.

### 7. Technology

Heading: **Technology Built for Indian Conditions**

Use three large editorial pillars:

1. **Smart EV Technology**
   - Smart motor controllers
   - Efficient energy management
   - Real-time performance monitoring

2. **High-Performance EV Engineering**
   - High-torque indigenous motors
   - Built for Indian terrain
   - Regenerative braking technology

3. **Battery & Custom EV Solutions**
   - Lithium-ion and lead-acid battery options
   - Custom EV system integration
   - Application-specific solutions

CTA: **Explore Our Technology**

### 8. Partners and customers

Heading: **Trusted Across Industries**

Use only logo assets already published on the Savy GreenTech website. Do not add names or logos from the generated wireframes.

Do not publish case-study results until project details are supplied and approved.

### 9. Delivery process

Heading: **From Requirement to Deployment**

Use the published process:

1. Consultation — Understand your requirements and operations
2. Customization — Configure vehicles to match your exact needs
3. Deployment — Seamless integration into your operations
4. Ongoing Support — Continuous partnership and maintenance

### 10. Why SAVYGREENTECH

Use the published reasons:

- Certified Experts
- EV Support
- Safety First
- Eco-Friendly Solutions

Keep descriptions close to the source wording. Do not add certification names or a 24/7 promise beyond the current published support statement without verification.

### 11. Sustainability

Use as a supporting section, not the main sales argument.

Approved published themes:

- Zero Emissions Mobility
- 1 Vehicle = 1 Tree
- Eco-Conscious Manufacturing

### 12. Final conversion section

Heading: **Ready to Power Your Project?**

Copy: **Get in touch with our experts for a consultation and customized electric vehicle solution.**

Primary CTA: **Discuss Your Requirement**

Secondary CTA: **Talk on WhatsApp**

### 13. Footer

- SAVYGREENTECH logo and wordmark
- Navigation links
- Address, phone, email and business hours from the current website
- Published social links
- Copyright and required legal links

## Conversion rules

- Use **Discuss Your Requirement** as the primary site-wide CTA.
- Use **Explore Our Vehicles** as the primary exploration CTA.
- Use **Explore Applications**, **View Vehicle** and **Explore Our Technology** only for matching destinations.
- Avoid vague labels such as **Learn More**.
- Repeat the primary CTA after the vehicle, technology and final sections, but do not place it in every block.
- WhatsApp remains a secondary fast-contact channel.

## Accessibility and implementation requirements

- Minimum body copy size: `16px` desktop and mobile.
- Visible keyboard focus for every interactive element.
- Descriptive labels for social and WhatsApp icon buttons.
- Semantic heading hierarchy with one H1.
- Sufficient contrast over the hero video in every frame.
- Pause control for video/motion where required.
- Reduced-motion alternative.
- Meaningful alt text for vehicles and partner logos.
- No content should depend on hover alone.
- Responsive layouts must use the full viewport without horizontal overflow.

## Lo-fi revision checklist

- Use the supplied logo and SAVYGREENTECH wordmark.
- Show the hero as a full-screen video region.
- Remove invented case studies, results and claims.
- Remove unnecessary descriptive copy.
- Replace repetitive card walls with ZeroMesh-inspired editorial sections.
- Keep exact published product data.
- Preserve the selected solution-led information architecture.
