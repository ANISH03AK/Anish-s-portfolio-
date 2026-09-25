import React from 'react';
import { ColorTheme } from '../data/colorThemes';

interface AboutSectionProps {
  theme?: ColorTheme;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ theme }) => {
  const primaryColor = theme?.primary || '#ef4444';
  const secondaryColor = theme?.secondary || '#facc15';

  return (
    <section id="about" className="py-20 border-t border-zinc-800/80 section-scrim relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14" data-aos="fade-up">
          <h2
            className="text-xs font-mono tracking-widest uppercase font-semibold mb-2 transition-colors section-eyebrow"
            style={{ color: secondaryColor }}
          >
            01. Overview
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Professional Summary
          </p>
          <div
            className="w-16 h-1 mx-auto mt-4 rounded-full transition-all duration-300 theme-gradient-divider"
            style={{
              background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor}, ${theme?.accent || '#f59e0b'})`
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Direct PDF Extracted Summary Card (7 cols) */}
          <div className="lg:col-span-7 glass-card tech-brackets p-8 rounded-2xl relative" data-aos="fade-right">
            <i
              className="fa-solid fa-quote-left text-3xl absolute top-6 right-6 transition-colors opacity-20"
              style={{ color: primaryColor }}
            />

            <div className="flex items-center gap-4 mb-5">
              <div
                className="relative w-16 h-16 rounded-full p-[2.5px] shrink-0 shadow-lg transition-all"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  boxShadow: `0 0 16px ${theme?.glowColor || 'rgba(239, 68, 68, 0.25)'}`
                }}
              >
                <img
                  src="profile.jpg"
                  alt="Anish Kumar"
                  className="w-full h-full object-cover rounded-full"
                  style={{ objectPosition: 'center 28%' }}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.hasFallenBack) {
                      target.dataset.hasFallenBack = 'true';
                      target.src = 'IMG_20260904_140606_442.jpg';
                    } else if (target.dataset.hasFallenBack === 'true') {
                      target.dataset.hasFallenBack = 'second';
                      target.src = 'profile.svg';
                    }
                  }}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-sm transition-colors"
                    style={{ backgroundColor: primaryColor }}
                  />
                  Software Developer & BMS Specialist
                </h3>
                <p
                  className="text-xs font-mono mt-0.5 transition-colors font-medium"
                  style={{ color: secondaryColor }}
                >
                  Anish Kumar · MCA Distinction (85%) · TCS
                </p>
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed text-base mb-6">
              "MCA graduate and Software Developer skilled in{' '}
              <strong className="font-semibold transition-colors theme-bold" style={{ color: secondaryColor }}>
                React JS, Python, and SQL
              </strong>
              . Proven experience building responsive web applications, consuming RESTful APIs, and maintaining critical enterprise infrastructure (BMS, Fire Alarms, CCTV) at{' '}
              <strong className="font-semibold transition-colors" style={{ color: primaryColor }}>
                Tata Consultancy Services (TCS)
              </strong>
              . Seeking to leverage full-stack development and complex system troubleshooting skills in a fast-paced IT role."
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800 text-sm">
              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-lg telemetry-block transition-colors"
                  style={{ color: primaryColor }}
                >
                  <i className="fa-solid fa-layer-group" />
                </div>
                <div>
                  <div className="font-semibold text-white">Full-Stack Capability</div>
                  <div className="text-xs text-zinc-400">React, Python, MySQL, Supabase, and REST APIs.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-lg telemetry-block transition-colors"
                  style={{ color: secondaryColor }}
                >
                  <i className="fa-solid fa-network-wired" />
                </div>
                <div>
                  <div className="font-semibold text-white">Enterprise Infrastructure</div>
                  <div className="text-xs text-zinc-400">BMS Metasys, HVAC controls, Fire Alarms & CCTV.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic & Credential Distinction Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4" data-aos="fade-left">
            <div
              className="glass-card tech-brackets p-6 rounded-2xl border-l-4 transition-colors"
              style={{ borderLeftColor: secondaryColor }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-mono uppercase font-semibold transition-colors"
                  style={{ color: secondaryColor }}
                >
                  Post Graduation
                </span>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold transition-colors"
                  style={{
                    backgroundColor: `${secondaryColor}18`,
                    color: secondaryColor,
                    borderColor: `${secondaryColor}40`,
                    borderWidth: '1px'
                  }}
                >
                  85% DISTINCTION
                </span>
              </div>
              <h4 className="text-lg font-bold text-white mt-2">Master of Computer Applications (MCA)</h4>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">Malla Reddy Engineering College (MREC) · 2022–2024</p>
              <p className="text-xs text-zinc-300 mt-2">Core specializations in Web Technologies, Cloud Systems, Algorithms, and Deep Learning.</p>
            </div>

            <div
              className="glass-card tech-brackets p-6 rounded-2xl border-l-4 transition-colors"
              style={{ borderLeftColor: primaryColor }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-mono uppercase font-semibold transition-colors"
                  style={{ color: primaryColor }}
                >
                  Under Graduation
                </span>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold transition-colors"
                  style={{
                    backgroundColor: `${primaryColor}18`,
                    color: primaryColor,
                    borderColor: `${primaryColor}40`,
                    borderWidth: '1px'
                  }}
                >
                  71% FIRST CLASS
                </span>
              </div>
              <h4 className="text-lg font-bold text-white mt-2">B.Sc. (MPCs - Maths, Physics, CS)</h4>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">Pragathi Arts & Science College · 2019–2022</p>
              <p className="text-xs text-zinc-300 mt-2">Foundation in Discrete Mathematics, Statistical Modeling, and Computer Programming.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
