import React from 'react';
import { EDUCATION_DATA } from '../data/portfolioData';
import { ColorTheme } from '../data/colorThemes';

interface EducationSectionProps {
  theme?: ColorTheme;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ theme }) => {
  const primaryColor = theme?.primary || '#06b6d4';
  const secondaryColor = theme?.secondary || '#6366f1';
  const accentColor = theme?.accent || '#f43f5e';

  const icons = [
    'fa-solid fa-graduation-cap',
    'fa-solid fa-laptop-code',
    'fa-solid fa-microchip'
  ];

  return (
    <section id="education" className="py-28 sm:py-36 border-t border-zinc-800/80 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Generous Space */}
        <div className="max-w-2xl mb-16 sm:mb-20" data-aos="fade-up">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold mb-3 border"
            style={{
              backgroundColor: `${primaryColor}15`,
              color: primaryColor,
              borderColor: `${primaryColor}40`
            }}
          >
            <i className="fa-solid fa-user-graduate" />
            <span>02. Academic Qualifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Education &amp; Credentials
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-2.5 leading-relaxed">
            Formal university qualifications, computer hardware diplomas, and computer science degrees.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EDUCATION_DATA.map((edu, idx) => {
            const cardColor = idx === 0 ? primaryColor : idx === 1 ? secondaryColor : accentColor;

            return (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-zinc-950/85 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 shadow-xl hover:-translate-y-1.5 flex flex-col justify-between group"
                data-aos="fade-up"
                data-aos-delay={idx * 120}
              >
                <div>
                  {/* Top Bar with Icon & Score Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl border transition-colors shadow-md"
                      style={{
                        backgroundColor: `${cardColor}18`,
                        borderColor: `${cardColor}40`,
                        color: cardColor
                      }}
                    >
                      <i className={icons[idx] || 'fa-solid fa-graduation-cap'} />
                    </div>

                    <div
                      className="px-3 py-1 rounded-full font-mono text-xs font-bold border flex items-center gap-1.5"
                      style={{
                        backgroundColor: `${cardColor}20`,
                        color: cardColor,
                        borderColor: `${cardColor}50`
                      }}
                    >
                      <i className="fa-solid fa-award text-[10px]" />
                      <span>{edu.score}</span>
                    </div>
                  </div>

                  {/* Degree Title */}
                  <h3 className="text-lg font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                    {edu.degree}
                  </h3>

                  {/* Institution Name */}
                  <div className="flex items-center gap-2 mt-2 text-xs font-medium text-zinc-300">
                    <i className="fa-solid fa-building-columns text-[11px]" style={{ color: cardColor }} />
                    <span className="leading-snug">{edu.institution}</span>
                  </div>

                  {/* Description */}
                  {edu.description && (
                    <p className="text-xs text-zinc-300 mt-3.5 leading-relaxed font-normal">
                      {edu.description}
                    </p>
                  )}
                </div>

                {/* Duration Period Footer */}
                <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <i className="fa-regular fa-calendar" />
                    <span>{edu.period}</span>
                  </span>
                  <span className="text-[11px] font-semibold" style={{ color: cardColor }}>
                    VERIFIED
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
