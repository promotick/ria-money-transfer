// Cache busting for GitHub Pages.
//
// GitHub Pages serves every file with "Cache-Control: max-age=600", so right after a deploy a browser can
// show the NEW index.html with OLD css/js from its cache (broken layout). Giving every local css/js URL a
// version query (css/ui.css?v=...) makes the browser fetch fresh files whenever the version changes.
//
// Usage (from the USA folder), run it before every release:
//   node tools/bump-version.js            -> version = current date and time (YYYYMMDDHHmm)
//   node tools/bump-version.js 2026.10.2  -> explicit version
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const stamp = new Date().toISOString().replace(/\D/g, '').slice(0, 12);
const version = process.argv[2] || stamp;

// href="css/x.css" | src="js/x.js"  (with or without an existing ?v=...)
const ref = /((?:href|src)=")((?:css|js)\/[^"?#]+\.(?:css|js))(?:\?v=[^"#]*)?(")/g;

let files = 0, refs = 0;
for (const f of fs.readdirSync(root).filter(n => n.endsWith('.html'))) {
    const file = path.join(root, f);
    const html = fs.readFileSync(file, 'utf8');
    let n = 0;
    const out = html.replace(ref, (_m, a, url, q) => { n++; return a + url + '?v=' + version + q; });
    if (out !== html) { fs.writeFileSync(file, out); files++; }
    refs += n;
}
console.log('version ' + version + ': ' + refs + ' references in ' + files + ' pages updated');
