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
  const isExternalLink = (href: string) => /^https?:\/\//i.test(href);

  return (
    <div id="portfolio" className="home-section" ref={containerRef}>
      <NeonTitle title="Portfolio" />
      <div className="wrap">
        <div className="projects" id="projects">
          {CONFIG.projects.map((p: ProjectItem, i: number) => {
            const link = projectLink(p);
            const external = isExternalLink(link);
            const screenRenderer = SCREENS[p.screen];
            const screenSvg = screenRenderer ? screenRenderer() : '';
            const stackItems = p.stack.split('+').map(t => t.trim());
            const showRepo = Boolean(p.repo && p.title !== 'My Portfolio');

            const laptopPreview = (
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
                          />
                        ) : (
                          <div dangerouslySetInnerHTML={{ __html: screenSvg }} />
                        )}
                      </div>
                      <span className="chip">{p.stack}</span>
                      {link && (
                        <div className="preview-action" aria-hidden="true">
                          {p.url ? 'View project' : 'View code'}{external ? ' ↗' : ''}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="base" />
                </div>
              </div>
            );

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
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      tabIndex={-1}
                      aria-label={`Open ${p.title}`}
                    >
                      {laptopPreview}
                    </a>
                  ) : (
                    laptopPreview
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
                          target={isExternalLink(p.url) ? '_blank' : undefined}
                          rel={isExternalLink(p.url) ? 'noopener noreferrer' : undefined}
                        >
                          <span>Live Demo</span>
                          {isExternalLink(p.url) && (
                            <span className="sr"> of {p.title} (opens in a new tab)</span>
                          )}
                        </a>
                      )}
                      {showRepo && (
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
                      {!p.url && !showRepo && (
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
