import { useEffect, useRef, useState } from 'react';
import {
  EDUCATION,
  PORTFOLIO_CONFIG,
  PORTFOLIO_PROFILE_PHOTO,
  SKILLS,
  SkillItem,
} from '../data/portfolioData';
import { useReveal } from '../hooks/useReveal';
import { NeonTitle } from './NeonTitle';
import { SkillBrandIcon } from './TechIcons';

function SkillCard({ skill, index }: { skill: SkillItem; index: number }) {
  const cellRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const iconWrapRef = useRef<HTMLDivElement | null>(null);
  const [isHover, setIsHover] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  const spinAnimRef = useRef<Animation | null>(null);
  const rafRef = useRef<number>(0);
  const tiltState = useRef({
    targetRX: 0,
    targetRY: 0,
    currentRX: 0,
    currentRY: 0,
    targetMX: 0,
    targetMY: 0,
    currentMX: 0,
    currentMY: 0,
  });

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduced(isReduced);

    const cell = cellRef.current;
    if (!cell) return;

    cell.style.setProperty('--d', `${(index * 0.07).toFixed(2)}s`);
    cell.style.setProperty('--i', String(index));
    cell.style.setProperty('--c', skill.color);

    if (isReduced || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    observer.observe(cell);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
      spinAnimRef.current?.cancel();
    };
  }, [index, skill.color]);

  const animateTilt = () => {
    rafRef.current = 0;
    const card = cardRef.current;
    if (!card) return;
    const s = tiltState.current;
    const EPSILON = 0.05;

    s.currentRX += (s.targetRX - s.currentRX) * 0.16;
    s.currentRY += (s.targetRY - s.currentRY) * 0.16;
    s.currentMX += (s.targetMX - s.currentMX) * 0.18;
    s.currentMY += (s.targetMY - s.currentMY) * 0.18;

    card.style.setProperty('--rx', `${s.currentRX.toFixed(2)}deg`);
    card.style.setProperty('--ry', `${s.currentRY.toFixed(2)}deg`);
    card.style.setProperty('--mx', `${s.currentMX.toFixed(2)}px`);
    card.style.setProperty('--my', `${s.currentMY.toFixed(2)}px`);

    const stillMoving =
      Math.abs(s.targetRX - s.currentRX) > EPSILON ||
      Math.abs(s.targetRY - s.currentRY) > EPSILON ||
      Math.abs(s.targetMX - s.currentMX) > EPSILON ||
      Math.abs(s.targetMY - s.currentMY) > EPSILON;

    if (stillMoving && !document.hidden && !reduced) {
      rafRef.current = requestAnimationFrame(animateTilt);
    }
  };

  const requestTiltFrame = () => {
    if (!rafRef.current && !reduced && !document.hidden) {
      rafRef.current = requestAnimationFrame(animateTilt);
    }
  };

  const triggerSpin = (degrees: number, duration: number) => {
    if (reduced || spinAnimRef.current) return;
    const svgEl = iconWrapRef.current?.querySelector('svg');
    if (!svgEl) return;
    const anim = svgEl.animate(
      [
        { transform: 'translateZ(48px) rotateY(0deg)' },
        { transform: `translateZ(48px) rotateY(${degrees}deg)` },
      ],
      { duration, easing: 'cubic-bezier(.45,.05,.2,1)' }
    );
    spinAnimRef.current = anim;
    anim.onfinish = anim.oncancel = () => {
      spinAnimRef.current = null;
    };
  };

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || reduced) return;
    setIsHover(true);
    triggerSpin(360, 1000);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || reduced) return;
    const cell = cellRef.current;
    const card = cardRef.current;
    if (!cell || !card) return;

    const r = cell.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;

    tiltState.current.targetRY = px * 28;
    tiltState.current.targetRX = -py * 28;
    tiltState.current.targetMX = px * 10;
    tiltState.current.targetMY = py * 10;

    card.style.setProperty('--gx', `${((px + 0.5) * 100).toFixed(1)}%`);
    card.style.setProperty('--gy', `${((py + 0.5) * 100).toFixed(1)}%`);
    requestTiltFrame();
  };

  const handlePointerLeave = () => {
    setIsHover(false);
    tiltState.current.targetRX = 0;
    tiltState.current.targetRY = 0;
    tiltState.current.targetMX = 0;
    tiltState.current.targetMY = 0;
    cardRef.current?.style.setProperty('--gx', '50%');
    cardRef.current?.style.setProperty('--gy', '50%');
    requestTiltFrame();
  };

  const particleCount = reduced ? 0 : 5;

  return (
    <div
      ref={cellRef}
      className={`skill-cell rv ${isInView ? 'in' : ''}`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={() => triggerSpin(720, 1100)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerSpin(720, 1100);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${skill.name} skill card`}
    >
      <div ref={cardRef} className={`skill ${isHover ? 'live is-hover' : ''}`}>
        <span className="nb" aria-hidden="true">
          <i />
        </span>
        <div className="skill-orbit" />
        <div className="particle-field">
          {Array.from({ length: particleCount }, (_, p) => (
            <i
              key={p}
              className="skill-particle"
              ref={(el) => {
                if (!el) return;
                el.style.left = `${10 + ((p * 37 + index * 11) % 80)}%`;
                el.style.top = `${10 + ((p * 53 + index * 7) % 78)}%`;
                el.style.setProperty('--px', `${(-15 + ((p * 17) % 30)).toFixed(1)}px`);
                el.style.setProperty('--py', `${(-20 - ((p * 13) % 25)).toFixed(1)}px`);
                el.style.setProperty('--pd', `${(2.2 + ((p * 7) % 18) / 10).toFixed(2)}s`);
                el.style.setProperty('--delay', `${(-((p * 31 + index * 13) % 30) / 10).toFixed(2)}s`);
              }}
            />
          ))}
        </div>
        <div className="skill-shine" />
        <div ref={iconWrapRef} className="contents">
          <SkillBrandIcon name={skill.name} />
        </div>
        <span className="skill-label">{skill.name}</span>
      </div>
    </div>
  );
}

export function IntroSection() {
  const [imgFailed, setImgFailed] = useState(false);

  const avatarReveal = useReveal<HTMLDivElement>(0.05);
  const copyReveal = useReveal<HTMLDivElement>(0);
  const ledeReveal = useReveal<HTMLParagraphElement>(0.2);
  const hJourney = useReveal<HTMLHeadingElement>(0.3);
  const pJourney = useReveal<HTMLParagraphElement>(0.36);
  const hExp = useReveal<HTMLHeadingElement>(0.42);
  const pExp = useReveal<HTMLParagraphElement>(0.48);
  const hWhat = useReveal<HTMLHeadingElement>(0.54);
  const pWhat = useReveal<HTMLParagraphElement>(0.6);
  const eduReveal = useReveal<HTMLDivElement>(0.66);

  const initials = PORTFOLIO_CONFIG.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleAvatarMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const host = e.currentTarget;
    const r = host.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const max = 8;
    host.style.transform = `rotateY(${(px * max * 2).toFixed(2)}deg) rotateX(${(-py * max * 2).toFixed(2)}deg) translateY(-6px)`;
  };

  const handleAvatarLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = '';
  };

  return (
    <div className="wrap">
      <div className="intro">
        <div
          ref={avatarReveal.ref}
          className={`avatar rv ${avatarReveal.isVisible ? 'in' : ''}`}
          onPointerMove={handleAvatarMove}
          onPointerLeave={handleAvatarLeave}
        >
          <div className="photo" role="img" aria-label={`Portrait of ${PORTFOLIO_CONFIG.name}`}>
            {!imgFailed ? (
              <img
                src={PORTFOLIO_PROFILE_PHOTO}
                alt={`Portrait of ${PORTFOLIO_CONFIG.name}`}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={() => setImgFailed(true)}
              />
            ) : (
              <span
                aria-hidden="true"
                className="grid place-items-center w-full h-full font-extrabold text-[clamp(2.4rem,8vw,4rem)] text-white"
              >
                {initials}
              </span>
            )}
          </div>
        </div>

        <div ref={copyReveal.ref} className="intro-copy">
          <h2 className={`hello rv ${copyReveal.isVisible ? 'in' : ''}`}>
            Hello! I’m <span className="hl">{PORTFOLIO_CONFIG.name}</span>
          </h2>

          <p ref={ledeReveal.ref} className={`lede rv ${ledeReveal.isVisible ? 'in' : ''}`}>
            {PORTFOLIO_CONFIG.intro}
          </p>

          <h3 ref={hJourney.ref} className={`rv ${hJourney.isVisible ? 'in' : ''}`}>
            My Journey
          </h3>
          <p ref={pJourney.ref} className={`sm rv ${pJourney.isVisible ? 'in' : ''}`}>
            {PORTFOLIO_CONFIG.journey}
          </p>

          <h3 ref={hExp.ref} className={`rv ${hExp.isVisible ? 'in' : ''}`}>
            Experience
          </h3>
          <p ref={pExp.ref} className={`sm rv ${pExp.isVisible ? 'in' : ''}`}>
            {PORTFOLIO_CONFIG.experience}
          </p>

          <h3 ref={hWhat.ref} className={`rv ${hWhat.isVisible ? 'in' : ''}`}>
            What I Do
          </h3>
          <p ref={pWhat.ref} className={`sm rv ${pWhat.isVisible ? 'in' : ''}`}>
            {PORTFOLIO_CONFIG.whatIDoPrefix}
            <strong>React.js</strong>
            {PORTFOLIO_CONFIG.whatIDoMid}
            <strong>Laravel</strong>
            {PORTFOLIO_CONFIG.whatIDoSuffix}
          </p>
        </div>
      </div>

      {/* Education Timeline */}
      <div ref={eduReveal.ref} className={`edu rv ${eduReveal.isVisible ? 'in' : ''}`}>
        <h3>Education</h3>
        <div className="edu-track">
          {EDUCATION.map((item) => (
            <div key={item.label} className="edu-item">
              <span className="edu-dot">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3L1 9l11 6 9-4.9V17h2V9z" />
                  <path d="M5 11.2V16c0 1.9 3.1 3.4 7 3.4s7-1.5 7-3.4v-4.8l-7 3.8z" />
                </svg>
              </span>
              <span className="edu-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="skills-sec">
        <NeonTitle text="Skills" as="h2" />
        <div className="skills">
          {SKILLS.map((skill, idx) => (
            <SkillCard key={skill.name} skill={skill} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
