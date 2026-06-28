---
name: Productive Minimalist
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464555'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#5b5e66'
  on-secondary: '#ffffff'
  secondary-container: '#dfe2eb'
  on-secondary-container: '#61646c'
  tertiary: '#3f4b45'
  on-tertiary: '#ffffff'
  tertiary-container: '#57635c'
  on-tertiary-container: '#d2dfd6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#dfe2eb'
  secondary-fixed-dim: '#c3c6cf'
  on-secondary-fixed: '#181c22'
  on-secondary-fixed-variant: '#43474e'
  tertiary-fixed: '#d9e6dd'
  tertiary-fixed-dim: '#bdcac1'
  on-tertiary-fixed: '#131e19'
  on-tertiary-fixed-variant: '#3e4943'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  time-display:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system is built on the principle of "Order from Chaos." It transforms raw, unstructured input into precise, actionable schedules. The brand personality is efficient, direct, and hyper-functional, aimed at users who feel overwhelmed by traditional, complex calendar software.

The design style is **Minimalism** with a focus on systematic clarity. It utilizes heavy whitespace to reduce cognitive load and high-contrast focal points to guide the user's eye toward primary actions. There are no decorative illustrations or unnecessary flourishes; every element on the screen must serve a functional purpose. The emotional response is one of immediate relief and regained control—moving from a state of mental clutter to a state of calm, structured productivity.

## Colors

The palette is designed to emphasize the transition from "raw data" to "scheduled action."

*   **Primary (Electric Indigo):** Used exclusively for high-intent actions like "Parse" or "Generate Schedule." It acts as the "Action" color that draws immediate attention.
*   **Neutral (Slate & Ink):** The foundation of the UI. Ink (#0D1117) is used for primary text to ensure maximum readability, while various shades of Slate Grays are used for secondary information and structural borders.
*   **Success (Mint/Sage):** A soft, low-saturation Mint (#F0FDF4 background with #166534 text) is used for parsed events and successfully scheduled items to evoke a sense of accomplishment and calm.
*   **Background:** Crisp White (#FFFFFF) is the default canvas to maintain a clean, surgical aesthetic.

## Typography

The typography system prioritizes legibility and technical precision. **Geist** is used for all primary interface elements due to its clean, developer-centric aesthetic that feels both modern and efficient. 

**JetBrains Mono** is introduced as a secondary label font for metadata, timestamps, and "system" feedback, reinforcing the idea that the app is "processing" natural language into data. 

Key Rules:
- **Tight Leading:** Headlines use tight line-heights to feel impactful and urgent.
- **Readable Body:** The "Brain Dump" area uses `body-lg` to ensure that long-form typing remains comfortable.
- **Micro-copy:** Use `label-mono` for status tags (e.g., "PARSED," "PENDING") to differentiate them from user-generated content.

## Layout & Spacing

This design system utilizes a **fixed-width centered grid** for desktop to maintain focus, and a **fluid fluid grid** for mobile.

- **Desktop:** 12-column grid with a 1200px max-width. The layout is split vertically: the left side (7 columns) is dedicated to the input "Brain Dump," and the right side (5 columns) displays the structured "Parsed Schedule."
- **Mobile:** Single column layout. The user toggles between the "Input" view and the "Schedule" view via a bottom sticky navigation bar.
- **Spacing Rhythm:** Based on a 4px baseline. Use `stack-lg` (32px) to separate major sections and `stack-sm` (8px) for internal element grouping within cards.

## Elevation & Depth

To maintain the minimalist aesthetic, this design system avoids traditional drop shadows. Instead, depth is communicated through **Tonal Layers** and **Low-contrast Outlines**.

- **Level 0 (Background):** Pure white (#FFFFFF).
- **Level 1 (Cards/Containers):** A subtle 1px border (#E2E8F0) with no shadow. 
- **Active State:** When a card or input field is focused, the border transitions to the Primary Action color (Indigo) or a darker Slate (#475569) to indicate "Processing."
- **Separation:** Use very light gray backgrounds (#F8FAFC) for secondary regions like sidebars or inactive containers to create a "sunken" feel relative to the main workspace.

## Shapes

The shape language is **Soft (0.25rem)**. This provides enough rounding to feel modern and approachable without losing the professional, "square" efficiency of a productivity tool. 

- **Small elements (Checkboxes, Tags):** 4px (0.25rem) radius.
- **Large elements (Input Fields, Event Cards):** 8px (0.5rem) radius.
- **Primary Buttons:** 6px (0.375rem) to strike a balance between a strict rectangle and a friendly pill.

## Components

### Buttons
- **Primary:** Solid Electric Indigo (#4F46E5) with White text. Bold weight. No shadow.
- **Secondary:** Ghost style. Transparent background with a 1px Slate border.
- **Action Buttons:** Large (48px height) for high-frequency actions like "Parse Notes."

### Brain Dump Area
- A large, borderless text area with `body-lg` typography. 
- Placeholder text in light slate (#CBD5E1) should be conversational (e.g., "What's on your mind?").

### Parsed Event Cards
- **Structure:** A 1px bordered card. The left edge features a 4px vertical accent bar in Mint (if confirmed) or Slate (if pending).
- **Content:** The time is displayed in `time-display` (bold) on the top left. The event title uses `headline-md`. 

### Chips/Tags
- Small, rectangular tags using `label-mono` font. 
- Backgrounds should be high-transparency tints of the status color (e.g., 10% Indigo for "Scheduled").

### Input Fields
- Clear, underlined or subtly boxed fields. 
- On focus, the bottom border or full border thickens to 2px in the Primary Action color.

### Progress Indicator
- A slim, 2px horizontal bar at the top of the schedule container to indicate "Parsing" progress. Uses a pulse animation in the Primary color.