/* getloveco.com: Coo, the hero delivery loop, scroll reveals and the sticker wall. No libraries. */
(function () {
  const C = window.Coo;
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = s => document.querySelector(s), $$ = s => Array.from(document.querySelectorAll(s));
  const svg = (inner, vb, cls = '') => `<svg class="cupid ${cls}" viewBox="${vb}" aria-hidden="true">${inner}</svg>`;
  const shadow = `<ellipse class="shadow-ell" cx="100" cy="188" rx="40" ry="6" fill="#1E1A44" opacity=".14"/>`;

  // Stickers anywhere on the page
  $$('[data-astk]').forEach(el => { el.innerHTML = C.astk(el.dataset.astk, +el.dataset.px || 110); });

  // Logo: Coo's head
  $$('[data-coo="head"]').forEach(el => { el.innerHTML = svg(C.coo({ face: 'happy', noFx: true }), '44 26 112 104'); });

  // Hero Coo (live: bobs, blinks, flaps)
  const heroCoo = $('#heroCoo');
  if (heroCoo) heroCoo.innerHTML = svg(shadow + C.coo({ live: true }), '0 0 200 200', 'live');

  // Final Coo waving
  const fin = $('#finalCoo');
  if (fin) fin.innerHTML = svg(shadow + `<g class="rig" style="transform-origin:50% 95%;animation:bob 2.6s ease-in-out infinite">${C.coo({ face: 'hello' })}</g>`, '0 0 200 200');

  // Clouds drifting across the hero
  const clouds = $('#clouds');
  if (clouds && !RM) {
    const cloud = w => `<svg viewBox="0 0 200 90" width="${w}"><path d="M20 80C8 80 4 62 18 56C14 36 40 28 54 40C60 18 96 12 110 34C124 20 152 26 154 48C176 44 190 64 176 80Z" fill="#fff" stroke="#1E1A44" stroke-width="5" stroke-linejoin="round" opacity=".85"/></svg>`;
    [[160, 12, 70, -10], [110, 38, 90, -50], [200, 70, 110, -30], [90, 86, 80, -70]].forEach(([w, top, dur, delay]) => {
      const d = document.createElement('div');
      d.className = 'cloud'; d.innerHTML = cloud(w);
      d.style.top = top + '%'; d.style.animationDuration = dur + 's'; d.style.animationDelay = delay + 's';
      clouds.appendChild(d);
    });
  }

  // Hero: Coo flies in with something new, the card changes, Coo grows a little
  const states = [
    { label: "today's question", title: "What's a tiny thing I do that you secretly love?", btn: 'Answer' },
    { label: 'new from Emma', title: 'Emma sent you a doodle 💌', btn: 'Open it', fly: true },
    { label: 'Emma reacted', title: 'Emma melted at your answer 🫠', btn: 'See it' },
    { label: 'your turn', title: 'Emma played This or that. Your turn', btn: 'Play my half', fly: true },
    { label: 'letter idea', title: 'Write Emma a letter about the moment you knew', btn: 'Write it' }
  ];
  let si = 0, grown = 22;
  const bubble = $('#heroBubble'), label = $('#heroLabel'), title = $('#heroTitle'), btn = $('#heroBtn');
  const bar = $('#growBar'), growN = $('#growN'), flyer = $('#flyer'), demo = $('#heroDemo'), phone = $('#heroPhone');
  if (flyer) flyer.innerHTML = svg(C.coo({ face: 'joy', holding: true, noFx: true }), '0 0 200 200');
  const setBar = () => { if (bar) { bar.style.width = Math.min(100, grown / 30 * 100) + '%'; growN.textContent = `${grown} / 30`; } };
  setBar();

  function fly(done) {
    if (RM || !flyer || !demo) return done();
    const d = demo.getBoundingClientRect(), p = phone.getBoundingClientRect();
    const tx = p.left - d.left + p.width / 2 - 60, ty = p.top - d.top + p.height * 0.22 - 60;
    const sx = -180, sy = ty - 120;
    const a = flyer.animate([
      { transform: `translate(${sx}px,${sy}px) rotate(-8deg) scale(.8)`, opacity: 0 },
      { transform: `translate(${(sx + tx) / 2}px,${sy - 70}px) rotate(6deg) scale(.95)`, opacity: 1, offset: .45 },
      { transform: `translate(${tx}px,${ty}px) rotate(0) scale(1)`, opacity: 1, offset: .8 },
      { transform: `translate(${tx + 40}px,${ty - 160}px) rotate(12deg) scale(.7)`, opacity: 0 }
    ], { duration: 2200, easing: 'cubic-bezier(.45,.05,.35,1)' });
    setTimeout(done, 1650);
    a.onfinish = () => { flyer.style.opacity = 0; };
  }
  function show(s) {
    bubble.classList.add('out');
    setTimeout(() => {
      label.textContent = s.label; title.textContent = s.title; btn.textContent = s.btn;
      bubble.classList.remove('out');
      bubble.animate([{ transform: 'scale(.94)' }, { transform: 'scale(1.03)' }, { transform: 'scale(1)' }], { duration: 380, easing: 'ease-out' });
      grown = grown >= 29 ? 22 : grown + 1; setBar();
    }, 330);
  }
  function tick() {
    si = (si + 1) % states.length;
    const s = states[si];
    if (s.fly) fly(() => show(s)); else show(s);
  }
  if (bubble && !RM) setInterval(tick, 4200);

  // Parallax for the floating stickers
  const floats = $$('.float-stk');
  if (!RM && floats.length && matchMedia('(pointer:fine)').matches) {
    window.addEventListener('mousemove', e => {
      const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
      floats.forEach(f => { const k = +f.dataset.depth; f.style.transform = `translate(${x * k}px,${y * k}px)`; });
    }, { passive: true });
  }

  // Coo grows: egg, baby, little, grown
  const row = $('#growRow');
  if (row) {
    const stage = (inner, name, vb = '0 0 200 200') => `<figure>${svg(inner, vb)}<span>${name}</span></figure>`;
    row.innerHTML =
      stage(`<g class="eggwob">${C.egg(true, false)}</g>`, 'Egg') +
      stage(C.coo({ face: 'hello', scale: .72, shell: true, tuftSmall: true, satchel: false, noFx: true }), 'Baby') +
      stage(C.coo({ face: 'happy', scale: .86, noFx: true }), 'Little') +
      stage(C.coo({ face: 'proud', scarf: true, noFx: true }), 'Grown');
  }

  // Sticker wall: tap to slap it on again
  const wall = $('#wall');
  if (wall) {
    const order = ['sob', 'melt', 'sideeye', 'flop', 'hug', 'sign', 'judging', 'unhinged', 'satchel', 'crash', 'notes', 'signown'];
    wall.innerHTML = order.map((k, i) => {
      return `<button class="st stk-card rv${i % 3 ? ' d' + (i % 3) : ''}" type="button" aria-label="${C.NAMES[k]} Coo">${C.astk(k, 140)}<b>${C.NAMES[k]}</b><small>${C.WHAT[k]}</small></button>`;
    }).join('');
    wall.addEventListener('click', e => {
      const b = e.target.closest('.st'); if (!b) return;
      const s = b.querySelector('.astk'); s.classList.remove('slapin'); void s.getBoundingClientRect(); s.classList.add('slapin');
    });
  }

  // Nav background once scrolled
  const nav = $('#nav');
  const onScroll = () => nav && nav.classList.toggle('scrolled', scrollY > 10);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Reveal on scroll, and play each feature demo when it comes into view (replays next time)
  if ('IntersectionObserver' in window) {
    const rv = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rv.unobserve(e.target); } }), { threshold: .15 });
    $$('.rv').forEach(el => rv.observe(el));
    const pl = new IntersectionObserver(es => es.forEach(e => {
      if (e.intersectionRatio > .35) e.target.classList.add('play');
      else if (e.intersectionRatio === 0) e.target.classList.remove('play');
    }), { threshold: [0, .35] });
    $$('[data-play]').forEach(el => pl.observe(el));
  } else {
    $$('.rv').forEach(el => el.classList.add('in')); $$('[data-play]').forEach(el => el.classList.add('play'));
  }
})();

/* Visits, App Store taps and the "tell me when it's on Android" list.
   PostHog (same project as the app). No cookies, no local storage, no session recording, no autocapture.
   The key below is a public write-only project token (the kind every website ships), not a secret. */
(function () {
  var KEY = 'phc_rEZVZE4tebhaqsbaAHk4pAmu4sqx43abPQZCAMueVZCg', HOST = 'https://us.i.posthog.com';
  var root = document.documentElement, q = new URLSearchParams(location.search);
  var os = root.classList.contains('os-android') ? 'android' : root.classList.contains('os-ios') ? 'ios' : 'other';
  var base = { site: 'getloveco.com', device_os: os };
  // ?from=ru (or any utm_source) says which account or post sent the visit
  var from = (q.get('from') || q.get('utm_source') || '').slice(0, 40); if (from) base.from = from;
  var test = q.has('lctest'); if (test) base.is_test = true;
  var ph = null;

  var s = document.createElement('script');
  s.async = true; s.crossOrigin = 'anonymous'; s.src = 'https://us-assets.i.posthog.com/static/array.js';
  s.onload = function () {
    if (!window.posthog || !window.posthog.init) return;
    window.posthog.init(KEY, {
      api_host: HOST, persistence: 'memory', person_profiles: 'identified_only',
      autocapture: false, capture_pageview: false, capture_pageleave: true,
      disable_session_recording: true, disable_surveys: true, advanced_disable_flags: true,
      loaded: function (p) { ph = p; p.register(base); p.capture('$pageview'); }
    });
  };
  document.head.appendChild(s);
  function track(name, props) { try { if (ph) ph.capture(name, props || {}, { send_instantly: true }); } catch (e) {} }

  // App Store taps, by where the button sits
  Array.prototype.forEach.call(document.querySelectorAll('a[href*="apps.apple.com"]'), function (a) {
    var place = a.closest('.nav') ? 'nav' : a.closest('.hero') ? 'hero' : a.closest('.final') ? 'footer' : 'other';
    a.addEventListener('click', function () { track('app_store_click', { placement: place }); });
  });


  // "Tell me when": the email goes straight to PostHog and we only say "you're on the list" once it has been accepted
  function uid() { return (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : 'w-' + Date.now() + '-' + Math.random().toString(36).slice(2); }
  Array.prototype.forEach.call(document.querySelectorAll('form[data-waitlist]'), function (f) {
    var box = f.closest('.droid'), note = box.querySelector('.droid-note'), input = f.querySelector('input[type=email]'), btn = f.querySelector('button');
    var say = function (t, bad) { note.innerHTML = t; box.classList.toggle('bad', !!bad); };
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = (input.value || '').trim().toLowerCase();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email) || email.length > 200) { say('That email doesn\u2019t look right. Have another go.', true); input.focus(); return; }
      var ok = function () { box.classList.remove('bad'); box.classList.add('done'); note.textContent = 'You\u2019re on the list. We\u2019ll email you the day LoveCo lands on Android.'; };
      if (f.querySelector('.hp').value) return ok();
      btn.disabled = true; btn.textContent = 'Saving\u2026';
      var props = { email: email, placement: f.dataset.waitlist, $current_url: location.origin + location.pathname, $host: location.host, $pathname: location.pathname,
        $referrer: document.referrer || '$direct', $lib: 'web-form', $set: { email: email, android_waitlist: true } };
      for (var k in base) props[k] = base[k];
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(function (k) { if (q.get(k)) props[k] = q.get(k).slice(0, 80); });
      var id = uid(); try { if (ph) id = ph.get_distinct_id(); } catch (e2) {}
      fetch(HOST + '/i/v0/e/', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: KEY, event: 'android_waitlist_signup', distinct_id: id, properties: props }) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); ok(); })
        .catch(function () {
          btn.disabled = false; btn.textContent = 'Tell me when';
          say('That didn\u2019t save. Try again, or email <a href="mailto:support@loveco.app?subject=Tell%20me%20when%20LoveCo%20is%20on%20Android">support@loveco.app</a> and we\u2019ll add you.', true);
        });
    });
  });
})();
