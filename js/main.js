/* Cuisine de INNHS - page behavior. You do not need to edit this file. */
(function () {
  'use strict';
  var D = window.CUISINE || {};
  var root = document.documentElement;
  root.classList.add('js');

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function filled(s) { return !!(s && String(s).trim()); }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var CAM = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l1.6-2.4h6.8L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.6"/></svg>';
  var PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.4"/></svg>';
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ---------- photo slots ---------- */
  function slotAttrs(src, label, alt) {
    return ' data-slot="' + esc(src) + '" data-label="' + esc(label) + '" data-alt="' + esc(alt || '') + '"';
  }
  function hydrateSlots(scope) {
    $$('[data-slot]', scope).forEach(function (el) {
      if (el.getAttribute('data-done')) return;
      el.setAttribute('data-done', '1');
      var src = el.getAttribute('data-slot') || '';
      var label = el.getAttribute('data-label') || '[UPLOAD PHOTO]';
      var alt = el.getAttribute('data-alt') || 'Food photo';
      el.innerHTML = '<div class="ph">' + CAM + '<b>' + esc(label) + '</b><em>' + esc(src) + '</em></div>';
      if (!src) return;
      var img = new Image();
      img.alt = alt; img.decoding = 'async';
      if (!el.closest('.hero')) img.loading = 'lazy';
      img.onload = function () {
        el.classList.add('has-img');
        if (el.closest('.masonry')) el.classList.add('natural');
        if (el.closest('.fig')) el.classList.add('zoomable');
      };
      img.onerror = function () { img.remove(); };
      img.src = src;
      el.appendChild(img);
    });
  }

  /* ---------- text helpers ---------- */
  function txt(v, ph, tag, cls) {
    return filled(v) ? '<' + tag + ' class="' + cls + '">' + esc(v) + '</' + tag + '>'
                     : '<' + tag + ' class="' + cls + ' ph-text">' + ph + '</' + tag + '>';
  }

  function foodCard(it, i, ar) {
    var search = [it.name, it.description, it.eatery].join(' ').toLowerCase();
    return '<article class="card t' + ((i % 4) + 1) + ' reveal" style="--i:' + (i % 3) + '" data-search="' + esc(search) + '" data-filled="' + (filled(it.name) ? 1 : 0) + '">' +
      '<div class="slot ' + ar + ' v' + (i % 5) + '"' + slotAttrs(it.photo, '[UPLOAD FOOD PHOTO]', it.name) + '></div>' +
      '<div class="card-body">' + txt(it.name, '[ENTER FOOD NAME]', 'h3', 'name') +
      txt(it.description, it.kind === 'meals' ? '[ENTER FOOD DESCRIPTION]' : '[ENTER SHORT DESCRIPTION]', 'p', 'card-desc') +
      '<div class="meta">' + txt(it.price, '[ENTER PRICE]', 'span', 'price') +
      '<span class="eatery">' + PIN + (filled(it.eatery) ? '<span>' + esc(it.eatery) + '</span>' : '<span class="ph-text">[ENTER EATERY NAME]</span>') + '</span></div></div></article>';
  }

  function renderCards() {
    $$('[data-cards]').forEach(function (box) {
      var kind = box.getAttribute('data-cards');
      var list = (D[kind] || []).slice(parseInt(box.getAttribute('data-from') || '0', 10), parseInt(box.getAttribute('data-to') || '99', 10));
      var offset = parseInt(box.getAttribute('data-from') || '0', 10);
      var ar = box.getAttribute('data-ar') || 'ar43';
      box.innerHTML = list.map(function (it, i) { it.kind = kind; return foodCard(it, i + offset, ar); }).join('');
    });
    $$('[data-finds]').forEach(function (box) {
      box.innerHTML = (D.finds || []).map(function (it, i) {
        var big = i === 0;
        return '<article class="card ' + (big ? 'find-big t3' : 'find-small t' + (i === 1 ? 2 : 1)) + ' reveal" style="--i:' + i + '">' +
          '<div class="slot ' + (big ? 'ar43' : 'ar11') + ' v' + (i + 1) + '"' + slotAttrs(it.photo, '[UPLOAD FOOD PHOTO]', it.name) + '></div>' +
          '<div class="card-body">' + (big ? '<span class="tag">Featured find</span>' : '') +
          txt(it.name, '[ENTER FOOD NAME]', 'h3', 'name') + txt(it.note, '[ENTER SHORT NOTE]', 'p', 'card-desc') +
          '<div class="meta"><span class="eatery">' + PIN + (filled(it.eatery) ? '<span>' + esc(it.eatery) + '</span>' : '<span class="ph-text">[ENTER EATERY NAME]</span>') + '</span></div></div></article>';
      }).join('');
    });
    $$('[data-gal-from]').forEach(function (box) {
      var from = parseInt(box.getAttribute('data-gal-from'), 10), to = parseInt(box.getAttribute('data-gal-to'), 10);
      var ars = (box.getAttribute('data-gal-ars') || '').split(',');
      box.innerHTML = (D.gallery || []).slice(from, to).map(function (it, i) {
        var a = ars[i % ars.length].trim();
        var cls = a === 'grow' ? 'grow' : a;
        return '<figure class="fig reveal" style="--i:' + (i % 3) + '" data-title="' + esc(it.title) + '" data-cap="' + esc(it.caption) + '">' +
          '<div class="slot ' + cls + ' v' + ((i + from) % 5) + '"' + slotAttrs(it.photo, '[UPLOAD PHOTO]', it.title) + '></div>' +
          '<figcaption>' + txt(it.title, '[ENTER FOOD OR EATERY NAME]', 'strong', 'name') + txt(it.caption, '[ENTER SHORT CAPTION]', 'span', 'cap') + '</figcaption></figure>';
      }).join('');
    });
  }

  /* static slots in the html get their photo names from data.js */
  function wireStaticSlots() {
    var map = { 'hero': D.hero, 'about': D.about, 'cat-meals': D.categories && D.categories.meals, 'cat-snacks': D.categories && D.categories.snacks, 'cat-gallery': D.categories && D.categories.gallery };
    $$('[data-slot-key]').forEach(function (el) {
      var k = el.getAttribute('data-slot-key');
      if (map[k]) el.setAttribute('data-slot', map[k]);
    });
  }

  /* ---------- header menu ---------- */
  function initMenu() {
    var btn = $('#menu-btn'), nav = $('#nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', function () {
      var open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });
  }

  /* ---------- progress bar + back to top ---------- */
  function initScroll() {
    var bar = $('#progress'), up = $('#to-top');
    function on() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var y = window.scrollY || 0;
      if (bar) bar.style.width = (h > 0 ? Math.min(100, y / h * 100) : 0) + '%';
      if (up) up.classList.toggle('show', y > 700);
    }
    window.addEventListener('scroll', on, { passive: true });
    on();
    if (up) up.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }); });
  }

  /* ---------- scroll reveal ---------- */
  function initReveal() {
    var els = $$('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    els.forEach(function (e) { io.observe(e); });
    setTimeout(function () { $$('.reveal:not(.in)').forEach(function (e) { var r = e.getBoundingClientRect(); if (r.top < window.innerHeight * 1.5) e.classList.add('in'); }); }, 2500);
  }

  /* ---------- falling food ---------- */
  var FOODS = ['🍜', '🍢', '🍙', '🥟', '🍡', '🍟', '🌮', '🍳', '🍞', '🥤', '🍌', '🍗', '🍚', '🥭', '🍉', '🌽', '🍧', '🧋', '🍔', '🍩'];
  var rain = null, rainOn = false;
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function drop(burst) {
    var s = document.createElement('span');
    var dur = burst ? rnd(3.2, 6) : rnd(10, 19);
    s.className = 'drop' + (burst ? ' once' : '');
    s.style.left = rnd(0, 96) + 'vw';
    s.style.fontSize = rnd(22, burst ? 52 : 44).toFixed(0) + 'px';
    s.style.animationDuration = dur.toFixed(1) + 's';
    s.style.animationDelay = (burst ? rnd(0, 1.4) : -rnd(0, dur)).toFixed(1) + 's';
    s.style.setProperty('--rot', (Math.random() < .5 ? -1 : 1) * rnd(120, 420).toFixed(0) + 'deg');
    var i = document.createElement('i');
    i.textContent = FOODS[Math.floor(Math.random() * FOODS.length)];
    i.style.animationDuration = rnd(2.4, 4.6).toFixed(1) + 's';
    s.appendChild(i);
    if (burst) s.addEventListener('animationend', function () { s.remove(); });
    return s;
  }
  function startRain() {
    if (!rain) return;
    rain.hidden = false; rainOn = true;
    if (!$('.drop:not(.once)', rain)) {
      var n = window.innerWidth < 700 ? 8 : 15;
      for (var i = 0; i < n; i++) rain.appendChild(drop(false));
    }
    updateToggle();
  }
  function stopRain() { if (rain) rain.hidden = true; rainOn = false; updateToggle(); }
  function updateToggle() {
    var b = $('#rain-toggle');
    if (b) { b.textContent = 'Falling food: ' + (rainOn ? 'On' : 'Off'); b.setAttribute('aria-pressed', rainOn ? 'true' : 'false'); }
  }
  function burst() {
    if (!rain) return;
    if (reduced) return;
    rain.hidden = false;
    var n = window.innerWidth < 700 ? 24 : 42;
    for (var i = 0; i < n; i++) rain.appendChild(drop(true));
    if (!rainOn) setTimeout(function () { if (!rainOn && !$('.drop.once', rain)) rain.hidden = true; }, 8000);
  }
  function initRain() {
    rain = $('#rain');
    var t = $('#rain-toggle');
    var pref = store('cdi-rain');
    var want = pref ? pref === 'on' : !reduced;
    if (t) t.addEventListener('click', function () { rainOn ? stopRain() : startRain(); store('cdi-rain', rainOn ? 'on' : 'off'); });
    $$('[data-burst]').forEach(function (b) { b.addEventListener('click', burst); });
    if (want && !reduced) startRain(); else stopRain();
  }

  /* ---------- search + surprise ---------- */
  function initSearch() {
    var q = $('#q'), status = $('#status'), btn = $('#surprise');
    if (!q) return;
    function cards() { return $$('[data-cards] .card'); }
    q.addEventListener('input', function () {
      var term = q.value.trim().toLowerCase(), shown = 0, all = cards();
      all.forEach(function (c) {
        var hit = !term || (c.getAttribute('data-search') || '').indexOf(term) !== -1;
        c.hidden = !hit; if (hit) shown++;
      });
      if (status) status.textContent = term ? (shown ? shown + ' found' : 'Nothing matched "' + q.value.trim() + '" yet.') : '';
    });
    if (btn) btn.addEventListener('click', function () {
      var pool = cards().filter(function (c) { return c.getAttribute('data-filled') === '1' && !c.hidden; });
      if (!pool.length) { if (status) status.textContent = 'No dishes are listed yet. Check back soon!'; return; }
      var pick = pool[Math.floor(Math.random() * pool.length)];
      pick.classList.add('in');
      pick.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
      pick.classList.remove('pop'); void pick.offsetWidth; pick.classList.add('pop');
      var n = $('.name', pick);
      if (status && n) status.textContent = 'How about: ' + n.textContent + '?';
      burst();
    });
  }

  /* ---------- lightbox ---------- */
  function initLightbox() {
    var figs = function () { return $$('.fig').filter(function (f) { return $('.slot.has-img', f); }); };
    if (!$('.fig')) return;
    var lb = document.createElement('div');
    lb.className = 'lb'; lb.hidden = true; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Photo viewer');
    lb.innerHTML = '<button class="x" type="button" aria-label="Close">✕</button><button class="pv" type="button" aria-label="Previous photo">‹</button><button class="nx" type="button" aria-label="Next photo">›</button><img alt=""><p></p>';
    document.body.appendChild(lb);
    var img = $('img', lb), cap = $('p', lb), cur = -1, opener = null;
    function show(i) {
      var list = figs(); if (!list.length) return;
      cur = (i + list.length) % list.length;
      var f = list[cur], src = $('.slot img', f).src;
      img.src = src; img.alt = f.getAttribute('data-title') || 'Food photo';
      var t = f.getAttribute('data-title'), c = f.getAttribute('data-cap');
      cap.innerHTML = (t ? '<b>' + esc(t) + '</b>' : '') + esc(c || '');
    }
    function open(i, from) { opener = from; show(i); lb.hidden = false; $('.x', lb).focus(); }
    function close() { lb.hidden = true; img.src = ''; if (opener) opener.focus(); }
    document.addEventListener('click', function (e) {
      var s = e.target.closest && e.target.closest('.fig .slot.has-img');
      if (s) { var f = s.closest('.fig'); open(figs().indexOf(f), s); }
    });
    $('.x', lb).addEventListener('click', close);
    $('.pv', lb).addEventListener('click', function () { show(cur - 1); });
    $('.nx', lb).addEventListener('click', function () { show(cur + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    });
  }

  /* ---------- start ---------- */
  wireStaticSlots();
  renderCards();
  hydrateSlots(document);
  initMenu(); initScroll(); initReveal(); initRain(); initSearch(); initLightbox();
})();
