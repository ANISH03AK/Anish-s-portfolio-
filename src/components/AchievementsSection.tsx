import React from 'react';
import { ACHIEVEMENTS } from '../data/portfolioData';
import { ColorTheme } from '../data/colorThemes';

interface AchievementsSectionProps {
  theme?: ColorTheme;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ theme }) => {
  const primaryColor = theme?.primary || '#06b6d4';
  const secondaryColor = theme?.secondary || '#6366f1';
  const accentColor = theme?.accent || '#f43f5e';

  const achievementDetails = [
    {
      ...ACHIEVEMENTS[0],
      tagline: 'Competitive Coding & Algorithmic Translation',
      description: 'Secured 1st Place out of competing colleges in rapid code conversion, syntax translation, and algorithmic efficiency under strict timed conditions.',
      tags: ['Competitive Coding', 'Algorithm Optimization', 'Syntax Translation', 'Gold Medal'],
      accent: '#facc15',
      glow: 'rgba(250, 204, 21, 0.45)',
      gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
      borderColor: 'rgba(250, 204, 21, 0.4)'
    },
    {
      ...ACHIEVEMENTS[1],
      tagline: 'State-Level Machine Learning & Analysis',
      description: 'Completed in-depth technical training on statistical computing, predictive modeling, and data manipulation libraries (Python, Pandas, NumPy).',
      tags: ['Python', 'Data Science', 'Cognitive Class', 'State Level'],
      accent: primaryColor,
      glow: `${primaryColor}40`,
      gradient: 'from-cyan-500/20 via-sky-500/10 to-transparent',
      borderColor: `${primaryColor}60`
    },
    {
      ...ACHIEVEMENTS[2],
      tagline: 'Enterprise RDBMS & Production Database Administration',
      description: 'Participated in advanced engineering sessions covering SQL production indexing, high-availability architecture, schema design, and DBA operational maintenance.',
      tags: ['RDBMS', 'SQL Optimization', 'DBA Operations', 'Cognitive Class'],
      accent: accentColor,
      glow: `${accentColor}40`,
      gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
      borderColor: `${accentColor}60`
    }
  ];

  return (
    <section id="achievements" className="py-20 relative z-10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: '#facc15' }} />
            <span style={{ color: '#facc15' }}>HONORS &amp; RECOGNITIONS</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-400">RESUME VERIFIED</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Key <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, #facc15)` }}>Achievements</span> &amp; Honors
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-mono">
            Recognitions earned in competitive programming championships, state-level data science seminars, and enterprise database systems.
          </p>
        </div>

        {/* 3 Featured Achievements Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {achievementDetails.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-zinc-950/80 border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden"
              style={{
                borderColor: item.borderColor,
                boxShadow: `0 10px 30px -10px ${item.glow}`
              }}
            >
              {/* Subtle Ambient Card Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-b ${item.gradient} opacity-50 pointer-events-none`} />

              {/* Top Accent Bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: item.accent }}
              />

              {/* Card Header */}
              <div className="relative z-10 mb-4">
                <div className="flex items-center justify-between gap-2 mb-4">
                  {/* Icon Box */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-lg border border-white/10 group-hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: `${item.accent}15`,
                      color: item.accent,
                      boxShadow: `0 0 16px ${item.glow}`
                    }}
                  >
                    <i className={item.icon} />
                  </div>

                  {/* Badge */}
                  <span
                    className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold border tracking-wider"
                    style={{
                      backgroundColor: `${item.accent}18`,
                      borderColor: item.accent,
                      color: item.accent
                    }}
                  >
                    {item.badge}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5 mb-1.5">
                  <i className="fa-regular fa-calendar-days text-[10px]" style={{ color: item.accent }} />
                  <span>{item.date}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-300 font-semibold">{item.organization}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug mb-2">
                  {item.title}
                </h3>

                <div className="text-xs font-mono font-medium mb-3" style={{ color: item.accent }}>
                  {item.event}
                </div>

                <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-sans mb-4">
                  {item.description}
                </p>
              </div>

              {/* Card Footer: Tags */}
              <div className="relative z-10 pt-4 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:border-zinc-700 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Telemetry Distinction Highlight Banner */}
        <div className="rounded-xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 relative overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
            <div className="pt-2 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400">1st Place</div>
              <div className="text-xs font-mono text-zinc-400 mt-1 uppercase tracking-wider">Tech Fest 22 Winner</div>
            </div>
            <div className="pt-4 sm:pt-0 sm:px-4">
              <div className="text-2xl sm:text-3xl font-black font-mono" style={{ color: primaryColor }}>85% Distinction</div>
              <div className="text-xs font-mono text-zinc-400 mt-1 uppercase tracking-wider">MCA Master Degree</div>
            </div>
            <div className="pt-4 sm:pt-0 sm:px-4">
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">100% Uptime</div>
              <div className="text-xs font-mono text-zinc-400 mt-1 uppercase tracking-wider">TCS BMS Infrastructure</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
