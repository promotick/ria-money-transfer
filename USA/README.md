# Ria Money Transfer USA - clickable prototype

Static HTML/CSS/JS mockup (no backend, no build step). Open `index.html` through any static server.

## What works
- **Catalog** (`index.html`): nominal digital Gift Cards (one card per brand and value, e.g. Amazon $10, $20, $50...).
  Filter panel (sidebar on desktop, drawer on mobile): search by brand, categories, editable value range (USD),
  "with my available points"; sort by name or value; active-filter chips; "show more" paging. Filters live in the URL.
  The header search box filters this same catalog.
- **Detail** (`detail-prod.html?b=<brand>&v=<value>`): fixed value, quantity, other values of the same brand.
- **Cart** (`carrito.html`): change quantity, remove items, totals in points and USD, empty state.
- **Checkout** (`checkout.html`): choose / add / edit the delivery email, conditions, "Use my points" (points or USD), survey, place order.
- **Confirmation** (`checkout-ok.html`) and **order detail** (`detail-canje.html?o=<order>`).
- **My points** (`puntos.html`): balance, earned and redeemed history with date filters, CSV statement download.
- **Profile** (`mi-perfil.html`, `edit-direc.html`): personal data, password rules, delivery emails (add / edit / delete).
- **Contact**, **FAQ**, **Terms**, **Goal** (monthly, by transactions), ES / EN switcher on every page.

## Catalog data
`js/catalog.js` is the single source of truth: brands, their values (`denoms`) and the 13 categories.
Category counters show the size of RIA's real catalog (Food 125, Fashion 69...), while the demo only has a few
sample cards per category, so a filtered list is shorter than the number next to it.
Brands marked `sample: true` are placeholders without a real logo. See `images/products/usa/README.txt`
for how to change brands, values and artwork (`node tools/make-cards.js` regenerates the 72 card images).

## How state works
`js/proto.js` keeps everything in `localStorage` (key `ria-usa-state-v2`): cart, orders, delivery emails, profile.
Points: 100 points = USD 1. Starting balance 260,000 (267,500 earned - 7,500 redeemed in the sample order).

Reset the demo: add `?reset=1` to any URL, or run `RiaProto.reset()` in the console.

## Files
- `js/catalog.js` - brands, values, categories.
- `js/proto.js` - state, catalog filters, cart, checkout, orders, points, profile.
- `js/i18n.js` - ES/EN dictionary and switcher (Spanish is the source text in the HTML).
- `css/ui.css` - shared components (inputs, selects, buttons, quantity stepper, tabs, tables, modals, dropdown `.dd`, scrollbars).
- `css/header.css`, `css/catalog.css`, `css/usa-responsive.css` - header, catalog panel/grid, responsive fixes and page components.
- `tools/make-cards.js` - generates the card images from the catalog and the logos in `_logos/`.
