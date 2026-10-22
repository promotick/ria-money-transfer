/*
 * Ria USA - catalog data (single source of truth).
 *
 * Every Gift Card is NOMINAL: one product = one brand + one fixed value. A brand with
 * denoms [10, 20, 50] produces three independent cards ("Amazon $10", "Amazon $20", ...).
 *
 * Used by js/proto.js (browser) and by the card-image generator (Node: require this file).
 *
 *  - CATEGORIES[].count is the size of the REAL catalog for that category (figures supplied by RIA).
 *    The prototype only has a handful of sample cards per category, so a filtered list is shorter
 *    than the number shown next to it.
 *  - Brands with sample:true are placeholders: no real logo, the card shows the brand name as text.
 */
(function (root) {
    'use strict';

    var CATEGORIES = [
        { id: 'beauty',        es: 'Belleza',         en: 'Beauty',        count: 1 },
        { id: 'charity',       es: 'Caridad',         en: 'Charity',       count: 3 },
        { id: 'entertainment', es: 'Entretenimiento', en: 'Entertainment', count: 33 },
        { id: 'family',        es: 'Familia',         en: 'Family',        count: 15 },
        { id: 'fashion',       es: 'Moda',            en: 'Fashion',       count: 69 },
        { id: 'food',          es: 'Comida',          en: 'Food',          count: 125 },
        { id: 'gaming',        es: 'Videojuegos',     en: 'Gaming',        count: 17 },
        { id: 'gifts',         es: 'Regalos',         en: 'Gifts',         count: 18 },
        { id: 'home',          es: 'Hogar',           en: 'Home',          count: 25 },
        { id: 'prepaid',       es: 'Prepago',         en: 'Prepaid',       count: 3 },
        { id: 'retail',        es: 'Tiendas',         en: 'Retail',        count: 24 },
        { id: 'sports',        es: 'Deportes',        en: 'Sports',        count: 30 },
        { id: 'travel',        es: 'Viajes',          en: 'Travel',        count: 44 }
    ];

    function d(es, en) { return { desc: es, descEn: en }; }

    var BRANDS = [
        // ---- real brands (official logos) ----
        { id: 'amazon',     name: 'Amazon',         cat: 'retail',        denoms: [10, 20, 50, 100],
          desc: 'Gift Card digital de Amazon válida en Estados Unidos. Úsala en millones de productos de Amazon.com.',
          descEn: 'Amazon digital Gift Card valid in the United States. Use it on millions of products at Amazon.com.' },
        { id: 'walmart',    name: 'Walmart',        cat: 'retail',        denoms: [10, 25, 50, 100],
          desc: 'Gift Card digital de Walmart. Válida en tiendas Walmart y en Walmart.com.',
          descEn: 'Walmart digital Gift Card. Valid in Walmart stores and at Walmart.com.' },
        { id: 'target',     name: 'Target',         cat: 'retail',        denoms: [10, 25, 50, 100],
          desc: 'Gift Card digital de Target. Válida en tiendas Target y en Target.com.',
          descEn: 'Target digital Gift Card. Valid in Target stores and at Target.com.' },
        { id: 'bestbuy',    name: 'Best Buy',       cat: 'retail',        denoms: [25, 50, 100],
          desc: 'Gift Card digital de Best Buy para tecnología, electrodomésticos y entretenimiento.',
          descEn: 'Best Buy digital Gift Card for tech, appliances and entertainment.' },
        { id: 'starbucks',  name: 'Starbucks',      cat: 'food',          denoms: [10, 25, 50],
          desc: 'Gift Card digital de Starbucks. Válida en tiendas participantes y en la app de Starbucks.',
          descEn: 'Starbucks digital Gift Card. Valid at participating stores and in the Starbucks app.' },
        { id: 'uber',       name: 'Uber Eats',      cat: 'food',          denoms: [15, 25, 50],
          desc: 'Gift Card digital de Uber Eats para pedir comida a domicilio.',
          descEn: 'Uber Eats digital Gift Card to order food delivery.' },
        { id: 'doordash',   name: 'DoorDash',       cat: 'food',          denoms: [15, 25, 50, 100],
          desc: 'Gift Card digital de DoorDash para pedidos de comida y compras a domicilio.',
          descEn: 'DoorDash digital Gift Card for food and grocery delivery.' },
        { id: 'apple',      name: 'Apple',          cat: 'entertainment', denoms: [15, 25, 50, 100],
          desc: 'Gift Card digital de Apple. Úsala en App Store, iTunes, Apple Music, iCloud+ y más.',
          descEn: 'Apple digital Gift Card. Use it on the App Store, iTunes, Apple Music, iCloud+ and more.' },
        { id: 'netflix',    name: 'Netflix',        cat: 'entertainment', denoms: [25, 50, 100],
          desc: 'Gift Card digital de Netflix para pagar tu suscripción.',
          descEn: 'Netflix digital Gift Card to pay for your subscription.' },
        { id: 'spotify',    name: 'Spotify',        cat: 'entertainment', denoms: [10, 30, 60],
          desc: 'Gift Card digital de Spotify Premium.',
          descEn: 'Spotify Premium digital Gift Card.' },
        { id: 'googleplay', name: 'Google Play',    cat: 'gaming',        denoms: [10, 25, 50, 100],
          desc: 'Gift Card digital de Google Play para apps, juegos, películas y libros.',
          descEn: 'Google Play digital Gift Card for apps, games, movies and books.' },
        { id: 'homedepot',  name: 'The Home Depot', cat: 'home',          denoms: [25, 50, 100],
          desc: 'Gift Card digital de The Home Depot. Válida en tiendas y en homedepot.com.',
          descEn: 'The Home Depot digital Gift Card. Valid in stores and at homedepot.com.' },

        // ---- sample brands (placeholders: no real logo) ----
        { id: 'glowbeauty',     name: 'Glow Beauty',     cat: 'beauty',  denoms: [10, 25, 50], sample: true, color: '#D6336C',
          desc: 'Gift Card digital de Glow Beauty para productos de belleza y cuidado personal.', descEn: 'Glow Beauty digital Gift Card for beauty and personal care products.' },
        { id: 'hopefoundation', name: 'Hope Foundation', cat: 'charity', denoms: [10, 25, 50], sample: true, color: '#2B8A3E',
          desc: 'Gift Card digital de Hope Foundation: tu valor se dona a la causa que elijas.', descEn: 'Hope Foundation digital Gift Card: your value is donated to the cause you choose.' },
        { id: 'familyfun',      name: 'Family Fun Park', cat: 'family',  denoms: [10, 25, 50], sample: true, color: '#F08C00',
          desc: 'Gift Card digital de Family Fun Park para entretenimiento en familia.', descEn: 'Family Fun Park digital Gift Card for family entertainment.' },
        { id: 'urbanstyle',     name: 'Urban Style',     cat: 'fashion', denoms: [20, 50, 100], sample: true, color: '#343A40',
          desc: 'Gift Card digital de Urban Style para ropa y accesorios.', descEn: 'Urban Style digital Gift Card for clothing and accessories.' },
        { id: 'giftbox',        name: 'Gift Box',        cat: 'gifts',   denoms: [10, 25, 50], sample: true, color: '#7048E8',
          desc: 'Gift Card digital de Gift Box para regalar en cualquier ocasión.', descEn: 'Gift Box digital Gift Card to give on any occasion.' },
        { id: 'prepaidcard',    name: 'Prepaid Card',    cat: 'prepaid', denoms: [25, 50, 100], sample: true, color: '#1C7ED6',
          desc: 'Tarjeta prepago digital de uso general.', descEn: 'General purpose digital prepaid card.' },
        { id: 'sportzone',      name: 'Sport Zone',      cat: 'sports',  denoms: [20, 50, 100], sample: true, color: '#E8590C',
          desc: 'Gift Card digital de Sport Zone para equipamiento y ropa deportiva.', descEn: 'Sport Zone digital Gift Card for sports gear and apparel.' },
        { id: 'skytravel',      name: 'Sky Travel',      cat: 'travel',  denoms: [50, 100, 200], sample: true, color: '#0C8599',
          desc: 'Gift Card digital de Sky Travel para vuelos, hoteles y paquetes.', descEn: 'Sky Travel digital Gift Card for flights, hotels and packages.' },
        { id: 'gamezone',       name: 'Game Zone',       cat: 'gaming',  denoms: [10, 25, 50], sample: true, color: '#5F3DC4',
          desc: 'Gift Card digital de Game Zone para juegos y contenido digital.', descEn: 'Game Zone digital Gift Card for games and digital content.' },
        { id: 'homestyle',      name: 'Home Style',      cat: 'home',    denoms: [25, 50, 100], sample: true, color: '#8C6D46',
          desc: 'Gift Card digital de Home Style para muebles y decoración.', descEn: 'Home Style digital Gift Card for furniture and decor.' }
    ];

    var api = { CATEGORIES: CATEGORIES, BRANDS: BRANDS };
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    else root.RIA_CATALOG = api;
})(typeof window !== 'undefined' ? window : this);
