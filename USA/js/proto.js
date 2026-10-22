/*
 * Ria USA - clickable prototype engine (no backend).
 *
 * A small state object lives in localStorage and every page reads from it, so the
 * whole journey is coherent: catalog -> cart -> checkout -> order -> points history.
 * Visible strings are written in Spanish; after each render RiaI18n.refresh()
 * translates them when the page is in English.
 *
 * Reset the demo at any time with:  RiaProto.reset()   (or add ?reset=1 to any URL)
 */
(function () {
    'use strict';

    var KEY = 'ria-usa-state-v2';
    var RATE = 100;            // points per USD
    var MAX_QTY = 20;

    // catalog data lives in js/catalog.js (single source of truth, also used to generate the card images)
    var CAT = window.RIA_CATALOG || { CATEGORIES: [], BRANDS: [] };
    var BRANDS = CAT.BRANDS, CATEGORIES = CAT.CATEGORIES;

    // Nominal products: one card per brand AND value (Amazon $10, Amazon $20, ...)
    var PRODUCTS = [];
    BRANDS.forEach(function (b) { b.denoms.forEach(function (d) { PRODUCTS.push({ brand: b, denom: d, pts: d * RATE }); }); });
    /* ---------- helpers ---------- */
    function $(sel, root) { return (root || document).querySelector(sel); }
    function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
    function each(sel, fn) { $$(sel).forEach(fn); }
    function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
    function fmt(n) { return Number(n).toLocaleString('en-US'); }
    function usd(n) { return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
    function two(n) { return n < 10 ? '0' + n : String(n); }
    function plural(n) { return n === 1 ? 'producto' : 'productos'; }
    function brand(id) { for (var i = 0; i < BRANDS.length; i++) if (BRANDS[i].id === id) return BRANDS[i]; return BRANDS[0]; }
    function img(id, denom) { return 'images/products/usa/' + id + '-' + denom + '.svg'; }
    function param(name) { var m = new RegExp('[?&]' + name + '=([^&]*)').exec(location.search); return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : ''; }
    function page() { return (location.pathname.split('/').pop() || 'index.html').replace(/\?.*$/, ''); }
    function isEmail(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s); }
    function todayISO() { var d = new Date(); return d.getFullYear() + '-' + two(d.getMonth() + 1) + '-' + two(d.getDate()); }
    function fmtDate(iso) { var p = iso.split('-'); return p[2] + '/' + p[1] + '/' + p[0]; }
    function refresh() { if (window.RiaI18n && window.RiaI18n.refresh) window.RiaI18n.refresh(); }

    /* ---------- state ---------- */
    function seed() {
        var email = 'EduardoNaranjo22@gmail.com';
        return {
            v: 2,
            user: { name: 'Eduardo', last: 'Naranjo', second: 'Lopez', email: email, phone: '', mobile: '9876543210', birthday: '', advisor: 'Juan', code: '1920152080', company: 'Ria Money Transfer' },
            cart: [],
            emails: [{ id: 'e1', label: 'Mi correo', email: email }, { id: 'e2', label: 'Regalo para María', email: 'maria.naranjo@correo.com' }],
            emailSel: 'e1',
            usePoints: true,
            earned: [
                ['2026-04-05', 'PUNTOS TRANSFERENCIAS ENERO-MARZO', 60000],
                ['2026-05-05', 'PUNTOS TRANSFERENCIAS ABRIL', 45500],
                ['2026-06-05', 'PUNTOS TRANSFERENCIAS MAYO', 52000],
                ['2026-07-05', 'PUNTOS TRANSFERENCIAS JUNIO', 38000],
                ['2026-08-05', 'PUNTOS TRANSFERENCIAS JULIO', 40000],
                ['2026-09-05', 'PUNTOS TRANSFERENCIAS AGOSTO', 32000]
            ],
            orders: [{ no: '0123456', date: '2026-10-04', email: email, label: 'Mi correo', pay: 'points',
                items: [{ id: 'amazon', denom: 25, qty: 1 }, { id: 'walmart', denom: 50, qty: 1 }] }],
            seq: 123457,
            lastOrder: ''
        };
    }
    function load() {
        try { var s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v === 2) return s; } catch (e) { /* ignore */ }
        return seed();
    }
    var S;
    try { if (/[?&]reset=1/.test(location.search)) localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
    S = load();
    function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } }

    function earnedTotal() { return S.earned.reduce(function (a, r) { return a + r[2]; }, 0); }
    function orderPts(o) { return o.items.reduce(function (a, l) { return a + l.denom * RATE * l.qty; }, 0); }
    function orderUsd(o) { return o.items.reduce(function (a, l) { return a + l.denom * l.qty; }, 0); }
    function redeemedTotal() { return S.orders.reduce(function (a, o) { return a + (o.pay === 'points' ? orderPts(o) : 0); }, 0); }
    function balance() { return earnedTotal() - redeemedTotal(); }
    function cartTotals() {
        var units = 0, d = 0;
        S.cart.forEach(function (l) { units += l.qty; d += l.denom * l.qty; });
        return { units: units, usd: d, pts: d * RATE };
    }
    function emailById(id) { for (var i = 0; i < S.emails.length; i++) if (S.emails[i].id === id) return S.emails[i]; return null; }
    function orderByNo(no) { for (var i = 0; i < S.orders.length; i++) if (S.orders[i].no === no) return S.orders[i]; return null; }

    function addToCart(id, denom, qty) {
        for (var i = 0; i < S.cart.length; i++) {
            if (S.cart[i].id === id && S.cart[i].denom === denom) { S.cart[i].qty = Math.min(MAX_QTY, S.cart[i].qty + qty); save(); return; }
        }
        S.cart.push({ id: id, denom: denom, qty: Math.min(MAX_QTY, qty) });
        save();
    }

    /* ---------- small UI toolkit ---------- */
    function toast(msg, kind) {
        var t = document.createElement('div');
        t.className = 'ria-toast ' + (kind || 'ok');
        t.textContent = msg;
        document.body.appendChild(t);
        refresh();
        setTimeout(function () { t.classList.add('show'); }, 10);
        setTimeout(function () { t.classList.remove('show'); setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 300); }, 2800);
    }

    function modal(id, title, body, wide) {
        var old = document.getElementById(id);
        if (old) old.parentNode.removeChild(old);
        var m = document.createElement('div');
        m.className = 'modal fade';
        m.id = id;
        m.setAttribute('tabindex', '-1');
        m.setAttribute('role', 'dialog');
        m.innerHTML =
            '<div class="modal-dialog' + (wide ? ' modal-lg' : '') + '" role="document" style="z-index:1041;margin-top:100px"><div class="modal-content">' +
            '<div class="modal-header" style="padding:20px 40px"><h4 style="margin-bottom:0;font-weight:600;display:inline-block">' + title + '</h4>' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="margin-top:3px">x</button></div>' +
            '<div class="modal-body margin-bottom-20" style="padding:20px 40px">' + body + '</div></div></div>';
        document.body.appendChild(m);
        refresh();
        if (window.jQuery) window.jQuery(m).modal('show');
        return m;
    }
    function hideModal(id) { if (window.jQuery) window.jQuery('#' + id).modal('hide'); }

    /* ---------- header (all pages) ---------- */
    function renderHeader() {
        var full = S.user.name + ' ' + S.user.last;
        each('.js-points', function (el) { el.textContent = fmt(balance()); });
        each('.js-name', function (el) { el.textContent = S.user.name; });
        each('.js-hello', function (el) { el.textContent = 'Bienvenido(a) ' + full; });

        var t = cartTotals();
        each('.js-cart-count', function (el) {
            el.textContent = String(t.units);
            el.classList.toggle('is-empty', t.units === 0);
        });

        var box = $('#rh-cart-panel');
        if (!box) return;
        var head = '<p class="rh__panel-head"><span>Tienes</span> <span class="text-primary">(' + t.units + ' ' + plural(t.units) + ')</span></p>';
        if (!S.cart.length) {
            box.innerHTML = head + '<p class="rh__panel-empty">Tu carrito está vacío</p>' +
                '<div class="rh__panel-actions"><a class="rh__btn" href="index.html">Ver catálogo</a></div>';
            return;
        }
        var items = S.cart.map(function (l, i) {
            var b = brand(l.id);
            return '<li><img src="' + img(b.id, l.denom) + '" alt=""><div class="rh__item-info">' +
                '<a href="detail-prod.html?b=' + b.id + '">' + esc(b.name) + ' Gift Card $' + l.denom + '</a>' +
                '<span>' + l.qty + ' x ' + fmt(l.denom * RATE) + ' Puntos</span></div>' +
                '<button type="button" class="rh__remove" data-remove-line="' + i + '" aria-label="Quitar">&times;</button></li>';
        }).join('');
        box.innerHTML = head + '<ul class="rh__items">' + items + '</ul>' +
            '<div class="rh__panel-total">Subtotal: ' + fmt(t.pts) + ' Puntos</div>' +
            '<div class="rh__panel-actions"><a class="rh__btn rh__btn--ghost" href="carrito.html">Ver mi carrito</a><a class="rh__btn" href="checkout.html">Canjear ahora</a></div>';
    }

    /* ---------- header behaviour: drawer, account menu, current page ---------- */
    var NAV_OF = {
        'index.html': 'index.html', 'detail-prod.html': 'index.html',
        'meta.html': 'meta.html', 'puntos.html': 'puntos.html', 'detail-canje.html': 'puntos.html',
        'carrito.html': 'carrito.html', 'mi-perfil.html': 'mi-perfil.html', 'edit-direc.html': 'mi-perfil.html',
        'contacto.html': 'contacto.html', 'faq.html': 'faq.html'
    };

    function initHeader() {
        var hdr = $('#ria-header');
        if (!hdr) return;

        var current = NAV_OF[page()];
        $$('[data-nav]', hdr).forEach(function (a) {
            if (a.getAttribute('data-nav') === current) a.setAttribute('aria-current', 'page');
        });

        var burger = $('.rh__burger', hdr), drawer = $('.rh__drawer', hdr);
        function setOpen(open) {
            hdr.classList.toggle('rh--open', open);
            document.body.classList.toggle('rh-lock', open);
            burger.setAttribute('aria-expanded', open ? 'true' : 'false');
            burger.setAttribute('aria-label', open ? (isEn() ? 'Close menu' : 'Cerrar menú') : (isEn() ? 'Open menu' : 'Abrir menú'));
            drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
            if (open) { var first = $('.rh__close', drawer); if (first) setTimeout(function () { first.focus(); }, 280); }   // drawer is visibility:hidden until its transition starts
            else if (document.activeElement && drawer.contains(document.activeElement)) burger.focus();
            refresh();
        }
        drawer.setAttribute('aria-hidden', 'true');
        document.addEventListener('ria-lang', function () {
            var open = hdr.classList.contains('rh--open');
            burger.setAttribute('aria-label', open ? (isEn() ? 'Close menu' : 'Cerrar menú') : (isEn() ? 'Open menu' : 'Abrir menú'));
        });
        burger.addEventListener('click', function () { setOpen(!hdr.classList.contains('rh--open')); });
        $('.rh__close', hdr).addEventListener('click', function () { setOpen(false); });
        $('.rh__overlay', hdr).addEventListener('click', function () { setOpen(false); });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') { if (hdr.classList.contains('rh--open')) setOpen(false); closeUserMenu(); }
        });
        window.addEventListener('resize', function () { if (window.innerWidth >= 992 && hdr.classList.contains('rh--open')) setOpen(false); });

        var user = $('.rh__user', hdr), ubtn = $('.rh__userbtn', hdr);
        function closeUserMenu() { if (user) { user.classList.remove('is-open'); ubtn.setAttribute('aria-expanded', 'false'); } }
        if (ubtn) {
            ubtn.addEventListener('click', function (e) {
                e.stopPropagation();
                var open = !user.classList.contains('is-open');
                user.classList.toggle('is-open', open);
                ubtn.setAttribute('aria-expanded', open ? 'true' : 'false');
            });
            document.addEventListener('click', function (e) { if (!user.contains(e.target)) closeUserMenu(); });
        }

        // landing target for the "skip to content" link
        var main = hdr.nextElementSibling;
        while (main && !main.matches('.container, .product-details-full, div')) main = main.nextElementSibling;
        if (main && !main.id) { main.id = 'main'; main.setAttribute('tabindex', '-1'); }
    }

    /* ---------- catalog: nominal products, filters, sort ---------- */
    var PAGE_SIZE = 12;

    function catById(id) { for (var i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].id === id) return CATEGORIES[i]; return null; }
    function catName(id) { var c = catById(id); return c ? c.es : id; }

    function cardHtml(p) {
        var b = p.brand;
        var href = 'detail-prod.html?b=' + b.id + '&v=' + p.denom;
        return '<li class="cat-card"><div class="product-item"><div class="product-inner">' +
            '<div class="product-thumb"><a href="' + href + '"><img src="' + img(b.id, p.denom) + '" alt="' + esc(b.name) + ' Gift Card $' + p.denom + '" loading="lazy"></a></div>' +
            '<div class="product-info"><p class="marca">' + esc(b.name) + '</p>' +
            '<h3 class="product-name"><a href="' + href + '">' + esc(b.name) + ' Digital Gift Card</a></h3>' +
            '<span class="price">' + usd(p.denom) + '</span>' +
            '<p class="price-from">' + fmt(p.pts) + ' Puntos</p>' +
            '<a class="button add_to_cart_button" href="#" data-add="' + b.id + '" data-denom="' + p.denom + '">Agregar al carrito</a></div></div></div></li>';
    }

    var grid = { q: '', cats: [], min: null, max: null, afford: false, sort: 0, shown: PAGE_SIZE };

    function numOrNull(v) { var n = parseFloat(v); return isNaN(n) || n < 0 ? null : n; }

    function readUrl() {
        grid.q = param('q');
        grid.cats = param('cat') ? param('cat').split(',').filter(catById) : [];
        grid.min = numOrNull(param('min'));
        grid.max = numOrNull(param('max'));
        grid.afford = param('afford') === '1';
        grid.sort = Math.min(3, Math.max(0, parseInt(param('sort'), 10) || 0));
    }

    function writeUrl() {
        var q = [];
        if (grid.q) q.push('q=' + encodeURIComponent(grid.q));
        if (grid.cats.length) q.push('cat=' + grid.cats.join(','));
        if (grid.min !== null) q.push('min=' + grid.min);
        if (grid.max !== null) q.push('max=' + grid.max);
        if (grid.afford) q.push('afford=1');
        if (grid.sort) q.push('sort=' + grid.sort);
        try { history.replaceState(null, '', location.pathname + (q.length ? '?' + q.join('&') : '')); } catch (e) { /* ignore */ }
    }

    function rangeInvalid() { return grid.min !== null && grid.max !== null && grid.min > grid.max; }

    function matches(p) {
        var q = grid.q.trim().toLowerCase();
        if (q && p.brand.name.toLowerCase().indexOf(q) < 0) return false;
        if (grid.cats.length && grid.cats.indexOf(p.brand.cat) < 0) return false;
        if (!rangeInvalid()) {
            if (grid.min !== null && p.denom < grid.min) return false;
            if (grid.max !== null && p.denom > grid.max) return false;
        }
        if (grid.afford && p.pts > balance()) return false;
        return true;
    }

    function sortProducts(list) {
        return list.slice().sort(function (a, b) {
            var n = a.brand.name.localeCompare(b.brand.name);
            if (grid.sort === 1) return -n || a.denom - b.denom;
            if (grid.sort === 2) return a.denom - b.denom || n;
            if (grid.sort === 3) return b.denom - a.denom || n;
            return n || a.denom - b.denom;
        });
    }

    function activeFilters() {
        var n = grid.cats.length;
        if (grid.q.trim()) n++;
        if (grid.min !== null || grid.max !== null) n++;
        if (grid.afford) n++;
        return n;
    }

    function renderChips() {
        var box = $('#fp-chips');
        if (!box) return;
        var chips = [];
        if (grid.q.trim()) chips.push(['q', '"' + esc(grid.q.trim()) + '"']);
        grid.cats.forEach(function (id) { chips.push(['cat:' + id, esc(catName(id))]); });
        if (grid.min !== null || grid.max !== null) {
            var lo = grid.min !== null ? '$' + grid.min : '$0', hi = grid.max !== null ? '$' + grid.max : '+';
            chips.push(['val', 'Valor: ' + lo + ' - ' + hi]);
        }
        if (grid.afford) chips.push(['aff', 'Con mis puntos disponibles']);
        box.innerHTML = chips.map(function (c) {
            return '<button type="button" class="cat__chip" data-chip="' + c[0] + '"><span>' + c[1] + '</span><i aria-hidden="true">&times;</i></button>';
        }).join('') + (chips.length > 1 ? '<button type="button" class="cat__clear" data-fp-clear>Limpiar filtros</button>' : '');
    }

    function renderGrid() {
        var ul = $('ul.product-list-grid2');
        if (!ul) return;
        var list = sortProducts(PRODUCTS.filter(matches));
        var page = list.slice(0, grid.shown);
        ul.innerHTML = page.map(cardHtml).join('');

        var empty = $('#no-results');
        if (empty) empty.parentNode.removeChild(empty);
        if (!list.length) {
            empty = document.createElement('div');
            empty.id = 'no-results';
            empty.className = 'cat__empty';
            empty.innerHTML = '<p>No encontramos Gift Cards con estos filtros</p><button type="button" class="fp__btn" data-fp-clear>Limpiar filtros</button>';
            ul.parentNode.insertBefore(empty, ul.nextSibling);
        }

        var more = $('#fp-more');
        if (more) {
            more.hidden = list.length <= page.length;
            more.querySelector('em').textContent = String(list.length - page.length);
        }
        var count = $('#fp-count');
        if (count) count.innerHTML = 'Mostrando <b>' + list.length + '</b> Gift Cards';
        var btnCount = $('#fp-apply-count');
        if (btnCount) btnCount.textContent = String(list.length);
        var badge = $('#fp-badge');
        if (badge) { var n = activeFilters(); badge.textContent = String(n); badge.hidden = n === 0; }

        var err = $('#fp-range-err');
        if (err) err.hidden = !rangeInvalid();
        renderChips();
        $$('#fp-cats input').forEach(function (i) { i.checked = grid.cats.indexOf(i.getAttribute('data-cat')) >= 0; });
        var aff = $('#fp-affordable'); if (aff) aff.checked = grid.afford;
        var sel = $('#fp-sort');
        if (sel && sel.selectedIndex !== grid.sort) { sel.selectedIndex = grid.sort; if (window.jQuery) window.jQuery(sel).trigger('chosen:updated'); }
        writeUrl();
        refresh();
    }

    function resetFilters() {
        grid.q = ''; grid.cats = []; grid.min = null; grid.max = null; grid.afford = false; grid.shown = PAGE_SIZE;
        var q = $('#fp-q'); if (q) q.value = '';
        var hq = $('.rh__search input'); if (hq) hq.value = '';
        var mn = $('#fp-min'); if (mn) mn.value = '';
        var mx = $('#fp-max'); if (mx) mx.value = '';
        renderGrid();
    }

    function setPanel(open) {
        var panel = $('#fp-panel'), ov = $('#fp-overlay'), btn = $('#fp-open');
        if (!panel) return;
        panel.classList.toggle('fp--open', open);
        if (ov) ov.classList.toggle('is-on', open);
        document.body.classList.toggle('rh-lock', open);
        if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    function debounce(fn, ms) { var t; return function () { var a = arguments, c = this; clearTimeout(t); t = setTimeout(function () { fn.apply(c, a); }, ms); }; }

    function initCatalog() {
        if (!$('ul.product-list-grid2')) return;
        readUrl();

        // category list (real catalog counts supplied by RIA)
        var cats = $('#fp-cats');
        if (cats) {
            cats.innerHTML = CATEGORIES.map(function (c) {
                return '<li><label class="fp__check"><input type="checkbox" data-cat="' + c.id + '"><span class="fp__name">' + esc(c.es) + '</span><em>(' + c.count + ')</em></label></li>';
            }).join('');
        }
        var q = $('#fp-q'), hq = $('.rh__search input'), mn = $('#fp-min'), mx = $('#fp-max');
        if (q) q.value = grid.q;
        if (hq) hq.value = grid.q;
        if (mn && grid.min !== null) mn.value = grid.min;
        if (mx && grid.max !== null) mx.value = grid.max;

        function applyQuery(v) { grid.q = v; grid.shown = PAGE_SIZE; renderGrid(); }
        if (q) q.addEventListener('input', debounce(function () { if (hq) hq.value = q.value; applyQuery(q.value); }, 120));
        // the header search box filters this same catalog instead of opening another page
        var hform = hq && hq.form;
        if (hform) hform.addEventListener('submit', function (e) { e.preventDefault(); if (q) q.value = hq.value; applyQuery(hq.value); setPanel(false); });
        if (mn) mn.addEventListener('input', debounce(function () { grid.min = numOrNull(mn.value); grid.shown = PAGE_SIZE; renderGrid(); }, 200));
        if (mx) mx.addEventListener('input', debounce(function () { grid.max = numOrNull(mx.value); grid.shown = PAGE_SIZE; renderGrid(); }, 200));

        var aff = $('#fp-affordable');
        if (aff) aff.addEventListener('change', function () { grid.afford = aff.checked; grid.shown = PAGE_SIZE; renderGrid(); });
        if (cats) cats.addEventListener('change', function (e) {
            var id = e.target.getAttribute('data-cat');
            if (!id) return;
            var i = grid.cats.indexOf(id);
            if (e.target.checked && i < 0) grid.cats.push(id);
            if (!e.target.checked && i >= 0) grid.cats.splice(i, 1);
            grid.shown = PAGE_SIZE; renderGrid();
        });

        var sel = $('#fp-sort');
        if (sel && window.jQuery) window.jQuery(sel).on('change', function () { grid.sort = this.selectedIndex; grid.shown = PAGE_SIZE; renderGrid(); });

        var more = $('#fp-more');
        if (more) more.addEventListener('click', function () { grid.shown += PAGE_SIZE; renderGrid(); });

        // mobile filter drawer
        var open = $('#fp-open');
        if (open) open.addEventListener('click', function () { setPanel(true); });
        $$('.fp__close, #fp-overlay, #fp-apply').forEach(function (el) { el.addEventListener('click', function () { setPanel(false); }); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setPanel(false); });
        window.addEventListener('resize', function () { if (window.innerWidth >= 992) setPanel(false); });

        document.addEventListener('click', function (e) {
            var chip = e.target.closest && e.target.closest('[data-chip]');
            if (chip) {
                var k = chip.getAttribute('data-chip');
                if (k === 'q') { grid.q = ''; if (q) q.value = ''; if (hq) hq.value = ''; }
                else if (k === 'val') { grid.min = null; grid.max = null; if (mn) mn.value = ''; if (mx) mx.value = ''; }
                else if (k === 'aff') grid.afford = false;
                else if (k.indexOf('cat:') === 0) grid.cats = grid.cats.filter(function (c) { return c !== k.slice(4); });
                grid.shown = PAGE_SIZE; renderGrid();
                return;
            }
            if (e.target.closest && e.target.closest('[data-fp-clear], #fp-clear')) { e.preventDefault(); resetFilters(); }
        });
        renderGrid();
    }

    function openAdded(id, denom, qty) {
        var b = brand(id), t = cartTotals();
        var body = '<div class="widget widget_recent_product row"><div class="col-md-12"><ul class="product-categories"><li>' +
            '<div class="product-thumb" style="position:relative"><span class="basket">' + qty + '</span><a><img alt="" src="' + img(b.id, denom) + '"></a></div>' +
            '<div class="product-info"><p class="text-uppercase marca" style="margin:0">' + esc(b.name) + '</p>' +
            '<h3 class="product-name" style="margin-bottom:5px"><a href="detail-prod.html?b=' + b.id + '&v=' + denom + '">' + esc(b.name) + ' Digital Gift Card $' + denom + '</a></h3>' +
            '<span class="price" style="font-weight:600">' + qty + ' x ' + fmt(denom * RATE) + ' Puntos</span></div></li></ul></div></div>' +
            '<div class="row margin-bottom-20"><div class="col-md-6"><h5 style="font-weight:600">Sub-total (' + t.units + ' ' + plural(t.units) + '):</h5></div>' +
            '<div class="col-md-6"><h5 style="font-weight:600">' + fmt(t.pts) + ' Puntos</h5></div></div>' +
            '<div class="row text-center"><div class="col-md-12"><a class="button style-10" href="carrito.html">Ver mi carrito de compras</a></div></div><br>' +
            '<div class="row text-center"><div class="col-md-12">o <a href="#" data-dismiss="modal" style="text-decoration:underline">Seguir canjeando</a></div></div>';
        modal('ria-added', '<span class="icon pe-7s-check" style="font-size:25px;vertical-align:middle"></span> Se agregó con éxito al carrito de compras', body);
    }

    /* ---------- product detail (nominal: the value is part of the product) ---------- */
    var detailBrand = null, detailDenom = 0;
    function isEn() { return !!(window.RiaI18n && window.RiaI18n.lang && window.RiaI18n.lang() === 'en'); }

    // Brand-specific copy is chosen per language (the generic dictionary cannot cover it).
    function paintDetailText() {
        var spec = $('#tab-1 p');
        if (!spec || !detailBrand) return;
        spec.textContent = isEn()
            ? detailBrand.descEn + ' You will receive the code at the email you provide when redeeming. It is non-refundable.'
            : detailBrand.desc + ' Recibirás el código en el correo electrónico que indiques al momento del canje. No es reembolsable.';
    }

    var TITLES = {
        'index.html': ['Gift Cards', 'Gift Cards'], 'carrito.html': ['Mi carrito', 'My cart'],
        'checkout.html': ['Canje', 'Checkout'], 'checkout-ok.html': ['Canje exitoso', 'Redemption successful'], 'puntos.html': ['Mis puntos', 'My points'],
        'detail-canje.html': ['Detalle de canje', 'Redemption details'], 'meta.html': ['Mi meta', 'My goal'], 'mi-perfil.html': ['Mi perfil', 'My profile'],
        'edit-direc.html': ['Correo de envío', 'Delivery email'], 'contacto.html': ['Contáctanos', 'Contact us'], 'faq.html': ['Preguntas frecuentes', 'FAQ'],
        'tyc.html': ['Términos y condiciones', 'Terms and conditions'], 'login.html': ['Inicia sesión', 'Log in']
    };
    function paintTitle() {
        if (page() === 'detail-prod.html' && detailBrand) { document.title = detailBrand.name + ' Digital Gift Card $' + detailDenom + ' - Ria Money Transfer USA'; return; }
        var t = TITLES[page()];
        if (t) document.title = t[isEn() ? 1 : 0] + ' - Ria Money Transfer USA';
    }
    document.addEventListener('ria-lang', function () { paintDetailText(); paintTitle(); });

    function initDetail() {
        var holder = $('#dp-value');
        if (!holder) return;
        var b = brand(param('b') || 'amazon');
        var v = parseInt(param('v'), 10);
        if (b.denoms.indexOf(v) < 0) v = b.denoms[0];
        detailBrand = b; detailDenom = v;

        var h = $('.product-details-right .product-name'); if (h) h.textContent = b.name.toUpperCase();
        var sub = $('.count-review'); if (sub) sub.textContent = b.name + ' Digital Gift Card';
        var im = $('.main-image'); if (im) { im.src = img(b.id, v); im.alt = b.name + ' Gift Card $' + v; }
        var crumb = $('.product-details-right .breadcrumbs a:nth-of-type(2)');
        if (crumb) { crumb.textContent = catName(b.cat); crumb.setAttribute('href', 'index.html?cat=' + b.cat); }
        var crumbEnd = $('.product-details-right .breadcrumbs span'); if (crumbEnd) crumbEnd.textContent = b.name + ' $' + v;

        holder.innerHTML = '<strong class="dp-usd">' + usd(v) + '</strong> <span class="dp-pts">' + fmt(v * RATE) + ' Puntos</span>';
        var others = $('#dp-others');
        if (others) {
            var rest = b.denoms.filter(function (d) { return d !== v; });
            others.hidden = !rest.length;
            others.innerHTML = rest.length ? '<p class="dp-others__title">Otros valores</p><div class="dp-others__list">' + rest.map(function (d) {
                return '<a class="dp-chip" href="detail-prod.html?b=' + b.id + '&v=' + d + '">$' + d + '</a>';
            }).join('') + '</div>' : '';
        }
        paintDetailText();
        paintTitle();

        var btn = $('.product-details-right .button-add-cart');
        if (btn) {
            btn.removeAttribute('data-toggle'); btn.removeAttribute('data-target');
            btn.setAttribute('href', '#'); btn.setAttribute('data-detail-add', b.id); btn.setAttribute('data-denom', v);
        }
        refresh();
    }

    /* ---------- cart page ---------- */
    function renderCart() {
        var table = $('.shop_table.cart');
        if (!table) return;
        var t = cartTotals();
        var h3 = $('.section-title h3');
        if (h3) h3.innerHTML = '<span class="icon pe-7s-cart" style="font-size:25px"></span> Mis premios (' + t.units + ' ' + plural(t.units) + ')';
        var holder = table.closest('.table-responsive');
        var old = $('.cart-empty'); if (old) old.parentNode.removeChild(old);
        var warn = $('#cart-warn'); if (warn) warn.parentNode.removeChild(warn);

        if (!S.cart.length) {
            holder.style.display = 'none';
            var box = document.createElement('div');
            box.className = 'cart-empty text-center';
            box.style.cssText = 'padding:60px 0';
            box.innerHTML = '<p style="font-size:18px;margin-bottom:20px">Tu carrito está vacío</p><a class="button button-add-cart" href="index.html">Volver al catálogo</a>';
            holder.parentNode.insertBefore(box, holder.nextSibling);
            refresh();
            return;
        }
        holder.style.display = '';
        var rows = S.cart.map(function (l, i) {
            var b = brand(l.id);
            return '<tr class="cart-item-row" data-line="' + i + '">' +
                '<td class="product-thumbnail"><img src="' + img(b.id, l.denom) + '" alt=""></td>' +
                '<td class="product-name"><a href="detail-prod.html?b=' + b.id + '">' + esc(b.name) + ' Digital Gift Card $' + l.denom + '</a><p class="marca">Gift Card digital</p></td>' +
                '<td>' + fmt(l.denom * RATE) + '</td><td>' + usd(l.denom) + '</td>' +
                '<td><div class="quantity"><a href="#" style="cursor:pointer;font-size:20px">-</a>' +
                '<input type="text" size="4" class="input-text qty text text-center" value="' + two(l.qty) + '" name="quantity" aria-label="Cantidad">' +
                '<a href="#" style="cursor:pointer;font-size:20px">+</a></div></td>' +
                '<td>' + fmt(l.denom * RATE * l.qty) + ' puntos</td>' +
                '<td class="product-remove"><a href="#" data-remove-line="' + i + '" aria-label="Eliminar"><span class="icon pe-7s-trash" style="font-size:20px"></span></a></td></tr>';
        }).join('');
        var total = '<tr class="cart-total-row"><td colspan="5"><h6 style="font-weight:600;text-align:right">Total (' + t.units + ' ' + plural(t.units) + '):</h6></td>' +
            '<td><h6 style="font-weight:600">' + fmt(t.pts) + ' puntos</h6><h6 style="font-weight:600"><span style="font-weight:300;text-transform:lowercase">o</span> ' + usd(t.usd) + '</h6></td>' +
            '<td><a class="button style-10" href="checkout.html">Canjear ahora</a></td></tr>';
        $('tbody', table).innerHTML = rows + total;

        if (t.pts > balance()) {
            var w = document.createElement('p');
            w.id = 'cart-warn';
            w.className = 'ria-note warn';
            w.innerHTML = 'No tienes puntos suficientes para este carrito. Te faltan ' + fmt(t.pts - balance()) + ' puntos; puedes pagar el monto en USD al canjear.';
            holder.parentNode.insertBefore(w, holder.nextSibling);
        }
        refresh();
    }

    /* ---------- checkout ---------- */
    function renderEmails() {
        var first = $('.product-details-right .radio');
        if (!first) return;
        var wrap = first.parentNode;
        var radios = S.emails.map(function (e) {
            return '<div class="radio"><label style="width:100%"><input type="radio" name="optradio" value="' + e.id + '"' + (S.emailSel === e.id ? ' checked' : '') + '>' +
                '<span style="font-weight:600">' + esc(e.label) + '</span><br><p style="display:inline-block">' + esc(e.email) + '</p>' +
                '<a href="#" data-edit-email="' + e.id + '" style="text-decoration:underline;float:right"><span class="pe-7s-pen"></span> Editar</a></label></div>';
        }).join('');
        wrap.innerHTML = radios;
        refresh();
    }

    function renderCheckout() {
        var totalEl = $('.js-checkout-total');
        if (!totalEl) return;
        if (!S.cart.length) { location.replace('carrito.html'); return; }
        var t = cartTotals();

        var h4 = $$('h4').filter(function (h) { return /Resumen de tu canje|Your redemption summary/.test(h.textContent); })[0];
        if (h4) h4.innerHTML = '<span class="pe-7s-file"></span> Resumen de tu canje (' + t.units + ' ' + plural(t.units) + ')';

        var list = totalEl.closest('ul');
        $$('li', list).forEach(function (li) { if ($('.product-thumb', li)) li.parentNode.removeChild(li); });
        var back = $$('li', list).filter(function (li) { return $('a[href="carrito.html"]', li); })[0];
        var html = S.cart.map(function (l) {
            var b = brand(l.id);
            return '<li><div class="product-thumb" style="position:relative"><span class="basket">' + l.qty + '</span><a><img alt="" src="' + img(b.id, l.denom) + '"></a></div>' +
                '<div class="product-info"><p class="text-uppercase marca" style="margin:0">' + esc(b.name) + '</p>' +
                '<h3 class="product-name" style="margin-bottom:5px"><a href="detail-prod.html?b=' + b.id + '">' + esc(b.name) + ' Digital Gift Card $' + l.denom + '</a></h3>' +
                '<span class="price" style="font-weight:600">' + usd(l.denom * l.qty) + '</span></div></li>';
        }).join('');
        back.insertAdjacentHTML('beforebegin', html);

        var cb = $('#checkbox');
        var enough = balance() >= t.pts;
        if (!enough) S.usePoints = false;
        cb.checked = !!S.usePoints;
        var bal = $('.mrg-0', cb.closest('li')); if (bal) bal.textContent = fmt(balance());
        totalEl.setAttribute('data-points', t.pts);
        totalEl.setAttribute('data-usd', t.usd);
        updateCheckoutTotal();

        renderEmails();
        refresh();
    }

    function updateCheckoutTotal() {
        var el = $('.js-checkout-total'), cb = $('#checkbox');
        if (!el || !cb) return;
        var pts = Number(el.getAttribute('data-points')), d = Number(el.getAttribute('data-usd'));
        el.textContent = cb.checked ? fmt(pts) + ' Puntos' : usd(d);
        var note = $('#points-note'), li = cb.closest('li');
        if (!note) { note = document.createElement('p'); note.id = 'points-note'; note.className = 'ria-note'; li.appendChild(note); }
        if (cb.checked) {
            note.className = 'ria-note';
            note.innerHTML = 'Después de este canje te quedarán ' + fmt(balance() - pts) + ' puntos.';
        } else if (balance() < pts) {
            note.className = 'ria-note warn';
            note.innerHTML = 'Tus puntos no alcanzan (te faltan ' + fmt(pts - balance()) + '). El monto se pagará en USD.';
        } else {
            note.className = 'ria-note';
            note.innerHTML = 'El monto de ' + usd(d) + ' se pagará en USD.';
        }
        refresh();
    }

    function openEmailForm(id) {
        var e = id ? emailById(id) : null;
        var body = '<div class="row"><div class="col-md-6"><label>Nombre del destinatario</label><br><input id="em-label" type="text" style="width:100%" value="' + esc(e ? e.label : '') + '"></div>' +
            '<div class="col-md-6"><label>Correo electrónico</label><br><input id="em-email" type="email" placeholder="nombre@correo.com" style="width:100%" value="' + esc(e ? e.email : '') + '"></div></div>' +
            '<p id="em-err" class="ria-note warn" style="display:none;margin-top:15px"></p>' +
            '<div class="row margin-top-20"><div class="col-md-12"><a class="button button-add-cart" href="#" data-save-email="' + (id || '') + '">Guardar correo</a></div></div>';
        modal('ria-email', '<span class="icon pe-7s-mail" style="font-size:25px;vertical-align:middle"></span> ' + (e ? 'Editar correo de envío' : 'Agregar correo de envío'), body);
    }

    function saveEmailFromModal(id) {
        var label = $('#em-label').value.trim(), mail = $('#em-email').value.trim(), err = $('#em-err');
        if (!label || !isEmail(mail)) {
            err.style.display = '';
            err.textContent = !label ? 'Ingresa el nombre del destinatario.' : 'Ingresa un correo electrónico válido.';
            refresh();
            return;
        }
        if (id) { var e = emailById(id); e.label = label; e.email = mail; }
        else { var nid = 'e' + (Date.now() % 1e7); S.emails.push({ id: nid, label: label, email: mail }); S.emailSel = nid; }
        save();
        hideModal('ria-email');
        renderEmails();
        toast('Correo guardado');
    }

    function validateCheckout() {
        if (!S.cart.length) return 'Tu carrito está vacío.';
        if (!emailById(S.emailSel)) return 'Elige el correo de envío.';
        var t = cartTotals();
        if (S.usePoints && balance() < t.pts) return 'Tus puntos no alcanzan. Desmarca "Usar mis puntos" para pagar en USD.';
        return '';
    }

    function placeOrder(survey) {
        var e = emailById(S.emailSel), t = cartTotals();
        var no = String(S.seq++);
        while (no.length < 7) no = '0' + no;
        S.orders.unshift({
            no: no, date: todayISO(), email: e.email, label: e.label,
            pay: (S.usePoints && balance() >= t.pts) ? 'points' : 'usd',
            items: S.cart.map(function (l) { return { id: l.id, denom: l.denom, qty: l.qty }; }),
            survey: survey || null
        });
        S.cart = [];
        S.lastOrder = no;
        save();
        location.href = 'checkout-ok.html?o=' + no;
    }

    function initCheckout() {
        if (!$('.js-checkout-total')) return;
        // survey: both buttons place the order
        var send = $('#encuesta a.style-10'), skip = $('#encuesta a.style-11');
        if (send) { send.setAttribute('href', '#'); send.setAttribute('data-place', 'survey'); }
        if (skip) { skip.setAttribute('href', '#'); skip.setAttribute('data-place', 'skip'); }
        // our own add/edit-email modal replaces the static one
        var oldModal = $('#direccion'); if (oldModal) oldModal.parentNode.removeChild(oldModal);
        $$('a[data-target="#direccion"]').forEach(function (a) { a.removeAttribute('data-toggle'); a.removeAttribute('data-target'); a.setAttribute('href', '#'); a.setAttribute('data-edit-email', ''); });
        var cont = $('a[data-target="#encuesta"]');
        if (cont) { cont.setAttribute('href', '#'); cont.setAttribute('data-continue', '1'); }
        renderCheckout();
    }

    /* ---------- order confirmation ---------- */
    function currentOrder() {
        return orderByNo(param('o')) || orderByNo(S.lastOrder) || S.orders[0] || null;
    }

    function itemsList(o) {
        return '<ul class="product-categories">' + o.items.map(function (l) {
            var b = brand(l.id);
            return '<li><div class="product-thumb"><a><img alt="" src="' + img(b.id, l.denom) + '"></a></div><div class="product-info">' +
                '<h3 class="product-name"><a>' + esc(b.name) + ' Digital Gift Card $' + l.denom + '</a></h3>' +
                '<span class="price" style="font-weight:600">' + l.qty + ' x ' + fmt(l.denom * RATE) + ' Puntos</span></div></li>';
        }).join('') + '</ul>';
    }

    function totalLabel(o) { return o.pay === 'points' ? fmt(orderPts(o)) + ' Puntos' : usd(orderUsd(o)); }

    function initCheckoutOk() {
        var tiles = $$('div[style*="dashed"]');
        if (tiles.length !== 4) return;
        var o = currentOrder();
        if (!o) { location.replace('index.html'); return; }
        var span = $('h3 + p span'); if (span) span.textContent = o.email;
        var vals = [fmtDate(o.date), o.no, o.email, totalLabel(o)];
        tiles.forEach(function (t, i) { var p = $$('p', t)[1]; if (p) p.textContent = vals[i]; });
        var row = tiles[0].closest('.row');
        var list = document.createElement('div');
        list.className = 'row margin-top-20';
        list.innerHTML = '<div class="col-md-12"><p style="font-weight:600;font-size:16px;color:#222">Gift Cards de tu canje</p>' +
            '<div class="widget widget_recent_product">' + itemsList(o) + '</div></div>';
        row.parentNode.insertBefore(list, row.nextSibling);
        var link = $('a[href="puntos.html"]');
        if (link) link.setAttribute('href', 'detail-canje.html?o=' + o.no);
        refresh();
    }

    /* ---------- points ---------- */
    function csvDownload(name, rows) {
        var csv = rows.map(function (r) { return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(','); }).join('\r\n');
        var blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = name;
        document.body.appendChild(a); a.click();
        setTimeout(function () { URL.revokeObjectURL(a.href); a.parentNode.removeChild(a); }, 500);
    }

    function inRange(iso, from, to) { return (!from || iso >= from) && (!to || iso <= to); }

    function renderPoints() {
        var p2 = $('#tab-2'), p3 = $('#tab-3');
        if (!p2 || !p3 || page() !== 'puntos.html') return;
        var d2 = $$('input[type="date"]', p2), d3 = $$('input[type="date"]', p3);
        var earned = S.earned.filter(function (r) { return inRange(r[0], d2[0].value, d2[1].value); }).sort(function (a, b) { return a[0] < b[0] ? 1 : -1; });
        var reds = S.orders.filter(function (o) { return o.pay === 'points' && inRange(o.date, d3[0].value, d3[1].value); });

        $('h4', p2).textContent = 'Puntos disponibles: ' + fmt(balance());
        $('h4', p3).textContent = 'Puntos canjeados: ' + fmt(redeemedTotal());

        var t2 = $('table', p2), t3 = $('table', p3);
        $$('tr', t2).slice(1).forEach(function (r) { r.parentNode.removeChild(r); });
        $$('tr', t3).slice(1).forEach(function (r) { r.parentNode.removeChild(r); });
        var body2 = $('tbody', t2) || t2, body3 = $('tbody', t3) || t3;
        body2.insertAdjacentHTML('beforeend', earned.map(function (r) {
            return '<tr><td>' + fmtDate(r[0]) + '</td><td>' + esc(r[1]) + '</td><td>' + fmt(r[2]) + '</td></tr>';
        }).join('') || '<tr><td colspan="3" class="text-center">Sin movimientos en este periodo</td></tr>');
        body3.insertAdjacentHTML('beforeend', reds.map(function (o) {
            return '<tr><td>' + fmtDate(o.date) + '</td><td>CANJE DE PUNTOS Nº ' + o.no + '</td><td>' + fmt(orderPts(o)) + '</td>' +
                '<td><a href="detail-canje.html?o=' + o.no + '" aria-label="Ver detalle"><span style="font-size:25px" class="icon pe-7s-news-paper"></span></a></td></tr>';
        }).join('') || '<tr><td colspan="4" class="text-center">Sin canjes en este periodo</td></tr>');

        var b2 = $$('a.button-add-cart', p2)[0], b3 = $$('a.button-add-cart', p3)[0];
        if (b2) { b2.setAttribute('href', '#'); b2.setAttribute('data-dl', 'earned'); }
        if (b3) { b3.setAttribute('href', '#'); b3.setAttribute('data-dl', 'redeemed'); }
        refresh();
    }

    function initPoints() {
        if (page() !== 'puntos.html' || !$('#tab-2')) return;
        $$('input[type="date"]').forEach(function (i) { i.addEventListener('change', renderPoints); });
        renderPoints();
    }

    function downloadStatement(kind) {
        var rows;
        if (kind === 'earned') {
            rows = [['Fecha', 'Evento', 'Puntos']].concat(S.earned.map(function (r) { return [fmtDate(r[0]), r[1], r[2]]; }));
            rows.push(['', 'Puntos disponibles', balance()]);
        } else {
            rows = [['Fecha', 'Nº pedido', 'Puntos', 'Pago']].concat(S.orders.map(function (o) { return [fmtDate(o.date), o.no, orderPts(o), o.pay === 'points' ? 'Puntos' : 'USD']; }));
        }
        csvDownload('estado-de-cuenta-' + kind + '.csv', rows);
        toast('Estado de cuenta descargado');
    }

    /* ---------- order detail ---------- */
    function initOrderDetail() {
        var w = $('#tab-3 .widget_recent_product');
        if (!w || page() !== 'detail-canje.html') return;
        var o = currentOrder();
        if (!o) { location.replace('puntos.html'); return; }
        function cell(icon, title, body) {
            return '<div class="col-md-6"><h2 class="widget-title" style="font-weight:600"><span class="icon ' + icon + '"></span> ' + title + '</h2><div class="col-md-12">' + body + '</div></div>';
        }
        w.innerHTML =
            '<div class="row">' + cell('pe-7s-news-paper', 'Nº pedido:', '<p>' + o.no + '</p>') + cell('pe-7s-date', 'Fecha:', '<p>' + fmtDate(o.date) + '</p>') + '</div>' +
            '<div class="row">' + cell('pe-7s-mail', 'Correo de envío:', '<p>' + esc(o.email) + '</p>') + '</div>' +
            '<div class="row">' + cell('pe-7s-cart', 'Detalle de canje:', itemsList(o)) +
            '<div class="col-md-6"><h2 class="widget-title" style="font-weight:600"><span class="icon pe-7s-credit"></span> Total:</h2>' +
            '<div class="col-md-12" style="background:#fb5701;padding-top:10px;padding-bottom:10px;border-radius:5px"><span class="price" style="font-weight:600;color:#fff">' + totalLabel(o) + '</span></div></div></div>';
        refresh();
    }

    /* ---------- profile / delivery emails ---------- */
    var PROFILE_KEYS = ['code', 'company', 'name', 'last', 'second', 'email', 'phone', 'mobile', 'birthday', 'advisor'];

    function renderEmailCards() {
        var tab = $('#tab-2');
        if (!tab || page() !== 'mi-perfil.html') return;
        var cards = S.emails.map(function (e) {
            return '<div class="col-md-4 text-center" style="margin-bottom:25px"><span class="pe-7s-mail" style="font-size:48px"></span>' +
                '<h6 style="font-weight:600">' + esc(e.label) + '</h6><p>' + esc(e.email) + '</p>' +
                '<a href="edit-direc.html?id=' + e.id + '">Editar |</a> <a href="#" data-del-email="' + e.id + '">Eliminar</a></div>';
        }).join('');
        tab.innerHTML = '<div class="row"><div class="col-md-12"><a class="button button-add-cart" href="edit-direc.html">Nuevo correo</a></div></div><br><br><div class="row">' + cards + '</div>';
        refresh();
    }

    function initProfile() {
        var tab1 = $('#tab-1');
        if (!tab1 || page() !== 'mi-perfil.html') return;
        var inputs = $$('input', tab1);
        PROFILE_KEYS.forEach(function (k, i) { if (inputs[i]) inputs[i].value = S.user[k] || ''; });
        renderEmailCards();
        if (location.hash === '#tab-2' && window.jQuery) window.jQuery('.box-tabs a[href="#tab-2"]').tab('show');
        var save = $$('a.button-add-cart', tab1)[0];
        if (save) { save.setAttribute('href', '#'); save.setAttribute('data-save-profile', '1'); }
    }

    function saveProfile() {
        var tab1 = $('#tab-1'), inputs = $$('input', tab1);
        var mail = inputs[5].value.trim();
        if (!inputs[2].value.trim() || !inputs[3].value.trim()) { toast('Ingresa tu nombre y apellido.', 'warn'); return; }
        if (!isEmail(mail)) { toast('Ingresa un correo electrónico válido.', 'warn'); return; }
        var np = inputs[11], cp = inputs[12];
        if (np.value || cp.value) {
            if (np.value.length < 6) { toast('La nueva contraseña debe tener al menos 6 caracteres.', 'warn'); return; }
            if (np.value !== cp.value) { toast('Las contraseñas no coinciden.', 'warn'); return; }
        }
        PROFILE_KEYS.forEach(function (k, i) { if (i > 1) S.user[k] = inputs[i].value.trim(); });
        if (S.emails[0]) S.emails[0].email = mail;
        np.value = ''; cp.value = '';
        save();
        renderHeader();
        refresh();
        toast('Cambios guardados');
    }

    function initEmailForm() {
        if (page() !== 'edit-direc.html') return;
        var root = $('.tab-container') || document;   // keep clear of the header search box / mini-cart
        var text = $('input[type="text"]', root), mail = $('input[type="email"]', root);
        var btn = $('a.button-add-cart', root), h4 = $('h4', root);
        var id = param('id'), e = id ? emailById(id) : null;
        if (e) { text.value = e.label; mail.value = e.email; if (h4) h4.innerHTML = '<span class="icon pe-7s-mail" style="font-size:25px"></span> Editar correo de envío:'; }
        var err = document.createElement('p');
        err.className = 'ria-note warn'; err.style.display = 'none'; err.id = 'form-err';
        btn.parentNode.parentNode.insertBefore(err, btn.parentNode);
        btn.setAttribute('href', '#');
        btn.addEventListener('click', function (ev) {
            ev.preventDefault();
            var label = text.value.trim(), m = mail.value.trim();
            if (!label || !isEmail(m)) {
                err.style.display = '';
                err.textContent = !label ? 'Ingresa el nombre del destinatario.' : 'Ingresa un correo electrónico válido.';
                refresh();
                return;
            }
            if (e) { e.label = label; e.email = m; }
            else S.emails.push({ id: 'e' + (Date.now() % 1e7), label: label, email: m });
            save();
            location.href = 'mi-perfil.html#tab-2';
        });
    }

    function confirmDeleteEmail(id) {
        var e = emailById(id);
        if (!e) return;
        if (S.emails.length <= 1) { toast('Debes mantener al menos un correo de envío.', 'warn'); return; }
        var body = '<p class="text-center">¿Estás seguro de eliminar este correo?</p><p class="text-center" style="font-weight:600">' + esc(e.email) + '</p>' +
            '<div class="row text-center"><div class="col-md-12"><a class="button style-10" href="#" data-confirm-del="' + id + '">Eliminar</a> ' +
            '<a class="button style-11" href="#" data-dismiss="modal">Cancelar</a></div></div>';
        modal('ria-del', 'ELIMINAR CORREO', body);
    }

    /* ---------- contact ---------- */
    function initContact() {
        var form = $('.kt-contact-form');
        if (!form || page() !== 'contacto.html') return;
        var fields = $$('input', form);
        if (fields[0]) fields[0].value = S.user.code;
        if (fields[1]) fields[1].value = S.user.name + ' ' + S.user.last;
        if (fields[2]) fields[2].value = S.user.email;
        var area = $('textarea', form), send = $$('a.button, button, input[type="submit"]', form).pop();
        if (send) {
            send.setAttribute('href', '#');
            send.addEventListener('click', function (ev) {
                ev.preventDefault();
                if (!area || !area.value.trim()) { toast('Escribe tu mensaje.', 'warn'); return; }
                area.value = '';
                toast('Mensaje enviado. Te responderemos pronto.');
            });
        }
    }

    /* ---------- events ---------- */
    function qtyOf(input) { var n = parseInt(input.value, 10); return isNaN(n) ? 1 : Math.min(MAX_QTY, Math.max(1, n)); }

    document.addEventListener('click', function (e) {
        var t = e.target;
        function closest(sel) { return t.closest ? t.closest(sel) : null; }
        var el;

        if ((el = closest('[data-add]'))) {
            e.preventDefault();
            var bid = el.getAttribute('data-add'), dn = Number(el.getAttribute('data-denom'));
            addToCart(bid, dn, 1);
            renderHeader(); openAdded(bid, dn, 1);
            return;
        }

        if ((el = closest('[data-detail-add]'))) {
            e.preventDefault();
            var d = Number(el.getAttribute('data-denom')), q = qtyOf($('.quantity .qty'));
            addToCart(el.getAttribute('data-detail-add'), d, q);
            renderHeader(); openAdded(el.getAttribute('data-detail-add'), d, q);
            return;
        }
        if ((el = closest('[data-remove-line]'))) {
            e.preventDefault();
            S.cart.splice(Number(el.getAttribute('data-remove-line')), 1);
            save(); renderHeader(); renderCart(); renderCheckout();
            return;
        }

        if ((el = closest('.quantity a'))) {
            e.preventDefault();
            var wrap = el.closest('.quantity'), input = $('input', wrap), label = el.textContent.trim();
            var n = qtyOf(input) + (label === '+' ? 1 : -1);
            n = Math.min(MAX_QTY, Math.max(1, n));
            input.value = two(n);
            var row = el.closest('tr.cart-item-row');
            if (row) { S.cart[Number(row.getAttribute('data-line'))].qty = n; save(); renderHeader(); renderCart(); }
            return;
        }

        if ((el = closest('[data-edit-email]'))) { e.preventDefault(); openEmailForm(el.getAttribute('data-edit-email')); return; }
        if ((el = closest('[data-save-email]'))) { e.preventDefault(); saveEmailFromModal(el.getAttribute('data-save-email')); return; }

        if ((el = closest('[data-continue]'))) {
            var err = validateCheckout();
            if (err) { e.preventDefault(); e.stopImmediatePropagation(); toast(err, 'warn'); return; }
            e.preventDefault();
            e.stopImmediatePropagation();
            if (window.jQuery) window.jQuery('#encuesta').modal('show');
            return;
        }

        if ((el = closest('[data-place]'))) {
            e.preventDefault();
            var survey = null;
            if (el.getAttribute('data-place') === 'survey') {
                survey = { q1: ($('input[name="carita"]:checked') || {}).id || '', q2: ($('input[name="caritas"]:checked') || {}).id || '', comment: ($('#encuesta textarea') || {}).value || '' };
            }
            placeOrder(survey);
            return;
        }

        if ((el = closest('[data-dl]'))) { e.preventDefault(); downloadStatement(el.getAttribute('data-dl')); return; }
        if ((el = closest('[data-save-profile]'))) { e.preventDefault(); saveProfile(); return; }
        if ((el = closest('[data-del-email]'))) { e.preventDefault(); confirmDeleteEmail(el.getAttribute('data-del-email')); return; }
        if ((el = closest('[data-confirm-del]'))) {
            e.preventDefault();
            var id = el.getAttribute('data-confirm-del');
            S.emails = S.emails.filter(function (x) { return x.id !== id; });
            if (S.emailSel === id) S.emailSel = S.emails[0] ? S.emails[0].id : '';
            save(); hideModal('ria-del'); renderEmailCards(); toast('Correo eliminado');
        }
    }, true);

    document.addEventListener('change', function (e) {
        var t = e.target;
        if (!t.matches) return;
        if (t.id === 'checkbox') { S.usePoints = t.checked; save(); updateCheckoutTotal(); }
        else if (t.name === 'optradio') { S.emailSel = t.value; save(); }
        else if (t.matches('.quantity input')) {
            var n = qtyOf(t); t.value = two(n);
            var row = t.closest('tr.cart-item-row');
            if (row) { S.cart[Number(row.getAttribute('data-line'))].qty = n; save(); renderHeader(); renderCart(); }
        }
    });

    /* ---------- init ---------- */
    function init() {
        renderHeader();
        initHeader();
        initCatalog();
        initDetail();
        renderCart();
        initCheckout();
        initCheckoutOk();
        initPoints();
        initOrderDetail();
        initProfile();
        initEmailForm();
        initContact();
        paintTitle();
        refresh();
    }

    window.RiaProto = {
        reset: function () { try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ } location.reload(); },
        state: function () { return S; },
        balance: balance
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
    window.addEventListener('load', function () { renderHeader(); refresh(); });
})();