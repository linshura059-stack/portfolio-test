import { useEffect, useRef } from 'react';

interface FloatingIconDef {
  n: string;
  glow: string;
  bg?: string;
  svg: string;
}

const FLOATING_ICONS: FloatingIconDef[] = [
  {
    n: 'react',
    glow: '#61dafb',
    svg: '<g fill="none" stroke="#61dafb" stroke-width="1.5"><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></g><circle cx="12" cy="12" r="1.8" fill="#61dafb"/>',
  },
  {
    n: 'html',
    glow: '#e44d26',
    svg: '<path d="M4 3h16l-1.4 16L12 21l-6.6-2z" fill="#e44d26"/><path d="M12 5v14.4l5.2-1.5L18.4 5z" fill="#f16529"/><text x="12" y="16" font-size="9" font-weight="700" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif">5</text>',
  },
  {
    n: 'css',
    glow: '#2f8fe0',
    svg: '<path d="M4 3h16l-1.4 16L12 21l-6.6-2z" fill="#1572b6"/><path d="M12 5v14.4l5.2-1.5L18.4 5z" fill="#33a9dc"/><text x="12" y="16" font-size="9" font-weight="700" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif">3</text>',
  },
  {
    n: 'js',
    glow: '#f7df1e',
    bg: '#f7df1e',
    svg: '<text x="12" y="16.5" font-size="11" font-weight="800" text-anchor="middle" fill="#1a1a1a" font-family="Arial,sans-serif">JS</text>',
  },
  {
    n: 'ts',
    glow: '#3178c6',
    bg: '#3178c6',
    svg: '<text x="12" y="16.5" font-size="11" font-weight="800" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif">TS</text>',
  },
  {
    n: 'bs',
    glow: '#7a1ff5',
    bg: '#7a1ff5',
    svg: '<text x="12" y="17" font-size="13" font-weight="800" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif">B</text>',
  },
  {
    n: 'laravel',
    glow: '#ff2d20',
    svg: '<path d="M12 3l7 4v6l-7 4-7-4V7z" fill="#ff2d20" fill-opacity=".2" stroke="#ff4a3d" stroke-width="2" stroke-linejoin="round"/><path d="M5 7l7 4 7-4M12 11v6" fill="none" stroke="#ff4a3d" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>',
  },
  {
    n: 'php',
    glow: '#8892bf',
    bg: '#4f5b93',
    svg: '<text x="12" y="15.5" font-size="8.5" font-weight="700" font-style="italic" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif">php</text>',
  },
  {
    n: 'mongo',
    glow: '#47a248',
    svg: '<path d="M12 1.5c.4 2.2 4.8 4.6 4.8 10.3 0 3.6-2 5.6-4 6.4L12.2 22h-.4l-.6-3.8c-2-.8-4-2.8-4-6.4C7.2 6.1 11.6 3.7 12 1.5z" fill="#47a248"/><path d="M12 5v16" stroke="#d7f0d2" stroke-width=".9" stroke-linecap="round"/>',
  },
  {
    n: 'figma',
    glow: '#a259ff',
    svg: '<rect x="8" y="2" width="4" height="6" rx="2" fill="#f24e1e"/><rect x="12" y="2" width="4" height="6" rx="2" fill="#ff7262"/><rect x="8" y="8" width="4" height="6" rx="2" fill="#a259ff"/><circle cx="14" cy="11" r="3" fill="#1abcfe"/><rect x="8" y="14" width="4" height="6" rx="2" fill="#0acf83"/>',
  },
  {
    n: 'next',
    glow: '#ff5cd6',
    bg: '#000',
    svg: '<circle cx="12" cy="12" r="10" fill="#fff"/><text x="12" y="16.6" font-size="12" font-weight="800" text-anchor="middle" fill="#000" font-family="Arial,sans-serif">N</text>',
  },
  {
    n: 'github',
    glow: '#b48aff',
    bg: '#0d1117',
    svg: '<path fill="#fff" d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/>',
  },
  {
    n: 'vercel',
    glow: '#6df7ff',
    bg: '#000',
    svg: '<path d="M12 4l9 16H3z" fill="#fff"/>',
  },
  {
    n: 'gitlab',
    glow: '#fc6d26',
    svg: '<path d="M12 21.5L2.5 14.2l1.9-5.9 1.9 5.9h11.4l1.9-5.9 1.9 5.9z" fill="#e24329"/><path d="M12 21.5L6.3 14.2h11.4z" fill="#fc6d26"/><path d="M4.4 8.3L6.3 2.5l1.9 5.8zM19.6 8.3l-1.9-5.8-1.9 5.8z" fill="#fca326"/>',
  },
  {
    n: 'vue',
    glow: '#41b883',
    svg: '<path d="M2 4h4l6 10 6-10h4L12 21z" fill="#41b883"/><path d="M6 4h3.2L12 9l2.8-5H18l-6 10z" fill="#35495e"/>',
  },
  {
    n: 'api',
    glow: '#84ff2f',
    bg: '#84ff2f',
    svg: '<text x="12" y="16" font-size="9.5" font-weight="800" text-anchor="middle" fill="#0d1a05" font-family="Arial,sans-serif">{…}</text>',
  },
  {
    n: 'postman',
    glow: '#ff6c37',
    bg: '#ff6c37',
    svg: '<circle cx="12" cy="12" r="7.5" fill="none" stroke="#fff" stroke-width="2"/><path d="M8.5 15.5l5.5-5.5" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/><circle cx="15" cy="9" r="1.8" fill="#fff"/>',
  },
  {
    n: 'tw',
    glow: '#38bdf8',
    svg: '<path d="M12 6c-2.7 0-4.4 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3 1 1 2.1 2.2 4.6 2.2 2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3C15.6 7.2 14.5 6 12 6zM7 12c-2.7 0-4.4 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3 1 1 2.1 2.2 4.6 2.2 2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3C10.6 13.2 9.5 12 7 12z" fill="#38bdf8"/>',
  },
  {
    n: 'node',
    glow: '#5fa04e',
    svg: '<path d="M12 2l8.5 5v10L12 22l-8.5-5V7z" fill="#5fa04e"/><text x="12" y="15.5" font-size="8" font-weight="800" text-anchor="middle" fill="#0f1a0d" font-family="Arial,sans-serif">JS</text>',
  },
];

interface RainDrop {
  x: number;
  y: number;
  l: number;
  v: number;
  b: number;
}

interface BoltPath {
  pts: [number, number][];
  w: number;
  at: number;
}

interface LightningBolt {
  paths: BoltPath[];
  t0: number;
  lead: number;
  life: number;
  x: number;
  ex: number;
  ey: number;
}

interface OrbState {
  el: HTMLDivElement;
  size: number;
  base: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ph: number;
  fq: number;
}

const RAIN_PALETTE: [string, number][] = [
  ['rgba(215,232,246,.3)', 0.9],
  ['rgba(222,238,250,.55)', 1.2],
  ['rgba(235,246,255,.9)', 1.5],
];

export function triggerLightningStrike(x?: number) {
  window.dispatchEvent(new CustomEvent('storm:strike', { detail: { x } }));
}

export function StormBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const orbsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lite = document.documentElement.classList.contains('lite');
    const canHover = window.matchMedia('(hover: hover)').matches;
    const cv = canvasRef.current;
    const orbsContainer = orbsRef.current;
    const glow = glowRef.current;
    if (!cv || !orbsContainer) return;

    const ctx = reduced ? null : cv.getContext('2d');
    let W = 0;
    let H = 0;
    let dpr = 1;
    const drops: RainDrop[] = [];
    const bolts: LightningBolt[] = [];
    const orbs: OrbState[] = [];
    const ptr = { x: -999, y: -999, on: false };
    let lastStrike = 0;

    const newDrop = (scatter: boolean): RainDrop => ({
      x: Math.random() * (W + 80) - 40,
      y: scatter ? Math.random() * H : -30,
      l: 14 + Math.random() * 22,
      v: 760 + Math.random() * 640,
      b: Math.floor(Math.random() * 3),
    });

    const fit = (force?: boolean) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (!force && w === W && Math.abs(h - H) < 120 && (reduced || cv.width)) return;
      W = w;
      H = h;
      if (reduced || !ctx) return;
      dpr = lite ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = lite ? Math.min(60, Math.round((W * H) / 14000)) : Math.min(300, Math.round((W * H) / 8000));
      while (drops.length < n) drops.push(newDrop(true));
      drops.length = n;
    };

    const makeBolt = (
      x0: number,
      y0: number,
      x1: number,
      y1: number,
      spread: number,
      iters: number
    ): [number, number][] => {
      let pts: [number, number][] = [
        [x0, y0],
        [x1, y1],
      ];
      let d = spread;
      for (let i = 0; i < iters; i++) {
        const out: [number, number][] = [pts[0]];
        for (let j = 1; j < pts.length; j++) {
          const a = pts[j - 1];
          const b = pts[j];
          const dx = b[0] - a[0];
          const dy = b[1] - a[1];
          const len = Math.hypot(dx, dy) || 1;
          const off = (Math.random() - 0.5) * 2 * d;
          out.push(
            [(a[0] + b[0]) / 2 + (-dy / len) * off, (a[1] + b[1]) / 2 + (dx / len) * off],
            b
          );
        }
        pts = out;
        d *= 0.55;
      }
      return pts;
    };

    const strike = (customX?: number) => {
      if (reduced) return;
      const now = performance.now();
      if (now - lastStrike < 120) return;
      lastStrike = now;
      const x = customX == null ? W * (0.12 + Math.random() * 0.76) : customX;
      const y1 = H * (0.55 + Math.random() * 0.45);
      const x1 = x + (Math.random() - 0.5) * W * 0.2;
      const main = makeBolt(x, -10, x1, y1, H * 0.16, lite ? 5 : 6);
      const paths: BoltPath[] = [{ pts: main, w: 6.5, at: 0 }];
      const nb = lite ? 2 : 6 + Math.floor(Math.random() * 4);
      for (let i = 0; i < nb; i++) {
        const kf = 0.08 + Math.random() * 0.7;
        const k = Math.floor(main.length * kf);
        const [bx, by] = main[k];
        const dir = Math.random() < 0.5 ? -1 : 1;
        const bl = H * (0.14 + Math.random() * 0.3);
        const bp = makeBolt(
          bx,
          by,
          bx + dir * bl * (0.45 + Math.random() * 0.9),
          by + bl * (0.5 + Math.random() * 0.7),
          bl * 0.24,
          5
        );
        paths.push({ pts: bp, w: 1.8 + Math.random() * 0.8, at: kf });
        if (Math.random() < 0.55) {
          const [sx, sy] = bp[Math.floor(bp.length * (0.25 + Math.random() * 0.5))];
          const d2 = Math.random() < 0.5 ? -1 : 1;
          const sl = bl * (0.3 + Math.random() * 0.4);
          paths.push({
            pts: makeBolt(sx, sy, sx + d2 * sl * 0.8, sy + sl * 0.9, sl * 0.25, 4),
            w: 1.1,
            at: Math.min(0.95, kf + 0.04),
          });
        }
      }
      const lead = 60 + Math.random() * 30;
      bolts.push({
        paths,
        t0: now,
        lead,
        life: lead + 880 + Math.random() * 260,
        x,
        ex: x1,
        ey: y1,
      });
    };

    const lerp = (u: number, v: number, t: number) => u + (v - u) * t;

    const tracePath = (pts: [number, number][], frac: number) => {
      if (!ctx) return;
      const n = Math.max(2, Math.floor(frac * (pts.length - 1)) + 1);
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < n; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    };

    const drawRain = () => {
      if (!ctx) return;
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'miter';
      RAIN_PALETTE.forEach(([col, lw], b) => {
        ctx.strokeStyle = col;
        ctx.lineWidth = lw;
        ctx.beginPath();
        for (const d of drops) {
          if (d.b === b) {
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d.x + d.l * 0.04, d.y + d.l);
          }
        }
        ctx.stroke();
      });
    };

    const drawBolt = (b: LightningBolt, now: number) => {
      if (!ctx) return false;
      const el = now - b.t0;
      if (el >= b.life) return false;

      let reveal = 1;
      let a: number | null = null;
      let wf = 1;
      let mix = 0;
      let boost = 0;

      if (el < b.lead) {
        reveal = Math.pow(el / b.lead, 0.85);
        a = 0.6 + Math.random() * 0.3;
        wf = 0.3;
        mix = 1;
      } else {
        const e = el - b.lead;
        const T = b.life - b.lead;
        if (e < 55) {
          a = 1;
          boost = 1;
        } else if (e < 105) {
          a = 0.3;
        } else if (e < 185) {
          a = 1;
          boost = 0.8;
        } else if (e < 235) {
          a = 0.4;
        } else {
          const d = (e - 235) / (T - 235);
          a = Math.pow(1 - d, 1.7) * (0.7 + Math.random() * 0.3);
          if (Math.random() < 0.12) a *= 0.35;
          wf = 1 - 0.68 * d;
          mix = Math.min(1, 0.25 + d);
        }
      }

      if (a === null) return false;

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      if (boost && !lite) {
        const g = ctx.createRadialGradient(b.x, 0, 0, b.x, 0, H * 1.05);
        g.addColorStop(0, `rgba(185,215,255,${0.3 * boost * a})`);
        g.addColorStop(0.45, `rgba(110,160,235,${0.08 * boost * a})`);
        g.addColorStop(1, 'rgba(110,160,235,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = `rgba(120,160,225,${0.05 * boost * a})`;
        ctx.fillRect(0, 0, W, H);
        const r = 90 + 60 * boost;
        const g2 = ctx.createRadialGradient(b.ex, b.ey, 0, b.ex, b.ey, r);
        g2.addColorStop(0, `rgba(235,246,255,${0.55 * a})`);
        g2.addColorStop(1, 'rgba(120,170,255,0)');
        ctx.fillStyle = g2;
        ctx.fillRect(b.ex - r, b.ey - r, r * 2, r * 2);
      }

      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      const cr = lerp(255, 150, mix);
      const cg = lerp(255, 225, mix);
      const cb = 255;

      for (const p of b.paths) {
        const f = p.at === 0 ? reveal : Math.min(1, Math.max(0, (reveal - p.at) / 0.25));
        if (f <= 0) continue;
        tracePath(p.pts, f);
        const w = p.w * wf;
        const layers: [number, string, number][] = [
          [9, '70,130,255', 0.06],
          [5, '100,165,255', 0.13],
          [2.8, '150,205,255', 0.3],
          [1.5, `${cr | 0},${cg | 0},${cb}`, 0.8],
          [0.75, '255,255,255', 1],
        ];
        for (const [m, col, al] of lite ? layers.slice(2) : layers) {
          ctx.strokeStyle = `rgba(${col},${(a * al).toFixed(3)})`;
          ctx.lineWidth = Math.max(0.6, w * m);
          ctx.stroke();
        }
      }
      ctx.restore();
      return true;
    };

    const makeOrbs = () => {
      orbsContainer.innerHTML = '';
      orbs.length = 0;
      const pool = FLOATING_ICONS.slice().sort(() => Math.random() - 0.5).slice(0, lite ? 7 : FLOATING_ICONS.length);
      pool.forEach((ic, k) => {
        const d = 0.8 + Math.random() * 0.2;
        const size = Math.round(42 + d * 18);
        const el = document.createElement('div');
        el.className = 'orb';
        el.style.cssText = `--sz:${size}px;--k:${k};--bg-c:${
          ic.bg || `color-mix(in srgb, ${ic.glow || '#1fe0d2'} 18%, #050b12)`
        };--glow:${ic.glow || '#1fe0d2'};opacity:${(0.4 + (0.6 * (d - 0.6)) / 0.6).toFixed(2)}`;
        el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${ic.svg}</svg>`;
        orbsContainer.appendChild(el);
        const base = (10 + Math.random() * 18) * (0.5 + d);
        const ang = Math.random() * Math.PI * 2;
        orbs.push({
          el,
          size,
          base,
          x: Math.random() * Math.max(1, W - size),
          y: Math.random() * Math.max(1, H - size),
          vx: Math.cos(ang) * base,
          vy: Math.sin(ang) * base,
          ph: Math.random() * 6.28,
          fq: 0.5 + Math.random() * 0.7,
        });
      });
      orbs.forEach((o) => {
        o.el.style.transform = `translate3d(${o.x}px,${o.y}px,0)`;
      });
    };

    const stepOrbs = (dt: number) => {
      for (const o of orbs) {
        o.ph += dt * o.fq;
        o.vx += (Math.random() - 0.5) * 8 * dt;
        o.vy += (Math.random() - 0.5) * 8 * dt;
        if (ptr.on) {
          const dx = o.x + o.size / 2 - ptr.x;
          const dy = o.y + o.size / 2 - ptr.y;
          const dist = Math.hypot(dx, dy);
          const Rr = 150;
          if (dist < Rr && dist > 0.1) {
            const f = 1 - dist / Rr;
            o.vx += (dx / dist) * f * f * 1500 * dt;
            o.vy += (dy / dist) * f * f * 1500 * dt;
          }
        }
        const sp = Math.hypot(o.vx, o.vy) || 1;
        if (sp > o.base) {
          const k = o.base + (sp - o.base) * Math.pow(0.05, dt);
          o.vx *= k / sp;
          o.vy *= k / sp;
        } else if (sp < o.base * 0.45) {
          o.vx *= 1.05;
          o.vy *= 1.05;
        }
        o.x += o.vx * dt;
        o.y += o.vy * dt;
        if (o.x < -8) {
          o.x = -8;
          o.vx = Math.abs(o.vx);
        } else if (o.x > W - o.size + 8) {
          o.x = W - o.size + 8;
          o.vx = -Math.abs(o.vx);
        }
        if (o.y < -8) {
          o.y = -8;
          o.vy = Math.abs(o.vy);
        } else if (o.y > H - o.size + 8) {
          o.y = H - o.size + 8;
          o.vy = -Math.abs(o.vy);
        }
        o.el.style.transform = `translate3d(${o.x.toFixed(1)}px,${(o.y + Math.sin(o.ph) * 5).toFixed(1)}px,0)`;
      }
    };

    fit(true);
    makeOrbs();

    let raf = 0;
    let last = performance.now();
    let nextStrike = last + 600;

    const frame = (now: number) => {
      if (!ctx) return;
      if (lite && now - last < 33) {
        raf = requestAnimationFrame(frame);
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, W, H);
      for (const d of drops) {
        d.y += d.v * dt;
        if (d.y > H + 30) {
          d.y = -30;
          d.x = Math.random() * (W + 80) - 40;
        }
      }
      drawRain();
      for (let i = bolts.length - 1; i >= 0; i--) {
        if (!drawBolt(bolts[i], now)) bolts.splice(i, 1);
      }
      if (now > nextStrike) {
        strike();
        if (Math.random() < 0.35) setTimeout(() => strike(), 140);
        nextStrike = now + 1100 + Math.random() * 2200;
      }
      stepOrbs(dt);
      raf = requestAnimationFrame(frame);
    };

    if (!reduced) {
      raf = requestAnimationFrame(frame);
    } else {
      cv.hidden = true;
    }

    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        fit();
      }, 150);
    };

    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      ptr.x = e.clientX;
      ptr.y = e.clientY;
      ptr.on = true;
      if (e.pointerType === 'mouse' && canHover && glow) {
        glow.style.opacity = '1';
        glow.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') {
        window.setTimeout(() => {
          ptr.on = false;
        }, 500);
      }
    };

    const onMouseLeave = () => {
      ptr.on = false;
      if (glow) glow.style.opacity = '0';
    };

    const onCustomStrike = (e: Event) => {
      const customEvent = e as CustomEvent<{ x?: number }>;
      strike(customEvent.detail?.x);
    };

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('storm:strike', onCustomStrike);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('storm:strike', onCustomStrike);
    };
  }, []);

  return (
    <>
      <div className="storm-sky" aria-hidden="true" />
      <canvas ref={canvasRef} className="storm-canvas" aria-hidden="true" />
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div ref={orbsRef} className="orbs-layer" aria-hidden="true" />
    </>
  );
}
