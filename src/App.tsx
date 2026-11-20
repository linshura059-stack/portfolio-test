/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Header, NavRoute } from './components/Header';
import { IntroSection } from './components/IntroSection';
import { NeonTitle } from './components/NeonTitle';
import { PortfolioSection } from './components/PortfolioSection';
import { StormBackground, triggerLightningStrike } from './components/StormBackground';
import { PORTFOLIO_CONFIG } from './data/portfolioData';

type PageView = 'home' | 'about';

const ROUTE_LABELS: Record<NavRoute, string> = {
  home: 'Home',
  about: 'About',
  portfolio: 'Portfolio',
  contact: 'Contact',
};

const KNOWN_ROUTES: NavRoute[] = ['home', 'about', 'portfolio', 'contact'];

function parseHashRoute(): NavRoute {
  const raw = window.location.hash.replace(/^#\/?/, '') as NavRoute;
  return KNOWN_ROUTES.includes(raw) ? raw : 'home';
}

export default function App() {
  const [activeRoute, setActiveRoute] = useState<NavRoute>(() => parseHashRoute());
  const [currentPage, setCurrentPage] = useState<PageView>(() =>
    parseHashRoute() === 'about' ? 'about' : 'home'
  );
  const [isLeaving, setIsLeaving] = useState(false);

  const homeTitleRef = useRef<HTMLHeadingElement | null>(null);
  const aboutTitleRef = useRef<HTMLHeadingElement | null>(null);
  const portfolioTitleRef = useRef<HTMLHeadingElement | null>(null);
  const contactTitleRef = useRef<HTMLHeadingElement | null>(null);
  const transitionTimerRef = useRef<number | null>(null);

  const syncDocumentTitle = useCallback((route: NavRoute) => {
    document.title =
      route === 'home'
        ? PORTFOLIO_CONFIG.name
        : `${ROUTE_LABELS[route]} | ${PORTFOLIO_CONFIG.name}`;
  }, []);

  const scrollToSection = useCallback((route: NavRoute, instant = false) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (route === 'portfolio' || route === 'contact') {
      const targetEl = document.getElementById(route);
      if (targetEl) {
        requestAnimationFrame(() => {
          targetEl.scrollIntoView({
            behavior: instant || reduced ? 'auto' : 'smooth',
            block: 'start',
          });
        });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: instant || reduced ? 'auto' : 'smooth' });
  }, []);

  const focusHeadingForRoute = useCallback((route: NavRoute) => {
    if (route === 'about') aboutTitleRef.current?.focus({ preventScroll: true });
    else if (route === 'portfolio') portfolioTitleRef.current?.focus({ preventScroll: true });
    else if (route === 'contact') contactTitleRef.current?.focus({ preventScroll: true });
    else homeTitleRef.current?.focus({ preventScroll: true });
  }, []);

  const navigate = useCallback(
    (route: NavRoute, updateHash = true, isInitial = false) => {
      const nextPage: PageView = route === 'about' ? 'about' : 'home';
      const targetHash =
        route === 'portfolio' || route === 'contact' ? `#${route}` : `#/${route}`;

      if (updateHash && window.location.hash !== targetHash) {
        window.history.pushState(null, '', targetHash);
      }

      setActiveRoute(route);
      syncDocumentTitle(route);

      if (nextPage === currentPage) {
        scrollToSection(route, isInitial);
        if (!isInitial) focusHeadingForRoute(route);
        return;
      }

      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const enterNextPage = () => {
        setIsLeaving(false);
        setCurrentPage(nextPage);
        requestAnimationFrame(() => {
          scrollToSection(route, isInitial);
          if (!isInitial) {
            focusHeadingForRoute(route);
            window.setTimeout(() => triggerLightningStrike(), 200);
          }
        });
      };

      if (!reduced && !isInitial) {
        setIsLeaving(true);
        transitionTimerRef.current = window.setTimeout(enterNextPage, 320);
      } else {
        enterNextPage();
      }
    },
    [currentPage, focusHeadingForRoute, scrollToSection, syncDocumentTitle]
  );

  useEffect(() => {
    const initial = parseHashRoute();
    syncDocumentTitle(initial);
    if (initial === 'portfolio' || initial === 'contact') {
      scrollToSection(initial, true);
    }

    const onHashChange = () => {
      if (window.location.hash === '#main') return;
      navigate(parseHashRoute(), false, false);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
    };
  }, [navigate, scrollToSection, syncDocumentTitle]);

  return (
    <div className="min-h-screen flex flex-col">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <StormBackground />

      <Header activeRoute={activeRoute} onNavigate={(route) => navigate(route, true, false)} />

      <main id="main" className="relative z-10 flex-1">
        {currentPage === 'home' ? (
          <section className={`page ${isLeaving ? 'leaving' : ''}`} data-page="home">
            <NeonTitle
              ref={homeTitleRef}
              text={`I’m ${PORTFOLIO_CONFIG.name} ${PORTFOLIO_CONFIG.role}`}
              as="h1"
            />
            <IntroSection />
            <PortfolioSection titleRef={portfolioTitleRef} />
            <ContactSection titleRef={contactTitleRef} />
          </section>
        ) : (
          <section className={`page ${isLeaving ? 'leaving' : ''}`} data-page="about">
            <NeonTitle ref={aboutTitleRef} text="About me" as="h1" />
            <IntroSection />
          </section>
        )}
      </main>

      <Footer onNavigate={(route) => navigate(route, true, false)} />
    </div>
  );
}
