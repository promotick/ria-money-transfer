# Ria Money Transfer USA - clickable prototype

Static HTML/CSS/JS mockup (no backend, no build step). Open `index.html` through any static server.

## What works
- **Catalog** (`index.html`): 12 digital Gift Cards, sort, "with my available points" filter, search (header box -> `busqueda.html`).
- **Add to cart**: from the catalog (choose value + quantity) or from the detail page (`detail-prod.html?b=<brand>`).
- **Cart** (`carrito.html`): change quantity, remove items, totals in points and USD, empty state.
- **Checkout** (`checkout.html`): choose / add / edit the delivery email, optional message, "Use my points" (points or USD), survey, place order.
- **Confirmation** (`checkout-ok.html`) and **order detail** (`detail-canje.html?o=<order>`).
- **My points** (`puntos.html`): balance, earned and redeemed history with date filters, CSV statement download.
- **Profile** (`mi-perfil.html`, `edit-direc.html`): personal data, password rules, delivery emails (add / edit / delete).
- **Contact**, **FAQ**, **Terms**, **Goal** (monthly, by transactions), ES / EN switcher on every page.

## How state works
`js/proto.js` keeps everything in `localStorage` (key `ria-usa-state-v2`): cart, orders, delivery emails, profile.
Points: 100 points = USD 1. Starting balance 260,000 (267,500 earned - 7,500 redeemed in the sample order).

Reset the demo: add `?reset=1` to any URL, or run `RiaProto.reset()` in the console.

## Files
- `js/proto.js` - state, catalog, cart, checkout, orders, points, profile.
- `js/i18n.js` - ES/EN dictionary and switcher (Spanish is the source text in the HTML).
- `css/usa-responsive.css` - responsive fixes, typography, prototype components.
