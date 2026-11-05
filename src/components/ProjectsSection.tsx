import React, { useRef, useEffect } from 'react';
import { CONFIG, ProjectItem } from '../data/config';
import { SCREENS, getTechIcon } from './Screens';
import { NeonTitle } from './NeonTitle';

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const articles = root.querySelectorAll<HTMLElement>('.project-premium');

    const cleanups: (() => void)[] = [];

    articles.forEach(card => {
      const laptopIn = card.querySelector<HTMLElement>('.laptop-in');
      if (!laptopIn) return;

      const onPointerMove = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse' || reduced) return;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;

        // Card tilt
        const maxCard = 7;
        const deg = Math.hypot(px, py) * maxCard * 2;
        card.style.rotate = deg < 0.05 ? 'none' : `${(-py).toFixed(3)} ${px.toFixed(3)} 0 ${deg.toFixed(2)}deg`;
        card.style.setProperty('--mx', ((px + 0.5) * 100).toFixed(1) + '%');
        card.style.setProperty('--my', ((py + 0.5) * 100).toFixed(1) + '%');

        // Laptop tilt
        const maxLaptop = 6;
        laptopIn.style.transform = `rotateY(${(px * maxLaptop * 2).toFixed(2)}deg) rotateX(${(-py * maxLaptop * 2).toFixed(2)}deg) translateY(-6px)`;
      };

      const onPointerLeave = () => {
        card.style.rotate = '';
        laptopIn.style.transform = '';
      };

      card.addEventListener('pointermove', onPointerMove);
      card.addEventListener('pointerleave', onPointerLeave);

      cleanups.push(() => {
        card.removeEventListener('pointermove', onPointerMove);
        card.removeEventListener('pointerleave', onPointerLeave);
      });
    });

    return () => {
      cleanups.forEach(c => c());
    };
  }, []);

  const projectLink = (p: ProjectItem) => p.url || p.repo || '';

  return (
    <div id="portfolio" className="home-section" ref={containerRef}>
      <NeonTitle title="Portfolio" />
      <div className="wrap">
        <div className="projects" id="projects">
          {CONFIG.projects.map((p: ProjectItem, i: number) => {
            const link = projectLink(p);
            const screenRenderer = SCREENS[p.screen];
            const screenSvg = screenRenderer ? screenRenderer() : '';
            const stackItems = p.stack.split('+').map(t => t.trim());

            return (
              <article
                key={p.title}
                className="project project-premium rv in"
                data-tilt-host
                style={{ '--pc': p.rgb || '25,224,210' } as React.CSSProperties}
              >
                <span className="nb" aria-hidden="true">
                  <i />
                </span>
                <div className="project-visual">
                  {link ? (
                    <a
                      className="project-visual-link"
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <div className="laptop">
                        <div className="laptop-in">
                          <div className="lid">
                            <div className="screen" role="img" aria-label={`Preview of ${p.title}`}>
                              <div className="bar">
                                <i />
                                <i />
                                <i />
                                <span />
                              </div>
                              <div className="view">
                                {p.image ? (
                                  <img
                                    src={p.image}
                                    alt={`Preview of ${p.title}`}
                                    loading="lazy"
                                    style={{
                                      display: 'block',
                                      width: '100%',
                                      height: 'auto',
                                      transition: 'transform 3.2s cubic-bezier(.35, .1, .2, 1)'
                                    }}
                                  />
                                ) : (
                                  <div dangerouslySetInnerHTML={{ __html: screenSvg }} />
                                )}
                              </div>
                              <span className="chip">{p.stack}</span>
                              <div className="preview-action" aria-hidden="true">
                                {p.url ? 'View project' : 'View code'} ↗
                              </div>
                            </div>
                          </div>
                          <div className="base" />
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="laptop">
                      <div className="laptop-in">
                        <div className="lid">
                          <div className="screen" role="img" aria-label={`Preview of ${p.title}`}>
                            <div className="bar">
                              <i />
                              <i />
                              <i />
                              <span />
                            </div>
                            <div className="view">
                              {p.image ? (
                                <img
                                  src={p.image}
                                  alt={`Preview of ${p.title}`}
                                  loading="lazy"
                                  style={{
                                    display: 'block',
                                    width: '100%',
                                    height: 'auto',
                                    transition: 'transform 3.2s cubic-bezier(.35, .1, .2, 1)'
                                  }}
                                />
                              ) : (
                                <div dangerouslySetInnerHTML={{ __html: screenSvg }} />
                              )}
                            </div>
                            <span className="chip">{p.stack}</span>
                          </div>
                        </div>
                        <div className="base" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="project-copy">
                  <div className="project-heading">
                    <div>
                      <p className="project-index">
                        {String(i + 1).padStart(2, '0')} / PROJECT
                      </p>
                      <h3>{p.title}</h3>
                    </div>
                  </div>
                  <p className="project-description">
                    {p.description || 'Web application project built with modern development tools.'}
                  </p>
                  <div className={`project-stack-row${stackItems.length > 3 ? ' many' : ''}`}>
                    <ul className="tech-list" aria-label="Technology stack">
                      {stackItems.map(t => (
                        <li className="tech" key={t}>
                          <span
                            className="tech-ico"
                            aria-hidden="true"
                            dangerouslySetInnerHTML={{ __html: getTechIcon(t) }}
                          />
                          <span className="tech-name">{t}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="project-actions">
                      {p.url && (
                        <a
                          className="btn btn-ok project-btn"
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>Live Demo</span>
                          <span className="sr"> of {p.title} (opens in a new tab)</span>
                        </a>
                      )}
                      {p.repo && p.title !== 'My Portfolio' && (
                        <a
                          className="btn btn-code project-btn"
                          href={p.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>View Code</span>
                          <span className="sr"> of {p.title} (opens in a new tab)</span>
                        </a>
                      )}
                      {!p.url && !p.repo && (
                        <span className="btn btn-off project-btn" aria-disabled="true">
                          <span>No demo yet</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
