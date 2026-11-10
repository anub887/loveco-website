/* Visits and store taps for the free tool pages. Same PostHog setup as site.js:
   no cookies, no local storage, no autocapture, no session recording. Public write-only key. */
(function () {
  var KEY = 'phc_rEZVZE4tebhaqsbaAHk4pAmu4sqx43abPQZCAMueVZCg', HOST = 'https://us.i.posthog.com';
  var root = document.documentElement, q = new URLSearchParams(location.search);
  var os = root.classList.contains('os-android') ? 'android' : root.classList.contains('os-ios') ? 'ios' : 'other';
  var base = { site: 'getloveco.com', device_os: os, tool: document.body.getAttribute('data-tool') || 'none' };
  var from = (q.get('from') || q.get('utm_source') || '').slice(0, 40); if (from) base.from = from;
  if (q.has('lctest')) base.is_test = true;
  var ph = null, queue = [];
  var s = document.createElement('script');
  s.async = true; s.crossOrigin = 'anonymous'; s.src = 'https://us-assets.i.posthog.com/static/array.js';
  s.onload = function () {
    if (!window.posthog || !window.posthog.init) return;
    window.posthog.init(KEY, {
      api_host: HOST, persistence: 'memory', person_profiles: 'identified_only',
      autocapture: false, capture_pageview: false, capture_pageleave: true,
      disable_session_recording: true, disable_surveys: true, advanced_disable_flags: true,
      loaded: function (p) { ph = p; p.register(base); p.capture('$pageview'); queue.forEach(function (e) { p.capture(e[0], e[1]); }); queue = []; }
    });
  };
  document.head.appendChild(s);
  window.lcTrack = function (name, props) { try { if (ph) ph.capture(name, props || {}, { send_instantly: true }); else queue.push([name, props || {}]); } catch (e) {} };
  function place(a) { return a.closest('.nav') ? 'nav' : a.closest('.bridge') ? 'tool_bridge' : 'other'; }
  Array.prototype.forEach.call(document.querySelectorAll('a[href*="apps.apple.com"]'), function (a) {
    a.addEventListener('click', function () { window.lcTrack('app_store_click', { placement: place(a) }); });
  });
  Array.prototype.forEach.call(document.querySelectorAll('a[href*="play.google.com"]'), function (a) {
    a.addEventListener('click', function () { window.lcTrack('play_store_click', { placement: place(a) }); });
  });
  if (os === 'android') Array.prototype.forEach.call(document.querySelectorAll('.nav .btn'), function (a) { a.href = 'https://play.google.com/store/apps/details?id=com.loveco'; });
  var nav = document.getElementById('nav'); if (nav) addEventListener('scroll', function () { nav.classList.toggle('scrolled', scrollY > 8); }, { passive: true });
})();
