import React from 'react';
import { CONFIG } from '../data/config';
import { NeonTitle } from '../components/NeonTitle';
import { HeroIntro } from '../components/HeroIntro';
import { SkillsSection } from '../components/SkillsSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { ContactSection } from '../components/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <section className="page" data-page="home">
      <NeonTitle
        as="h1"
        title={`I’m ${CONFIG.name} ${CONFIG.role}`}
      />
      <div className="wrap">
        <HeroIntro />
        <SkillsSection />
      </div>

      <ProjectsSection />
      <ContactSection />
    </section>
  );
};
