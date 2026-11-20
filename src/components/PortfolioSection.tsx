import { useEffect, useRef, useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { PROJECTS, ProjectItem } from '../data/portfolioData';
import { useReveal } from '../hooks/useReveal';
import { NeonTitle } from './NeonTitle';
import { ProjectScreenSvg, TechBadgeIcon } from './TechIcons';

function ProjectCard({
  project,
  index,
  onSelectProject,
}: {
  project: ProjectItem;
  index: number;
  onSelectProject: (p: ProjectItem) => void;
}) {
  const cardReveal = useReveal<HTMLElement>((index % 3) * 0.14);
  const laptopInRef = useRef<HTMLDivElement | null>(null);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    const el = cardReveal.ref.current;
    if (el) {
      el.style.setProperty('--pc', project.rgb || '25,224,210');
    }
  }, [cardReveal.ref, project.rgb]);

  const stackItems = project.stack.split('+').map((t) => t.trim());
  const projectLink = project.url || project.repo || '';

  const handleCardMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;

    const deg = Math.hypot(px, py) * 7 * 2;
    card.style.rotate =
      deg < 0.05 ? 'none' : `${(-py).toFixed(3)} ${px.toFixed(3)} 0 ${deg.toFixed(2)}deg`;
    card.style.setProperty('--mx', `${((px + 0.5) * 100).toFixed(1)}%`);
    card.style.setProperty('--my', `${((py + 0.5) * 100).toFixed(1)}%`);

    if (laptopInRef.current) {
      const maxLaptop = 6;
      laptopInRef.current.style.transform = `rotateY(${(px * maxLaptop * 2).toFixed(
        2
      )}deg) rotateX(${(-py * maxLaptop * 2).toFixed(2)}deg) translateY(-6px)`;
    }
  };

  const handleCardLeave = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.rotate = '';
    if (laptopInRef.current) {
      laptopInRef.current.style.transform = '';
    }
  };

  return (
    <article
      ref={cardReveal.ref}
      className={`project project-premium rv ${cardReveal.isVisible ? 'in' : ''}`}
      onPointerMove={handleCardMove}
      onPointerLeave={handleCardLeave}
    >
      <span className="nb" aria-hidden="true">
        <i />
      </span>

      <div className="project-visual">
        <button
          type="button"
          onClick={() => onSelectProject(project)}
          className="block w-full text-left bg-transparent border-0 p-0 cursor-pointer"
          aria-label={`Preview ${project.title}`}
        >
          <div className="laptop">
            <div ref={laptopInRef} className="laptop-in">
              <div className="lid">
                <div className="screen" role="img" aria-label={`Preview of ${project.title}`}>
                  <div className="bar">
                    <i />
                    <i />
                    <i />
                    <span />
                  </div>
                  <div className="view">
                    {!imgFailed && project.image ? (
                      <img
                        src={project.image}
                        alt={`${project.title} preview screenshot`}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={() => setImgFailed(true)}
                      />
                    ) : (
                      <ProjectScreenSvg screen={project.screen} />
                    )}
                  </div>
                  <span className="chip">{project.stack}</span>
                  <div className="preview-action" aria-hidden="true">
                    {project.url ? 'Preview / Live ↗' : 'Quick preview ↗'}
                  </div>
                </div>
              </div>
              <div className="base" />
            </div>
          </div>
        </button>
      </div>

      <div className="project-copy">
        <div className="project-heading">
          <div>
            <p className="project-index">{String(index + 1).padStart(2, '0')} · Project</p>
            <h3>{project.title}</h3>
          </div>
        </div>

        <p className="project-description">{project.description}</p>

        <div className={`project-stack-row ${stackItems.length > 3 ? 'many' : ''}`}>
          <ul className="tech-list" aria-label="Technology stack">
            {stackItems.map((tech) => (
              <li key={tech} className="tech">
                <span className="tech-ico" aria-hidden="true">
                  <TechBadgeIcon name={tech} />
                </span>
                <span className="tech-name">{tech}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {project.url ? (
              <a
                className="btn btn-ok"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Live Demo</span>
                <span className="sr-only"> of {project.title} (opens in a new tab)</span>
              </a>
            ) : null}

            {project.repo ? (
              <a
                className="btn btn-code"
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View Code</span>
                <span className="sr-only"> of {project.title} (opens in a new tab)</span>
              </a>
            ) : null}

            {!projectLink ? (
              <button
                type="button"
                className="btn btn-off"
                onClick={() => onSelectProject(project)}
              >
                <span>In Development</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectItem | null;
  onClose: () => void;
}) {
  const [modalImgFailed, setModalImgFailed] = useState(false);

  useEffect(() => {
    setModalImgFailed(false);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const stackItems = project.stack.split('+').map((t) => t.trim());

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-teal-400/30 bg-[#060f16] text-slate-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4 sticky top-0 bg-[#060f16]/95 backdrop-blur-md z-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-teal-300/80 font-semibold">
              Project Preview
            </p>
            <h3 id="modal-project-title" className="text-xl font-bold text-white mt-0.5">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 bg-white/5 text-slate-200 hover:bg-white/15 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 rounded-xl border border-white/10 bg-[#0b141c] overflow-hidden">
            <div className="h-7 bg-[#eceef1] flex items-center gap-1.5 px-3">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2 flex-1 h-4 rounded bg-white/90 text-[10px] text-slate-500 px-2 flex items-center truncate">
                {project.url || `https://portfolio.local/${project.id}`}
              </span>
            </div>
            <div className="bg-[#09121a] overflow-hidden">
              {!modalImgFailed && project.image ? (
                <img
                  src={project.image}
                  alt={`${project.title} full preview`}
                  className="w-full h-auto block object-contain"
                  referrerPolicy="no-referrer"
                  onError={() => setModalImgFailed(true)}
                />
              ) : (
                <div className="max-h-[420px] overflow-y-auto bg-white">
                  <ProjectScreenSvg screen={project.screen} />
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-5">
            <div>
              <h4 className="text-sm font-semibold text-teal-300 uppercase tracking-wider mb-2">
                Overview
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">{project.description}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-teal-300 uppercase tracking-wider mb-2">
                Key Highlights
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                {project.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-teal-400 mt-1 text-xs">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-teal-300 uppercase tracking-wider mb-2.5">
                Tech Stack
              </h4>
              <ul className="flex flex-wrap gap-3">
                {stackItems.map((tech) => (
                  <li
                    key={tech}
                    className="inline-flex items-center gap-2 text-xs font-medium text-slate-200 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5"
                  >
                    <span className="w-4 h-4 inline-flex">
                      <TechBadgeIcon name={tech} />
                    </span>
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ok"
                >
                  <span>Visit Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-xs text-slate-400 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                  Currently in active local development
                </span>
              )}
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-code"
                >
                  <span>View Source Code</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioSection({
  titleRef,
}: {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <div id="portfolio" className="home-section">
      <NeonTitle ref={titleRef} text="Portfolio" as="h2" />
      <div className="wrap">
        <div className="projects">
          {PROJECTS.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onSelectProject={setSelectedProject}
            />
          ))}
        </div>
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
