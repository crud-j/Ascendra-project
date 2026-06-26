# Ascendra — UI/UX Design System & Application Specification

### Part 6 of the Ascendra Documentation Series · Frontend Design Foundation

**Tagline:** Learn. Build. Contribute. Earn.
**Status:** Foundational design specification — authoritative for all UI work
**Companion to:** Part 1 — Master Architecture

---

## How to Read This Document

This is the design counterpart to the Master Architecture. Where Part 1 fixed the system's structure and economic invariants, this document fixes how those things look, feel, and behave on screen. It is organized as a real design system: foundations first (brand, color, type, space, motion, voice), then components, then the navigation shell, then every page screen-by-screen, then the quality bar (responsive, accessible, empty/loading/error states).

Two principles run through everything and are worth stating up front, because they are the decisions most expensive to reverse later.

**The Ascent Gradient is a meaning system, not a decoration.** The cool teal-to-violet gradient drawn from the logo's river encodes progression. It runs from teal (a brand-new Learner) up through blue and indigo (Builder, Contributor) to violet (Mentor, Expert, Master). Wherever a user's standing, level, or journey is shown, it is rendered on this gradient. The gradient is the visual spine of the product.

**Gold means earned value, and nothing else.** The champagne gold from the logo's peak is reserved for one job: signaling real, earned economic value — Skill Coins, rewards, achievements. Gold never appears as a generic accent, a button color for routine actions, or decoration. When gold appears on screen, it always means *you earned something real*. This visually enforces the architecture's cardinal distinction between progression (XP, Reputation) and value (Skill Coins): progression is cool and gradient, value is gold.

Everything below derives from these two rules.

---

## 1. Brand Foundation

### 1.1 The Logo and What It Means

The Ascendra mark is a stylized peak — two ascending strokes forming an "A" — with a luminous river climbing through it toward a star. The peak is rendered in champagne gold; the river runs the ascent gradient from a teal source at the base to a violet summit; a four-point star marks the destination. The wordmark sets ASCENDRA in a wide, confident geometric sans, with the central "E" drawn as three horizontal bars echoing the strata of the climb. The tagline — LEARN. BUILD. CONTRIBUTE. EARN. — sits beneath in champagne gold, spaced wide.

The mark is the product thesis in one image: a journey upward, from where you start to mastery, with the path itself glowing. Every design choice in this system serves that thesis.

### 1.2 Logo Usage

The primary logo is the horizontal lockup (mark plus wordmark plus tagline) for headers, marketing, and documents. The mark alone (the peak and river) is used where space is tight: the collapsed navbar, the app favicon, mobile, loading states, and as the avatar fallback motif.

Clearspace around the logo is a minimum of the height of the star on all sides. The logo is never recolored, stretched, rotated, given a drop shadow, or placed on a busy background that competes with the gradient river. On dark surfaces, the wordmark switches from ink to white; the gold and the ascent gradient stay exactly as they are, since they are the constant.

Minimum sizes: full lockup no smaller than 160px wide; mark alone no smaller than 24px. Below that, legibility of the river gradient breaks down and the mark should be replaced by a single-color silhouette.

### 1.3 Brand Personality

Ascendra is aspirational but grounded, premium but not exclusionary, serious about craft but warm to beginners. The voice is a knowledgeable mentor who believes in you and tells you the truth. In visual terms this means generous space, confident typography, restraint with color, and one moment of earned spectacle — the ascent gradient — rather than constant visual noise. The product should feel like a place where real effort is recognized, which is exactly what the economy is built to do.

---
## 2. Color System

Color in Ascendra is governed by the two rules in the introduction. This section gives the complete token set with concrete values. All tokens are expressed as CSS custom properties so they map directly to a Tailwind theme and shadcn's token model.

### 2.1 Brand Gold — Earned Value

Gold is the most disciplined color in the system. It appears only on Skill Coins, achievement moments, reward confirmations, and the few brand surfaces (logo, the single primary marketing CTA) where the brand itself is the subject. It is never a default button color.

| Token | Hex | Use |
|---|---|---|
| `--gold-700` | `#A8763C` | Gold text on light surfaces; coin outlines |
| `--gold-600` | `#BE9450` | Hover state for gold elements |
| `--gold-500` | `#D8B46C` | Primary brand gold — the Skill Coin color |
| `--gold-400` | `#E4CCA0` | Coin highlights, subtle reward fills |
| `--gold-300` | `#EFE0C4` | Champagne — reward backgrounds, badges |
| `--gold-100` | `#FAF4E8` | Cream wash — celebratory surface tint |

### 2.2 The Ascent Gradient — Progression

The ascent gradient is the product's signature. It is defined once and reused everywhere progression appears. The canonical stops:

| Token | Hex | Journey meaning |
|---|---|---|
| `--ascent-teal` | `#1488B8` | Source — new Learner (L1) |
| `--ascent-blue` | `#3C56B8` | Builder (L2–L3) |
| `--ascent-indigo` | `#2C46A0` | Core / Trusted Contributor |
| `--ascent-violet` | `#8C78DC` | Mentor / Expert (L4–L5) |
| `--ascent-violet-light` | `#A88EE8` | Master summit (L6) |

The canonical gradient definition:

```css
--gradient-ascent: linear-gradient(135deg,
  #1488B8 0%, #3C56B8 42%, #4A4FC0 64%, #8C78DC 100%);
```

A vertical variant (`180deg`) is used for progress bars that fill upward, reinforcing the climb. The gradient is used for: the hero, reputation level badges, XP and progress bars, the user's ascent visualization, active-state accents, and focus rings (a solid `--ascent-blue` for focus, since a gradient focus ring is hard to perceive).

### 2.3 Currency Colors

The three currencies have fixed, non-negotiable visual identities so a user can never confuse progression with money. This is the color grammar from the introduction made concrete.

| Currency | Visual identity | Token | Rationale |
|---|---|---|---|
| XP | Cool blue, a filling bar | `--ascent-blue` | Progress, non-precious, momentum |
| Reputation | Ascent gradient + level badge | `--gradient-ascent` | Standing/trust, earned, the journey itself |
| Skill Coins | Gold coin chip | `--gold-500` | Real value — the only gold currency |

A screen may show all three at once (the dashboard does). Because each has a distinct color and form, they stay legible side by side, and the gold coin always reads as the valuable one.

### 2.4 Semantic Colors

Standard feedback colors, tuned slightly warm so they sit comfortably with the gold-tinted neutrals rather than looking like stock Bootstrap.

| Token | Hex | Use |
|---|---|---|
| `--success` | `#2F9E6B` | Confirmation, passing tests, approved contributions |
| `--warning` | `#D9952B` | Caution; distinct from gold by being more saturated/orange |
| `--danger` | `#D2503C` | Errors, penalties, destructive actions |
| `--info` | `#2C7BD0` | Neutral informational notices |

Penalties in the economy (spam, abuse, plagiarism deductions from Reputation) always use `--danger`, never gold, since they concern loss of standing, not money.

### 2.5 Neutrals — Ink and Surface

Neutrals are warm, not pure gray, so they harmonize with the champagne palette. This warmth is subtle but it is what keeps the product from feeling cold or generic.

| Token | Hex | Use |
|---|---|---|
| `--ink-900` | `#15161A` | Primary text, wordmark |
| `--ink-700` | `#3A3D45` | Secondary text, headings on light |
| `--ink-500` | `#6B6F7A` | Tertiary text, captions, placeholders |
| `--ink-300` | `#B8BCC6` | Disabled text, subtle icons |
| `--line` | `#E8E4DB` | Borders, dividers (warm-tinted) |
| `--surface` | `#FFFFFF` | Cards, panels, raised content |
| `--canvas` | `#FBFAF7` | App background (warm off-white) |
| `--canvas-sunken` | `#F4F2EC` | Recessed wells, code blocks, inputs |

### 2.6 Dark Mode

Dark mode keeps gold and the ascent gradient exactly as they are — they are the constants — and remaps ink and surface. Backgrounds are a deep, slightly blue-black rather than pure black, so the gradient and gold glow against them.

| Token | Hex |
|---|---|
| `--canvas` (dark) | `#0E0F14` |
| `--surface` (dark) | `#181A21` |
| `--canvas-sunken` (dark) | `#101218` |
| `--line` (dark) | `#262932` |
| `--ink-900` (dark) | `#F4F3EF` |
| `--ink-500` (dark) | `#9A9EA9` |

The ascent gradient is slightly brightened in dark mode (raise each stop's luminance ~8%) so it doesn't muddy against the dark canvas. Gold is left unchanged; on dark it reads as genuinely luminous, which suits its "earned value" meaning.

---
## 3. Typography

### 3.1 Typefaces

Three typefaces, each with a clear job. The pairing is chosen for this brief specifically: a geometric display face that echoes the wordmark's confident ascent, a humanist body face that stays warm and legible across long learning content, and a monospace for code and for the numeric precision of currency figures.

**Display — Sora.** A geometric sans with a slightly futuristic, upward feel. Used for headings, hero copy, page titles, and large numbers. Set tight with deliberate tracking on all-caps eyebrows to echo the logo wordmark. Weights: 600 (semibold) and 700 (bold) for display; 800 reserved for the hero only.

**Body — Hanken Grotesk.** A humanist grotesque, warmer and more readable than the ubiquitous default sans, excellent for paragraphs of lesson content and UI labels. Weights: 400 (regular), 500 (medium for emphasis and labels), 600 (semibold for small headings). *Inter is an acceptable fallback if Hanken Grotesk is unavailable, but Hanken is the intended voice.*

**Mono — JetBrains Mono.** For the code editor (the learning engine runs code through Judge0), inline code, and — deliberately — for all currency and data figures. Rendering XP totals, Skill Coin balances, and reputation numbers in mono gives them a precise, ledger-like quality that suits an economy built on append-only ledgers. Weight 400 and 500.

### 3.2 Type Scale

A modular scale (ratio ~1.25) anchored at a 16px base. Sizes in rem; line-heights tuned per role.

| Role | Font | Size | Line height | Weight | Tracking |
|---|---|---|---|---|---|
| Display / Hero | Sora | 3.5rem (56px) | 1.05 | 800 | -0.02em |
| H1 / Page title | Sora | 2.5rem (40px) | 1.1 | 700 | -0.015em |
| H2 / Section | Sora | 1.875rem (30px) | 1.2 | 700 | -0.01em |
| H3 / Subsection | Sora | 1.375rem (22px) | 1.3 | 600 | 0 |
| Eyebrow / Overline | Sora | 0.8125rem (13px) | 1.2 | 600 | 0.12em (uppercase) |
| Body Large | Hanken | 1.125rem (18px) | 1.6 | 400 | 0 |
| Body | Hanken | 1rem (16px) | 1.6 | 400 | 0 |
| Body Small | Hanken | 0.875rem (14px) | 1.5 | 400 | 0 |
| Label | Hanken | 0.875rem (14px) | 1.4 | 500 | 0.01em |
| Caption | Hanken | 0.75rem (12px) | 1.4 | 400 | 0.01em |
| Numeric / Currency | JetBrains Mono | varies | 1 | 500 | 0 |

Body text never exceeds ~68 characters per line in reading contexts (lesson content, articles), enforced with a `max-width` measure. Long-form learning content uses Body Large for comfort.

### 3.3 Typographic Rules

Headings use sentence case in the application (calmer, more conversational, matches the voice) and may use uppercase only for short eyebrow labels. The all-caps wide-tracked treatment is a brand signature reserved for eyebrows and the tagline, not body headings. Numbers that represent currency are always mono and always include a currency glyph or label so the three currencies are never ambiguous.

---

## 4. Spacing, Layout, and Form

### 4.1 Spacing Scale

A 4px base unit with a consistent scale. Using a single scale everywhere is what makes the product feel calm and deliberate rather than ad hoc.

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128` (px)

Tokens: `--space-1` (4px) through `--space-10` (128px). Component padding, gaps, and section rhythm all draw from this scale exclusively.

### 4.2 Layout Grid

The marketing site and the application use a 12-column grid with a 1200px max content width and 24px gutters. Generous outer margins on large screens give the premium, unhurried feel. The application shell reserves a fixed left rail for navigation (see Section 11) and flows content in the remaining space, itself gridded to 12 columns.

### 4.3 Breakpoints

| Name | Min width | Layout behavior |
|---|---|---|
| `sm` | 640px | Single column, stacked nav becomes a drawer |
| `md` | 768px | Two-column cards; sidebar still collapsible |
| `lg` | 1024px | App sidebar persistent; multi-column dashboards |
| `xl` | 1280px | Full 12-col layouts, max content width applies |
| `2xl` | 1536px | Centered with wide margins |

Mobile-first: every screen is designed for 360–390px first, then enhanced upward. Section 23 details the mobile patterns.

### 4.4 Corner Radius

Radii are soft but not rounded to the point of looking playful — this is a premium product, not a toy.

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 6px | Inputs, small buttons, chips |
| `--radius-md` | 10px | Buttons, cards, dropdowns |
| `--radius-lg` | 16px | Large cards, modals, panels |
| `--radius-xl` | 24px | Hero cards, feature tiles |
| `--radius-full` | 9999px | Avatars, coin chips, pills |

### 4.5 Elevation

Shadows are soft, warm-tinted (a hint of the ink color rather than pure black), and used sparingly. Most separation is achieved with the warm `--line` border and surface contrast, not shadow. Shadow is reserved for genuinely floating elements.

| Token | Use |
|---|---|
| `--shadow-sm` | Cards on hover, subtle lift |
| `--shadow-md` | Dropdowns, popovers |
| `--shadow-lg` | Modals, command palette |
| `--shadow-glow` | A soft gold glow, reserved for reward/achievement moments only |

`--shadow-glow` is the visual reward signal — a gentle gold halo that appears when Skill Coins are earned. Like gold itself, it is rationed.

---
## 5. Iconography, Imagery, and Motion

### 5.1 Iconography

A single icon family, line-based, 1.75px stroke, rounded joins, on a 24px grid — Lucide is the recommended set (it ships with shadcn and matches the geometric-yet-warm tone). Icons are `--ink-500` by default, `--ink-900` when active, and never gold unless they sit on a coin or reward. Custom icons are needed for the three currencies and the core loop verbs (Learn, Build, Contribute, Earn); these are drawn in the same line style with the ascent gradient or gold applied per the color grammar.

### 5.2 Imagery and Illustration

Photography, where used (marketing, mentor profiles), is warm, natural-light, real people doing real work — never stock-clichéd "business handshake" imagery. Illustration leans abstract and topographic: contour lines, peaks, paths, and the ascent gradient, echoing the logo's mountain-and-river metaphor. Avoid generic tech illustration (floating laptops, gradient blobs). The topographic motif is the brand's illustrative signature and appears as subtle background texture on the hero, empty states, and achievement screens.

### 5.3 Motion Language

Motion is purposeful and quick. The product should feel responsive, not animated-at. Three motion roles:

**Functional motion** (150–200ms, ease-out): state changes, hovers, dropdowns, page transitions. Fast enough to feel instant.

**Progression motion** (400–600ms, ease-in-out): XP bars filling, the ascent visualization climbing, level-up transitions. Slightly slower because the user should *see* progress happen — this is the emotional core of the product.

**Reward motion** (600–900ms, custom spring): the Skill Coin earn moment. A coin animates in with the gold glow, the balance counts up in mono, a subtle particle or shimmer plays once. This is the single most lavish animation in the product and it is rationed to genuine earning events, consistent with the rule that gold means earned value.

All motion respects `prefers-reduced-motion`: progression and reward animations collapse to a simple fade and an instant value update, never removed entirely (the user still learns they earned something) but stripped of movement.

---

## 6. Voice, Tone, and UX Writing

The interface speaks like a mentor who is honest and on your side. Principles, with examples:

**Name things by what the user controls.** "Your contributions," not "contribution records." "Coins you've earned," not "minted assets." The architecture's internal vocabulary stays internal.

**Active voice, consistent verbs.** A button that says "Publish answer" leads to a toast that says "Answer published." The verb for earning is always "earn," never "receive" or "be awarded" — earning implies the effort the economy is built to honor.

**Honor the cardinal rule in the copy.** The product never implies you can buy your way up or earn coins by consuming. Microcopy around learning says "Earn XP"; microcopy around contribution says "Earn Skill Coins." The language teaches the economy's logic without a tutorial.

**Failure gives direction, not apology.** "That code didn't pass all tests yet — 3 of 5 passed. Check the edge cases for empty input." Not "Oops! Something went wrong."

**Empty states invite action.** "No contributions yet. Answer your first question to earn your first Skill Coin." Every empty state names the single next action and ties it to a reward where one exists.

**Celebrate proportionally.** A lesson completion gets a quiet "+25 XP." A first Skill Coin earned gets the full reward moment. The intensity of the celebration matches the significance of what was earned.

---
## 7. Core Components

These are the standard building blocks, built on shadcn/ui primitives and themed with the tokens above. Each entry notes its variants and states. Every interactive component must have visible `:hover`, `:focus-visible` (a 2px `--ascent-blue` ring with 2px offset), `:active`, and `:disabled` states.

### 7.1 Buttons

| Variant | Appearance | Use |
|---|---|---|
| Primary | Solid `--ink-900` fill, white text | The main action on most screens |
| Ascent | Ascent-gradient fill, white text | Progression actions: start a course, level up, continue |
| Gold | Gold fill, ink text, subtle glow on hover | Reserved for value actions: withdraw coins, claim reward, the one marketing CTA |
| Secondary | `--surface` fill, `--line` border, ink text | Secondary actions |
| Ghost | Transparent, ink text, tinted hover | Low-emphasis actions, toolbar buttons |
| Danger | `--danger` fill or text | Destructive actions |

Sizes: sm (32px), md (40px, default), lg (48px). Buttons show a spinner in place of their label when loading and become non-interactive. The Gold variant is never used for routine actions — its scarcity is what makes it meaningful.

### 7.2 Inputs and Forms

Text inputs, textareas, selects, comboboxes, date pickers, and toggles all share: `--canvas-sunken` fill, `--line` border, `--radius-sm`, 40px height, 12–16px padding. Focus raises the border to `--ascent-blue` and adds the focus ring. Labels sit above the field in the Label style; helper text below in Caption; error text replaces helper text in `--danger` with a small icon. Required fields are marked with the word "required" in caption, not a bare asterisk. Validation is inline and on blur, not only on submit.

### 7.3 Cards

The workhorse container: `--surface` fill, `--line` border, `--radius-lg`, no shadow at rest, `--shadow-sm` and a 1px upward translate on hover when interactive. Cards have a consistent internal padding (`--space-5`, 24px) and a clear hierarchy of title, body, and footer/actions. Specialized cards (course, mentor, contribution) extend this base — see Section 8.

### 7.4 Badges, Chips, and Pills

Badges label status (Published, In review, Approved) using semantic colors at low opacity with a colored text. Chips are removable filter tokens. Pills are non-interactive labels. The reputation-level badge and the Skill Coin chip are special cases covered in Section 8 and follow the color grammar (gradient and gold respectively).

### 7.5 Navigation Components

Tabs (underline style, active tab marked with a 2px ascent-gradient underline), breadcrumbs (slash-separated, last item ink-900), pagination, and a command palette (⌘K) for power users to jump to any course, person, or page. The command palette is a first-class navigation method given the breadth of the product.

### 7.6 Overlays

Modals (`--radius-lg`, `--shadow-lg`, scrim at 40% ink, centered, max 560px for dialogs), drawers (slide from right for detail panels, from left for mobile nav), popovers, tooltips (dark, small, 200ms delay), and toasts (bottom-right on desktop, top on mobile; success/info/danger variants; the Skill Coin earn toast is the gold reward variant).

### 7.7 Data Display

Tables (used in wallet history, leaderboards, admin) with sticky headers, zebra-free rows separated by `--line`, right-aligned mono for numeric columns. Avatars (circular, with the peak-mark fallback and a gradient ring whose color reflects the person's reputation level). Tooltips and skeletons (Section 24) round out the set.

---

## 8. Signature Components

These are unique to Ascendra and carry the product's identity. They are where the color grammar and the economy become tangible.

### 8.1 Currency Displays

A consistent trio used in the navbar, dashboard, and profile. Each is a small mono figure with its currency's identity:

- **XP display:** a small blue bar icon + mono number, e.g. `2,450 XP`. Tapping opens the XP detail (level progress).
- **Reputation display:** the level badge (8.2) + mono number, e.g. `L4 · 1,240`. The number sits on the ascent gradient's current position.
- **Skill Coin display:** a gold coin glyph + mono number, e.g. `◈ 38`. Always gold. Tapping opens the wallet.

The three are visually distinct enough to never be confused, which is the entire point.

### 8.2 Reputation Level Badge

The most identity-defining component. A hexagonal or shield badge whose fill is the ascent gradient *sampled at the user's level position* — an L1 Learner's badge is teal, an L6 Master's is full violet. The badge shows the level number (L1–L6) and, on hover or in profile, the level name (Learner, Contributor, Trusted Contributor, Mentor, Expert, Master) and the reputation thresholds. This single component makes a person's standing instantly legible anywhere they appear — in answers, mentor cards, leaderboards, and their profile.

### 8.3 XP Progress Bar

A horizontal bar filled with the ascent gradient (horizontal variant), showing progress toward the next level. The fill animates with progression motion when XP is earned. A mono label shows current/next threshold. Used on the dashboard and profile. Distinct from the Skill Coin display because it is a *bar* (progress) not a *coin* (value).

### 8.4 Skill Coin Chip and Earn Moment

The coin chip is a gold pill with a coin glyph and mono amount. The **earn moment** is the product's signature animation (Section 5.3): on a validated contribution, a coin animates in with the gold glow, the balance counts up, and a toast confirms what was earned and why ("+3 Skill Coins for an approved project review"). Because coins come only from contribution, this moment is always tied to an act of helping someone — the copy always names the contribution, reinforcing the cardinal rule.

### 8.5 The Ascent Visualization

A signature dashboard element: a vertical or diagonal path rendered in the ascent gradient, with the user's current position marked by a glowing node and a star at the summit (mastery). Past milestones sit below as filled nodes; upcoming ones above as outlined nodes. It visualizes the entire journey from Learner to Master in one glance and is the emotional anchor of the dashboard. It is decorative-functional: it shows real progression data, not a generic graphic.

### 8.6 Course Card

`--surface` card with: a topographic-textured thumbnail tinted with the course track's accent, a difficulty badge (Easy/Medium/Hard mapped to XP), title, short description, instructor avatar + name, meta row (lesson count, estimated time, XP available), and a progress bar if started. Hover lifts the card and reveals a "Continue" or "Start" ascent button. The XP figure is shown because XP is what learning earns — coins are never shown on a course card, since learning never earns coins.

### 8.7 Contribution Card

Used in the community/contribution hub. Shows the contribution type (question, answer, review, article), a title/excerpt, the author's level badge, vote/accept status, and — critically — the Skill Coin and Reputation it earned or can earn, in gold and gradient respectively. This is where coins legitimately appear, and the card teaches that contribution is their source.

### 8.8 Mentor Card

Mentor's avatar with reputation-gradient ring, name and level badge (mentors are L4+), specialties as chips, session rate shown in Skill Coins (gold), availability, and rating. A "Book session" ascent button. The level badge being L4+ visually communicates that mentoring is an earned capability, not a purchased one.

### 8.9 Streak and Quest Components

A streak indicator (flame or ascending-dots motif, not gold — streaks are momentum, not value) and daily/weekly/monthly quest cards showing the quest, progress, and the XP reward. Quests reward XP, never coins, and the components reflect that by using blue, not gold.

### 8.10 Leaderboard Row

Rank, avatar with gradient ring, name, level badge, and the relevant metric (reputation for the trust leaderboard, XP for the learning leaderboard, never a "coins leaderboard" — wealth is private; standing is public). This is a deliberate product-values decision expressed in a component: the platform celebrates contribution and learning publicly, not accumulated money.

---
## 9. Navigation Shell

### 9.1 Top Navigation Bar

The navbar has two distinct states depending on whether the visitor is signed in.

**Guest navbar (marketing).** A transparent bar over the hero that gains a `--surface` background and `--line` bottom border on scroll. Left: the full logo lockup. Center: primary links — Courses, How it works, Mentors, Pricing, Community. Right: a Ghost "Log in" button and an Ascent "Get started" button. On mobile it collapses to the mark plus a hamburger that opens a left drawer.

```
┌──────────────────────────────────────────────────────────────┐
│  [▲ ASCENDRA]   Courses  How it works  Mentors  Pricing  ...  │
│                                          [Log in] [Get started]│
└──────────────────────────────────────────────────────────────┘
```

**Authenticated navbar (application).** A persistent `--surface` bar with `--line` border. Left: the mark (compact) plus a global search / command-palette trigger (⌘K) that searches courses, people, and content. Center-right: the three currency displays (XP, Reputation level badge, Skill Coins) — always visible, because the economy is the heart of the product and the user should always know where they stand. Right: a notifications bell with unread count, and the profile avatar (with reputation-gradient ring) opening a menu.

```
┌──────────────────────────────────────────────────────────────┐
│ [▲]  ⌘ Search…        2,450 XP   ◆ L4·1,240   ◈ 38   🔔  (◐)  │
└──────────────────────────────────────────────────────────────┘
```

The profile menu contains: View profile, Wallet, Settings, Switch to dark mode, Help, and Log out. If the user holds an elevated role (Mentor, Moderator, Instructor, Administrator) the relevant workspace link appears here, since roles are earned capabilities surfaced contextually.

### 9.2 Application Sidebar

On `lg` and up, authenticated areas show a persistent left rail (240px, collapsible to a 64px icon rail). Sections, grouped:

- **Learn:** Dashboard, My courses, Browse catalog, Quests
- **Contribute:** Community, My contributions, Reviews
- **Connect:** Mentors, Guilds, Projects & bounties
- **Earn:** Wallet, Marketplace

The active item carries a 2px ascent-gradient left indicator and an ink-900 label. The rail collapses to icons with tooltips on smaller screens and becomes the mobile drawer below `lg`. Grouping by the four loop verbs (Learn, Contribute, Connect, Earn) makes the navigation itself teach the core loop.

### 9.3 Footer

Marketing footer on `--ink-900` with white text and the logo in its dark-surface treatment. Columns: Product (Courses, Mentors, Pricing, Community), Company (About, Careers, Blog), Resources (Docs, Help, Status), Legal (Terms, Privacy, Cookie settings). A bottom row with the tagline, locale/currency selector, and social links. The topographic motif appears faintly behind the footer as brand texture.

---
## 10. Landing Page

The landing page has one job: convince a visitor that effort here is recognized and rewarded, and get them to start. It tells the story of the loop — Learn, Build, Contribute, Earn — and uses the ascent gradient as its hero. Sections top to bottom:

### 10.1 Hero

Full-viewport, the ascent gradient as an atmospheric background (the topographic peak motif subtly embossed). The headline is the thesis in confident display type: a promise about climbing from learner to mastery and earning real value for what you contribute. A supporting line explains the loop in one sentence. Two CTAs: an Ascent "Start climbing" (primary) and a Ghost "See how it works" that scrolls to the loop section. Beneath, a quiet trust line (learner count, courses, mentors) in mono. The hero animation: on load, the gradient river "draws" upward toward the star over ~800ms, performed once, reduced-motion-safe.

The hero deliberately avoids the templated "big number + gradient blob" pattern. Its signature is the drawing-river animation and the topographic depth, both pulled from the logo.

### 10.2 The Loop (How It Works)

The core differentiator, shown as a genuine cycle — Learn → Build → Contribute → Earn → (become a mentor) → back to teaching others. Four stages laid along an ascending path, each with an icon, a verb, and a sentence. This is the one place numbered/sequential markers are honest, because the loop genuinely is a sequence. The Earn stage explicitly states the cardinal rule in plain language: you earn Skill Coins by contributing, not just by learning. This sets the product apart from every "earn while you learn" competitor and is stated proudly.

### 10.3 The Three Currencies

A three-column explainer introducing XP, Reputation, and Skill Coins with their visual identities (blue bar, gradient badge, gold coin). Each column says what the currency is for in one line: XP measures progress, Reputation measures trust, Skill Coins hold real value. This primes the visitor to understand the economy before they sign up, and the color grammar they learn here carries into the app.

### 10.4 Courses Preview

A horizontally scrollable row of real Course Cards across tracks, with a "Browse all courses" link to the catalog. Shows breadth and quality of content.

### 10.5 For Mentors / Earn Section

A band aimed at experienced people: contribute, mentor, and earn Skill Coins you can withdraw. Shows a mentor card and a withdrawal figure (the one place gold is used persuasively on marketing). Reinforces that the platform pays for genuine expertise.

### 10.6 Social Proof

Testimonials from learners who became mentors (the loop completing), each with their level badge showing real progression. Optionally logos of partner organizations or a wall of recent achievements.

### 10.7 Pricing Teaser

A condensed two- or three-tier strip linking to the full pricing page, so price-motivated visitors can jump straight there.

### 10.8 Final CTA

A full-width ascent-gradient band repeating the core promise with a single "Start climbing" button, and the footer below.

---

## 11. Registration and Onboarding

Registration is a guided climb, not a form wall. It is split into small steps with a progress indicator (rendered, of course, as a small ascent path).

### 11.1 Sign-Up Screen

A focused, centered card on a `--canvas` background with the topographic motif faint behind it. Options: continue with Google/GitHub (OAuth, fastest for the developer-leaning audience), or email + password. Password requirements are shown inline as the user types, with positive checkmarks rather than red errors. A single clear "Create account" Ascent button. Legal copy in caption beneath. A link to log in for returning users.

### 11.2 Onboarding Flow

After account creation, a 3–4 step flow that ends with the user already inside the loop:

1. **Welcome + name.** A warm welcome, set display name and optional avatar. The mark animates a small ascent.
2. **Choose your starting point.** Pick interests/tracks (web, data, design, etc.) as selectable chips. This seeds recommendations. Pick a goal (learn a skill, build a portfolio, mentor and earn) — this lightly tailors the dashboard emphasis.
3. **Your first quest.** The user is handed a concrete first action — a short first lesson — framed as the first step of the climb, with the XP it will earn shown. This gets them to the activation moment (first XP earned) within minutes.
4. **You're set.** Drops them on the dashboard with the first quest queued and the ascent visualization showing them at the very base, summit far above. The emptiness is intentional and motivating: the whole climb is ahead.

Onboarding never asks for payment. The free core is real; monetization is contribution- and premium-based, surfaced later and contextually.

---

## 12. Login

A focused centered card matching sign-up. Email + password with inline validation, OAuth options, a "Remember me" toggle, and a prominent "Forgot password" link. Errors are specific and kind ("We don't recognize that email and password combination" rather than revealing which field was wrong, for security). A magic-link option ("Email me a sign-in link") is offered as a passwordless path. Successful login routes to the dashboard or to the page the user originally requested. The screen respects the same topographic-motif background and brand calm as sign-up so the two feel like one system.

---
## 13. Dashboard

The dashboard is the authenticated home — the place the user lands every session. Its job is to answer three questions instantly: where am I in my climb, what should I do next, and what have I earned. It uses the app shell (navbar + sidebar) with a 12-column content area.

### 13.1 Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Good morning, Maya.                    [Ascent visualization]  │
│ Level 4 · Mentor · 1,240 reputation     ╱ summit              │
│                                        ╱  ● you are here       │
│ ┌─ Continue learning ──────────────┐  ╱   ○                    │
│ │ [Course card · 60% · Continue]   │ ●    ○                    │
│ └──────────────────────────────────┘                          │
│ ┌─ Today's quests ─────────────────┐ ┌─ Wallet ─────────────┐ │
│ │ ▸ Daily: complete 1 lesson +50XP │ │ ◈ 38 Skill Coins     │ │
│ │ ▸ Weekly: 3 contributions  +250  │ │ 2,450 XP · L4 1,240  │ │
│ └──────────────────────────────────┘ └──────────────────────┘ │
│ ┌─ Ways to earn (contribution) ────┐ ┌─ Activity ───────────┐ │
│ │ Questions you can answer…        │ │ recent earns & events│ │
│ └──────────────────────────────────┘ └──────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### 13.2 Key Modules

**Greeting + standing.** A personal greeting, current level, name of level, and reputation, with the level badge. Sets the tone: you, specifically, on your climb.

**Ascent visualization.** The signature component (8.5), top-right and prominent, showing the user's position on the journey. This is the dashboard's emotional anchor.

**Continue learning.** The single most important next learning action — the in-progress course or the next lesson — as a prominent card with a one-click Continue. Reduces friction to the activation behavior.

**Today's quests.** Daily/weekly/monthly quests with progress and XP rewards (blue, never gold). Drives daily return.

**Wallet snapshot.** A compact view of all three currencies, with the Skill Coin balance in gold. Links to the full wallet.

**Ways to earn.** A contribution-opportunity feed: questions in the user's skill areas they could answer, reviews they could give, bounties they could claim — each showing the Skill Coins and Reputation it would earn. This is the dashboard module that drives the contribution side of the loop, and it is deliberately prominent because contribution is what makes the economy work. For a new Learner with no contribution ability yet, this module instead shows what they'll unlock and the reputation needed.

**Activity.** A recent feed of earns and events, each tied to its cause, reinforcing the link between action and reward.

### 13.3 Role-Adaptive Dashboard

The dashboard adapts to earned roles. A Mentor sees a "Your sessions" module and booking requests; a Moderator sees a review queue; an Instructor sees their course performance. These appear only when the role is held, because roles are earned capabilities, and the UI reveals them progressively rather than showing locked features everywhere.

---

## 14. Courses — Catalog

### 14.1 Browse / Catalog Page

The catalog helps a learner find the right next climb. Layout: a left filter rail and a responsive grid of Course Cards.

Filters: track/category, difficulty (Easy/Medium/Hard), duration, and status (not started / in progress / completed). A prominent search field with instant results. Sort options: recommended (personalized), newest, most popular, highest XP. A row of track "pills" across the top for quick category jumps. The grid is 3-up on `xl`, 2-up on `md`, 1-up on mobile. Each card follows 8.6 and shows XP available — never coins.

Empty/zero-result state offers to broaden filters and suggests popular courses, in the interface's voice.

### 14.2 Course Detail Page

The page that convinces a learner to start and orients them once they have.

```
┌──────────────────────────────────────────────────────────────┐
│ [Track]  Course Title                         ┌─────────────┐ │
│ One-line outcome promise.                      │ Start /     │ │
│ Instructor · level badge · rating              │ Continue    │ │
│                                                │ XP available│ │
│ ┌─ What you'll build ──────────────┐           │ Lessons: 24 │ │
│ │ outcomes, prerequisites          │           │ ~6 hours    │ │
│ └──────────────────────────────────┘           └─────────────┘ │
│ ┌─ Curriculum (modules → lessons) ─────────────────────────┐  │
│ │ ▸ Module 1  ··· lessons with per-lesson XP and lock state │  │
│ │ ▸ Module 2  ···                                          │  │
│ └──────────────────────────────────────────────────────────┘  │
│ Instructor bio · Reviews · Related courses                    │
└──────────────────────────────────────────────────────────────┘
```

A sticky enrollment/continue panel on the right shows XP available, lesson count, estimated time, and a single primary action. The curriculum lists modules and lessons with each lesson's XP and its lock state (locked lessons show the prerequisite). Below: what you'll build, prerequisites, instructor bio with level badge, learner reviews, and related courses. Progress is shown inline once started.

---
## 15. Lesson Player — The Learning Engine

Where learning actually happens, and where the first reward of the loop (XP) is earned. The layout is focused and distraction-free.

### 15.1 Layout

A three-zone layout on desktop: a collapsible left curriculum rail (where you are in the course), a central content area, and — for coding lessons — a right code panel. On mobile these stack and the curriculum becomes a drawer.

```
┌───────────┬───────────────────────────┬──────────────────────┐
│ Curriculum│  Lesson content           │  Code editor          │
│ ▸ done    │  (video / text / diagram) │  ┌─ editor ──────────┐│
│ ▸ ● here  │                           │  │ write solution…   ││
│ ▸ locked  │  ── instructions ──       │  └───────────────────┘│
│           │                           │  [Run]  [Submit]      │
│           │  [Mark complete / Next]   │  test results ✓✓✓✗✗   │
└───────────┴───────────────────────────┴──────────────────────┘
```

### 15.2 Content Types

Lessons support video (with transcript and chapter markers), rich text/article content (set in Body Large for comfortable reading, measure-limited), diagrams, and interactive code challenges. Code challenges run against Judge0: the learner writes a solution, runs it against visible tests, and submits for the full hidden suite. Test results show pass/fail per case with kind, specific guidance on failures (per the voice principles), never a bare "wrong."

### 15.3 The XP Earn Moment

On first completion (lesson finished or all tests passing), the lesson awards XP with progression motion: a "+25 XP" indication, the XP bar in the navbar animates its fill, and if the award crosses a level threshold, a level-up moment plays — the level badge advances along the ascent gradient and a quiet celebration acknowledges the new standing. This is XP, so it is blue/gradient, not gold; no coins are minted by learning, and the absence of gold here is deliberate and consistent. The next lesson is offered immediately to maintain momentum.

### 15.4 Progress and Resume

The player always knows where the learner left off and offers a one-click resume from the dashboard and course page. Completion state syncs to the curriculum rail in real time.

---

## 16. Community and Contribution Hub

This is the engine of the economy — the only place Skill Coins are born — so its design makes contribution feel valued and visible. It covers questions and answers, project reviews, and articles.

### 16.1 Layout

A feed of contribution opportunities and discussions with a left filter rail (by topic, type, unanswered, bountied) and a right rail showing the user's contribution stats and reputation progress. Each item is a Contribution Card (8.7) showing the type, excerpt, author level badge, status, and the Reputation and Skill Coins it earned or can earn.

### 16.2 Asking and Answering

A question composer (rich text + code blocks) with topic tagging. Answers support the same. When an answer is accepted, the answerer earns Reputation (+15) and a Skill Coin, shown with the earn moment and copy naming the contribution. The UI structurally prevents self-acceptance (the accept control is absent on your own answers), making the economic invariant visible as an interface rule.

### 16.3 Reviews and Articles

Project reviews present the work and a structured review form; an approved, helpful review earns Reputation (+20) and Skill Coins. Articles are long-form knowledge contributions that, once published and accepted, earn Reputation (+50). Each contribution type's reward is shown transparently so contributors always know what their effort is worth.

### 16.4 Contribution Gating

Brand-new Learners with low reputation see contribution opportunities but some require a reputation threshold to unlock (anti-spam). The UI frames locks as "earn N reputation to unlock," tying the gate to the progression system rather than presenting a hard wall.

---

## 17. Mentor Marketplace

Where earned expertise becomes bookable. Mentors are L4+ (an earned capability), and the marketplace makes that legible.

### 17.1 Browse Mentors

A grid of Mentor Cards (8.8) with filters for specialty, availability, rate (in Skill Coins), and rating. Each card shows the mentor's level badge (always L4+), specialties, rate in gold, and a "Book session" action. Search and sort by relevance, rating, or rate.

### 17.2 Mentor Profile and Booking

A mentor profile shows their reputation journey, specialties, reviews from past mentees, availability calendar, and rate. Booking flows through a scheduling step and confirms the Skill Coin cost up front. After a session, both parties confirm completion (the dual-confirmation invariant from the architecture), which is what releases the mentor's Skill Coin earning — the UI requires both confirmations before the earn moment fires, surfacing the invariant as a visible step.

### 17.3 Becoming a Mentor

A learner who reaches L4 sees an invitation to enable mentoring — set specialties, rate, and availability. This is the loop completing: a learner becomes a teacher. The flow celebrates the milestone, because reaching mentor status is one of the most significant climbs in the product.

---

## 18. Projects and Bounties Marketplace

Where real work and real Skill Coins meet. Posters fund bounties; solvers earn coins and reputation.

### 18.1 Browse and Detail

A board of bounties with reward (in Skill Coins), difficulty, required skills, and status (open, claimed, completed). A detail page describes the work, the reward held in escrow, and the acceptance criteria. Filters by skill, reward range, and status.

### 18.2 Claim and Completion Flow

A solver claims a bounty, submits work, and on approval the escrow releases (real money, via the payment providers) alongside a Skill Coin earn. The UI shows escrow state clearly so both parties trust the process: funded, claimed, in review, released. Money movement and coin minting are shown as distinct events, matching the architecture's separation of the two.

---
## 19. Profile and Reputation Page

A user's profile is the public record of their climb. It is the most identity-rich page in the product.

### 19.1 Layout and Content

A header with the avatar (reputation-gradient ring), name, level badge, level name, and reputation total. A prominent ascent visualization showing their full journey. Tabs or sections for: contributions (their answers, reviews, articles, with the reputation each earned), courses completed (with XP), skills demonstrated, mentor info if applicable, and achievements. Reputation is shown as a public trust signal; the Skill Coin balance is *not* shown publicly — wealth is private, standing is public, a deliberate values decision repeated from the leaderboard design.

### 19.2 Own vs Others' Profiles

Viewing your own profile adds edit controls and private insight (reputation breakdown, progress to next level). Viewing another's shows the public record and, for mentors, a booking entry point. The level badge and ascent visualization make anyone's standing instantly readable, which is the social currency the platform runs on.

---

## 20. Wallet and Skill Coins

The private home of the user's real value. Gold lives here.

### 20.1 Layout

A header showing the Skill Coin balance large, in gold mono, with the gold glow treatment. Below: actions (withdraw, view on-chain), and a transaction ledger. The ledger is a table with each entry's date, type (earned from contribution X, spent on session Y, withdrawn), amount (gold mono, signed), and a link to the cause. Because the architecture is ledger-based and append-only, the wallet history is presented as exactly that — a clear, trustworthy record.

### 20.2 Withdrawal and On-Chain

Withdrawal flows through the payment providers with clear fee and threshold disclosure. An "on-chain" view links each anchored coin entry to its blockchain record (the architecture anchors coins to Aptos), letting users verify ownership independently — surfaced as a subtle "verified on-chain" indicator rather than crypto jargon, keeping the experience approachable. XP and Reputation also appear in the wallet as separate, clearly non-withdrawable balances, reinforcing that only Skill Coins hold transferable value.

---

## 21. Guilds

Collaborative learning groups. A guild page shows members (with level badges), shared goals, events/competitions, and a guild leaderboard. Guild event winners earn Skill Coins (a legitimate contribution-adjacent source). The design emphasizes belonging and friendly competition, using the ascent gradient for guild progress and gold only for actual event rewards.

---

## 22. Pricing

The pricing page converts intent into commitment while staying honest about the free core.

### 22.1 Structure

A clear tier comparison. The free tier is genuinely useful (the core loop, learning, contributing, earning coins) — this is stated proudly, since the contribution economy, not a paywall, is the growth engine. Paid tiers add things like unlimited course access, advanced AI features (the AI personas from the architecture), priority mentor matching, and team/organization features.

```
┌──────────────┬──────────────┬──────────────┐
│   Explorer    │   Climber     │   Summit      │
│   Free        │   $X/mo       │   $Y/mo       │
│  core loop    │  + premium    │  + teams/AI   │
│  [Start free] │  [Choose]     │  [Choose]     │
└──────────────┴──────────────┴──────────────┘
```

Tier names echo the climbing metaphor (Explorer, Climber, Summit). The recommended tier is marked with an ascent-gradient highlight, not gold (gold is for earned value, not for upsells — a discipline that keeps the brand trustworthy). A billing toggle (monthly/annual with savings) and a feature comparison table follow, then a pricing FAQ. Local payment methods (the architecture supports GCash and Maya alongside Stripe) are surfaced for relevant regions.

### 22.2 Honest Money Framing

Pricing copy never conflates the subscription (access) with Skill Coins (earned value). Subscriptions are paid in real money for access; Skill Coins are earned through contribution and are separately withdrawable. Keeping these distinct in the pricing UI protects the integrity of the economic model and the user's trust.

---

## 23. AI Ecosystem Surfaces

The architecture's four AI personas (Mentor, Coach, Reviewer, Interviewer) appear throughout as assistance, never as authority. Design rules: AI surfaces are visually marked as AI (a consistent subtle treatment), always advisory, and never trigger an earn or unlock on their own — economic and progression consequences come from deterministic rules and validated contribution, never from an AI's say-so. The AI assistant appears as a dockable panel in the lesson player (Coach), in code review (Reviewer), in mentor-style Q&A (Mentor), and in interview practice (Interviewer). Each is clearly labeled and dismissible, and none ever displays a coin or reputation award as its own output.

---
## 24. Notifications and Settings

### 24.1 Notifications

A bell in the navbar with an unread count opens a panel of grouped notifications: earns (you earned coins/reputation/XP, in their respective colors), social (someone accepted your answer, booked a session), and system. Each links to its source. A full notifications page offers filtering and mark-all-read. Earn notifications are the emotional payoff of the loop and are designed to feel rewarding without being noisy — batched sensibly, never spammy.

### 24.2 Settings

A standard settings area with sections: Profile (name, avatar, bio, public visibility), Account (email, password, connected OAuth, sessions), Notifications (granular per-type toggles, described by what the user controls), Appearance (light/dark/system, reduced motion), Payments (withdrawal methods, billing, subscription management), Privacy (data, export, deletion — honoring the architecture's GDPR-compliant erasure, which the UI presents as a clear, real option), and Mentor settings (for those who've earned the role). Settings use a calm two-column layout (section nav + content) on desktop, stacked on mobile.

---

## 25. Responsive and Mobile Patterns

The product is mobile-first and fully usable on a phone, since many learners in target markets are mobile-primary. Key adaptations:

The navbar collapses to the mark plus a hamburger (left drawer for navigation) and a compact currency summary; tapping it expands the full three-currency view. The persistent sidebar becomes the drawer. Multi-column dashboards stack into a single prioritized column: standing, continue learning, quests, ways to earn, wallet. The lesson player stacks content over code, with the code editor in a focused full-screen mode when active (coding on mobile is hard, so the editor gets maximum room when invoked). Tables (wallet, leaderboards) reflow into stacked cards. Course and contribution grids go single-column. Touch targets are never smaller than 44px. The ascent visualization rotates to a vertical orientation that suits portrait screens and actually reads better as a climb.

Bottom navigation is offered on mobile for the four loop verbs (Learn, Contribute, Connect, Earn) as a thumb-reachable tab bar, replacing the sidebar's role.

---

## 26. Accessibility

Accessibility is a quality floor, not a feature. Requirements:

Color contrast meets WCAG AA — and because the brand leans on a gradient and gold, text is never placed directly on the mid-gradient or on gold without verified contrast; gold text uses `--gold-700` on light surfaces for sufficient contrast, and gradient backgrounds carry only white or near-white text at large sizes. Color is never the only signal: currencies are distinguished by icon and label as well as color, level badges show a number not just a hue, and status uses icons alongside semantic colors — critical for color-blind users who must still tell XP from coins.

Every interactive element is keyboard reachable with a visible focus ring (the 2px `--ascent-blue` ring), in a logical tab order. The command palette gives keyboard users fast navigation. All images and icons have appropriate alt text or are marked decorative. Forms have associated labels, inline errors tied to fields via `aria-describedby`, and never rely on placeholder-as-label. Motion respects `prefers-reduced-motion` (Section 5.3). Live regions announce earn events to screen readers ("You earned 3 Skill Coins for an approved review") so the reward is not purely visual. Target sizes meet the 44px minimum. The product is tested with keyboard-only and screen-reader passes on every core flow.

---

## 27. Empty, Loading, and Error States

These states are designed, not afterthoughts — they are where trust is won or lost.

**Loading.** Skeleton screens that mirror the final layout (card skeletons, list skeletons, a shimmer in the canvas-sunken tone), never a spinner alone for full-page loads. The skeleton uses the warm neutral tones so it feels like part of the product. Inline actions (buttons) show a spinner in place of their label.

**Empty.** Every empty state names the single next action and, where relevant, the reward for taking it. "No contributions yet — answer your first question to earn your first Skill Coin." "Your wallet is empty. Coins are earned by contributing; here's where to start." Empty states use the topographic motif and an encouraging line in the brand voice. They are invitations, framed around the climb ahead.

**Error.** Errors explain what happened and how to fix it, in the interface's voice, never apologizing or blaming. A failed code submission lists which tests failed and hints at why. A network error offers a retry and preserves the user's input. A 404 uses the climbing metaphor lightly ("This path doesn't lead anywhere — head back to your dashboard") without being cute at the user's expense. Destructive or economic errors (a failed withdrawal) are especially clear and reassuring about the state of the user's money, since the economy fails closed and the UI must communicate that the user's value is safe.

---

## 28. Implementation Notes for the Frontend

The architecture's stack is Next.js, TypeScript, Tailwind, shadcn/ui, React Query, and Zustand. This design system maps onto it directly. The tokens in Sections 2–4 become CSS custom properties and a Tailwind theme extension; shadcn components are themed via those tokens rather than restyled per-use. The signature components in Section 8 are built once as shared components and reused everywhere, which is what keeps the color grammar consistent. React Query owns server state (courses, contributions, balances) and Zustand owns ephemeral UI state (drawers, the command palette, optimistic earn animations). Earn animations are triggered by the economy events surfaced to the client, and they are optimistic-but-reconciled: the UI may show the coin immediately and confirm against the authoritative ledger, rolling back gracefully in the rare case of a rejected write, consistent with the architecture's fail-closed economy.

Every screen is built to the quality floor of Sections 25–27 before it is considered done: responsive to 360px, keyboard-accessible with visible focus, reduced-motion-safe, and complete with its empty, loading, and error states.

---

## 29. Design Token Quick Reference

| Category | Tokens |
|---|---|
| Gold (value) | `--gold-700` `#A8763C` · `--gold-500` `#D8B46C` · `--gold-300` `#EFE0C4` · `--gold-100` `#FAF4E8` |
| Ascent (progression) | `--ascent-teal` `#1488B8` · `--ascent-blue` `#3C56B8` · `--ascent-indigo` `#2C46A0` · `--ascent-violet` `#8C78DC` |
| Ink | `--ink-900` `#15161A` · `--ink-700` `#3A3D45` · `--ink-500` `#6B6F7A` · `--ink-300` `#B8BCC6` |
| Surface | `--surface` `#FFFFFF` · `--canvas` `#FBFAF7` · `--canvas-sunken` `#F4F2EC` · `--line` `#E8E4DB` |
| Semantic | `--success` `#2F9E6B` · `--warning` `#D9952B` · `--danger` `#D2503C` · `--info` `#2C7BD0` |
| Type | Display: Sora · Body: Hanken Grotesk · Mono: JetBrains Mono |
| Radius | sm 6 · md 10 · lg 16 · xl 24 · full 9999 (px) |
| Space | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 (px) |

**The two rules that govern all of it:** the ascent gradient means progression (the journey from Learner to Master); gold means earned value (Skill Coins and rewards, nothing else). Hold those two lines and the interface will always teach the economy it sits on.

---

<div align="center">

**Ascendra — UI/UX Design System & Application Specification**

*Learn. Build. Contribute. Earn.*

</div>