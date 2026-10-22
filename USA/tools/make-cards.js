// One gift-card SVG per brand AND value (nominal cards): <brand>-<value>.svg
// Real brands: official logo (Wikimedia Commons) on a coloured card. Sample brands: brand name as text.
const fs = require('fs'), path = require('path');
// Usage (from the USA folder):  node tools/make-cards.js
// Reads js/catalog.js and the logos in images/products/usa/_logos, writes images/products/usa/<brand>-<value>.svg
const base = path.join(__dirname, '..');
const srcDir = process.argv[2] || path.join(base, 'images', 'products', 'usa', '_logos');
const outDir = process.argv[3] || path.join(base, 'images', 'products', 'usa');
const { BRANDS } = require(process.argv[4] || path.join(base, 'js', 'catalog.js'));

// design for real brands. mode: 'mono' = single-colour logo, 'orig' = original colours
const DESIGN = {
  amazon:     { bg: '#232F3E', mode: 'mono', fill: '#FFFFFF' },
  walmart:    { bg: '#0071CE', mode: 'mono', fill: '#FFFFFF' },
  target:     { bg: '#FFFFFF', mode: 'orig', strip: '#CC0000' },
  starbucks:  { bg: '#00704A', mode: 'mono', fill: '#FFFFFF' },
  apple:      { bg: '#1D1D1F', mode: 'mono', fill: '#FFFFFF' },
  googleplay: { bg: '#FFFFFF', mode: 'orig', strip: '#01875F' },
  netflix:    { bg: '#141414', mode: 'orig' },
  uber:       { bg: '#06C167', mode: 'mono', fill: '#000000' },
  doordash:   { bg: '#FF3008', mode: 'mono', fill: '#FFFFFF' },
  homedepot:  { bg: '#FFFFFF', mode: 'orig', strip: '#F96302' },
  bestbuy:    { bg: '#FFFFFF', mode: 'orig', strip: '#0046BE' },
  spotify:    { bg: '#191414', mode: 'mono', fill: '#1DB954' }
};

function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

function parseSvg(text) {
  text = text.replace(/<\?xml[\s\S]*?\?>/g, '').replace(/<!DOCTYPE[\s\S]*?>/g, '').replace(/<!--[\s\S]*?-->/g, '');
  const open = text.match(/<svg\b([^>]*)>/);
  if (!open) throw new Error('no <svg>');
  const attrs = open[1];
  const inner = text.slice(open.index + open[0].length, text.lastIndexOf('</svg>'));
  let vb = (attrs.match(/viewBox="([^"]+)"/) || [])[1];
  if (!vb) {
    const w = parseFloat((attrs.match(/\bwidth="([\d.]+)/) || [])[1]), h = parseFloat((attrs.match(/\bheight="([\d.]+)/) || [])[1]);
    if (!w || !h) throw new Error('no viewBox/size');
    vb = `0 0 ${w} ${h}`;
  }
  return { vb, inner };
}

// centre content of the card
const CX = 190, CY = 175;

function logoBlock(b, design) {
  const { vb, inner } = parseSvg(fs.readFileSync(path.join(srcDir, b.id + '.svg'), 'utf8'));
  const [, , vw, vh] = vb.split(/[\s,]+/).map(Number);
  const k = Math.min(210 / vw, 88 / vh);
  const w = vw * k, h = vh * k, x = CX - w / 2, y = CY - h / 2;
  const style = design.mode === 'mono'
    ? `<style>.mono *{fill:${design.fill} !important}.mono [stroke]:not([stroke="none"]){stroke:${design.fill} !important}</style>` : '';
  return `${style}<svg class="mono" x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${w.toFixed(2)}" height="${h.toFixed(2)}" viewBox="${vb}" preserveAspectRatio="xMidYMid meet" overflow="visible">${inner}</svg>`;
}

function textBlock(b) {
  // sample brand: name as a bold wordmark, split in two lines when long
  const name = b.name;
  const words = name.split(' ');
  let lines = [name];
  if (name.length > 12 && words.length > 1) {
    const mid = Math.ceil(words.length / 2);
    lines = [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
  }
  const longest = Math.max(...lines.map(l => l.length));
  const size = Math.max(18, Math.min(34, 215 / (longest * 0.62)));
  const lh = size * 1.1;
  const y0 = CY - ((lines.length - 1) * lh) / 2 + size * 0.34;
  return lines.map((l, i) =>
    `<text x="${CX}" y="${(y0 + i * lh).toFixed(1)}" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="${size.toFixed(1)}" font-weight="800" fill="#fff" letter-spacing="-0.3">${esc(l)}</text>`).join('');
}

let count = 0;
for (const b of BRANDS) {
  const design = b.sample ? { bg: b.color, mode: 'text' } : DESIGN[b.id];
  if (!design) throw new Error('no design for ' + b.id);
  const content = b.sample ? textBlock(b) : logoBlock(b, design);
  const light = design.bg === '#FFFFFF';
  const ink = light ? '#6b7280' : 'rgba(255,255,255,.78)';
  const labelColor = design.strip ? '#ffffff' : ink;
  const valueColor = design.strip ? '#ffffff' : (light ? '#1f2933' : '#ffffff');
  const baseY = design.strip ? 278 : 270;
  for (const v of b.denoms) {
    const svg =
`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="30 88 320 212" width="320" height="212" role="img" aria-label="${esc(b.name)} Digital Gift Card $${v}">
  <defs>
    <clipPath id="card"><rect x="40" y="95" width="300" height="190" rx="18"/></clipPath>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></linearGradient>
  </defs>
  <rect x="44" y="101" width="300" height="190" rx="18" fill="#000" opacity=".10"/>
  <g clip-path="url(#card)">
    <rect x="40" y="95" width="300" height="190" fill="${design.bg}"/>
    ${design.strip ? `<rect x="40" y="255" width="300" height="30" fill="${design.strip}"/>` : ''}
    <rect x="40" y="95" width="300" height="190" fill="url(#shine)"/>
  </g>
  <rect x="40.5" y="95.5" width="299" height="189" rx="17.5" fill="none" stroke="#000" stroke-opacity=".12"/>
  ${content}
  <text x="60" y="${baseY}" font-family="Arial,Helvetica,sans-serif" font-size="10" letter-spacing="1.5" fill="${labelColor}">DIGITAL GIFT CARD</text>
  <text x="320" y="${baseY + 1}" text-anchor="end" font-family="Arial,Helvetica,sans-serif" font-size="18" font-weight="800" fill="${valueColor}">$${v}</text>
</svg>
`;
    fs.writeFileSync(path.join(outDir, `${b.id}-${v}.svg`), svg);
    count++;
  }
}
console.log('cards written:', count);
