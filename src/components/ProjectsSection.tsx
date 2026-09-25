import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ColorTheme } from '../data/colorThemes';

interface ProjectsSectionProps {
  theme?: ColorTheme;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ theme }) => {
  const primaryColor = theme?.primary || '#ef4444';
  const secondaryColor = theme?.secondary || '#facc15';

  return (
    <section id="projects" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14" data-aos="fade-up">
          <h2
            className="text-xs font-mono tracking-widest uppercase font-semibold mb-2 transition-colors section-eyebrow"
            style={{ color: secondaryColor }}
          >
            04. Works
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white font-display">Featured Projects</p>
          <p className="text-zinc-400 text-sm mt-3">Production e-commerce, AI computer vision research, and relational management systems.</p>
          <div
            className="w-16 h-1 mx-auto mt-4 rounded-full transition-all duration-300 theme-gradient-divider"
            style={{
              background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor}, ${theme?.accent || '#f59e0b'})`
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project 1: Dexter Men's Wear (Featured with Animated Laser Beam Border & Bolt Badge) */}
          <div className="laser-beam-border rounded-2xl p-[1.5px] shadow-2xl group flex flex-col" data-aos="fade-up" data-aos-delay="100">
            <div className="laser-beam-content glass-card tech-brackets rounded-2xl overflow-hidden flex flex-col flex-1 bg-zinc-950/90 relative">
              {/* Top Bolt Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span
                  className="px-3 py-1 rounded-full text-black font-mono text-[10px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1 transition-all bolt-heading"
                  style={{
                    backgroundColor: secondaryColor,
                    boxShadow: `0 0 12px ${secondaryColor}66`
                  }}
                >
                  <i className="fa-solid fa-bolt" />LIVE ON VERCEL
                </span>
              </div>

              {/* Card Banner Area */}
              <div className="h-48 bg-gradient-to-br from-zinc-950/95 via-[#180808]/90 to-[#080202]/95 p-6 flex flex-col justify-end relative overflow-hidden border-b border-zinc-800">
                <div
                  className="absolute -right-8 -top-8 w-36 h-36 rounded-full blur-2xl transition-colors opacity-30 group-hover:opacity-50"
                  style={{ backgroundColor: primaryColor }}
                />
                <i className="fa-solid fa-shirt text-6xl text-zinc-700/20 absolute right-4 bottom-3 pointer-events-none" />
                <span className="text-xs font-mono font-semibold transition-colors" style={{ color: secondaryColor }}>
                  REACT JS E-COMMERCE
                </span>
                <h3 className="text-2xl font-bold text-white font-display mt-1">Dexter Men's Wear</h3>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-sm text-zinc-300 leading-relaxed">
                  A high-conversion, responsive menswear retail web store engineered with React JS, modern component architecture, product filtering, dynamic cart management, and seamless mobile UX.
                </p>

                <div className="space-y-4">
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border text-zinc-200 transition-colors" style={{ borderColor: `${primaryColor}44` }}>React.js</span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border text-zinc-200 transition-colors" style={{ borderColor: `${primaryColor}44` }}>Tailwind CSS</span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border text-zinc-200 transition-colors" style={{ borderColor: `${primaryColor}44` }}>Vercel</span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border text-zinc-200 transition-colors" style={{ borderColor: `${primaryColor}44` }}>State Management</span>
                  </div>

                  {/* Clickable Glowing Button for Dexter Men's Wear */}
                  <a
                    href={PERSONAL_INFO.dexterUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 rounded-xl text-black font-extrabold text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                      boxShadow: `0 0 18px ${theme?.glowColor || 'rgba(239, 68, 68, 0.35)'}`
                    }}
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square" />
                    <span>LAUNCH LIVE STORE ON VERCEL</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Project 2: Deepfake Video Detection using CNN */}
          <div className="glass-card tech-brackets rounded-2xl overflow-hidden flex flex-col border border-zinc-800 hover:border-zinc-700 relative group" data-aos="fade-up" data-aos-delay="200">
            <div className="h-48 bg-gradient-to-br from-zinc-950/95 via-[#181408]/90 to-[#080602]/95 p-6 flex flex-col justify-end relative overflow-hidden border-b border-zinc-800">
              <div
                className="absolute -right-8 -top-8 w-36 h-36 rounded-full blur-2xl transition-colors opacity-20 group-hover:opacity-40"
                style={{ backgroundColor: secondaryColor }}
              />
              <i className="fa-solid fa-brain text-6xl absolute right-4 bottom-3 pointer-events-none opacity-15" style={{ color: secondaryColor }} />
              <span className="text-xs font-mono font-semibold transition-colors" style={{ color: secondaryColor }}>
                AI / COMPUTER VISION
              </span>
              <h3 className="text-2xl font-bold text-white font-display mt-1">Deepfake Detection</h3>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-sm text-zinc-300 leading-relaxed">
                Academic research project utilizing Convolutional Neural Networks (CNN) to detect facial manipulation and AI synthesis in video frames, identifying artifact discrepancies with high accuracy.
              </p>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border transition-colors" style={{ color: secondaryColor, borderColor: `${secondaryColor}40` }}>Python</span>
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border transition-colors" style={{ color: secondaryColor, borderColor: `${secondaryColor}40` }}>CNN</span>
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border transition-colors" style={{ color: secondaryColor, borderColor: `${secondaryColor}40` }}>OpenCV</span>
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border transition-colors" style={{ color: secondaryColor, borderColor: `${secondaryColor}40` }}>TensorFlow</span>
                </div>

                <div className="p-2.5 rounded-xl telemetry-block border border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>RESEARCH PAPER / MCA</span>
                  <span className="font-bold transition-colors" style={{ color: secondaryColor }}>85% DISTINCTION</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project 3: Tourism Management System */}
          <div className="glass-card tech-brackets rounded-2xl overflow-hidden flex flex-col border border-zinc-800 hover:border-zinc-700 relative group" data-aos="fade-up" data-aos-delay="300">
            <div className="h-48 bg-gradient-to-br from-zinc-950/95 via-[#1a0808]/90 to-[#080202]/95 p-6 flex flex-col justify-end relative overflow-hidden border-b border-zinc-800">
              <div
                className="absolute -right-8 -top-8 w-36 h-36 rounded-full blur-2xl transition-colors opacity-20 group-hover:opacity-40"
                style={{ backgroundColor: primaryColor }}
              />
              <i className="fa-solid fa-map-location-dot text-6xl absolute right-4 bottom-3 pointer-events-none opacity-15" style={{ color: primaryColor }} />
              <span className="text-xs font-mono font-semibold transition-colors" style={{ color: primaryColor }}>
                FULL-STACK / DATABASE
              </span>
              <h3 className="text-2xl font-bold text-white font-display mt-1">Tourism Management</h3>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-sm text-zinc-300 leading-relaxed">
                A comprehensive relational database platform for booking itineraries, passenger records, destination scheduling, billing, and automated invoice generations.
              </p>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border transition-colors" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>Python / Web</span>
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border transition-colors" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>MySQL</span>
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border transition-colors" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>Relational Schema</span>
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border transition-colors" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>CRUD Logic</span>
                </div>

                <div className="p-2.5 rounded-xl telemetry-block border border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>ARCHITECTURE</span>
                  <span className="font-bold transition-colors" style={{ color: primaryColor }}>SQL BACKED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
