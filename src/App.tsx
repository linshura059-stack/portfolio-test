import React, { useState, useEffect } from 'react';
import { CONFIG } from './data/config';
import { StormBackground } from './components/StormBackground';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';

const LABELS: Record<string, string> = {
  home: 'Home',
  about: 'About',
  portfolio: 'Portfolio',
  contact: 'Contact'
};

const ROUTES = ['home', 'about', 'portfolio', 'contact'];

const routeFromHash = (): string | null => {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash === '') return 'home';
  return ROUTES.includes(hash) ? hash : null; // unknown hash (e.g. #main): leave the page alone
};

const titleFor = (route: string) =>
  (route === 'home' ? '' : `${LABELS[route] || 'Home'} | `) + CONFIG.name;

const scrollToRoute = (route: string, delay: number) => {
  if (route === 'portfolio' || route === 'contact') {
    setTimeout(() => {
      document.getElementById(route)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, delay);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>(() => routeFromHash() ?? 'home');

  const handleRouteChange = (route: string) => {
    setCurrentRoute(route);
    document.title = titleFor(route);
    scrollToRoute(route, 50);
  };

  const navigateTo = (route: string) => {
    const target = route === 'home' ? '#/home' : `#${route}`;
    if (window.location.hash === target) {
      // Same hash: no hashchange event will fire, so handle it directly.
      handleRouteChange(route);
    } else {
      // Changing the hash fires hashchange, which handles the route once.
      window.location.hash = target;
    }
  };

  useEffect(() => {
    const onHashChange = () => {
      const route = routeFromHash();
      if (route) handleRouteChange(route);
    };

    window.addEventListener('hashchange', onHashChange);
    document.title = titleFor(currentRoute);
    if (currentRoute === 'portfolio' || currentRoute === 'contact') {
      scrollToRoute(currentRoute, 100);
    }

    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // The skip link must not touch the hash, or the router would send the user home.
  const skipToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('main')?.focus();
  };

  return (
    <>
      <a className="skip" href="#main" onClick={skipToContent}>
        Skip to content
      </a>

      <StormBackground />

      <Header currentRoute={currentRoute} onNavigate={navigateTo} />

      <main id="main" tabIndex={-1}>
        {currentRoute === 'about' ? <AboutPage /> : <HomePage />}
      </main>

      <Footer onNavigate={navigateTo} />
    </>
  );
};

export default App;
