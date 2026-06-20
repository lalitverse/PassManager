---
name: Sentinels of Glass
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#ca8100'
  on-tertiary-container: '#3e2400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: '0'
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-code:
    fontFamily: Geist Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The design system is engineered for a high-trust, premium cybersecurity environment. The brand personality is authoritative yet approachable, evoking a sense of impenetrable security through clarity and technical precision. The target audience includes security-conscious professionals and enterprise IT administrators who require a tool that feels "heavy" enough to be secure, but "light" enough to use daily.

The visual style is a fusion of **Corporate Modern** and **Glassmorphism**. It utilizes a deep dark-mode foundation to reduce eye strain during long monitoring sessions, accented by translucent layers and vibrant functional colors that draw immediate attention to critical security states. The interface prioritizes high-contrast readability and a structured, systematic feel to reinforce the product's reliability.

## Colors

This design system utilizes a sophisticated dark palette designed for depth and hierarchy.

- **Primary (Electric Blue):** Used for primary actions, focus states, and active navigation indicators. It represents intelligence and connectivity.
- **Secondary (Cyber Green):** Reserved for "Secure" states, successful validations, and positive health scores.
- **Tertiary (Warning Amber):** Used for "Weak" or "Reused" password indicators and non-critical alerts.
- **Neutral (Deep Charcoal):** The bedrock of the system. We use varying shades of charcoal to define surface tiers rather than true black, maintaining a premium "ink" feel.
- **Functional Red (#EF4444):** Specifically for "Breached" or "Critical" status indicators.

Backgrounds utilize a slight gradient from the canvas color to the surface color to create a sense of vast space.

## Typography

The design system exclusively uses **Geist** to lean into a technical, developer-centric aesthetic that feels precise and modern.

- **Headlines:** Use Semi-Bold weights with tight letter spacing to create a compact, impactful look.
- **Body:** Standardized on a 14px base for information density, which is crucial for dashboard environments.
- **Monospaced:** Geist Mono is used for password display, recovery keys, and technical logs to ensure character distinction (e.g., distinguishing '1', 'l', and 'I').
- **Accessibility:** High contrast ratios (minimum 4.5:1) are maintained across all text levels against the charcoal backgrounds.

## Layout & Spacing

The layout is built on a **12-column fluid grid** for desktop and a **4-column grid** for mobile.

- **Sidebar Navigation:** A fixed 260px left-hand navigation bar is the primary anchor. It uses a semi-transparent glass effect to show a hint of the background.
- **Content Area:** Uses a max-width of 1440px for centered readability, or fluid for dashboard views.
- **Spacing Rhythm:** An 8px linear scale drives all padding and margins. 16px is the default padding for cards and containers, while 24px is used for section gaps.
- **Density:** The system favors high-density layouts, minimizing white space in favor of logical grouping via borders and subtle tonal shifts.

## Elevation & Depth

Depth in this design system is created through **Tonal Layers** and **Glassmorphism**, rather than traditional heavy shadows.

- **Layer 0 (Canvas):** The deepest level, solid #0A0A0A.
- **Layer 1 (Cards/Sidebar):** `rgba(23, 23, 23, 0.8)` with a 20px backdrop-blur. This layer uses a 1px solid border of `rgba(255, 255, 255, 0.08)` to define edges against the dark background.
- **Layer 2 (Popovers/Modals):** A lighter charcoal `rgba(38, 38, 38, 0.9)` with a more pronounced 1px border and a subtle ambient shadow (0px 8px 32px rgba(0,0,0,0.4)) to suggest physical lift.
- **Interaction:** On hover, cards should increase their border opacity from 0.08 to 0.2, creating a "glow" effect without using traditional dropshadows.

## Shapes

The shape language is "Soft-Technical." It avoids the playfulness of fully rounded pills in favor of structured, geometric radii.

- **Standard Radius:** 8px for buttons, input fields, and small UI components.
- **Large Radius:** 12px for cards and primary containers.
- **Icons:** Use a 2px stroke weight to match the precision of the typography.
- **Indicators:** Small status dots (Strong/Weak) are perfectly circular to differentiate them from interactive elements.

## Components

### Buttons
- **Primary:** Solid Electric Blue with white text. No gradient.
- **Secondary:** Ghost style with the 1px subtle border and a subtle background fill on hover.
- **Destructive:** Solid Deep Charcoal with a Functional Red border and text.

### Secure Input Fields
- **Default State:** Darker than the card background to create an "inset" look.
- **Focus State:** 1px Electric Blue border with a soft blue outer glow (2px spread).
- **Reveal Icon:** Standard "Eye" icon for passwords, toggling to "Eye-off."
- **Strength Meter:** A 4-segment linear bar placed immediately below the input field, color-coding from Red (1 segment) to Cyber Green (4 segments).

### Cards
- **Security Vault Cards:** Feature a prominent icon on the left, title/subtitle in the center, and a "Copy" quick-action button that appearing only on hover.
- **Status Badges:** Compact, capitalized labels (e.g., "REUSED") using the `label-md` typography, housed in a low-opacity tinted background of the corresponding status color.

### Sidebar Navigation
- Vertical orientation. Active items use a vertical 2px Electric Blue line on the far left and a subtle `rgba(59, 130, 246, 0.1)` background tint.