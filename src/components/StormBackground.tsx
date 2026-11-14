import React, { useEffect, useRef } from 'react';
import { ICONS } from '../data/config';

interface Drop {
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

interface Bolt {
  paths: BoltPath[];
  t0: number;
  lead: number;
  life: number;
  x: number;
  ex: number;
  ey: number;
}

interface Orb {
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

export const StormBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const orbsLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const glow = glowRef.current;
    const layer = orbsLayerRef.current;
    if (!cv || !layer) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover:hover)').matches;
    const ctx = reduced ? null : cv.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    let dpr = 1;
    const drops: Drop[] = [];
    const bolts: Bolt[] = [];
    const orbs: Orb[] = [];
    const ptr = { x: -999, y: -999, on: false };

    const RAIN_SLOPE = 0.055;
    const RAIN: { col: string; tip?: string; lw: number; lMin: number; lSpan: number; vMin: number; vSpan: number }[] = [
      { col: 'rgba(195,224,248,.28)', lw: 0.9, lMin: 12, lSpan: 6, vMin: 480, vSpan: 120 },
      { col: 'rgba(214,236,252,.46)', tip: 'rgba(232,246,255,.78)', lw: 1.25, lMin: 18, lSpan: 8, vMin: 650, vSpan: 160 },
      { col: 'rgba(226,243,255,.60)', tip: 'rgba(245,251,255,.95)', lw: 1.6, lMin: 24, lSpan: 10, vMin: 850, vSpan: 190 }
    ];

    const newDrop = (scatter: boolean): Drop => {
      const b = Math.floor(Math.random() * 3);
      const spec = RAIN[b];
      const l = spec.lMin + Math.random() * spec.lSpan;
      return {
        x: Math.random() * (W + 120) - 80,
        y: scatter ? Math.random() * H : -l - Math.random() * 40,
        l,
        v: spec.vMin + Math.random() * spec.vSpan,
        b
      };
    };

    const fit = (force = false) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (!force && w === W && Math.abs(h - H) < 120 && (reduced || cv.width)) return;
      W = w;
      H = h;
      if (reduced) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      const n = Math.min(280, Math.round((W * H) / 8200));
      while (drops.length < n) drops.push(newDrop(true));
      drops.length = n;
    };

    const drawRain = () => {
      if (!ctx) return;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      RAIN.forEach((spec, b) => {
        ctx.strokeStyle = spec.col;
        ctx.lineWidth = spec.lw;
        ctx.beginPath();
        for (const d of drops) {
          if (d.b === b) {
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d.x + d.l * RAIN_SLOPE, d.y + d.l);
          }
        }
        ctx.stroke();

        if (spec.tip) {
          ctx.strokeStyle = spec.tip;
          ctx.lineWidth = spec.lw;
          ctx.beginPath();
          for (const d of drops) {
            if (d.b === b) {
              const t = 0.65;
              ctx.moveTo(d.x + d.l * t * RAIN_SLOPE, d.y + d.l * t);
              ctx.lineTo(d.x + d.l * RAIN_SLOPE, d.y + d.l);
            }
          }
          ctx.stroke();
        }
      });
    };

    const bolt = (x0: number, y0: number, x1: number, y1: number, spread: number, iters: number): [number, number][] => {
      let pts: [number, number][] = [[x0, y0], [x1, y1]];
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
          out.push([(a[0] + b[0]) / 2 + (-dy / len) * off, (a[1] + b[1]) / 2 + (dx / len) * off], b);
        }
        pts = out;
        d *= 0.55;
      }
      return pts;
    };

    let lastStrike = 0;
    const strike = () => {
      if (reduced) return;
      const now = performance.now();
      if (now - lastStrike < 120) return;
      lastStrike = now;
      const sx = W * (0.12 + Math.random() * 0.76);
      const y1 = H * (0.55 + Math.random() * 0.45);
      const x1 = sx + (Math.random() - 0.5) * W * 0.2;
      const main = bolt(sx, -10, x1, y1, H * 0.16, 6);
      const paths: BoltPath[] = [{ pts: main, w: 6.5, at: 0 }];
      const nb = 6 + Math.floor(Math.random() * 4);
      for (let i = 0; i < nb; i++) {
        const kf = 0.08 + Math.random() * 0.7;
        const k = Math.floor(main.length * kf);
        const [bx, by] = main[k];
        const dir = Math.random() < 0.5 ? -1 : 1;
        const bl = H * (0.14 + Math.random() * 0.3);
        const bp = bolt(bx, by, bx + dir * bl * (0.45 + Math.random() * 0.9), by + bl * (0.5 + Math.random() * 0.7), bl * 0.24, 5);
        paths.push({ pts: bp, w: 1.8 + Math.random() * 0.8, at: kf });
        if (Math.random() < 0.55) {
          const [cx, cy] = bp[Math.floor(bp.length * (0.25 + Math.random() * 0.5))];
          const d2 = Math.random() < 0.5 ? -1 : 1;
          const sl = bl * (0.3 + Math.random() * 0.4);
          paths.push({ pts: bolt(cx, cy, cx + d2 * sl * 0.8, cy + sl * 0.9, sl * 0.25, 4), w: 1.1, at: Math.min(0.95, kf + 0.04) });
        }
      }
      const lead = 60 + Math.random() * 30;
      bolts.push({ paths, t0: now, lead, life: lead + 880 + Math.random() * 260, x: sx, ex: x1, ey: y1 });
    };

    const lerp = (u: number, v: number, t: number) => u + (v - u) * t;

    const tracePath = (pts: [number, number][], frac: number) => {
      if (!ctx) return;
      const n = Math.max(2, Math.floor(frac * (pts.length - 1)) + 1);
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < n; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    };

    const drawBolt = (b: Bolt, now: number): boolean => {
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
          a = null;
        }

        if (a === null) {
          const d = (e - 235) / (T - 235);
          a = Math.pow(1 - d, 1.7) * (0.7 + Math.random() * 0.3);
          if (Math.random() < 0.12) a *= 0.35;
          wf = 1 - 0.68 * d;
          mix = Math.min(1, 0.25 + d);
        } else {
          wf = 1;
          mix = 0;
        }
      }

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      if (boost) {
        const g = ctx.createRadialGradient(b.x, 0, 0, b.x, 0, H * 1.05);
        g.addColorStop(0, `rgba(185,215,255,${0.3 * boost * (a ?? 1)})`);
        g.addColorStop(0.45, `rgba(110,160,235,${0.08 * boost * (a ?? 1)})`);
        g.addColorStop(1, 'rgba(110,160,235,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = `rgba(120,160,225,${0.05 * boost * (a ?? 1)})`;
        ctx.fillRect(0, 0, W, H);
        const r = 90 + 60 * boost;
        const g2 = ctx.createRadialGradient(b.ex, b.ey, 0, b.ex, b.ey, r);
        g2.addColorStop(0, `rgba(235,246,255,${0.55 * (a ?? 1)})`);
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
        for (const [m, col, al] of [
          [9, '70,130,255', 0.06],
          [5, '100,165,255', 0.13],
          [2.8, '150,205,255', 0.3],
          [1.5, `${cr | 0},${cg | 0},${cb}`, 0.8],
          [0.75, '255,255,255', 1]
        ] as [number, string, number][]) {
          ctx.strokeStyle = `rgba(${col},${((a ?? 1) * al).toFixed(3)})`;
          ctx.lineWidth = Math.max(0.6, w * m);
          ctx.stroke();
        }
      }
      ctx.restore();
      return true;
    };

    const makeOrbs = () => {
      layer.innerHTML = '';
      orbs.length = 0;
      const pool = ICONS.slice().sort(() => Math.random() - 0.5);
      pool.forEach((ic, k) => {
        const d = 0.8 + Math.random() * 0.2;
        const size = Math.round(42 + d * 18);
        const el = document.createElement('div');
        el.className = 'orb';
        el.style.cssText = `--sz:${size}px;--k:${k};--bg-c:${ic.bg || `color-mix(in srgb, ${ic.glow || '#1fe0d2'} 18%, #050b12)`};--glow:${ic.glow || '#1fe0d2'};opacity:${(0.4 + (0.6 * (d - 0.6)) / 0.6).toFixed(2)}`;
        el.style.filter = 'none';
        el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${ic.svg}</svg>`;
        layer.appendChild(el);
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
          fq: 0.5 + Math.random() * 0.7
        });
      });
      orbs.forEach(o => {
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

    let raf = 0;
    let last = performance.now();
    let nextStrike = last + 600;

    const frame = (now: number) => {
      const dt = Math.min(0.033, Math.max(0.001, (now - last) / 1000));
      last = now;
      if (ctx) {
        ctx.clearRect(0, 0, W, H);
        for (const d of drops) {
          d.x += d.v * RAIN_SLOPE * dt;
          d.y += d.v * dt;
          if (d.y > H + d.l || d.x > W + 60) {
            d.y = -d.l - Math.random() * 40;
            d.x = Math.random() * (W + 120) - 80;
          }
        }
        drawRain();
        for (let i = bolts.length - 1; i >= 0; i--) {
          if (!drawBolt(bolts[i], now)) bolts.splice(i, 1);
        }
      }
      if (now > nextStrike) {
        strike();
        if (Math.random() < 0.35) setTimeout(() => strike(), 140);
        nextStrike = now + 1500 + Math.random() * 500;
      }
      stepOrbs(dt);
      raf = requestAnimationFrame(frame);
    };

    fit(true);
    makeOrbs();

    if (reduced) {
      cv.hidden = true;
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onPointerMove = (e: PointerEvent) => {
      ptr.x = e.clientX;
      ptr.y = e.clientY;
      ptr.on = true;
      if (glow && e.pointerType === 'mouse' && canHover) {
        glow.style.opacity = '1';
        glow.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') setTimeout(() => { ptr.on = false; }, 500);
    };

    const onMouseLeave = () => {
      ptr.on = false;
      if (glow) glow.style.opacity = '0';
    };

    let rz: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rz);
      rz = setTimeout(() => {
        fit();
        if (ICONS.length !== orbs.length) makeOrbs();
      }, 150);
    };

    const onVisChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        cancelAnimationFrame(raf);
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisChange);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(rz);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisChange);
    };
  }, []);

  return (
    <>
      <div id="sky" aria-hidden="true" />
      <canvas id="storm" ref={canvasRef} aria-hidden="true" />
      <div id="cursor-glow" ref={glowRef} aria-hidden="true" />
      <div id="orbs" ref={orbsLayerRef} aria-hidden="true" />
    </>
  );
};
