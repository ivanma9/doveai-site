# Dove AI Website Analysis and Architecture

## 1) Current Site Snapshot
- **Type:** Static multi-page marketing website
- **Pages:** `index.html`, `about.html`, `contact.html`
- **Styling:** Shared CSS split into three layers:
  - `css/main.css` (design tokens, reset, base typography/layout)
  - `css/components.css` (reusable UI components)
  - `css/pages.css` (page/section-specific styles)
- **Assets:** Logo files in `assets/images/` (`dove-logo.png`, `dove-logo.svg`)
- **Runtime dependencies:** None (no JavaScript, no framework, no build step)

## 2) Information Architecture
- **Home (`index.html`)**
  - Sticky global header/navigation
  - Hero section with primary CTA (`Get Started` -> contact page)
  - Embedded contact form section
  - Shared global footer
- **About (`about.html`)**
  - Shared header/footer
  - Page header banner
  - Mission narrative section
  - Value proposition card grid
  - CTA section linking to contact page
- **Contact (`contact.html`)**
  - Shared header/footer
  - Page header banner
  - Two-column contact area:
    - Contact form
    - Contact details / expectation copy
  - Secondary CTA back to About page

## 3) Reusable Layout and Component System

### Global Layout Pattern
- All pages reuse:
  - `.header` + `.header-container`
  - `.nav-list` + `.nav-link` (with per-page `.active` state)
  - `.footer` blocks and quick links
- Standard content wrapper: `.container` (`max-width: 1200px`)
- Standard vertical rhythm via spacing tokens (e.g. `--spacing-md`, `--spacing-xl`)

### Design System (`main.css`)
- **Color tokens** define a blue/cyan-on-slate brand palette
- **Type scale** defined with CSS variables (`--font-size-*`)
- **Base reset** and default typography rules are centralized
- **Responsive breakpoints:**
  - `1024px` for major desktop/tablet scaling
  - `640px` for mobile spacing/typography reductions

### Component Layer (`components.css`)
- Header/nav styles including sticky behavior (`position: sticky; top: 0`)
- Button system (`.btn`, `.btn-primary`, `.btn-secondary`, `.btn-large`)
- Form primitives (`.form-group`, `.form-input`, `.form-textarea`, focus states)
- Footer grid layout and link styling
- Mobile nav behavior converts to stacked vertical links

### Page Layer (`pages.css`)
- Hero gradients and overlay effects
- Home page contact section and `clean-form` variant
- About page sections (`.mission-section`, `.value-grid`, `.value-card`, `.cta-section`)
- Contact page two-column layout (`.contact-page-content`) collapsing to one column at `1024px`

## 4) Functional Behavior
- Navigation is fully static via relative page links.
- Forms use `mailto:` submission (`action="mailto:ivan@doveai.net"`, `enctype="text/plain"`).
  - This relies on the visitor having a local email client configured.
  - There is no server-side form handling, persistence, validation logic beyond native HTML attributes, or spam protection.
- No JavaScript-driven interactivity is present.

## 5) Content and UX Direction Observed
- Messaging emphasizes Dove AI as a **unified AI marketplace** + **consulting partner**.
- The site is conversion-oriented with repeated CTAs toward contacting the business.
- Visual style is consistent across pages with:
  - dark-blue gradient hero/page headers
  - card-based value props
  - clean forms and high-contrast CTA buttons

## 6) Technical Strengths
- Clear separation of concerns in CSS (tokens/base vs components vs page sections).
- Consistent reusable shell (header/footer/nav) across all pages.
- Good baseline semantic HTML structure and mobile responsiveness.
- Lightweight deployment profile (pure static files).

## 7) Current Gaps / Limitations
- No backend/API integration for forms or leads.
- No analytics instrumentation present.
- No JavaScript features for richer interactions (menu toggle, validation enhancements, etc.).
- Repeated shared HTML (header/footer) across pages means future edits must be synchronized manually.
- Font stack references `Inter` but there is no explicit webfont import; fallback fonts will typically render.

## 8) Practical Architecture Summary
This codebase is a **small static brochure site architecture** optimized for simplicity:
1. Multiple standalone HTML entry points.
2. Shared global styles and component classes for consistency.
3. Page-specific sections in a separate stylesheet for maintainability.
4. No app runtime or data layer, with contact capture currently delegated to `mailto:`.

This is a solid base for a marketing site and can evolve incrementally into a dynamic stack if/when lead capture, CMS content, analytics, or backend workflows are needed.
