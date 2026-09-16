# BreatheTherm — SEO review and site build, change log

**Version 2 — 16 September 2026.** This document supersedes version 1 and
covers both rounds of work.

- **Round 1** — SEO and code review of the single-page site. Headings, schema,
  performance, sixteen live bugs. Sections *Answers to the six questions* onward.
- **Round 2** — the build that followed: privacy policy, four pillar pages, three
  location pages, a guides hub with eight briefed placeholders, `robots.txt`,
  `sitemap.xml`, and the Google Business Profile wired into structured data.
  Section *Round 2* immediately below.

The site went from **1 page to 19**. Nothing was changed for style reasons alone.

---

## Read this first — three blockers before deploy

1. **`/technical/` is deliberately set to `noindex`.** It carries eight
   `Content needed:` blocks in red dashed boxes. Four of them matter a great deal:
   fire classification, third-party certification (BBA/ETA), service life, and
   WUFI modelling examples. I did not invent any of these. Publishing unverified
   fire or certification claims about a construction product is a regulatory
   exposure, not an SEO one. Fill them, delete the boxes, remove the `noindex`,
   add the URL to `sitemap.xml`.
2. **`/privacy-policy/` needs legal review** and is also `noindex` until it gets
   it. Three things must be settled: your ICO registration number, whether you
   need a cookie consent banner (you are running GA4 without one, so under PECR
   you almost certainly do), and whether the retention periods I drafted match
   how the business actually operates.
3. **Check the images render.** Three case-study photos were being stretched
   because `object-fit` was missing. That is fixed, so they now crop rather than
   distort. An improvement, but a visible change.

**One deadline worth diarising.** ECO4 closes on 31 December 2026 and there will
be no ECO5. The grants page says so prominently, and that page will need a review
in early January. The VAT zero-rate on installation ends 31 March 2027.

---

## Round 2 — what was built

### New pages (19 total, up from 1)

| URL | Purpose | Indexable? |
|---|---|---|
| `/` | Homepage — nav, footer, FAQ links and schema updated | Yes |
| `/internal-wall-insulation-listed-buildings/` | **Pillar 1.** The money page. Consent, build-ups, U-values, suitability matrix, project evidence | Yes |
| `/breathable-insulation-cost/` | **Pillar 2.** Layer pricing, installed ranges, cost drivers, VAT relief | Yes |
| `/insulation-grants-heritage-homes/` | **Pillar 3.** Warm Homes: Local Grant, ECO4 closure, what listed buildings run into | Yes |
| `/technical/` | **Pillar 4.** Specification hub, built to Sammy's brief | **No — pending data** |
| `/areas/` | Location hub | Yes |
| `/areas/gloucestershire/` | Local page — limestone, Georgian brick, timber frame | Yes |
| `/areas/cotswolds/` | Local page — limestone cottages, AONB, conservation constraint | Yes |
| `/areas/bristol/` | Local page — Bath stone, Victorian terraces, conversions | Yes |
| `/blog/` | Guides hub | Yes |
| `/blog/` × 8 posts | Briefed placeholders | **No — unwritten** |
| `/privacy-policy/` | Legal | **No — pending review** |
| `/robots.txt`, `/sitemap.xml` | Crawl control | n/a |

Nine URLs are in the sitemap. The ten that are not all carry a `noindex` tag, and
the two facts are kept consistent deliberately — listing a `noindex` URL in a
sitemap sends Search Console a contradictory signal.

### The technical hub and Sammy's brief

Built to the twelve-section flow in the draft, including the parts most
manufacturer sites skip:

- Hero stating problem and outcome, with the four proof points from the brief
- The problem with conventional insulation, and a **comparison table against PIR,
  mineral wool, wood fibre and wood wool** — the comparison the brief asked for
- Origin story kept to two paragraphs, as instructed
- How the system works: layer-by-layer assembly, the three moisture mechanisms,
  and why perlite, why lime and why aerogel each get their own answer
- Technical performance split into thermal / moisture / fire / durability /
  accreditation, datasheet-style
- The **"can I specify it?" suitability matrix**, ten construction types
- Specification resources, hygrothermal evidence, technical case studies
- Eight technical FAQs answering the objections in the brief directly
- CPD and technical support, with specifier CTAs rather than "get a quote"

The brief's test was that an architect should shortlist within 60 seconds and
specify within 10 minutes without calling. The page is structured for that — a
proof strip and table of contents at the top, declared values in tables rather
than prose. **It fails the ten-minute half of the test today**, because the fire
classification, certification status and modelling examples are missing and the
resources are mailto requests rather than downloads. Both are flagged on the page.

### Google Business Profile

The CID you supplied (`14991791921704986278`) is now wired in four places:

- `sameAs` and `hasMap` in the homepage `LocalBusiness` schema — this is how you
  tell Google the website and the Business Profile are the same entity, and it is
  the single most useful structured-data change for local ranking
- The same two properties in each of the three location pages' own
  `LocalBusiness` nodes, each declaring its own `areaServed`
- A "Find us on Google" link in the footer of every page
- A contact block on each location page

Make sure the NAP on the profile matches the site exactly — *The Old Forge,
Todenham, Gloucestershire GL56 9PF* and *01285 407088*. Inconsistent NAP is the
commonest reason local entity matching fails.

### Internal linking

The FAQ links added in round 1 pointed at on-page anchors because there was
nowhere else to point. All six now point at real URLs:

| FAQ | Was | Now |
|---|---|---|
| What is BreatheTherm? | `#explorer` | `/technical/` |
| Suitable for listed buildings? | `#proof` | `/internal-wall-insulation-listed-buildings/` |
| Why can't standard insulation be used? | `#problem` | `/blog/why-pir-fails-in-solid-walls/` |
| What U-value can I achieve? | `#explorer` | `/technical/` |
| How much does it cost? | `#price` | `/breathable-insulation-cost/` |
| Are there grants? | `#contact` | `/insulation-grants-heritage-homes/` |

Note the third one points at a placeholder. Write that post reasonably soon, or
repoint it at `/technical/` in the meantime.

Every new page also links to at least two others, and each carries a "Related
guides" block. Pillar → location and location → pillar links run both ways.

### Navigation

The main nav changed from five homepage anchors to four pillar pages plus FAQs.
Anchors cannot rank; pages can, and the nav is the strongest internal link signal
on the site. The displaced homepage sections (`#problem`, `#explorer`, `#proof`)
are still in the footer and in the mobile menu, which now carries the full list.

The footer grew from three link columns to four: Guides, Navigate, Areas We Serve,
Contact.

### The blog placeholders

Eight posts, each a real file at its final URL with title, meta description,
breadcrumbs and internal links settled, set to `noindex`, and carrying a written
content brief inside the page rather than in a separate document. Publishing one
means: write it, delete the brief, remove the `noindex`, add it to `sitemap.xml`,
and turn its card on `/blog/` into a link.

They are placeholders rather than thin published pages on purpose. Eight
half-empty URLs in the index would do more harm than eight absent ones.

Priority order, by likely return: *Why PIR fails in solid walls*, *Listed Building
Consent for internal wall insulation*, *Interstitial condensation explained*, then
the rest.

### Content sourcing

Everything on the new pages comes from one of three places, and nothing else:

1. **Your own site** — layer specs, lambda and S<sub>d</sub> values, pricing,
   U-values, case study figures, founder history, WTA references.
2. **Verified external sources, checked on 16 September 2026** — grant scheme
   rules and dates, and the VAT position. Each is date-stamped on the page with a
   note that schemes change.
3. **Nothing else.** Where a figure was needed and could not be sourced, there is
   a red `Content needed:` box saying exactly what is required and why. There are
   eight, all on `/technical/`. No number on these pages was estimated or inferred.

### Files changed in round 2

`index.html` — 13 edits: nav, mobile nav, footer columns, six FAQ links repointed,
two new in-body links to pillar and location pages, GBP added to schema.

`styles.css` — 1,530 → 1,987 lines. One appended, commented block covering the
interior page types: page hero, breadcrumbs, prose column, spec tables, feature
grids, callouts, the `needs-input` flag, related-guide cards, CTA bands. The
footer grid was restated for five columns using the existing breakpoints rather
than new ones, so the cascade stays predictable. Nothing existing was altered.

`main.js` — unchanged. It already worked on every page.

---

## Answers to the six questions

### 1. Are the H1 and H2 headings helping search visibility?

They were not. The H1 read *"Cut heating bills without degrading your heritage
property"* — a good advertising line that contains none of the words a person
types into Google. No "insulation", no "breathable", no "solid wall". The H2s had
the same problem: *"Questions?"*, *"Past projects"*, *"Explore every layer"*,
*"What our clients say"*. Those describe the page's furniture, not its subject.

There were also two structural faults. The heading levels jumped from `h2` to `h4`
in five places and to `h5` in the footer, so the document outline did not describe
the page. And the `<em>` inside the H1 was the only part carrying any specificity.

**Changed.** Every H1 and H2 has been rewritten to lead with the search term while
keeping the original benefit line. The H1 is now:

> Breathable insulation for pre-1919 & listed buildings
> *Cut heating bills without degrading historic fabric*

The design is unchanged — it is still a two-line heading with an emphasised second
line. All `h4` and `h5` headings that were headings have been promoted to their
correct level; the ones that were decoration (the "Keep heat in / Let moisture out"
lines) are now paragraphs. CSS was updated in step so nothing looks different.

Full before/after table is in the change log below.

### 2. Do the titles and headings use terms homeowners, architects and retrofit professionals search for?

Partly. The page title and meta description were reasonable. The body headings
were not — they used *your* vocabulary, not the market's.

Three audiences, three vocabularies, and the page only spoke one of them well:

| Audience | What they type | Was it on the page? |
|---|---|---|
| Homeowner | internal wall insulation cost, damp solid wall, insulating a Victorian house, insulation grants | Cost and grants were in the schema but **invisible on the page** |
| Architect / CO | WTA Merkblatt 6-4, hygrothermal modelling, IWI listed building consent, vapour-open, Sd value | Present, mostly in body copy rather than headings |
| Installer | breathable render training, lime perlite system, approved installer network | Present |

**Changed.** Headings now carry "breathable insulation", "internal wall
insulation", "solid-wall", "pre-1919", "listed buildings", "heritage retrofit",
"case studies" and "cost". The page title now leads with the search term rather
than the brand — nobody searches "BreatheTherm" yet, but plenty search "breathable
insulation for listed buildings".

The two highest-intent questions in this market — cost and grants — existed in
your FAQ structured data but had no visible equivalent. That breaches Google's
rule that markup must match on-page content, and it wasted the two best questions
you had. **Both are now visible FAQs**, and the schema matches all 16 questions.

`<meta name="keywords">` was removed. No major search engine has used it since
2009; its only real effect is to publish your keyword strategy to competitors.

### 3. Would the FAQ section benefit from internal links and supporting pages?

Yes, strongly — it had **zero** internal links. Fourteen well-written answers that
sent the reader nowhere. That is the single cheapest improvement available: the FAQ
is the most link-worthy block on the page and it was doing no work.

**Changed.** Six contextual links added from FAQ answers into the relevant
sections (`#explorer`, `#problem`, `#price`, `#proof`, `#contact`). These work
today with no new pages required.

**Not changed, but recommended.** The FAQ is the natural hub for a supporting-page
structure, because each answer is already a page brief. Once pages 1–4 in the next
section exist, those same links should be repointed from anchors to real URLs.

### 4. Do you need additional pillar pages or blog posts?

Yes, and this is the most important finding in the review.

The site is a single URL. Every section is an anchor (`#faq`, `#price`, `#proof`),
which means **you can only ever rank one page, for one primary query**. Anchors do
not rank independently. Everything you know about heritage retrofit is compressed
into one document competing against sites with fifty.

A homepage is also the wrong shape for this market. Your three audiences have
incompatible intents — a homeowner Googling "damp Victorian wall" and an architect
Googling "WTA Merkblatt 6-4 internal insulation" cannot both be served well by the
same URL.

**Recommended structure.** Four pillar pages first, in this order:

| # | Page | Primary intent | Why first |
|---|---|---|---|
| 1 | Internal wall insulation for listed & period buildings | Commercial | Highest-value query, matches what you actually sell |
| 2 | How much does breathable insulation cost? | Commercial | Cost is the top homeowner question and you already have the pricing data |
| 3 | Insulation grants for pre-1919 & heritage homes | Informational → lead | High volume, low competition, converts; the schemes change so it earns repeat updates |
| 4 | Technical specification hub (WTA, U-values, Sd values, hygrothermal modelling, NBS clauses, CAD/BIM) | Professional | Serves architects and conservation officers; also the strongest link-earning asset you have |

Then supporting posts, each linked from its pillar: "Why PIR fails in solid walls",
"Insulating a cob / timber-frame / flint building", "Listed Building Consent for
internal insulation", "Lime plaster vs gypsum on historic walls", plus one case
study per completed project.

**Location pages are the other open goal.** You are in Gloucestershire and your
case studies are Cheltenham, Bristol and the Cotswolds, but the site targets no
locality at all. "Heritage insulation Gloucestershire" and equivalents for
Cheltenham, Bath, Bristol and Cirencester are winnable now, whereas national
queries will take a year or more.

**Also needed, and currently missing entirely:** `robots.txt`, `sitemap.xml`, and
a Google Business Profile. None of these are in the files you sent. The moment you
have more than one URL, a sitemap stops being optional.

Realistic expectation: a single page will not build topical authority no matter how
good it is. Pillar pages are the mechanism.

### 5. Is the WhatsApp widget affecting page speed?

**No.** I checked this specifically, and it is worth being clear about because it
is the kind of thing that gets blamed unfairly.

It is not a widget in the usual sense. It is a plain HTML link with an inline SVG
icon and one CSS rule — no third-party script, no iframe, no external request, no
JavaScript. Total cost is roughly 1 KB of HTML that is already in the page. It has
no measurable effect on any Core Web Vital. Keep it.

What *is* costing you load time, in order:

| Source | Problem | Fixed? |
|---|---|---|
| Phosphor icon script (`unpkg.com`) | Render-blocking, and **unpinned** — a live site silently taking whatever version ships today | Yes: pinned to `@2.1.1` and deferred |
| Hero background image | It is your LCP element, set in CSS, so the browser only discovers it after parsing the stylesheet | Yes: `preload` with `fetchpriority="high"` |
| Brevo form iframe | Full third-party frame loading during initial page load | Yes: `loading="lazy"` |
| Google Calendar widget | Stylesheet `<link>` sat inside `<body>`, mid-page — invalid, and causes a re-render | Yes: moved to `<head>` |
| Analytics `gtag` | Was the **first** thing in `<head>`, ahead of the title, canonical and stylesheet | Yes: moved to the end of `<head>` |
| Scroll handlers | Two separate listeners, each writing styles on every scroll event | Yes: one listener, batched into `requestAnimationFrame` |
| Case-study images | No `loading="lazy"` | Yes |

**Two speed items I did not change,** because they need decisions or asset work:

- `BT-hero-bkg.jpg` should be a WebP or AVIF. This is probably your single largest
  download. Converting it is a bigger win than everything above combined.
- Google Fonts loads two families across twelve weights. Trimming to the weights
  actually used would help, but I could not verify every weight is unused without
  risking a visible regression on a live site. Worth doing deliberately.

### 6. Should the top-left logo link to the homepage?

**Yes.** It was a bare `<img>` inside a `<div>` — not clickable. Users expect it to
be, universally, and it currently gives them no way back to the top.

**Changed.** Both the header and footer logos are now wrapped in `<a href="/">`
with an `aria-label`. The `alt` text changed from "BreatheTherm Logo" to
"BreatheTherm" — when a logo is a link, the alt text should name the destination,
and "logo" is noise for a screen reader.

This matters more than it looks. On a single-page site it is a small usability fix.
The moment the pillar pages in question 4 exist, the logo becomes the primary route
home from every one of them.

---

## Bugs found and fixed along the way

These were not in the brief. They were found while reading the code and they were
all live.

| # | Bug | Impact | Fix |
|---|---|---|---|
| 1 | **Four dead navigation links.** Header nav, mobile nav, footer and the "See the BreatheTherm solution" button all pointed at `#solution`. No element with that id existed — the section was `id="approach"`. | Clicking "The System" in the main navigation did nothing at all | Section renamed to `id="solution"`; CSS updated to match |
| 2 | Footer "Grants & Funding" pointed at `#grants`, which also did not exist | Dead link | Repointed to the new grants FAQ |
| 3 | Footer "Privacy Policy" pointed at `#` | Dead link, and a GDPR problem for a site running a lead form | Repointed to `/privacy-policy/` — **you must create this page** |
| 4 | `querySelector('#')` in the smooth-scroll handler | Throws a `SyntaxError` on any click of a bare `#` link | Guarded |
| 5 | An orphaned "Thank you, we'll be in touch soon" panel sat in the contact section, left over from a form that no longer exists | Hidden by CSS, so harmless — but one CSS change away from showing a false confirmation to every visitor | Removed |
| 6 | FAQ structured data contained two questions (cost, grants) with no visible equivalent | Breaches Google's structured data guidelines; risks a manual action against the markup | Both questions added as visible FAQs; all 16 now match |
| 7 | Five SVG hotspots had copy-pasted `aria-label`s — the PerliScratch marker announced "PerliTherm", and three separate markers all announced "Perlifinish" | Screen-reader users got wrong information | Labels corrected |
| 8 | `text-anchor="right"` and `text-anchor="left"` in the SVG | Not valid SVG values; silently ignored | Changed to `end` |
| 9 | Legend items had `tabindex="0"` but no keyboard handler | Focusable but not operable by keyboard | `Enter` / `Space` handler added |
| 10 | Case-study images had `width:100%; height:100%` and no `object-fit` | Photos stretched rather than cropped | `object-fit: cover` |
| 11 | Case-study and modal images had no `alt` attribute | Inaccessible, and invisible to image search | Descriptive `alt` added to all six |
| 12 | `.approach h2` styling rules | No element had `class="approach"`, so these never applied — the terracotta `<em>` in that heading was not rendering as intended | Re-scoped to `#solution h2`. **This is a visible change** — the heading now gets its intended size and accent |
| 13 | Stray `}` in `styles.css` | Browsers recover from it, so nothing broke, but the file failed CSS validation | Removed |
| 14 | No `<main>` landmark, no skip link | Keyboard and screen-reader users had to traverse the whole nav on every interaction | Both added |
| 15 | Hero entrance animation was not disabled under `prefers-reduced-motion` | The scroll reveals respected it, but the hero did not — content could stay hidden | Handled |
| 16 | Modals did not restore focus on close | Keyboard users were dropped back to the top of the document | Focus returns to the trigger |

---

## Heading changes, before and after

| Section | Before | After |
|---|---|---|
| Hero (H1) | Cut heating bills / *without degrading your heritage property* | Breathable insulation for pre-1919 & listed buildings / *Cut heating bills without degrading historic fabric* |
| Problem | Most insulation was not designed for heritage buildings. | Why standard insulation fails in solid-wall and pre-1919 homes |
| Solution | Insulation that works *with* your walls, not against them. | Breathable internal wall insulation that works *with* your walls |
| Explorer | Explore every layer | Explore every layer of the wall and floor build-up |
| Price | Invest in BreatheTherm. Enjoy the savings for years | Breathable vs conventional insulation in traditional buildings |
| Paths | Tailored support for every enquiry | Support for homeowners, architects and installers |
| Case studies | Past projects | Heritage retrofit case studies |
| Testimonials | What our clients say | Reviews from period property owners |
| Team | Built on a combined 45 years of heritage experience | Heritage retrofit specialists with 45 years' combined experience |
| FAQ | Questions? | Breathable insulation FAQs for heritage & listed buildings |
| Contact | Ready to protect your *building properly?* | Book a free heritage insulation assessment |

Heading levels: three problem cards and three case-study titles went `h4` → `h3`;
three footer column headings went `h5` → `h2`; four decorative "callout" lines went
`h4` → `p.callout-line`. CSS was updated alongside each so the rendering is
identical.

---

## Code cleanup

**`index.html`** — removed all commented-out markup: the hero overlay and grain
divs, an alternative hero benefit block, the explorer hint, eleven commented legend
dots, the layer-card id element and two commented wrapper divs, and a commented
trust-band item. Removed a duplicated nested `<div class="case-img">` in each of
the three case cards. Added `loading="lazy"` and `decoding="async"` to
below-the-fold images.

**`styles.css`** — 1,899 → 1,529 lines. Removed 95 rules with no matching markup
anywhere in the page: the entire grants section, process section, system-elements
section, stats band, team-origin block, the lead-form styles (the form was replaced
by the Brevo iframe), and assorted unused utilities. Every removal was verified
against the HTML first; a script confirmed no class still used in the page lost its
styling. Orphaned `@media` overrides for the removed components went too.

**`main.js`** — 383 → 333 lines, and roughly 90 lines of that was dead. Removed:
the stat-counter module (no element on the page has `data-count`), the lead-capture
form handler (no `#leadForm` exists), a large commented-out `LAYER_RECTS` block,
and a `console.log` firing on every page load. Merged the two scroll listeners.
Consolidated three near-duplicate modal-close handlers into one. Added a GA4
`whatsapp_click` event, because WhatsApp opens in a new tab and those enquiries
were otherwise invisible in your analytics — useful if anyone questions whether the
widget earns its place.

Comments have been added at each non-obvious change explaining what was altered and
why, so the reasoning survives in the code rather than only in this document.

---

## What I deliberately did not change

- **The visual design.** Every CSS edit restates the original values. The only
  intentional visual changes are the three case-study image crops (#10) and the
  solution heading (#12), both flagged above.
- **The Google Calendar booking widget's loading behaviour.** It could be deferred
  until the modal actually opens, which would be faster, but that is a behavioural
  change to a live booking flow and deserves testing rather than a blind edit.
- **The font loading.** See question 5.
- **Any copy beyond headings and the two new FAQ answers.** The new FAQ text is
  lifted from the wording already in your structured data, so it is yours.
- **The `65%` and `5.9 million` claims.** Repeated across the page and in the
  modals. If these are ever challenged you will want a source; worth adding one.

---

## Order of work — where it stands

| # | Item | Status |
|---|---|---|
| 1 | Create `/privacy-policy/` | **Drafted.** Needs legal review, ICO number, cookie banner decision |
| 2 | `robots.txt` and `sitemap.xml` | **Done.** Submit the sitemap in Search Console |
| 3 | Google Business Profile | **Integrated.** Verify NAP matches the site exactly |
| 4 | Pillar pages 1–4 | **Built.** Three live, `/technical/` pending its data |
| 5 | Repoint FAQ links to real URLs | **Done.** All six |
| 6 | Gloucestershire / Cotswolds / Bristol pages | **Done** |
| 7 | Convert hero image to WebP | Outstanding — largest speed win remaining |
| 8 | Fill the eight `Content needed` blocks on `/technical/` | Outstanding — blocking that page |
| 9 | Write the eight briefed guides | Outstanding |
| 10 | Host real downloads (NBS, CAD, BIM, datasheets) | Outstanding — the brief is explicit this is where competitors fail |
| 11 | Review the grants page | Diarise for early January 2027, when ECO4 has closed |

### After deploy

1. Submit `sitemap.xml` in Google Search Console and request indexing on the
   three live pillar pages.
2. Set up the `whatsapp_click` event as a GA4 conversion so the widget's
   contribution to enquiries is measurable.
3. Add the three location pages as service areas on the Google Business Profile.
4. Baseline your rankings now, before the new pages are indexed, so the effect is
   measurable rather than assumed.
5. Expect pillar pages to take roughly 3–6 months to establish. Location pages
   usually move faster.
