# Design rules

The contract for every page on this site. Read this before touching markup. If a
page needs to break a rule here, change the rule first, in this file, and say
why.

The canonical values live in `frontend/styles/tokens.css` and are re-exported as
Tailwind utilities in `tailwind.config.js`. This document explains how to use
them; those two files define them.

---

## 1. Direction

**Visual thesis.** The site is printed in registration inks on warm paper. Ink for
everything read, a family of three press inks (ruby, gold, steel) for
everything marked, and a hairline grid printed straight onto the ground. A
serif speaks for the person, CommitMono carries every piece of data, and
nothing is ever separated by a shadow.

### The registration inks

The accent was one ruby. It is now a family of three, the way a print shop's
colour bars carry several inks on one sheet. Each section of a page claims one
ink via `--section-ink` (default ruby), and that one ink colours the section's
oversized numeral, its rail mark, and its row-hover edge. Never more than one
ink per section, and never two inks competing in one viewport row.

| Token | Ink | Home section |
| --- | --- | --- |
| `--accent` / `--accent-text` | Ruby. Personal: the language this career is built on. Identity, experience, writing. |
| `--gold` / `--gold-text` | Gold. The shipped work. Projects. |
| `--steel` / `--steel-text` | Steel blue. The community: events, conferences. |

The hero carries all three at once, exactly once, as a registration strip
under the name (three short ink bars butted against a hairline). That strip is
the only place the inks appear together as a surface-sized gesture.

Ink assignment is still punctuation, not decoration: marks, edges and numerals
only. No ink button fills, no ink headings, no ink page backgrounds. The plate
exception stands: photographs keep their original colours.

### Depth and composition

This section exists because the second version of this design failed without
it. It had the person in it, but every element sat on one plane: one background,
one type size range, one rule weight, no material. Correct, and flat.

Four devices give the page depth. They are the whole of it:

1. **Four blacks.** Depth is tonal. Four warm blacks about 5 to 7 L* apart, and
   which one a surface sits on is what tells you what it is. A background
   pattern was tried first and rejected: it read as decoration and competed
   with the type. A shadow is still never the answer.
2. **One loud moment per page.** The name at `clamp(2.75rem, 8.5vw, 6.5rem)`,
   with the surname in italic. Nothing else on the site is allowed to compete
   with it. On a phone it breaks to two lines, which is the mobile form of the
   same gesture.
3. **Overlap.** The portrait is baseline-aligned to the name and then hangs
   below it into the text row, so the top of the page has layers rather than
   rows. Overlaps are the only way elements are allowed to cross a grid line.
4. **Plates.** Photographs keep their original colours, framed by a hairline
   and the system radius. A ruby duotone was tried first and retired by owner
   decision: real colours, no filter, no blend mode.

Plus oversized decorative section numerals in the section's registration ink,
set in the serif italic (an editorial folio number, not a datasheet index),
which index the page down the left rail and give the whitespace a rhythm.

**Audience.** People who hire backend engineers, and peers who read the posts.
They scan for evidence: shipped systems, written thinking, real roles. A
datasheet presents evidence faster than a card grid.

**Content plan.** Home is one page of evidence in priority order: hero (name,
face, positioning, belief, contacts, datasheet strip), experience ledger,
projects, events, blog. The order is deliberate: who he is and where he has
worked comes before anything he has made, and attending counts as much as
talking. Contacts live in the hero, not in a trailing section. Every section
ends in a link out. Interior pages carry detail only. Italic is reserved for
the name and one line on an interior hero; the homepage numerals are roman.

**Interaction thesis.** Three things, nothing more:

1. A mono label rail that pins while its section scrolls past, on desktop.
2. A 120ms ease-out hover: rows and buttons lift one black step (`--raise`) and
   gain a 2px accent left edge. This is the only hover treatment in the system.
3. A 2px accent focus ring for keyboard users.

No parallax, no scroll reveals, no animated gradients, no marquee.

---

## 2. Colour

Every colour is a token. Never write a hex value in a component, a template, or
a Tailwind class.

| Token | Value | L* | Role |
| --- | --- | --- | --- |
| `--canvas` | `#100d0a` | 3.4 | Page ground: the hero, the footer, the deepest plane. |
| `--surface` | `#1a1611` | 7.5 | Raised band: the header, the content slab, panels at rest. |
| `--surface-2` | `#2a231c` | 14.3 | One step up: row hover on a band, nested panels. |
| `--surface-3` | `#3a3127` | 21.0 | Chips only. The lightest black allowed. |
| `--line` | `#332c24` | | Default rule. Separates items within one tone. |
| `--line-strong` | `#453d32` | | Decorative emphasis: quote bars, bullets. |
| `--line-interactive` | `#7a746a` | | Minimum-contrast boundary for a control. |
| `--ink` | `#f0ece4` | | Primary text, headings, the solid button fill. |
| `--ink-2` | `#aca69b` | | Secondary text, lead paragraphs. |
| `--ink-3` | `#9e9789` | | All metadata: labels, dates, stack strings, roles. |
| `--ink-faint` | `#5c5449` | | Decorative section numerals. 2.42:1, a shape not text. |
| `--plate-tint` | `#8e2228` | | The ruby that photographs are printed in. |
| `--accent` | `#e5484d` | | Marks only: status dots, row hover edge, active nav, quote bar. |
| `--accent-text` | `#ff6369` | | The accent when it must be read as text (links, focus ring). |
| `--accent-soft` | `#2e1416` | | Text selection background. |
| `--code-canvas` | `#0d0b09` | | Code wells. Recessed, darker than the page ground. |

**The accent is personal.** Ruby red, because Ruby is the language this career
is built on. It is used as punctuation, not decoration. Allowed: status dots,
the 2px left edge on a hovered row, the active nav item, inline links, the focus
ring, the quote bar, the 6px registration bar under the hero name, and
photographic plates. Not allowed: accent button fills, accent headings, accent
page backgrounds, two accent marks competing in one viewport.

**Depth never comes from shadow.** Hierarchy comes from which black a surface
sits on, and from a hairline. `box-shadow` is banned, including `shadow-sm`.
This is not a stylistic preference: it is why nine stacked cards in the old
design had no hierarchy.

**Contrast is measured, not eyeballed.** Every pair below was computed. Re-run
the check after any colour change; do not trust the numbers after a token edit.

| Pair | canvas | surface | surface-2 | surface-3 |
| --- | --- | --- | --- | --- |
| `--ink` | 16.44 | 15.28 | 13.15 | 10.81 |
| `--ink-2` | 8.01 | 7.44 | 6.40 | 5.27 |
| `--ink-3` | 6.68 | 6.21 | 5.34 | **4.39** |
| `--accent-text` | 6.68 | 6.21 | 5.34 | 4.39 |
| `--accent` mark | 4.95 | 4.60 | 3.96 | 3.25 |

| Pair | Ratio |
| --- | --- |
| `--line-interactive` on `--canvas` | 4.18 |
| `--line-interactive` on `--surface` | 3.89 |
| `--line` ridge on `--canvas` | 1.45 |
| `--line` ridge on `--surface` | 1.31 |
| `--ink-faint` numeral on `--canvas` | 2.60 |
| `--ink-faint` numeral on `--surface` | 2.42 |

**One hard constraint falls out of that table: `--ink-3` must never sit on
`--surface-3`** (4.39, under AA). Metadata is ink-3 and chips are surface-3, so
a chip's label uses `--ink-2` (5.27) and never ink-3. That is also why ink-3 is
brighter than a metadata grey usually is: it has to survive on the raised band
and on a hovered row, not only on the page ground.

The lowest text pair in legitimate use is 5.27:1. `--line` at 1.31:1 is fine
because it is a decorative divider, not a control. `--line-interactive` exists so
that a control boundary clears the 3:1 that WCAG 1.4.11 asks for.

**One theme: dark. No toggle.** This is a decision, not an omission. If a light
theme is ever wanted it is one `[data-theme="light"]` block in `tokens.css` with
the same variable names, and every ratio above has to be recomputed before it
ships. Code blocks stay dark either way.

---

## 3. Typography

Three faces, three jobs. Do not add a fourth.

| Token | Face | Job |
| --- | --- | --- |
| `--font-display` | Fraunces | The person's voice. The name, page titles, the belief statement. |
| `--font-sans` | IBM Plex Sans | Reading and UI. Everything that is read as a sentence. |
| `--font-mono` | CommitMono | Data. Dates, periods, stack strings, labels, navigation. |

CommitMono ships in the repo (`src/fonts/`, SIL OFL 1.1). Fraunces and Plex Sans
come from Google Fonts; the request is limited to the weights actually used
(Fraunces 500/600 plus italic 500, Plex Sans variable). Self-hosting would
remove the third-party request and is worth doing later.

**The serif rule.** The serif appears set large, and only there: `.display`,
`.display-talk` (the voice at speaking scale: positioning lines, the belief,
pull-quotes), a post title on the index, and the section numerals. Inside a
serif statement, an italic span is the voice leaning forward; it is the
system's main defence against reading as enterprise. Never in body copy, never
in metadata, never small. Its job is to sound like a person, so it has to be
big enough to sound like one.

**The mono rule.** If it is a label, a date, a period, a stack string, a role, a
count or a file path, it is mono. If it is a sentence, it is sans. This single
rule does more work than any other in the system.

**Labels are sentence case.** Uppercase tracked mono was the most
"enterprise" thing in the system and was retired: labels are 12px mono,
sentence case, `0.05em` tracking. Chips carry the same treatment.

**Fraunces runs soft.** The display faces set `SOFT 100` (rounded terminals)
and the homepage name additionally sets `WONK 1`, letting a few glyphs
misbehave. This is the warmth dial: same face, friendlier cut.

**Scale.** No more than these.

| Class | Size | Use |
| --- | --- | --- |
| `.display-xl` | `clamp(2.75rem, 8.5vw, 6.5rem)` serif | The name, on the home page. The page's one loud moment. |
| `.display` | `clamp(2.25rem, 5.5vw, 3.5rem)` serif | The one statement an interior page makes. |
| `.lead` | `1.1875rem` | Hero supporting paragraph and section intros. |
| `.spec-title` | `15px` | The primary value in a ledger row, and card titles. |
| `.meta` | `11px` uppercase, tracking `0.14em` | Labels: section rails, nav, hero grid. |
| `.spec-key` / `.spec-meta` | `11px` mono | Ledger key column and value column. |

Body copy inside `.prose` is the typography plugin's default. Its palette is
driven by the `--tw-prose-*` variables in `tokens.css`, so article pages adopt
the theme without being edited.

**Emoji.** Allowed in prose and in the footer colophon. Not allowed in
structural labels: nav, section rails, ledger keys, company names, dates.

### Code blocks

Code keeps its dark ground, so one palette covers the whole site and the block
never becomes a light island inside a dark page. Colours live in
`frontend/styles/syntax-highlighting.css` and read only `--code-*` tokens. All
seven clear AA against `--code-canvas`, the lowest being `--code-comment` at
4.73:1. The accent is not a syntax colour. The block is a 1px `--line` border
rounded with `--radius-md`, matching photographs and plates.

---

## 4. Components

Build these from the classes below. Do not invent a variant on the page.

- **`.section` + `.section-grid` + `.rail` + `.rail-label`** are the page
  skeleton. Every section is a top hairline plus a sticky label rail. New
  sections use these four classes or they will not line up.
- **`.spec-row`** is the ledger row, used for work, talks, writing and
  experience. It carries the bottom rule, the hover fill and the accent edge.
- **`.spec-key`** is the row's first column: a year, a date or a period. It has
  one width per breakpoint across the whole page, so the content column lands on
  the same axis in every section. If you change one, you change all of them.
- **`.spec-meta`** is the row's last column: a stack string, a role, a reading
  time.
- **`.spec-title`** is the row's primary value.
- **`.photo`** is a photograph: full width, 1px hairline, `object-cover`,
  rounded at `--radius-md`. Combine with an aspect utility.
- **`.photo-warm`** warms a portrait (`sepia` + slight saturation) so a face sits
  on the ink ground. Portraits stay recognisable: a face is never a plate.
- **`.plate`** is a photographic frame: hairline, radius, `object-cover`,
  original colours. Wrap an `img` in it for event photographs.
- **`.band`** and **`.band-raised`** are full-bleed tonal zones. A band declares
  what "one step up" means for rows inside it via `--raise`, so a hover always
  lifts away from its own background instead of towards it (canvas lifts to
  `--surface`, a raised band lifts to `--surface-2`). Any element that sets a
  background must also set `--raise`, or its rows will hover to the wrong tone.
- **`.index-num`** is the oversized decorative section numeral. Always
  `aria-hidden`, always paired with the real `.rail-label` beside it.
- **`.chip`** is a static tag: filled with `--surface-3`, no border, label in
  `--ink-2`. It is defined but no template uses it yet, so it is currently
  tree-shaken out of the bundle (see the pitfall below). It is there for the
  technology tags when `/projects` is migrated.
- **`.btn-spec`** is the secondary action. **`.btn-spec-solid`** is the primary.
  The primary action is solid ink, never accent.
- **`.link-quiet`** for navigational escapes ("All work →"). **`.link-accent`**
  for inline links inside prose.
- **`.skip-link`** is already wired in the navbar. Keep it.

**Corners are rounded.** Two radii, no third: `--radius-sm` (6px) for
controls, chips, buttons and hover fills; `--radius-md` (10px) for objects
(photographs, plates, code wells). Status dots are the only circles. The
square-corner dogma of the first version is what made the page read as
enterprise; it was retired deliberately.

**Rows are not ruled.** The bottom hairline on every ledger row was the other
half of the invoice look. Rows separate by whitespace at rest and group by a
rounded fill plus the ink edge on hover. Section rules (the `border-t` on
`.section`) remain the only horizontal ruling on a page, one per section.

**Never let a caption drift.** Anything that appears on two pages (a talk card
on the home page and on `/events`) lives in one partial and is rendered from
both. `_partials/_talk.erb` is the reference example.

**Pitfall: Tailwind tree-shakes `@layer components` classes.** A component class
that no template references is dropped from the built CSS entirely, with no
warning. `.chip` is currently in that state. So after adding or changing a
component, confirm it actually reached the bundle rather than assuming it did:

```sh
C=$(ls -t output/_bridgetown/static/index.*.css | head -1)
grep -o '\.my-new-class{[^}]*}' "$C"
```

An empty result means no template uses it yet, not that the CSS is wrong.

---

## 5. Layout

- **`.shell`** is the only container: `1080px` capped, `24px` gutter on mobile,
  `40px` from `md`. Nothing else sets a width.
- The section grid is `168px` rail plus `48px` gap plus content, from `md` up.
- Ledger rows use the same key width everywhere: `w-40` (160px) on desktop. On
  mobile, work and writing rows keep the key inline (`w-16` / `w-24`), and
  experience rows stack the period onto its own line (`w-full`) because the
  period is too long to sit beside the company.
- The home hero is a two-column grid from `md`: a `200px` portrait column and
  the content column. Portrait first, because the face is the point.
- Vertical rhythm is the section's own `pt-8 md:pt-10` and `pb-14 md:pb-20`. Do
  not add margins between sections; the hairline is the separator.

---

## 6. Motion

One transition, 120ms, ease-out, on `background-color`, `border-color` and
`color`. Nothing animates position, size or opacity. There is no scroll
animation, so `prefers-reduced-motion` needs no special case. If motion is ever
added, it must ship with a reduced-motion guard in the same change.

---

## 7. Rules

#### Do

- Put a human in every top-level page: face, own words, or a place.
- Give every page one loud moment, and let nothing else compete with it.
- Let the portrait or a plate overlap a grid line. Overlap is the layering.
- Put every piece of metadata in CommitMono.
- Use the serif only for the voice, and only large.
- Separate with a 1px hairline, and step the surface for depth.
- Use the accent for a mark, never for a surface.
- Keep the ledger key column identical across sections.
- Curate explicitly. Home shows projects that carry `featured: true` in their
  frontmatter; talks come from `talks:` in `site_metadata.yml`. Nothing is
  derived from order or date, so nothing drifts when content is added.

#### Don't

- No page without a person in it.
- No page with every element on one plane. If it has no paper, no plate, no
  overlap and no loud moment, it is flat: fix the composition, not the copy.
- No `box-shadow`, anywhere.
- No gradient for decoration, and no background pattern or texture. Depth is
  tonal. A pattern was tried and removed for exactly that reason.
- No glassmorphism, no `backdrop-filter`.
- No radius outside the two tokens, and no pill shapes except status dots.
- No cold neutral greys. The palette is warm.
- No card grid where a ledger would do.
- No illustration packs, stock cartoons, or decorative SVG.
- No emoji in a structural label.
- No raw hex value in a template or component; use a token.
- No opacity modifier on a token colour (`bg-surface/50` does not work on a
  `var()` colour). Add a token instead.
- No `daisyUI` component classes on new markup.
- No duotone on a screenshot.
- No second loud moment on a page.

---

## 8. Responsive

Two breakpoints matter: the mobile width (verify at `390px`) and desktop (verify
at `1440px`). `md` (768px) is where the rail, the ledger columns and the hero
split engage.

Verify a changed page in a real browser at both widths before calling it done.
Check specifically: no horizontal scroll, no ledger key wrapping, no orphaned
right-aligned value on its own line, and a tap target of at least 44px on the
header links and buttons.

---

## 9. Migration status

`daisyUI` is still installed and its `spec` theme mirrors these tokens, purely
so that pages which have not been migrated yet stay coherent. Each migrated page
removes another reason for it to exist. Delete daisyUI and its theme from
`tailwind.config.js` when the last page stops using its classes.

| Page | Status | Still using daisyUI |
| --- | --- | --- |
| `/` (home) | Migrated | no |
| `/events` | Migrated. One unsplit grid, no rail, no invite section | no |
| `/posts` | Migrated | no |
| Shared navbar, footer, layout | Migrated | no |
| `/projects` | Not migrated | yes (`card`, `badge`) |
| Post detail | Partially: palette and code only | yes (`card`) |
| Project detail | Not migrated, and its `.project-*` classes have no CSS at all | yes |
| `404` / `500` | Not migrated | no |

### Placeholder content that must not ship

`talks:` in `site_metadata.yml` holds three placeholder entries and
`src/images/events/` holds three placeholder SVGs, so the events layout can
be reviewed. Replace both with real talks and photos, or set `talks: []` and drop
`events` from `NAV_ITEMS` in `_components/shared/navbar.rb`.

The `/speaking` hero and "Invite me" copy, and the `/posts` hero copy, are mine,
not his. They need his approval or replacement.

### Unused data

Two keys in `site_metadata.yml` are read by nothing: `tagline` (the `h1` and the
SEO `description` carry that job) and `languages` (`languages` is reserved for
`/about`). Delete both if `/about` does not need them.

`output/` is generated. Never edit it, and never treat it as the source of
truth.

---

## 10. Verifying a change

```sh
bundle exec rake frontend:build   # rebuild CSS/JS
bundle exec bridgetown build      # rebuild pages
cd output && python3 -m http.server 8899
```

Then, in a browser at `1440px` and `390px`: check the console is empty, and
confirm the ledger columns align by measuring rather than looking:

```js
[...document.querySelectorAll(".spec-title")]
  .map((e) => Math.round(e.getBoundingClientRect().left))
  .filter((v, i, a) => a.indexOf(v) === i)   // want exactly one value
```

The same measurement on `.spec-key` catches a wrapped period, which is the
failure mode that is easiest to miss by eye.

Colour changes need the contrast table in section 2 recomputed. Nothing else in
this document is a substitute for running that check.
