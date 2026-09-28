import React from 'react';
import { EXPERIENCE_DATA } from '../data/portfolioData';
import { ColorTheme } from '../data/colorThemes';

interface ExperienceSectionProps {
  theme?: ColorTheme;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ theme }) => {
  const primaryColor = theme?.primary || '#06b6d4';
  const secondaryColor = theme?.secondary || '#6366f1';
  const accentColor = theme?.accent || '#f43f5e';

  return (
    <section id="experience" className="py-20 sm:py-28 relative z-10 scroll-mt-28 sm:scroll-mt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Generous Space */}
        <div className="max-w-2xl mb-12 sm:mb-16" data-aos="fade-up">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold mb-3 border"
            style={{
              backgroundColor: `${secondaryColor}15`,
              color: secondaryColor,
              borderColor: `${secondaryColor}40`
            }}
          >
            <i className="fa-solid fa-briefcase" />
            <span>03. Professional Experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight whitespace-nowrap">
            Work History &amp; Operations
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-2.5 leading-relaxed">
            Hands-on operations across mission-critical facility infrastructure at TCS and banking operations analytics.
          </p>
        </div>

        {/* Clean Vertical Timeline with Comfortable Breathing Room */}
        <div className="relative ml-2 sm:ml-4 pl-6 sm:pl-8 border-l-2 border-zinc-800 space-y-12 sm:space-y-16 max-w-4xl">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <div
              key={idx}
              className="relative group"
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              {/* Timeline Marker Bullet with Tri-Color Glow */}
              <div
                className="absolute -left-[33px] sm:-left-[41px] top-2 w-4 h-4 rounded-full border-2 group-hover:scale-125 transition-transform shadow-md"
                style={{
                  backgroundColor: '#090d16',
                  borderColor: idx === 0 ? primaryColor : secondaryColor,
                  boxShadow: `0 0 12px ${idx === 0 ? primaryColor : secondaryColor}80`
                }}
              />

              {/* Content Card with High Contrast, Unclipped Text */}
              <div className="p-5 sm:p-7 rounded-2xl bg-zinc-950/85 border border-zinc-800 hover:border-zinc-700 transition-colors shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold text-white font-display">
                    {exp.role}
                  </h3>
                  <span
                    className="text-xs font-mono font-semibold px-2.5 py-1 rounded border whitespace-nowrap self-start sm:self-auto"
                    style={{
                      backgroundColor: `${primaryColor}15`,
                      color: primaryColor,
                      borderColor: `${primaryColor}40`
                    }}
                  >
                    {exp.period}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-sm font-semibold mb-5 flex-wrap">
                  <span className="text-white text-base">{exp.company}</span>
                  {exp.location && (
                    <>
                      <span className="text-zinc-600">·</span>
                      <span className="text-zinc-300 font-mono text-xs flex items-center gap-1">
                        <i className="fa-solid fa-location-dot" style={{ color: accentColor }} />
                        {exp.location}
                      </span>
                    </>
                  )}
                </div>

                {/* Clear Responsibilities Text - High Contrast, No Clipping */}
                <ul className="space-y-2.5 text-sm text-zinc-200 mb-5 leading-relaxed font-normal">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: idx === 0 ? primaryColor : secondaryColor }}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Applied Technologies / Systems Chips */}
                {exp.technologies && (
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-900">
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-zinc-900 text-zinc-200 border border-zinc-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
