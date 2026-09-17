# Savy GreenTech Structural and Conversion Audit

Date: 1 September 2026

## Audit scope

Reviewed the live desktop experience across:

1. Homepage
2. Our Vehicles
3. Applications
4. Technology
5. About
6. Contact

Primary user goal: understand what Savy GreenTech manufactures, determine whether it can solve a specific operational mobility requirement, establish trust, and start a qualified sales conversation.

## Executive verdict

The website contains enough information to position Savy GreenTech as an experienced custom commercial EV manufacturer, but that story is fragmented across internal pages. The homepage communicates customization and sustainability, yet does not show the actual vehicles, industries, engineering capabilities, deployment proof, or recognizable customers. It therefore asks visitors to trust the company before giving them enough evidence.

The redesigned homepage should function as a concise sales narrative:

**What we manufacture → solutions by need → industries served → customization and technology → operational proof → consultation process → qualified enquiry.**

## Current journey health

| Step | Page | Health | Main issue |
|---|---|---|---|
| 1 | Homepage | Poor | Strong claim but incomplete company story; oversized/repeated hero delays evidence. |
| 2 | Vehicles | Needs major improvement | Products exist, but have no category system, detail paths, use-case matching or conversion actions. |
| 3 | Applications | Needs improvement | Relevant markets are listed, but cards do not connect needs to vehicles or real project outcomes. |
| 4 | Technology | Needs improvement | Capabilities are broad claims without diagrams, specifications, certifications or proof. |
| 5 | About | Mixed | Contains the strongest proof, but it is buried and visually fragmented. |
| 6 | Contact | Functional but weak | Form is generic and routes to WhatsApp; it captures too little information for a custom EV quotation. |

## Strengths to preserve

- Clear focus on custom electric vehicles.
- A diverse portfolio spanning campus, passenger, cargo and municipal mobility.
- Strong B2B application breadth: campuses, resorts, airports, defence, government, industry and tourism.
- Useful experience and scale signals: operating since 2014, 500+ vehicles, 100+ clients and 10+ states.
- Relevant engineering story: indigenous motors, controllers, battery options, regenerative braking and application-specific integration.
- A consultation-to-support process already exists conceptually.
- WhatsApp offers a low-friction contact route for the Indian market.

## Structural risks

### 1. The homepage does not answer the first five buyer questions

A buyer still needs to know:

- What types of vehicles do you manufacture?
- Which operational problems do they solve?
- Who already uses them?
- What can be customized?
- What proof shows you can deliver reliably?

The current homepage answers only the customization question in general terms.

### 2. The site is organized around company pages, not buyer decisions

Vehicles, applications, technology and proof are separated. A buyer looking for waste collection, campus transport or industrial logistics must mentally connect several pages. The site should connect each need with an appropriate vehicle, configuration, capability and next action.

### 3. Repetition replaces progression

Several pages repeat similar cards and generic sustainability language. The visitor receives more content but not greater confidence. Every section should move the buying decision forward.

### 4. Internal pages lack deeper paths

Vehicle cards do not lead to product-detail pages. Application cards do not lead to solution or case-study pages. Technology cards do not reveal engineering evidence. These are dead ends rather than conversion steps.

### 5. Proof is buried and insufficiently supported

The About page contains the strongest credibility signals, but these do not appear early on the homepage. Claims such as 2 lakh+ tons of CO2 saved, round-the-clock support and safety leadership need methodology, certifications or supporting detail.

## Conversion risks

### Weak CTA hierarchy

“Explore Custom Solutions,” “Learn More” and “Get in Touch” are broad. The primary action should match B2B buying intent: **Discuss Your Requirement** or **Request a Custom EV Proposal**. A secondary action can be **Explore Vehicles**.

### No progressive qualification

The homepage does not help visitors identify themselves by need, such as passenger transport, cargo movement, waste collection or custom engineering. This reduces relevance and produces lower-quality enquiries.

### No CTA on product and application cards

Every solution should offer a logical next step: view specifications, explore variants, discuss customization or request pricing.

### Contact form captures too little context

For custom vehicle enquiries, useful fields include application, vehicle type, quantity, seating/payload requirement, operating location and desired timeline. These can remain short and use progressive disclosure.

### Trust arrives too late

Client logos, deployment numbers, years of experience, engineering capability, service support and coverage should appear before the first major conversion block.

## Visible design and accessibility risks

- Captured desktop pages use only roughly half of the available width, leaving large blank areas.
- Full-page rendering visibly repeats page sections and footers, suggesting layout, animation or long-page rendering defects.
- Product imagery did not render in the accepted vehicle-page capture, leaving large empty card areas.
- Long card grids have weak visual variation and make scanning difficult.
- Body copy and navigation appear very small at the captured desktop size.
- Blue-green gradients are used heavily for emphasis without a clear semantic system.
- Several icon-only social links lack accessible names in the DOM snapshot.
- Heading levels are inconsistent; the homepage has an H1, while internal page titles begin at H2.
- The WhatsApp floating control is icon-only and needs a clear accessible label and keyboard/focus verification.
- Contrast, responsive reflow, focus states and full keyboard operation require implementation-level testing before any WCAG claim.

## Content to aggregate onto the homepage

### From Vehicles

- The four solution families: Campus & Hospitality, Passenger Mobility, Cargo & Utility, Municipal & Special Purpose.
- Flagship models: Classic Golf, Club Cart, Electruck, Tuk Tuk e, Dump Truck and Vintage Elite.
- One or two decision-relevant specifications per model.
- Links to product detail pages and a vehicle comparison tool.

### From Applications

- Priority application groups rather than eight equal cards.
- Airports and defence, campuses and institutions, resorts and tourism, industrial logistics, government and municipal operations.
- A “find the right EV for your operation” path.
- Real deployments or case studies instead of generic application descriptions.

### From Technology

- Indigenous EV engineering for Indian conditions.
- Motors and controllers, battery flexibility, regenerative braking and application-specific integration.
- Evidence: certifications, testing, warranty, serviceability and manufacturing capability.

### From About

- Since 2014 / 10+ years.
- 500+ vehicles deployed, 100+ clients and 10+ states.
- Recognizable customer/partner logos where approved.
- Founder’s 25+ years of experience.
- One vehicle = one tree, placed as a supporting commitment rather than the main buying argument.

### From Contact

- Fleet consultation and custom quotation.
- WhatsApp and phone as quick-contact options.
- A short requirement form for qualified leads.

## Recommended homepage information architecture

### 1. Header

Navigation: Vehicles, Solutions, Custom Engineering, Technology, About, Contact.

Persistent primary CTA: **Discuss Your Requirement**.

### 2. Hero: immediate category clarity

Eyebrow: **Commercial electric vehicles engineered in India**

Headline: **Custom electric vehicles built for the way your operation moves**

Supporting copy: Savy GreenTech designs and manufactures passenger, campus, cargo and special-purpose EVs for institutions, industry and government.

Primary CTA: **Discuss Your Requirement**

Secondary CTA: **Explore Our Vehicles**

Visual: a real lineup of distinct Savy vehicles in operational settings, not an abstract dark background.

### 3. Immediate trust strip

Since 2014 · 500+ vehicles deployed · 100+ clients · 10+ states · Made for Indian conditions.

Purpose: establish credibility before asking the visitor to explore.

### 4. Solutions organized by operational need

- Move people
- Move goods
- Maintain campuses and facilities
- Manage waste and municipal operations
- Build a custom EV

Each item should connect the need to relevant vehicles.

CTA: **Find the Right Solution**.

### 5. Featured vehicle range

Show 4–6 strong models with image, category, seating/payload, range and primary use.

CTAs: **View Details**, **Compare Vehicles**, and **Discuss Customization**.

### 6. Built around your operation

Explain what can be configured: seating, body design, payload, battery, range, accessories, branding and application-specific systems.

Use a before/after or base-platform-to-custom-vehicle visual.

CTA: **Start a Custom EV Brief**.

### 7. Industries and applications

Prioritize five high-value segments with real contextual photography and a related vehicle:

- Campuses and institutions
- Resorts and tourism
- Airports and defence
- Industrial logistics
- Government and municipal services

CTA: **Explore Applications**.

### 8. Engineering and technology proof

Condense technology into three pillars:

- Indigenous powertrain engineering
- Flexible batteries and energy management
- Built, tested and supported for Indian operating conditions

Add certifications, testing standards and service/warranty evidence when available.

CTA: **Explore Our Technology**.

### 9. Customer and deployment proof

Approved logos followed by 2–3 real case studies. Each case study should state challenge, vehicle/configuration, quantity and operational result.

CTA: **See Our Deployments**.

### 10. Delivery process

Requirement discovery → vehicle configuration → proposal/prototype → manufacturing and deployment → ongoing service.

This is more credible than a generic four-step graphic if each stage names a deliverable.

### 11. Why Savy GreenTech

Use evidence-led reasons:

- 10+ years of EV manufacturing
- Custom engineering capability
- Multi-industry deployment experience
- Service and spare-parts support
- Vehicles built for Indian conditions

Avoid repeating broad sustainability claims already covered elsewhere.

### 12. Final conversion block

Headline: **Tell us what your operation needs to move**

Short requirement selector plus contact details.

Primary CTA: **Request a Custom EV Proposal**

Secondary CTA: **Talk to an Expert on WhatsApp**.

### 13. Footer

Organize links by Vehicles, Solutions, Company and Support. Include complete contact information, location, social labels, privacy policy and relevant legal/certification links.

## Content that should not dominate the homepage

- Full leadership biographies
- All eight application cards
- Full technical bullet lists
- Long sustainability statements
- Every vehicle specification
- Generic “future of mobility” language
- A Coming Soon card without a useful lead-capture action

These belong on deeper pages linked from concise homepage summaries.

## Recommended CTA system

Primary site-wide CTA: **Discuss Your Requirement**

Commercial CTA: **Request a Custom EV Proposal**

Exploration CTA: **Explore Vehicles**

Product-level CTA: **View Specifications**

Customization CTA: **Discuss Customization**

Fast-contact CTA: **Talk on WhatsApp**

Avoid using several interchangeable labels such as Learn More, Explore Solutions and Get in Touch for the same destination.

## Priority order

### P0 — fix before visual redesign

- Resolve width, duplicated-section and image-rendering defects.
- Establish homepage positioning and section hierarchy.
- Define product categories and consistent CTA language.
- Verify all numerical, client, safety and sustainability claims.

### P1 — conversion foundation

- Create product detail routes.
- Add qualified enquiry flow.
- Add real deployment case studies.
- Connect applications to products.
- Add technical and certification proof.

### P2 — polish and growth

- Improve responsive behavior and accessibility.
- Add comparison/filtering.
- Add brochures and downloadable technical sheets.
- Build segment-specific landing pages for SEO and campaigns.

## Evidence limits

This audit is based on live desktop screenshots and DOM inspection captured on 1 September 2026. Full-page captures visibly exposed repeated sections and missing images. The audit did not submit the WhatsApp form, inspect private analytics, verify claims or complete assistive-technology testing. Mobile behavior, keyboard focus, contrast ratios, load performance and SEO metadata need dedicated verification.
