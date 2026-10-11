# Drape — Mobile-First Fashion Design System

Drape is a luxury mobile-first fashion web application featuring tactile editorial aesthetics, warm linen palettes, Cormorant Garamond italic typography, and modern responsive mobile architecture.

---

## 🎨 Design System Tokens

### 1. Color Palette

All colors are defined as CSS custom properties in `src/index.css`:

| Token | Name | Hex | Usage |
| :--- | :--- | :--- | :--- |
| `--color-bg` | Warm Linen Off-White | `#FAF7F2` | Default app background canvas |
| `--color-nile-blue` | Nile Blue | `#2F6F7E` | Primary brand actions, badges & hero elements |
| `--color-deep-slate-olive` | Deep Slate Olive | `#4B5443` | Secondary architectural tone, headings & dark borders |
| `--color-light-brown-drab` | Light Brown Drab | `#B49C7E` | Neutral tailoring tone, dividers & subtle accents |
| `--color-raw-sienna` | Raw Sienna | `#C9803F` | Accent highlights, active states & callouts |

#### Pastel Tints
Each primary color is paired with a matching pastel tint:
- **Nile Blue Pastel**: `#D3E4E8` (`--color-nile-blue-pastel`)
- **Deep Slate Olive Pastel**: `#DCE0D0` (`--color-deep-slate-olive-pastel`)
- **Light Brown Drab Pastel**: `#EBE1D4` (`--color-light-brown-drab-pastel`)
- **Raw Sienna Pastel**: `#F3DFCB` (`--color-raw-sienna-pastel`)

---

### 2. Typography

Configured via Google Fonts with preconnect links in `index.html`:
- **Headings & Quotes**: *Cormorant Garamond* (italic weights `400` and `600`)
- **Body & Controls**: *Jost* (clean, legible geometric sans-serif, weights `300` to `700`)

---

### 3. Spacing, Radius & Shadows

- **Soft Border Radius**: `--radius-soft: 16px` across all cards, modals, and primary buttons.
- **Shadows**:
  - `--shadow-subtle`: Gentle ambient drop shadow with subtle Nile Blue/Olive tinting.
  - `--shadow-card`: Tactile elevation for product cards.
  - `--shadow-hover`: Lift elevation on hover.

---

### 4. Layout & Device Viewport

- Constrained to a **430px maximum width** centered horizontally on desktop.
- Includes a desktop device preview chassis with a simulated dynamic island, hardware bezel, status bar, and home indicator.
- Includes a desktop switch to toggle between the **Phone Chassis View** and **Seamless View**.

---

### 5. App Navigation & Routes (React Router)

The mobile app shell features a fixed bottom navigation bar with rounded top corners ("chin" look) and safe-area padding:
- `/` — **Atelier** (Home): Curated daily proportions and master silhouette showcases.
- `/armoire` — **Armoire** (Wardrobe): Personal capsule archive, category filtering, and silhouette slots.
- `/salon` — **Salon** (Social): Sartorial discourse, philosophy threads, and muse reflections.
- `/style-guide` — **Style Guide**: Living design tokens spec sheet and interactive sandbox.

**Navigation Bar Styling**:
- Labels: Cormorant Garamond italic (~18px)
- Icons: Thin-line SVGs (1.5px stroke width)
- Active Tab: Deep Slate Olive (`#4B5443`) with a short Raw Sienna (`#C9803F`) underline indicator
- Inactive Tabs: Light Brown Drab (`#B49C7E`)
- Background: Off-white (`#FAF7F2`) with 20px top rounded corners ("chin" look) and soft top shadow

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Development
```bash
npm install
npm run dev
```

The application will be served at `http://localhost:5173/`.

### Production Build
```bash
npm run build
```

### Linting
```bash
npm run lint
```
