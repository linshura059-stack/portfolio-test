// Profile photo for the My Portfolio mockup
const FOLIO_PHOTO = '/assets/sok-sophea-profile.png';

const R = (x: number, y: number, w: number, h: number, f: string, rx = 2) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}"/>`;
const C = (x: number, y: number, r: number, f: string) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"/>`;
const T = (x: number, y: number, s: number, f: string, t: string, w = 700, a = 'start') =>
  `<text x="${x}" y="${y}" font-size="${s}" font-weight="${w}" fill="${f}" text-anchor="${a}" font-family="Arial,Helvetica,sans-serif">${t}</text>`;
const LN = (x: number, y: number, w: number, n: number, f = '#d3d9df', gap = 7, h = 3) =>
  Array.from({ length: n }, (_, i) => R(x, y + i * gap, i === n - 1 ? w * 0.62 : w, h, f, 1.5)).join('');
const wrap = (inner: string, bg = '#fff') =>
  `<svg viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${R(0, 0, 320, 400, bg, 0)}${inner}</svg>`;
const pie = (cx: number, cy: number, R_: number, segs: [number, string][]) => {
  const r = R_ / 2, c = 2 * Math.PI * r;
  let off = 0;
  return segs.map(([p, col]) => {
    const s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${col}" stroke-width="${R_}" stroke-dasharray="${c * p} ${c}" stroke-dashoffset="${-off * c}" transform="rotate(-90 ${cx} ${cy})"/>`;
    off += p;
    return s;
  }).join('');
};

export const SCREENS: Record<string, () => string> = {
  dashboard: () => wrap(
    R(0, 0, 58, 400, '#fff', 0) + C(29, 24, 11, '#f2b632') +
    [0, 1, 2, 3, 4, 5, 6, 7].map(i => R(10, 56 + i * 22, 38, 9, i === 0 ? '#3b82f6' : '#e8ebf0', 3)).join('') +
    T(70, 20, 11, '#2f80ed', 'Dashboard') +
    ['#22c55e', '#ef4444', '#f59e0b', '#3b82f6'].map((c, i) => R(70 + i * 61, 30, 55, 36, '#fff', 4) + R(76 + i * 61, 38, 20, 4, c, 2) + R(76 + i * 61, 48, 34, 7, '#1f2937', 2)).join('') +
    R(70, 76, 140, 104, '#fff', 4) + R(78, 84, 48, 5, '#94a3b8', 2) +
    [30, 52, 40, 66, 48, 72, 58, 44].map((h, i) => R(80 + i * 16.5, 172 - h, 10, h, i % 2 ? '#93c5fd' : '#3b82f6', 2)).join('') +
    R(218, 76, 94, 104, '#fff', 4) + R(226, 84, 40, 5, '#94a3b8', 2) + pie(265, 140, 30, [[0.42, '#3b82f6'], [0.26, '#ef4444'], [0.2, '#f59e0b'], [0.12, '#22c55e']]) +
    R(70, 190, 242, 96, '#fff', 4) + [0, 1, 2, 3, 4].map(i => R(80, 200 + i * 17, 222, 9, i % 2 ? '#f6f7f9' : '#e9edf3', 2)).join('') +
    R(70, 296, 116, 96, '#fff', 4) + R(194, 296, 118, 96, '#fff', 4) + pie(253, 346, 26, [[0.55, '#22c55e'], [0.3, '#3b82f6'], [0.15, '#f59e0b']]) + LN(78, 306, 100, 6, '#dfe4ea', 12, 4),
    '#f3f5f9'
  ),
  travel: () => wrap(
    R(0, 0, 320, 24, '#fff', 0) + C(16, 12, 6, '#e0382f') + [0, 1, 2, 3, 4].map(i => R(120 + i * 36, 10, 26, 4, '#9aa4b2', 2)).join('') + R(0, 24, 320, 1, '#e5e7eb', 0) +
    '<path d="M28 52L74 40l44 10 14 34-14 20 10 34-36 22-30-10-22-28-20-26z" fill="#3b82c4"/><path d="M60 70l36-4 8 26-20 26-20-16z" fill="#5aa0de"/>' +
    LN(150, 44, 158, 7, '#cfd6de', 10, 4) + R(150, 126, 70, 14, '#e0382f', 3) +
    [0, 1, 2].map(i => R(14 + i * 102, 176, 94, 64, ['#7db7e8', '#f2b45a', '#84cba0'][i], 4) + LN(18 + i * 102, 250, 86, 3, '#d3d9df', 8, 3)).join('') +
    R(0, 300, 320, 100, '#f4f6f9', 0) + LN(20, 316, 280, 6, '#cbd2da', 12, 4)
  ),
  shop: () => wrap(
    R(0, 0, 320, 22, '#1e9e55', 0) + T(12, 15, 10, '#fff', 'iPhone') + [0, 1, 2, 3].map(i => R(140 + i * 38, 9, 26, 4, '#b8f0d0', 2)).join('') +
    R(0, 22, 320, 138, '#0b1912', 0) + '<rect x="14" y="34" width="292" height="114" fill="none" stroke="#22c55e" stroke-width="3"/>' +
    T(30, 76, 20, '#fff', 'iPhone Shop') + T(30, 94, 7.5, '#86efac', 'WELCOME TO OUR WEBSITE', 400) + R(30, 108, 58, 14, '#16a34a', 3) +
    R(210, 44, 58, 96, '#1f2933', 9) + R(214, 48, 50, 88, '#0f172a', 6) + C(239, 92, 14, '#e5e7eb') +
    [0, 1, 2].map(i => R(14 + i * 102, 172, 94, 90, '#fff', 4) + R(34 + i * 102, 182, 54, 50, '#e6f4ec', 4) + LN(22 + i * 102, 244, 60, 2, '#cbd5d0', 8, 3)).join('') +
    [0, 1, 2].map(i => R(14 + i * 102, 272, 94, 90, '#fff', 4) + R(34 + i * 102, 282, 54, 50, '#e6f4ec', 4) + LN(22 + i * 102, 344, 60, 2, '#cbd5d0', 8, 3)).join(''),
    '#f2f6f3'
  ),
  moto: () => {
    const bike = (x: number, y: number, c: string) =>
      `<g transform="translate(${x} ${y})"><circle cx="12" cy="30" r="10" fill="none" stroke="#1f2937" stroke-width="3.5"/><circle cx="60" cy="30" r="10" fill="none" stroke="#1f2937" stroke-width="3.5"/><path d="M12 30L30 10h20l10 20M30 10l8 20h22M50 10l5-8" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>`;
    return wrap(
      R(0, 0, 320, 26, '#fff', 0) + C(16, 13, 8, '#1d4ed8') + [0, 1, 2, 3, 4].map(i => R(120 + i * 34, 11, 22, 4, '#6b7280', 2)).join('') + R(0, 26, 320, 1, '#e5e7eb', 0) +
      bike(12, 50, '#111') + bike(120, 50, '#0f5fd7') + bike(228, 50, '#d13b2c') +
      [0, 1, 2].map(i => LN(14 + i * 104, 100, 86, 3, '#d3d9df', 8, 3)).join('') +
      R(0, 140, 320, 120, '#f3f4f6', 0) + T(160, 172, 13, '#111827', 'New arrivals', 700, 'middle') +
      [0, 1, 2].map(i => R(14 + i * 102, 186, 94, 60, '#fff', 4) + bike(20 + i * 102, 192, '#9ca3af')).join('') +
      R(0, 270, 320, 130, '#fff', 0) + LN(20, 290, 280, 7, '#d3d9df', 12, 4)
    );
  },
  folio: () => wrap(
    R(0, 0, 320, 24, '#1b1f26', 0) + T(12, 16, 9, '#fff', 'SOK SOPHEA') + [0, 1, 2, 3].map(i => R(190 + i * 32, 10, 22, 4, '#8b95a5', 2)).join('') +
    T(160, 66, 12, '#fff', 'I’M SOK SOPHEA WEB DEVELOPER', 700, 'middle') +
    C(70, 124, 34, '#3ba0f5') + '<defs><clipPath id="folioPhotoClip"><circle cx="70" cy="124" r="34"/></clipPath></defs>' + `<image href="${FOLIO_PHOTO}" x="36" y="90" width="68" height="68" preserveAspectRatio="xMidYMid slice" clip-path="url(#folioPhotoClip)"/>` + '<circle cx="70" cy="124" r="34" fill="none" stroke="#3ba0f5" stroke-width="1.5"/>' +
    T(126, 108, 11, '#fff', 'HELLO!', 700) + LN(126, 120, 170, 6, '#8b95a5', 10, 4) +
    R(0, 196, 320, 204, '#0f1216', 0) + [0, 1, 2].map(i => R(16 + i * 102, 214, 90, 64, '#1d2430', 5) + R(24 + i * 102, 224, 50, 5, '#3ba0f5', 2) + LN(24 + i * 102, 238, 72, 3, '#44506a', 9, 3)).join('') +
    LN(16, 300, 288, 5, '#3b4658', 12, 4),
    '#14171c'
  ),
  blog: () => wrap(
    R(0, 0, 320, 26, '#fff', 0) + C(16, 13, 7, '#e8433f') + R(34, 10, 40, 6, '#333', 2) + [0, 1, 2, 3].map(i => R(150 + i * 40, 11, 28, 4, '#8aa0b8', 2)).join('') + R(0, 26, 320, 3, '#22b8cf', 0) +
    [0, 1, 2, 3].map(i => R(12, 42 + i * 70, 64, 54, ['#7cc5e8', '#f0b56a', '#9ad2a8', '#c9a7e8'][i], 3) + R(84, 44 + i * 70, 150, 6, '#1d3557', 2) + LN(84, 58 + i * 70, 150, 4, '#cfd6de', 9, 3)).join('') +
    R(246, 42, 64, 210, '#f1f5f9', 4) + LN(252, 54, 52, 10, '#c7d0da', 16, 4)
  )
};

const TECH_ICONS: Record<string, string> = {
  'laravel': '<svg viewBox="0 0 24 24"><path fill="#ff2d20" d="M23.6 5.6 19 3a.6.6 0 0 0-.6 0l-4 2.3-.1.1V9L10.6 11V6.7l-.1-.1L6.4 4.2a.6.6 0 0 0-.6 0L1.2 6.8a.6.6 0 0 0-.3.5v10.2c0 .2.1.4.3.5l9.2 5.3a.6.6 0 0 0 .6 0l9.2-5.3 4-2.3a.6.6 0 0 0 .3-.5V6.1a.6.6 0 0 0-.9-.5zM6.1 5.3l3.2 1.8-3.2 1.9L2.9 7.100zM2.100 8.100 5.500 10v4.200l-3.400-2zm8 12.600-6.100-3.500V13l6.100 3.500zm.5-5.100-3.400-2V9.600l3.400 2zm8.200-6.800 3.200 1.800L18.800 12l-3.200-1.800zM11 20.700v-4.100l6.100-3.500v4.100zm9.100-8.400-3.400 2V10l3.400-2z"/></svg>',
  'mysql': '<svg viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="8" ry="3" fill="#4aa3df"/><path fill="#2f7fb8" d="M4 6v5c0 1.700 3.600 3 8 3s8-1.300 8-3V6c0 1.700-3.600 3-8 3S4 7.700 4 6z"/><path fill="#1f5f8f" d="M4 12v5c0 1.700 3.600 3 8 3s8-1.300 8-3v-5c0 1.700-3.600 3-8 3s-8-1.300-8-3z"/></svg>',
  'react.js': '<svg viewBox="-12 -12 24 24"><g fill="none" stroke="#61dafb" stroke-width="1.2"><ellipse rx="10" ry="4"/><ellipse rx="10" ry="4" transform="rotate(60)"/><ellipse rx="10" ry="4" transform="rotate(120)"/></g><circle r="1.8" fill="#61dafb"/></svg>',
  'html': '<svg viewBox="0 0 24 24"><path fill="#e44d26" d="M3 2h18l-1.600 18L12 22l-7.400-2z"/><path fill="#fff" d="M7.500 8h9l-.2 2H9.700l.2 2h6.200l-.5 5-3.600 1-3.600-1-.2-3h2l.1 1.400 1.700.5 1.700-.5.2-2H7.900z"/></svg>',
  'css': '<svg viewBox="0 0 24 24"><path fill="#1572b6" d="M3 2h18l-1.600 18L12 22l-7.400-2z"/><path fill="#fff" d="M7.500 8h9l-.2 2H9.700l.2 2h6.200l-.5 5-3.600 1-3.600-1-.2-3h2l.1 1.400 1.700.5 1.700-.5.2-2H7.900z"/></svg>',
  'typescript': '<svg viewBox="0 0 24 24"><rect width="22" height="22" x="1" y="1" rx="3" fill="#3178c6"/><text x="12" y="17.500" font-size="11" font-weight="800" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif">TS</text></svg>',
  'javascript': '<svg viewBox="0 0 24 24"><rect width="22" height="22" x="1" y="1" rx="3" fill="#f7df1e"/><text x="12" y="17.500" font-size="11" font-weight="800" text-anchor="middle" fill="#222" font-family="Arial,sans-serif">JS</text></svg>',
  'bootstrap 5': '<svg viewBox="0 0 24 24"><rect width="22" height="22" x="1" y="1" rx="5" fill="#7952b3"/><text x="12" y="17.500" font-size="14" font-weight="800" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif">B</text></svg>',
  'php': '<svg viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="11" ry="7" fill="#777bb4"/><text x="12" y="15" font-size="8.500" font-weight="800" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif">php</text></svg>'
};

export const getTechIcon = (t: string) =>
  TECH_ICONS[t.toLowerCase()] ||
  `<svg viewBox="0 0 24 24"><rect width="22" height="22" x="1" y="1" rx="5" fill="#19e0d2"/><text x="12" y="16.500" font-size="12" font-weight="800" text-anchor="middle" fill="#021016" font-family="Arial,sans-serif">${t.charAt(0).toUpperCase()}</text></svg>`;
