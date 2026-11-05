import React, { useState, useRef, useEffect } from 'react';
import { CONFIG } from '../data/config';

export const HeroIntro: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const avatarRef = useRef<HTMLDivElement | null>(null);

  // 3D tilt on avatar (mouse only)
  useEffect(() => {
    const el = avatarRef.current;
    if (!el) return;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const max = 8;
      el.style.transform = `rotateY(${(px * max * 2).toFixed(2)}deg) rotateX(${(-py * max * 2).toFixed(2)}deg) translateY(-6px)`;
    };

    const onPointerLeave = () => {
      el.style.transform = '';
    };

    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerleave', onPointerLeave);

    return () => {
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  const initials = CONFIG.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <div className="intro">
        <div
          className="avatar rv in"
          ref={avatarRef}
          style={{ '--d': '.05s' } as React.CSSProperties}
          data-tilt="8"
        >
          <div className="photo" role="img" aria-label={`Portrait of ${CONFIG.name}`}>
            {!imageError ? (
              <img
                src="/assets/sok-sophea-profile.png"
                alt={`Portrait of ${CONFIG.name}`}
                loading="eager"
                decoding="async"
                onError={() => setImageError(true)}
              />
            ) : (
              <span
                aria-hidden="true"
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: '100%',
                  height: '100%',
                  font: '800 clamp(2.4rem,8vw,4rem)/1 Arial,sans-serif',
                  color: '#fff'
                }}
              >
                {initials}
              </span>
            )}
          </div>
        </div>

        <div className="intro-copy">
          <h2 className="hello rv in">
            Hello! I’m <span className="hl">{CONFIG.name}</span>
          </h2>
          <p className="lede rv in" style={{ '--d': '.2s' } as React.CSSProperties}>
            {CONFIG.intro}
          </p>
          <h3 className="rv in" style={{ '--d': '.3s' } as React.CSSProperties}>
            My Journey
          </h3>
          <p className="sm rv in" style={{ '--d': '.36s' } as React.CSSProperties}>
            {CONFIG.journey}
          </p>
          <h3 className="rv in" style={{ '--d': '.42s' } as React.CSSProperties}>
            Experience
          </h3>
          <p className="sm rv in" style={{ '--d': '.48s' } as React.CSSProperties}>
            {CONFIG.experience}
          </p>
          <h3 className="rv in" style={{ '--d': '.54s' } as React.CSSProperties}>
            What I Do
          </h3>
          <p
            className="sm rv in"
            style={{ '--d': '.6s' } as React.CSSProperties}
            dangerouslySetInnerHTML={{ __html: CONFIG.whatIDo }}
          />
        </div>
      </div>

      {/* Education Timeline */}
      <div className="edu rv in" style={{ '--d': '.66s' } as React.CSSProperties}>
        <h3>Education</h3>
        <div className="edu-track">
          {CONFIG.education.map((e, idx) => (
            <div className="edu-item" key={idx}>
              <span className="edu-dot">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3L1 9l11 6 9-4.9V17h2V9z" />
                  <path d="M5 11.2V16c0 1.9 3.1 3.4 7 3.4s7-1.5 7-3.4v-4.8l-7 3.8z" />
                </svg>
              </span>
              <span className="edu-label">{e.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
