import React from 'react';
import { SkillsRadarSection } from './SkillsRadarSection';
import { SkillsGrid } from './SkillsGrid';
import { ColorTheme } from '../data/colorThemes';

interface SkillsSectionProps {
  theme?: ColorTheme;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ theme }) => {
  return (
    <section id="skills" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14" data-aos="fade-up">
          <h2
            className="text-xs font-mono tracking-widest uppercase font-semibold mb-2 transition-colors"
            style={{ color: theme?.secondary || '#facc15' }}
          >
            02. Capabilities
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white font-display">Technical Skills Matrix</p>
          <p className="text-zinc-400 text-sm mt-3">Extracted comprehensively from professional experience and academic research.</p>
          <div
            className="w-16 h-1 mx-auto mt-4 rounded-full transition-all duration-300"
            style={{
              background: `linear-gradient(to right, ${theme?.primary || '#ef4444'}, ${theme?.secondary || '#facc15'}, ${theme?.accent || '#f59e0b'})`
            }}
          />
        </div>

        {/* D3.js Radar Chart */}
        <SkillsRadarSection theme={theme} />

        {/* 6 Skill Categories Grid */}
        <SkillsGrid theme={theme} />
      </div>
    </section>
  );
};
