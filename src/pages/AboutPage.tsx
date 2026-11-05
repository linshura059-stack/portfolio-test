import React from 'react';
import { NeonTitle } from '../components/NeonTitle';
import { HeroIntro } from '../components/HeroIntro';
import { SkillsSection } from '../components/SkillsSection';

export const AboutPage: React.FC = () => {
  return (
    <section className="page" data-page="about">
      <NeonTitle as="h1" title="About me" />
      <div className="wrap">
        <HeroIntro />
        <SkillsSection />
      </div>
    </section>
  );
};
