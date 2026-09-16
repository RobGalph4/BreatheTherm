# BreatheTherm — SEO & code review, change log

Review date: 16 September 2026
Files changed: `index.html`, `styles.css`, `main.js`
Nothing was changed for style reasons alone. Every item below has a stated reason.

---

## Read this first: two things to do before you deploy

1. **Create `/privacy-policy/`.** The footer link previously pointed at `#`, which
   goes nowhere. It now points at `/privacy-policy/`. If that page does not exist
   at deploy time you will have a 404 instead of a dead link — which is worse.
   Either publish the page or revert that one line.
2. **Check the images render.** Three case-study photos were being stretched to
   fill their frame because `object-fit` was missing. That is now fixed, so those
   three images will crop rather than distort. It is an improvement, but it is a
   visible change — look at it before you push.

One content accuracy note, not a code change: the grants FAQ cites ECO4, which
closes on 31 December 2026. The Warm Homes: Local Grant runs to March 2028 but is
**England only**, while the page says you serve the UK. Worth a copy review.

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

## Suggested order of work after deploy

1. Create `/privacy-policy/`. Blocking.
2. Convert the hero image to WebP. Largest single speed win left.
3. Add `robots.txt`, `sitemap.xml`, and claim a Google Business Profile.
4. Build pillar pages 1–4, repointing the FAQ links from anchors to real URLs.
5. Add Gloucestershire / Cotswolds / Bristol location pages.
6. Review the ECO4 reference before 31 December 2026.
