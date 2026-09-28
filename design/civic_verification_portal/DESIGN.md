---
name: Civic Verification Portal
colors:
  surface: '#f6fafe'
  surface-dim: '#d6dadf'
  surface-bright: '#f6fafe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f4f9'
  surface-container: '#eaeef3'
  surface-container-high: '#e4e9ed'
  surface-container-highest: '#dfe3e7'
  on-surface: '#171c20'
  on-surface-variant: '#44474e'
  inverse-surface: '#2c3135'
  inverse-on-surface: '#edf1f6'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#495f85'
  primary: '#001939'
  on-primary: '#ffffff'
  primary-container: '#162e51'
  on-primary-container: '#8096bf'
  inverse-primary: '#b1c7f2'
  secondary: '#0861a5'
  on-secondary: '#ffffff'
  secondary-container: '#75b4fe'
  on-secondary-container: '#004579'
  tertiary: '#241700'
  on-tertiary: '#ffffff'
  tertiary-container: '#3e2b00'
  on-tertiary-container: '#c28c00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b1c7f2'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#31476b'
  secondary-fixed: '#d2e4ff'
  secondary-fixed-dim: '#a0c9ff'
  on-secondary-fixed: '#001c37'
  on-secondary-fixed-variant: '#00497f'
  tertiary-fixed: '#ffdea6'
  tertiary-fixed-dim: '#fcbc2b'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5d4200'
  background: '#f6fafe'
  on-background: '#171c20'
  surface-variant: '#dfe3e7'
  action-blue-hover: '#1A4480'
  seller-header: '#0B4151'
  surface-default: '#FFFFFF'
  canvas-background: '#F5F6F7'
  border-subtle: '#DFE1E2'
  border-strong: '#71767A'
  text-primary: '#1B1B1B'
  text-secondary: '#565C65'
  official-banner-bg: '#F0F0F0'
  status-success-text: '#00A91C'
  status-success-bg: '#ECF3EC'
  status-warning-text: '#FA9441'
  status-warning-bg: '#FEF0E4'
  status-danger-text: '#D54309'
  status-danger-bg: '#F4E3DB'
  status-info-text: '#00BDE3'
  status-info-bg: '#E7F6F8'
typography:
  headline-lg:
    fontFamily: Public Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Public Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.005em
  headline-sm:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Public Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  caption:
    fontFamily: Public Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes an uncompromised, civic-grade interface built for institutional reliability, precision, and civic trust. Rooted in the visual standards of the U.S. Web Design System (USWDS) and institutional governance platforms, it serves citizens, agricultural landowners, and legal professionals evaluating land parcels and regulatory documentation across Uttar Pradesh.

The aesthetic rejects ephemeral digital trends: no frosted glass, no heavy ambient drop shadows, no vibrant decorative gradients, and no ambiguous gestural navigation. Instead, it relies on structural clarity, explicit affordances, strict WCAG AAA contrast compliance, and structured federal information architecture. The emotional response is sobriety, calm certainty, and unwavering procedural legitimacy.

## Colors

The palette is engineered around high institutional contrast and deterministic state signaling:

- **Primary Navy (`#162E51`):** Represents institutional authority, structural framing, high-level headers, and header containers.
- **Action Blue (`#005EA2`):** Reserved strictly for primary functional affordances, actionable hyperlinked text, active navigation elements, and confirmed commitments.
- **Action Blue Active (`#1A4480`):** Provides a high-contrast pressed and hover state.
- **Accent Gold (`#FFBE2E`):** Applied with disciplined restraint for the official government-style top border rule, active process stepper highlights, and verified credential markers.
- **Neutral Palette (`#FFFFFF`, `#F5F6F7`, `#DFE1E2`, `#71767A`, `#1B1B1B`):** Provides sharp readability and clear separation of concerns across document cards, forms, and audit trails.

Status indicators employ two-tone compound tokens consisting of a deep high-contrast foreground glyph/label paired with an accessible tinted background, ensuring immediate recognition under direct sunlight on mobile displays.

## Typography

Typography is set exclusively in **Public Sans**, an open-source, highly legible grotesque sans-serif developed specifically for official public sector digital interfaces.

Key typographic rules:
- Interactive form inputs must never fall below 16px body type to prevent automatic viewport zoom on mobile browsers.
- Headings are set tight and compact with strong weight hierarchy to anchor formal legal summaries and parcel record sheets.
- Captions and helper annotations are capped at 13px with minimum 18px line-height, strictly exceeding WCAG legibility requirements.

## Layout & Spacing

The layout is anchored to a strict 8-point spatial grid system (with 4px sub-grid increments for tight metadata and micro-labels). 

- **Mobile Viewports (<600px):** Single-column stacked fluid flow with 16px (`1rem`) outer gutters and safe-area margins.
- **Tablet (600px - 1024px):** 8-column layout with 24px gutters, max layout container of 768px for single-task focus flows.
- **Desktop (>1024px):** 12-column layout capped at 1040px maximum readable container, centered to prevent optical drift during dense tabular verification.

Component padding enforces physical clarity: vertical button padding follows 12px (top/bottom) and 24px (left/right) to meet accessibility targets without sprawling. Form field groups maintain a strict 24px vertical separator to ensure clear cognitive grouping between discrete title registration inputs.

## Elevation & Depth

This system avoids decorative atmospheric perspective, soft colored glows, and diffused multi-stage drop shadows. Depth is communicated strictly through surface tone segmentation and high-contrast structural borders:

- **Level 0 (Base Canvas):** Background canvas `#F5F6F7`.
- **Level 1 (Card & Section Surfaces):** Pure white `#FFFFFF` bounded by a crisp 1px solid border in `#DFE1E2`.
- **Level 2 (Active/Floating Elements & Overlays):** `#FFFFFF` surface with 1px border `#71767A` accompanied by an ultra-crisp, zero-spread offset shadow: `0px 2px 0px rgba(22, 46, 81, 0.08)`.
- **Level 3 (Modal Dialogs & Sticky Legal Disclaimers):** `#FFFFFF` surface with a crisp 1px solid `#162E51` border and a stark 20% `#162E51` backdrop scrim without background blur.

## Shapes

The geometric vocabulary is utilitarian, grounded, and conservative. The system rejects pill-shaped containers, oversized bubbles, and circular action buttons:

- **Inputs, Buttons, and Badges:** Fixed 4px corner radius (`rounded-sm`), conveying precision, reliability, and functional permanence.
- **Content Cards, Fieldsets, and Panels:** Fixed 8px corner radius (`rounded-md`), presenting clean architectural containment.
- **Badges and Status Tags:** 2px to 4px radius with a minimum 1px border. Never fully circular or pill-shaped.

## Components

### Official Government Header Banner
- Height: 32px.
- Background: `#F0F0F0` with a 1px bottom border in `#DFE1E2`.
- Text: 12px regular `#1B1B1B`. Accompanied by a 16px official shield icon on the left, an official service declaration, and an expandable link labeled "Here's how you know" with an accessible disclosure chevron.

### Buttons
- **Primary Button:** 48px height minimum. Solid `#005EA2` fill, text in `#FFFFFF` (16px semibold). 4px border radius. Hover/active fill transitions to `#1A4480`. Focus state: 3px transparent outline with 2px solid `#FFBE2E` ring.
- **Secondary Button:** 48px height minimum. Background `#FFFFFF`, 2px solid `#005EA2` border, text `#005EA2` (16px semibold), 4px border radius. Hover/active changes background to `#ECF3EC` or `#E7F6F8`.

### Form Fields & Inputs
- Height: 48px minimum hit target.
- Base border: 1px solid `#71767A`, 4px radius, white background.
- Label: Placed strictly above the input (never floating inside), 16px semibold `#1B1B1B`.
- Helper Text: Directly below label or input, 13px regular `#565C65`.
- Active/Focused: 2px solid `#005EA2` border plus outer `#FFBE2E` high-contrast indicator.
- Error State: 2px solid `#D54309` with immediate error text prefixed by an alert icon.

### Status Badges & Verification Tags
- Structure: Icon (16px) + short semantic text (13px bold), enclosed in a 1px border box with 4px border radius.
- Padding: 4px vertical, 8px horizontal.
- **Success (Clear Title/Verified):** `#00A91C` foreground, `#ECF3EC` background, `#00A91C` border (0.5px or 1px).
- **Warning (Encumbrance Pending):** `#FA9441` foreground, `#FEF0E4` background, `#FA9441` border.
- **Danger (Litigation/Disputed):** `#D54309` foreground, `#F4E3DB` background, `#D54309` border.
- **Info (Govt Record Sourced):** `#00BDE3` foreground, `#E7F6F8` background, `#00BDE3` border.

### Cards & Record Panels
- Background: `#FFFFFF`.
- Border: 1px solid `#DFE1E2`, radius 8px.
- Padding: 16px mobile, 24px tablet/desktop.
- Header separator: Optional 1px solid `#DFE1E2` border separating document record title from parcel data metadata lists.

### USWDS Step Indicator
- Numbered sequence of steps horizontal on mobile/tablet.
- Inactive segments: 4px height bar `#DFE1E2` with circle indicator in `#71767A`.
- Active segment: Highlighted with an authoritative `#FFBE2E` 4px marker line, navy blue circle containing the step number in white.
- Completed segment: Solid `#005EA2` marker with checkmark icon.