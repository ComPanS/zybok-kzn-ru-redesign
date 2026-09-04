---
version: alpha
name: Zubok Clinical Blue
summary: Calm neighborhood dentistry with a clear path from concern to appointment.
colors:
  primary: "#17488F"
  primaryDark: "#0D2E61"
  primarySoft: "#E6F0FF"
  signal: "#D8533F"
  ink: "#14243A"
  muted: "#5E6B7A"
  surface: "#FFFFFF"
  canvas: "#F3F6FA"
  line: "#D9E2ED"
typography:
  display:
    fontFamily: Manrope
    fontSize: 4rem
    fontWeight: 650
    lineHeight: 1.02
    letterSpacing: "-0.045em"
  h2:
    fontFamily: Manrope
    fontSize: 2.5rem
    fontWeight: 650
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body:
    fontFamily: Golos Text
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
  utility:
    fontFamily: Golos Text
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1.3
rounded:
  sm: 6px
  md: 12px
  lg: 20px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  section: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: 14px
  button-primary-hover:
    backgroundColor: "{colors.primaryDark}"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: 24px
---

## Overview

This is primarily a **Decide / Learn** surface for Kazan residents choosing a familiar, established dental clinic. The single job is to turn a dental concern into a confident phone call. The personality is experienced, practical, and reassuring rather than luxury-led or playful.

Primary hierarchy: reason to trust → services → real doctors → transparent price examples → location and call. The site keeps the original blue tooth identity and the clinic’s own documentary photography.

## Colors

The clinic’s existing royal blue is deepened into Clinical Blue for stronger contrast. Clean white and cool gray resemble enamel, stainless instruments, and medical records without feeling sterile. Signal Coral appears only on urgent or conversion moments; there are no decorative gradients.

## Typography

Manrope gives Cyrillic headings a sturdy, rounded geometry related to the original wordmark. Golos Text keeps long Russian medical copy readable. Headlines stay left-aligned and use compact measures; body copy is limited to about 68 characters per line.

## Layout

A 12-column desktop grid becomes a purposeful single column on mobile. The hero uses an asymmetrical 7/5 split. A thin blue route line guides the eye through the service index, recalling both the original square-tooth mark and a patient care pathway. Section rhythm alternates between open editorial layouts and bounded factual modules rather than repeating cards.

## Elevation & Depth

Depth comes primarily from borders, cropped photography, and overlapping planes. Shadows are restrained and reserved for the sticky header and the mobile menu.

## Shapes

The square frame from the original logo is the signature geometry. Corners are modest: 6px for actions, 12px for information, 20px only for large photographic crops. Pills and decorative capsules are avoided.

## Components

Primary buttons always start a real phone call. Secondary links reveal more information or move to a route. Service rows are numbered only because they form an actual route through the clinic’s five specialties. Doctor portraits are presented with names, specialties, education, and source-listed experience; no invented ratings or claims.

Motion is limited to the mobile menu, image reveal, and link underline. All nonessential motion is disabled with `prefers-reduced-motion`.

## Do's and Don'ts

- Do preserve real staff portraits, location details, license access, and exact example prices.
- Do keep the medical disclaimer visible and place contact actions throughout the route journey.
- Do not invent clinical outcomes, guarantees, awards, ratings, equipment, or online booking.
- Do not use stock smiles, glossy gradients, floating tooth illustrations, fake metrics, or generic three-card feature rows.
- Do not present this independent concept as endorsed by the clinic.
