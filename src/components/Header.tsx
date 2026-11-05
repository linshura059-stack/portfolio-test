import React, { useState, useEffect } from 'react';
import { CONFIG } from '../data/config';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 761) setMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, route: string) => {
    e.preventDefault();
    setMenuOpen(false);
    onNavigate(route);
  };

  return (
    <header className="site-header">
      <div className="bar-in">
        <a
          className="brand"
          href="#/home"
          onClick={e => handleNavClick(e, 'home')}
        >
          {CONFIG.name}
        </a>

        <button
          className="burger"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={`nav ${menuOpen ? 'open' : ''}`}
          id="nav"
          aria-label="Main"
        >
          <ul>
            <li style={{ '--k': 0 } as React.CSSProperties}>
              <a
                href="#/home"
                data-route="home"
                aria-current={currentRoute === 'home' ? 'page' : undefined}
                onClick={e => handleNavClick(e, 'home')}
              >
                Home
              </a>
            </li>
            <li style={{ '--k': 1 } as React.CSSProperties}>
              <a
                href="#/about"
                data-route="about"
                aria-current={currentRoute === 'about' ? 'page' : undefined}
                onClick={e => handleNavClick(e, 'about')}
              >
                About
              </a>
            </li>
            <li style={{ '--k': 2 } as React.CSSProperties}>
              <a
                href="#portfolio"
                data-route="portfolio"
                aria-current={currentRoute === 'portfolio' ? 'page' : undefined}
                onClick={e => handleNavClick(e, 'portfolio')}
              >
                Portfolio
              </a>
            </li>
            <li style={{ '--k': 3 } as React.CSSProperties}>
              <a
                href="#contact"
                data-route="contact"
                aria-current={currentRoute === 'contact' ? 'page' : undefined}
                onClick={e => handleNavClick(e, 'contact')}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
