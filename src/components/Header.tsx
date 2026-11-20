import { useEffect, useRef, useState } from 'react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

export type NavRoute = 'home' | 'about' | 'portfolio' | 'contact';

interface HeaderProps {
  activeRoute: NavRoute;
  onNavigate: (route: NavRoute) => void;
}

const NAV_ITEMS: { route: NavRoute; label: string; href: string }[] = [
  { route: 'home', label: 'Home', href: '#/home' },
  { route: 'about', label: 'About', href: '#/about' },
  { route: 'portfolio', label: 'Portfolio', href: '#portfolio' },
  { route: 'contact', label: 'Contact', href: '#contact' },
];

export function Header({ activeRoute, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (menuOpen && headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    const mq = window.matchMedia('(min-width: 761px)');
    const onMqChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointerdown', onPointerDown);
    mq.addEventListener('change', onMqChange);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointerdown', onPointerDown);
      mq.removeEventListener('change', onMqChange);
    };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent, route: NavRoute) => {
    e.preventDefault();
    setMenuOpen(false);
    onNavigate(route);
  };

  return (
    <header ref={headerRef} className="site-header">
      <div className="bar-in">
        <a
          className="brand whitespace-nowrap shrink-0"
          href="#/home"
          onClick={(e) => handleNavClick(e, 'home')}
        >
          {PORTFOLIO_CONFIG.name}
        </a>

        <button
          className="burger"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="nav"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav ${menuOpen ? 'open' : ''}`} id="nav" aria-label="Main">
          <ul>
            {NAV_ITEMS.map((item, idx) => (
              <li key={item.route} ref={(el) => el?.style.setProperty('--k', String(idx))}>
                <a
                  href={item.href}
                  className="whitespace-nowrap shrink-0"
                  aria-current={activeRoute === item.route ? 'page' : undefined}
                  onClick={(e) => handleNavClick(e, item.route)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
