# Edutrac – Color System

All colors are defined as CSS variables in `src/app/globals.css` (both `:root` and `@theme inline` for Tailwind).

---

## Brand & primary (purple)

| Token | Hex |
|-------|-----|
| Brand | `#923CF6` |
| Primary 800 | `#6247AA` |
| Primary 700 | `#7251B5` |
| Primary 600 | `#815AC0` |
| Primary 500 | `#A06CD5` |
| Primary 400 | `#B185DB` |
| Primary 300 | `#C19EE0` |
| Primary 200 | `#DAC3E8` |
| Primary 100 | `#DEC9E9` |

**CSS:** `var(--color-brand)`, `var(--color-primary-800)` … `var(--color-primary-100)`.

---

## Neutral (black to white)

| Token | Hex |
|-------|-----|
| Black | `#333333` |
| 900 | `#4A4A4A` |
| 800 | `#606060` |
| 700 | `#777777` |
| 600 | `#8E8E8E` |
| 500 | `#A4A4A4` |
| 400 | `#BBBBBB` |
| 300 | `#D2D2D2` |
| 200 | `#E8E8E8` |
| 100 (white) | `#FFFFFF` |

**CSS:** `var(--color-neutral-black)`, `var(--color-neutral-900)` … `var(--color-neutral-100)`.

**Pressed black (secondary button active):** `#262626` → `var(--color-pressed-black)`.

---

## Secondary

| Token | Hex |
|-------|-----|
| Secondary | `#FFC872` |

**CSS:** `var(--color-secondary)`.

---

## Feedback

| Use | Token | Hex |
|-----|-------|-----|
| Error light | red-100 | `#FB3748` |
| Error | red-200 | `#D00416` |
| Warning light | yellow-100 | `#FFDB43` |
| Warning | yellow-200 | `#DFB400` |
| Success light | green-100 | `#84EBB4` |
| Success | green-200 | `#1FC16B` |

**CSS:** `var(--color-red-100)`, `var(--color-green-200)`, etc. Semantic aliases: `var(--color-success)`, `var(--color-error)`, `var(--color-warning)`.

---

## Component rules (implemented in `globals.css`)

### Primary button (class: `btn-primary`)

- Background: **purple-400** (`#B185DB`)
- Text: **white** (neutral-100)
- Hover: background **purple-300** (`#C19EE0`)
- Pressed: background **purple-800** (`#6247AA`)

### Secondary button (class: `btn-secondary`)

- Background: **transparent**
- Text: **black** (neutral-black)
- Hover: background **black** (neutral-black) — *per your spec “hover is black”; - Pressed: background **#262626** (`--color-pressed-black`), text white

*If you want secondary hover to be “black” background with white text, say so and we can change the `.btn-secondary:hover` rule.*

### Text

- Default text color: **black** → use `text-[var(--color-neutral-black)]` or class `text-default`.

### Text link (class: `link`)

- Default: **black**
- Hover: **purple-400**
- Pressed (active): **purple-800**

Use the `.link` class on `<Link>` or `<a>` for consistent link styling.
