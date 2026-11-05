import React from 'react';
import { CONFIG } from '../data/config';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, route: string) => {
    e.preventDefault();
    onNavigate(route);
  };

  return (
    <footer className="site-footer">
      <div className="foot">
        <div>
          <h3>{CONFIG.name}</h3>
        </div>

        <nav aria-label="Footer">
          <h3>Pages</h3>
          <ul>
            <li>
              <a href="#/home" onClick={e => handleNavClick(e, 'home')}>
                Home
              </a>
            </li>
            <li>
              <a href="#/about" onClick={e => handleNavClick(e, 'about')}>
                About
              </a>
            </li>
            <li>
              <a href="#portfolio" onClick={e => handleNavClick(e, 'portfolio')}>
                Portfolio
              </a>
            </li>
            <li>
              <a href="#contact" onClick={e => handleNavClick(e, 'contact')}>
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h3>Services</h3>
          <ul>
            <li>Web Development</li>
            <li>Frontend Development</li>
            <li>Backend Development</li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <ul className="contact">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 6h18v12H3z" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
                <path d="M6.6 3h3l1.4 4-2 1.3a11 11 0 0 0 5.7 5.7l1.3-2 4 1.4v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3z" />
              </svg>
              <a href={`tel:${CONFIG.phone.replace(/[^\d+]/g, '')}`}>{CONFIG.phone}</a>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
                <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
                <path d="M8 10.5V16M8 8v.01M11.5 16v-5.5M11.5 12.8c0-1.5 1-2.4 2.3-2.4s2.2.9 2.2 2.4V16" />
              </svg>
              <a href={CONFIG.linkedinUrl} target="_blank" rel="noopener noreferrer">
                {CONFIG.linkedinLabel}
              </a>
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                <circle cx="7" cy="6" r="2.4" />
                <circle cx="7" cy="18" r="2.4" />
                <circle cx="17" cy="9" r="2.4" />
                <path d="M7 8.4v7.2M17 11.4c0 3-3 3.6-10 4.6" />
              </svg>
              <a href={CONFIG.githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="copy">
        Copyright © {currentYear} | All rights reserved by {CONFIG.name}
      </p>
    </footer>
  );
};
