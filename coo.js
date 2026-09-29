/* Coo art for getloveco.com: the same shapes and loops as the app (design/our-cupid/18-coo-animated.html). */
(function(){
const NS = 'http://www.w3.org/2000/svg';
const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const HEART = 'M0 .9C-.9 .25-1.1-.45-.55-.8-.25-1 0-.8 0-.55 0-.8.25-1 .55-.8 1.1-.45.9.25 0 .9Z';
const ET = 'M56 120C56 88 76 68 100 68C124 68 144 88 144 120L133 112L122 122L111 112L100 122L89 112L78 122L67 112Z';
const EB = 'M56 120L67 112L78 122L89 112L100 122L111 112L122 122L133 112L144 120C144 154 124 176 100 176C76 176 56 154 56 120Z';
const K = { ink:'#1E1A44', body:'#FFFFFF', wing:'#9DB4FF', acc:'#FF4F8B', beak:'#FFB020', cheek:'#FF9CC2', belly:'#EEF0FF', egg:'#FFFFFF', spot:'#9DB4FF', halo:'#FFFFFF', tear:'#8FD3FF' };

const heart = (x, y, s) => `<path d="${HEART}" transform="translate(${x} ${y}) scale(${s})" vector-effect="non-scaling-stroke"/>`;
function layer(shapes, fill, ink, w, halo) {
  return (halo ? `<g fill="${halo}" stroke="${halo}" stroke-width="${w + 12}" stroke-linejoin="round" stroke-linecap="round">${shapes}</g>` : '')
    + `<g fill="${ink}" stroke="${ink}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round">${shapes}</g>`
    + `<g fill="${fill}">${shapes}</g>`;
}
const mirror = inner => `<g transform="translate(200 0) scale(-1 1)">${inner}</g>`;
const ink = K.ink, W = 8, H = K.halo;

/* ---- faces ---- */
const eyeDots = (lx, ly, rx, ry, r1 = 8.4, r2 = 8.4) =>
  `<circle cx="${lx}" cy="${ly}" r="${r1}" fill="${ink}"/><circle cx="${rx}" cy="${ry}" r="${r2}" fill="${ink}"/>
   <circle cx="${lx + r1 * .38}" cy="${ly - r1 * .4}" r="${r1 * .34}" fill="#fff"/><circle cx="${rx + r2 * .38}" cy="${ry - r2 * .4}" r="${r2 * .34}" fill="#fff"/>
   <circle cx="${lx - r1 * .35}" cy="${ly + r1 * .38}" r="${r1 * .15}" fill="#fff"/><circle cx="${rx - r2 * .35}" cy="${ry + r2 * .38}" r="${r2 * .15}" fill="#fff"/>`;
const arcs = d => `<g stroke="${ink}" stroke-width="4.8" fill="none" stroke-linecap="round"><path d="${d}"/></g>`;
const BROWS = {
  neutral: 'M80 71q7-4 14 0M106 71q7-4 14 0',
  soft:    'M80 69q7-5 14-1M106 68q7-4 14 1',
  up:      'M78 63q9-7 18 0M104 63q9-7 18 0',
  smug:    'M79 72q8-3 16 3M105 75q8-6 16-3',
  curious: 'M80 73q7-3 14 0M104 62q9-7 18 1'
};
const brows = k => k ? `<g stroke="${ink}" stroke-width="4" fill="none" stroke-linecap="round"><path d="${BROWS[k]}"/></g>` : '';
const BEAK = {
  closed: layer('<path d="M92 97Q100 89 108 97Q100 107 92 97Z"/>', K.beak, ink, 6),
  smile: `<ellipse cx="100" cy="99" rx="5.5" ry="3.6" fill="${ink}"/>` + layer('<path d="M91 95Q100 87 109 95Q100 98 91 95Z"/>', K.beak, ink, 5) + layer('<path d="M94 100Q100 99 106 100Q100 106 94 100Z"/>', K.beak, ink, 5),
  open: `<ellipse cx="100" cy="100" rx="7.5" ry="7" fill="${ink}"/><ellipse cx="100" cy="104" rx="4" ry="2.6" fill="${K.acc}"/>` + layer('<path d="M90 94Q100 86 110 94Q100 97 90 94Z"/>', K.beak, ink, 5) + layer('<path d="M93 103Q100 101 107 103Q100 113 93 103Z"/>', K.beak, ink, 5)
};
const FACES = {
  happy:     { eyes: eyeDots(87, 86, 113, 86), brow: 'neutral', beak: 'closed', wings: 6 },
  hello:     { eyes: eyeDots(87, 86, 113, 86), brow: 'soft', beak: 'smile', wingL: 6, wingR: 128, tilt: 5, fx: 'wave' },
  joy:       { eyes: arcs('M78 89q9-10 18 0M104 89q9-10 18 0'), brow: 'soft', beak: 'smile', wings: 72, squash: [.95, 1.06], fx: 'hearts' },
  love:      { eyes: layer(heart(87, 87, 10) + heart(113, 87, 10), K.acc, ink, 5), brow: 'soft', beak: 'closed', wings: -12, blush: 1.45, tilt: -6, fx: 'hearts2' },
  shy:       { eyes: eyeDots(84, 91, 110, 91, 6.8, 6.8), brow: 'soft', beak: 'closed', wings: -8, blush: 1.7, tilt: 9, fx: 'blushlines' },
  laugh:     { eyes: arcs('M78 88q9-10 18 0M104 88q9-10 18 0'), brow: 'soft', beak: 'open', wings: 26, squash: [1.05, .95], tilt: -5, fx: 'tears' },
  shock:     { eyes: `<circle cx="87" cy="85" r="11" fill="#fff" stroke="${ink}" stroke-width="3.8"/><circle cx="113" cy="85" r="11" fill="#fff" stroke="${ink}" stroke-width="3.8"/><circle cx="87" cy="86" r="4" fill="${ink}"/><circle cx="113" cy="86" r="4" fill="${ink}"/>`, brow: 'up', beak: 'open', wings: 100, squash: [.93, 1.08], fx: 'bang' },
  proud:     { eyes: arcs('M79 87q8 4 16 0M105 87q8 4 16 0'), brow: 'smug', beak: 'closed', wings: -10, squash: [1.04, 1], tuftUp: true, fx: 'sparkle' },
  curious:   { eyes: eyeDots(87, 87, 113, 85, 7.4, 9.8), brow: 'curious', beak: 'closed', wingL: 4, wingR: 52, tilt: -11, fx: 'q' },
  waiting:   { eyes: eyeDots(91, 82, 117, 82, 7.6, 7.6), brow: 'soft', beak: 'closed', wingL: 2, wingR: 104, tilt: 4, fx: 'dots' },
  sleepy:    { eyes: arcs('M79 86q8 6 16 0M105 86q8 6 16 0'), brow: null, beak: 'closed', wings: -10, squash: [1.05, .95], tilt: 4, fx: 'zz' },
  celebrate: { eyes: arcs('M78 89q9-10 18 0M104 89q9-10 18 0'), brow: 'soft', beak: 'open', wings: 125, squash: [.93, 1.08], fx: 'confetti' }
};
function faceFx(kind) {
  const f = 'font-family="Rubik, system-ui, sans-serif" font-weight="800"';
  switch (kind) {
    case 'hearts': return `<g fill="${K.acc}" stroke="${ink}" stroke-width="3">${heart(152, 50, 10)}${heart(48, 60, 7)}${heart(164, 88, 5.5)}</g>`;
    case 'hearts2': return `<g fill="${K.acc}" stroke="${ink}" stroke-width="3">${heart(150, 46, 12)}${heart(170, 74, 7)}${heart(46, 52, 8)}</g>`;
    case 'blushlines': return `<g stroke="${ink}" stroke-width="2.6" stroke-linecap="round"><path d="M70 104l5-5M77 106l5-5M118 104l5-5M125 106l5-5"/></g><g fill="${K.tear}" stroke="${ink}" stroke-width="2.4"><path d="M142 64q-6 9 0 12q6-3 0-12Z"/></g>`;
    case 'tears': return `<g fill="${K.tear}" stroke="${ink}" stroke-width="2.5"><path d="M70 88q-6 9 0 13q6-4 0-13Z"/><path d="M130 88q-6 9 0 13q6-4 0-13Z"/></g>`;
    case 'bang': return `<g fill="${K.beak}" stroke="${ink}" stroke-width="3" stroke-linejoin="round"><path d="M150 30l9 0-3 30-3 0Z"/><circle cx="154.5" cy="70" r="4.2"/><path d="M40 44l6 3-8 20-3-1Z"/></g>`;
    case 'sparkle': return `<g fill="${K.beak}" stroke="${ink}" stroke-width="2.6" stroke-linejoin="round"><path d="M152 46l4 11 11 4-11 4-4 11-4-11-11-4 11-4Z"/><path d="M48 56l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z"/><path d="M166 94l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z"/></g>`;
    case 'q': return `<text x="146" y="62" ${f} font-size="34" fill="${K.acc}" stroke="${ink}" stroke-width="2.4" paint-order="stroke">?</text>`;
    case 'dots': return `<g fill="${ink}"><circle cx="146" cy="52" r="3.6"/><circle cx="157" cy="46" r="3.6"/><circle cx="168" cy="40" r="3.6"/></g>`;
    case 'zz': return `<g fill="${ink}" ${f}><text x="138" y="66" font-size="20">z</text><text x="153" y="51" font-size="15">z</text><text x="165" y="39" font-size="11">z</text></g>`;
    case 'wave': return `<g stroke="${ink}" stroke-width="3.4" fill="none" stroke-linecap="round"><path d="M172 52q6 8 2 18M180 46q9 12 3 27"/></g>`;
    case 'confetti': return `<g stroke="${ink}" stroke-width="2.4">
      <rect x="40" y="40" width="9" height="14" rx="2" fill="${K.beak}" transform="rotate(-24 44 47)"/><rect x="150" y="34" width="9" height="14" rx="2" fill="${K.acc}" transform="rotate(28 154 41)"/>
      <rect x="168" y="80" width="8" height="12" rx="2" fill="${K.wing}" transform="rotate(-18 172 86)"/><rect x="26" y="90" width="8" height="12" rx="2" fill="${K.acc}" transform="rotate(20 30 96)"/>
      <circle cx="120" cy="30" r="4.5" fill="${K.wing}"/><circle cx="70" cy="28" r="4" fill="${K.acc}"/><circle cx="178" cy="120" r="4" fill="${K.beak}"/></g>`;
    default: return '';
  }
}

/* ---- Coo builder ---- */
function coo(o = {}) {
  const live = !!o.live;
  const face = FACES[o.face || 'happy'];
  const satchel = o.satchel !== false;
  const wl = live ? 0 : (face.wingL ?? face.wings ?? 0);
  const wr = live ? 0 : (face.wingR ?? face.wings ?? 0);
  const wing = '<path d="M66 106C44 100 26 112 19 131C14 144 20 156 29 152C31 161 42 164 47 155C51 162 62 160 64 149Z"/>';
  const wingD = layer(wing, K.wing, ink, W, H) + `<path d="M29 138q9-1 16-11M39 147q7-2 12-10" stroke="#FFFFFF" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  const body = '<ellipse cx="100" cy="124" rx="50" ry="46"/><circle cx="100" cy="88" r="36"/>';
  const tuft = (o.tuftSmall
    ? '<path d="M100 56C97 48 102 44 106 47C103 49 103 52 100 56Z"/>'
    : face.tuftUp
      ? '<path d="M100 56C96 38 104 30 113 34C107 39 105 47 100 56Z"/><path d="M100 56C97 42 88 38 83 42C89 45 95 50 100 56Z"/>'
      : '<path d="M100 56C95 44 102 36 109 40C104 43 104 50 100 56Z"/><path d="M100 56C98 47 91 44 87 48C92 49 95 52 100 56Z"/>');
  const bag = satchel ? `
    <path d="M70 94L130 152" stroke="${ink}" stroke-width="12" stroke-linecap="round"/>
    <path d="M70 94L130 152" stroke="${K.acc}" stroke-width="6" stroke-linecap="round"/>
    ${layer('<rect x="116" y="137" width="32" height="26" rx="7"/>', K.acc, ink, 7)}
    <path d="M116 146h32" stroke="${ink}" stroke-width="3.5"/>
    <g fill="#FFFFFF">${heart(132, 154, 4.6)}</g>` : '';
  const scarf = o.scarf ? `${layer('<path d="M66 110Q100 128 134 110L136 122Q100 140 64 122Z"/><path d="M114 124L126 150L112 152L106 128Z"/>', K.acc, ink, 7)}
    <g stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"><path d="M80 120l4 5M96 125l3 5M112 124l3 5"/></g>` : '';
  const bl = live ? 1 : (face.blush || 1);
  const cheeks = `<g class="cheeks" fill="${K.cheek}"><ellipse cx="76" cy="102" rx="${9.5 * bl}" ry="${5.8 * bl}"/><ellipse cx="124" cy="102" rx="${9.5 * bl}" ry="${5.8 * bl}"/></g>`;
  const eyes = live
    ? `<g class="eyes">${FACES.happy.eyes}</g>
       <g class="happy" style="opacity:0">${FACES.joy.eyes}</g>
       <g class="sleep" style="opacity:0">${FACES.sleepy.eyes}</g>`
    : face.eyes;
  const env = `${layer('<rect x="72" y="114" width="56" height="40" rx="6"/>', '#FFFFFF', ink, 7, H)}
      <path d="M73 117L100 138L127 117" stroke="${ink}" stroke-width="3.6" fill="none" stroke-linejoin="round"/>
      <g fill="${K.acc}">${heart(100, 139, 7.5)}</g>`;
  const cargo = live ? `<g class="cargo" style="opacity:0">${env}</g>` : (o.holding ? env : '');
  const rig = `<g class="rig">
    <g class="wl" style="transform:rotate(${wl}deg)">${wingD}</g><g class="wr" style="transform:rotate(${-wr}deg)">${mirror(wingD)}</g>
    ${layer('<ellipse cx="90" cy="170" rx="9" ry="5.5"/><ellipse cx="110" cy="170" rx="9" ry="5.5"/>', K.beak, ink, 7, H)}
    ${layer(tuft, K.acc, ink, 7, H)}
    ${layer(body, K.body, ink, W, H)}
    <ellipse cx="100" cy="134" rx="30" ry="25" fill="${K.belly}"/>
    ${bag}${scarf}
    ${cheeks}
    ${brows(live ? 'neutral' : face.brow)}
    ${eyes}
    ${BEAK[live ? 'closed' : face.beak]}
    ${cargo}
  </g>`;
  let out = rig;
  if (!live && face.squash) out = `<g transform="translate(100 186) scale(${face.squash[0]} ${face.squash[1]}) translate(-100 -186)">${out}</g>`;
  if (!live && face.tilt) out = `<g transform="rotate(${face.tilt} 100 150)">${out}</g>`;
  if (o.scale) out = `<g transform="translate(100 186) scale(${o.scale}) translate(-100 -186)">${out}</g>`;
  return out + (o.shell ? `<g transform="translate(100 186) scale(.8) translate(-100 -180)">${layer(`<path d="${EB}"/>`, K.egg, ink, 7, H)}<g fill="${K.spot}"><circle cx="112" cy="150" r="6"/><circle cx="82" cy="158" r="4"/></g></g>` : '')
    + (!live && o.face && !o.noFx ? faceFx(face.fx) : '');
}
function egg(visible, wob) {
  const face = '<ellipse cx="100" cy="122" rx="44" ry="54"/>';
  return `<g class="egg${wob ? ' eggwob' : ''}" style="opacity:${visible ? 1 : 0}">
    <g class="eggbot">${layer(`<path d="${EB}"/>`, K.egg, ink, 7, H)}</g>
    <g class="eggtop">${layer(`<path d="${ET}"/>`, K.egg, ink, 7, H)}</g>
    <g class="eggface">${layer(face, K.egg, ink, 7, H)}
      <g fill="${K.spot}"><circle cx="84" cy="100" r="6"/><circle cx="117" cy="90" r="4"/><circle cx="112" cy="142" r="7"/><circle cx="80" cy="152" r="4.5"/><circle cx="124" cy="116" r="3"/></g>
      <g fill="${K.acc}">${heart(100, 124, 7)}</g>
    </g></g>`;
}
const shadow = `<ellipse class="shadow" cx="100" cy="186" rx="40" ry="6" fill="${ink}" opacity=".14"/>`;
const svg = (inner, cls, label) => `<svg class="cupid ${cls}" viewBox="0 0 200 200" role="img" aria-label="${label}">${inner}</svg>`;


const lid = (cx, cy, w) => `<path d="M${cx - w} ${cy}h${2 * w}" stroke="${ink}" stroke-width="5" stroke-linecap="round"/>`;
Object.assign(BROWS, {
  flat: 'M79 72h16M105 72h16',
  judge: 'M79 70l16 5M121 70l-16 5',
  sad: 'M80 74q7-6 14-8M120 74q-7-6-14-8',
  wild: 'M76 60q9-9 20-2M106 66q8-3 16 2'
});
Object.assign(FACES, {
  sideeye: { eyes: `<g><circle cx="93" cy="89" r="6.5" fill="${ink}"/><circle cx="119" cy="89" r="6.5" fill="${ink}"/>${lid(88, 84, 10)}${lid(114, 84, 10)}</g>`,
             brow: 'flat', beak: 'closed', wings: -6, tilt: -4, fx: 'side' },
  judging: { eyes: arcs('M79 88h16M105 88h16') + `<circle cx="88" cy="92" r="3.4" fill="${ink}"/><circle cx="114" cy="92" r="3.4" fill="${ink}"/>`,
             brow: 'judge', beak: 'closed', wingL: -24, wingR: -24, tilt: -7, squash: [1.02, 1], fx: 'hmm' },
  sob:     { eyes: arcs('M78 88q9 7 18 0M104 88q9 7 18 0'), brow: 'sad', beak: 'open', wings: 40, squash: [1.05, .96], fx: 'sob' },
  melt:    { eyes: layer(heart(87, 88, 9) + heart(113, 88, 9), K.acc, ink, 5), brow: 'soft', beak: 'smile', wings: -14, blush: 1.9, squash: [1.2, .8], fx: 'drip' },
  unhinged:{ eyes: `<circle cx="86" cy="85" r="12" fill="#fff" stroke="${ink}" stroke-width="3.8"/><circle cx="88" cy="87" r="5" fill="${ink}"/>` + `<circle cx="115" cy="89" r="4.6" fill="${ink}"/>`,
             brow: 'wild', beak: 'open', wingL: 110, wingR: 70, tilt: -9, tuftUp: true, fx: 'feathers' },
  flop:    { eyes: arcs('M79 90q8-5 16 0M105 90q8-5 16 0'), brow: 'sad', beak: 'closed', wings: 84, squash: [1.3, .6], fx: 'none' },
  dizzy:   { eyes: `<g stroke="${ink}" stroke-width="3.6" fill="none" stroke-linecap="round"><path d="M87 86m-2 0a2 2 0 1 1 4 0a5 5 0 1 1 -10 0a8 8 0 1 1 16 0"/><path d="M113 86m-2 0a2 2 0 1 1 4 0a5 5 0 1 1 -10 0a8 8 0 1 1 16 0"/></g>`,
             brow: null, beak: 'open', wingL: 130, wingR: 30, fx: 'stars' }
});
const _fx = faceFx;
faceFx = function (kind) {
  switch (kind) {
    case 'side': return `<g stroke="${ink}" stroke-width="3" stroke-linecap="round" fill="none"><path d="M150 70h14M154 80h10"/></g>`;
    case 'hmm': return `<g fill="${ink}" font-family="Rubik, system-ui" font-weight="800"><text x="140" y="58" font-size="20">hmm.</text></g>`;
    case 'sob': return `<g fill="${K.tear}" stroke="${ink}" stroke-width="2.6" stroke-linejoin="round">
        <path d="M76 92q-12 18-20 44q-4 16 8 16q8 0 8-14q0-22 8-44Z"/><path d="M124 92q12 18 20 44q4 16-8 16q-8 0-8-14q0-22-8-44Z"/></g>
        <g fill="${K.tear}" stroke="${ink}" stroke-width="2.4"><circle cx="40" cy="120" r="4"/><circle cx="162" cy="112" r="3.5"/><circle cx="46" cy="100" r="3"/></g>`;
    case 'drip': return `<g fill="#FFFFFF" stroke="${ink}" stroke-width="5" stroke-linejoin="round"><path d="M44 184q8 10 28 8q14 0 28 2q20 2 34-2q18-2 22-8z"/></g>
        <g fill="${K.acc}" stroke="${ink}" stroke-width="3">${heart(152, 60, 9)}${heart(44, 70, 7)}</g>`;
    case 'feathers': return `<g fill="${K.wing}" stroke="${ink}" stroke-width="2.8" stroke-linejoin="round">
        <path d="M30 40q10-8 18 2q-10 6-18-2Z"/><path d="M160 30q12-4 16 8q-12 2-16-8Z"/><path d="M170 120q10 4 6 16q-10-6-6-16Z"/><path d="M22 120q-4 12 8 14q2-10-8-14Z"/></g>
        <g fill="${K.beak}" stroke="${ink}" stroke-width="2.6"><path d="M150 60l4 10 10 4-10 4-4 10-4-10-10-4 10-4Z"/></g>`;
    case 'stars': return `<g fill="${K.beak}" stroke="${ink}" stroke-width="2.6" stroke-linejoin="round">
        <path d="M70 40l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z"/><path d="M130 34l3 8 8 3-8 3-3 8-3-8-8-3 8-3Z"/><path d="M100 26l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z"/></g>`;
    case 'none': return '';
    default: return _fx(kind);
  }
};
/* ---- Stickers: pose + props around coo() ---- */
const env2 = (x, y, s = 1, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">${layer('<rect x="-28" y="-20" width="56" height="40" rx="6"/>', '#FFFFFF', ink, 7, H)}
  <path d="M-27 -17L0 4L27 -17" stroke="${ink}" stroke-width="3.6" fill="none" stroke-linejoin="round"/><g fill="${K.acc}">${heart(0, 5, 7)}</g></g>`;
const signBoard = (txt, fs = 22) => `${layer('<path d="M58 60L62 118M142 60L138 118"/>', ink, ink, 5)}
  ${layer('<rect x="20" y="-18" width="160" height="82" rx="12"/>', '#FFFFFF', ink, 8, H)}
  <text x="100" y="${24 + fs * .36}" text-anchor="middle" font-family="Rubik, system-ui" font-weight="900" font-size="${fs}" fill="${ink}">${txt}</text>`;
const STK = {
  melt:     { name: 'Melting',   free: true,  svg: () => coo({ face: 'melt' }) },
  sob:      { name: 'Sobbing',   free: true,  svg: () => coo({ face: 'sob' }) },
  sideeye:  { name: 'Side-eye',  free: true,  svg: () => coo({ face: 'sideeye' }) },
  flop:     { name: 'Flop',      free: true,  svg: () => `<g transform="translate(0 22)">${coo({ face: 'flop', noFx: true })}</g>` + env2(170, 186, .55, 18) + `<g fill="${ink}" font-family="Rubik, system-ui" font-weight="900"><text x="126" y="84" font-size="26">ugh.</text></g>` },
  hug:      { name: 'Big hug',   free: true,  svg: () => coo({ face: 'love', noFx: true }) + `<g fill="${K.acc}" stroke="${ink}" stroke-width="3.2">${heart(100, 132, 34)}</g>` + `<g fill="${K.acc}" stroke="${ink}" stroke-width="3">${heart(160, 50, 9)}${heart(40, 60, 7)}</g>` },
  sign:     { name: 'Sign',      free: true,  svg: (t = 'miss u') => `<g transform="translate(0 30) scale(.86) translate(16 16)">${coo({ face: 'happy', wings: 0 , noFx: true })}</g>` + signBoard(t) },
  judging:  { name: 'Judging',   free: false, svg: () => coo({ face: 'judging' }) },
  unhinged: { name: 'Unhinged',  free: false, svg: () => coo({ face: 'unhinged' }) },
  satchel:  { name: 'Full bag',  free: false, svg: () => coo({ face: 'shock', satchel: false, noFx: true }) + faceFx('bang') + `<g transform="translate(132 162) rotate(-8) scale(.8)">${layer('<path d="M-40 -30h80l6 60h-92Z"/>', K.acc, ink, 8, H)}<path d="M-40 -14h80" stroke="${ink}" stroke-width="4"/></g>` + env2(116, 132, .6, -18) + env2(146, 128, .6, 14) + env2(132, 118, .55, -4) + env2(166, 146, .45, 30) },
  crash:    { name: 'Crash landing', free: false, svg: () => `<g transform="rotate(168 100 118)">${coo({ face: 'dizzy', noFx: true })}</g>` + `<g fill="#EEF0FF" stroke="${ink}" stroke-width="4" stroke-linejoin="round"><path d="M20 196q-8-18 12-20q4-14 20-8q10-10 22 2q-4 16-54 26Z"/><path d="M180 196q8-18-12-20q-4-14-20-8q-10-10-22 2q4 16 54 26Z"/></g>` + faceFx('stars').replace(/translate|/g,'') },
  notes:    { name: 'Taking notes', free: false, svg: () => coo({ face: 'curious', noFx: true }) + `<g transform="translate(100 138) rotate(-6)">${layer('<rect x="-26" y="-30" width="52" height="60" rx="5"/>', '#FFF6DA', ink, 6, H)}<g stroke="${K.wing}" stroke-width="3"><path d="M-17 -12h34M-17 0h34M-17 12h22"/></g>${layer('<path d="M20 -34l14 -10 6 8-14 10Z"/>', K.beak, ink, 4)}</g>` + faceFx('q') },
  signown:  { name: 'Your words', free: false, svg: (t = 'your words') => `<g transform="translate(0 30) scale(.86) translate(16 16)">${coo({ face: 'proud', noFx: true })}</g>` + signBoard(t, 20) }
};
const stk = (k, px = 120, t) => `<svg class="cupid static stk" viewBox="-14 -34 228 248" width="${px}" height="${px * 248 / 228}" aria-label="${STK[k].name} sticker">${STK[k].svg(t)}</svg>`;
/* ---- Prototype 18: animated stickers. Each sticker = layers that move on their own (maps 1:1 to SwiftUI) ---- */
const L = (cls, inner) => `<g class="${cls}">${inner}</g>`;
const tearsFx = () => `<g fill="${K.tear}" stroke="${ink}" stroke-width="2.6" stroke-linejoin="round">
  <path class="jetL" d="M76 92q-12 18-20 44q-4 16 8 16q8 0 8-14q0-22 8-44Z"/><path class="jetR" d="M124 92q12 18 20 44q4 16-8 16q-8 0-8-14q0-22-8-44Z"/></g>`;
const drops = () => `<g fill="${K.tear}" stroke="${ink}" stroke-width="2.2"><circle class="d1" cx="48" cy="150" r="4"/><circle class="d2" cx="154" cy="150" r="4"/><circle class="d3" cx="40" cy="120" r="3"/><circle class="d4" cx="162" cy="116" r="3"/></g>`;
const smallHearts = () => `<g fill="${K.acc}" stroke="${ink}" stroke-width="3"><g class="h1">${heart(152, 60, 9)}</g><g class="h2">${heart(44, 70, 7)}</g></g>`;
const bigHeart = () => `<g fill="${K.acc}" stroke="${ink}" stroke-width="3.2">${heart(100, 132, 34)}</g>`;
const txt = (t, x, y, fs) => `<text x="${x}" y="${y}" font-family="Rubik, system-ui" font-weight="900" font-size="${fs}" fill="${ink}">${t}</text>`;
const starsFx = () => faceFx('stars');
const feathersFx = () => faceFx('feathers');
const pencil = () => `<g transform="translate(100 138) rotate(-6)">${layer('<path d="M20 -34l14 -10 6 8-14 10Z"/>', K.beak, ink, 4)}</g>`;
const notepad = () => `<g transform="translate(100 138) rotate(-6)">${layer('<rect x="-26" y="-30" width="52" height="60" rx="5"/>', '#FFF6DA', ink, 6, H)}<g stroke="${K.wing}" stroke-width="3"><path d="M-17 -12h34M-17 0h34M-17 12h22"/></g></g>`;
const signCoo = f => `<g transform="translate(0 30) scale(.86) translate(16 16)">${coo({ face: f, noFx: true })}</g>`;
const bag = () => `<g transform="translate(132 162) rotate(-8) scale(.8)">${layer('<path d="M-40 -30h80l6 60h-92Z"/>', K.acc, ink, 8, H)}<path d="M-40 -14h80" stroke="${ink}" stroke-width="4"/></g>` + env2(116, 132, .6, -18) + env2(146, 128, .6, 14) + env2(132, 118, .55, -4);

const ASTK = {
  sob:      () => L('a-body sob-body', coo({ face: 'sob', noFx: true })) + L('a-fx sob-jets', tearsFx()) + L('a-fx sob-drops', drops()),
  melt:     () => L('a-fx melt-puddle', `<g fill="#FFFFFF" stroke="${ink}" stroke-width="5" stroke-linejoin="round"><path d="M44 184q8 10 28 8q14 0 28 2q20 2 34-2q18-2 22-8z"/></g>`) + L('a-body melt-body', coo({ face: 'melt', noFx: true })) + L('a-fx melt-hearts', smallHearts()),
  sideeye:  () => L('a-body side-body', coo({ face: 'sideeye', noFx: true })) + L('a-fx side-lines', faceFx('side')),
  flop:     () => L('a-fx flop-env', env2(170, 186, .55, 18)) + L('a-body flop-body', `<g transform="translate(0 22)">${coo({ face: 'flop', noFx: true })}</g>`) + L('a-fx flop-ugh', txt('ugh.', 126, 84, 26)),
  hug:      () => L('a-body hug-body', coo({ face: 'love', noFx: true })) + L('a-fx hug-heart', bigHeart()) + L('a-fx hug-hearts', smallHearts()),
  sign:     (t = 'miss u') => L('a-body sign-body', signCoo('happy')) + L('a-fx sign-board', signBoard(t)),
  judging:  () => L('a-body judge-body', coo({ face: 'judging', noFx: true })) + L('a-fx judge-hmm', txt('hmm.', 140, 58, 20)),
  unhinged: () => L('a-fx un-feathers', feathersFx()) + L('a-body un-body', coo({ face: 'unhinged', noFx: true })),
  satchel:  () => L('a-body bag-body', coo({ face: 'shock', satchel: false, noFx: true }) + faceFx('bang') + bag()) + L('a-fx bag-fall', env2(160, 146, .45, 30)),
  crash:    () => L('a-fx crash-dust', `<g fill="#EEF0FF" stroke="${ink}" stroke-width="4" stroke-linejoin="round"><path d="M20 196q-8-18 12-20q4-14 20-8q10-10 22 2q-4 16-54 26Z"/><path d="M180 196q8-18-12-20q-4-14-20-8q-10-10-22 2q4 16 54 26Z"/></g>`) + L('a-body crash-body', `<g transform="rotate(168 100 118)">${coo({ face: 'dizzy', noFx: true })}</g>`) + L('a-fx crash-stars', starsFx()),
  notes:    () => L('a-body notes-body', coo({ face: 'curious', noFx: true }) + notepad()) + L('a-fx notes-pencil', pencil()) + L('a-fx notes-q', faceFx('q')),
  signown:  (t = 'u up?') => L('a-body sign-body', signCoo('proud')) + L('a-fx sign-board', signBoard(t, 20)),
};
const NAMES = { sob: 'Sobbing', melt: 'Melting', sideeye: 'Side-eye', flop: 'Flop', hug: 'Big hug', sign: 'Sign', judging: 'Judging', unhinged: 'Unhinged', satchel: 'Full bag', crash: 'Crash landing', notes: 'Taking notes', signown: 'Your words' };
const WHAT = { sob: 'Tears jet out, body shakes', melt: 'Slumps into a puddle, pops back', sideeye: 'Slow look over, hold, look back', flop: 'Face-down, sighs "ugh."', hug: 'Squeezes, the heart pulses', sign: 'Waves the sign at you', judging: 'Slow squint and tilt, "hmm."', unhinged: 'Vibrates, feathers burst', satchel: 'Staggers, an envelope drops', crash: 'Thuds in, stars circle', notes: 'Scribbles, looks up, scribbles', signown: 'Waves your words at you' };
const FREE = ['melt', 'sob', 'sideeye', 'flop', 'hug', 'sign'];
const astk = (k, px = 120, t) => `<svg class="cupid static astk k-${k}" viewBox="-14 -34 228 248" width="${px}" height="${Math.round(px * 248 / 228)}" role="img" aria-label="${NAMES[k]} Coo">${ASTK[k](t)}</svg>`;

window.Coo = { astk, coo, egg, layer, heart, K, NAMES, WHAT, FREE, STK };
})();
