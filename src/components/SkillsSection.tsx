import React, { useRef, useEffect } from 'react';
import { SKILLS, SkillItem } from '../data/config';
import { NeonTitle } from './NeonTitle';

export const SkillsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cells = root.querySelectorAll<HTMLDivElement>('.skill-cell');

    const cleanups: (() => void)[] = [];

    cells.forEach(cell => {
      const card = cell.querySelector<HTMLDivElement>('.skill');
      const logo = card?.querySelector<SVGElement>('svg');
      if (!card || !logo) return;

      let spinning: Animation | null = null;
      let raf = 0;
      let targetRX = 0, targetRY = 0, currentRX = 0, currentRY = 0;
      let targetMX = 0, targetMY = 0, currentMX = 0, currentMY = 0;
      const EPSILON = 0.02;
      const DAMP = 0.14;

      const animateTilt = () => {
        raf = 0;
        currentRX += (targetRX - currentRX) * DAMP;
        currentRY += (targetRY - currentRY) * DAMP;
        currentMX += (targetMX - currentMX) * DAMP;
        currentMY += (targetMY - currentMY) * DAMP;

        card.style.setProperty('--rx', `${currentRX.toFixed(2)}deg`);
        card.style.setProperty('--ry', `${currentRY.toFixed(2)}deg`);
        card.style.setProperty('--mx', `${currentMX.toFixed(2)}px`);
        card.style.setProperty('--my', `${currentMY.toFixed(2)}px`);

        const stillMoving =
          Math.abs(targetRX - currentRX) > EPSILON ||
          Math.abs(targetRY - currentRY) > EPSILON ||
          Math.abs(targetMX - currentMX) > EPSILON ||
          Math.abs(targetMY - currentMY) > EPSILON;

        if (stillMoving && !document.hidden && !reduced) {
          raf = requestAnimationFrame(animateTilt);
        } else if (!stillMoving && targetRX === 0 && targetRY === 0) {
          // Snap cleanly to zero at rest
          currentRX = 0;
          currentRY = 0;
          currentMX = 0;
          currentMY = 0;
          card.style.setProperty('--rx', '0deg');
          card.style.setProperty('--ry', '0deg');
          card.style.setProperty('--mx', '0px');
          card.style.setProperty('--my', '0px');
        }
      };

      const requestTiltFrame = () => {
        if (!raf && !reduced && !document.hidden) {
          raf = requestAnimationFrame(animateTilt);
        }
      };

      const onPointerEnter = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse' || reduced) return;
        card.classList.add('live', 'is-hover');
        if (spinning) return;
        spinning = logo.animate(
          [
            { transform: 'translateZ(48px) rotateY(0deg) scale(1)' },
            { transform: 'translateZ(54px) rotateY(360deg) scale(1.15)' }
          ],
          { duration: 750, easing: 'cubic-bezier(0.18, 0.89, 0.32, 1)' }
        );
        spinning.onfinish = spinning.oncancel = () => {
          spinning = null;
        };
      };

      const onPointerMove = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse' || reduced) return;
        const r = cell.getBoundingClientRect();
        if (!r.width || !r.height) return;
        const px = Math.max(-0.5, Math.min(0.5, (e.clientX - r.left) / r.width - 0.5));
        const py = Math.max(-0.5, Math.min(0.5, (e.clientY - r.top) / r.height - 0.5));

        // Refined tilt angles for a sleek, non-distorted 3D response
        targetRY = px * 20;
        targetRX = -py * 20;
        targetMX = px * 8;
        targetMY = py * 8;

        card.style.setProperty('--gx', `${((px + 0.5) * 100).toFixed(1)}%`);
        card.style.setProperty('--gy', `${((py + 0.5) * 100).toFixed(1)}%`);
        requestTiltFrame();
      };

      const onPointerLeave = () => {
        card.classList.remove('live', 'is-hover');
        targetRX = 0;
        targetRY = 0;
        targetMX = 0;
        targetMY = 0;
        card.style.setProperty('--gx', '50%');
        card.style.setProperty('--gy', '50%');
        requestTiltFrame();
      };

      const onClick = () => {
        if (reduced || spinning) return;
        spinning = logo.animate(
          [
            { transform: 'translateZ(48px) rotateY(0deg) scale(1)' },
            { transform: 'translateZ(56px) rotateY(720deg) scale(1.18)' }
          ],
          { duration: 900, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
        );
        spinning.onfinish = spinning.oncancel = () => {
          spinning = null;
        };
      };

      cell.addEventListener('pointerenter', onPointerEnter);
      cell.addEventListener('pointermove', onPointerMove);
      cell.addEventListener('pointerleave', onPointerLeave);
      cell.addEventListener('click', onClick);

      cleanups.push(() => {
        cancelAnimationFrame(raf);
        cell.removeEventListener('pointerenter', onPointerEnter);
        cell.removeEventListener('pointermove', onPointerMove);
        cell.removeEventListener('pointerleave', onPointerLeave);
        cell.removeEventListener('click', onClick);
      });
    });

    return () => {
      cleanups.forEach(c => c());
    };
  }, []);

  return (
    <div className="skills-sec" ref={containerRef}>
      <NeonTitle title="Skills" />
      <div className="skills">
        {SKILLS.map((s: SkillItem, i: number) => {
          const uniqueSvg = s.svg.replace(/@/g, `sk_react_${i}`);
          return (
            <div
              key={s.n}
              className="skill-cell rv in"
              style={
                {
                  '--d': `${(i * 0.05).toFixed(2)}s`,
                  '--i': i,
                  '--c': s.c
                } as React.CSSProperties
              }
            >
              <div
                className="skill"
                style={{ '--c': s.c } as React.CSSProperties}
              >
                <span className="nb" aria-hidden="true">
                  <i />
                </span>
                <div className="skill-orbit" />
                <div className="particle-field">
                  {Array.from({ length: 5 }, (_, p) => (
                    <i
                      key={p}
                      className="skill-particle"
                      style={
                        {
                          left: `${12 + ((p * 37 + i * 11) % 76)}%`,
                          top: `${12 + ((p * 53 + i * 7) % 76)}%`,
                          '--px': `${(-12 + ((p * 15) % 24)).toFixed(1)}px`,
                          '--py': `${(-16 - ((p * 11) % 20)).toFixed(1)}px`,
                          '--pd': `${(2.4 + ((p * 7) % 15) / 10).toFixed(2)}s`,
                          '--delay': `${(-((p * 29 + i * 11) % 25) / 10).toFixed(2)}s`
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </div>
                <div className="skill-shine" />
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: uniqueSvg }}
                />
                <span>{s.n}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
