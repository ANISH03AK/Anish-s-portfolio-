import React from 'react';
import { EDUCATION_DATA } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 border-t border-slate-800/60 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14" data-aos="fade-up">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans mt-2">
            Engineering Background & Education
          </h2>
          <p className="text-slate-400 text-base mt-3 leading-relaxed">
            Bridging modern web development with critical high-availability infrastructure operations.
          </p>
        </div>

        {/* 2-Column Clean Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Short Narrative & Professional Direction (7 cols) */}
          <div className="lg:col-span-7 space-y-6" data-aos="fade-up" data-aos-delay="100">
            <div className="p-7 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-white">
                Who I Am
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                I am a Software Developer and Critical BMS Operations Engineer based in Chennai, India. I hold a Master of Computer Applications (MCA) with <strong className="text-white">85% academic distinction</strong> from Meenakshi Ramasamy College (Bharathidasan University).
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                My software focus centers on engineering responsive, performant user interfaces with <strong className="text-blue-400">React JS</strong>, developing backend logic and neural network models in <strong className="text-blue-400">Python</strong>, and managing relational databases with <strong className="text-blue-400">SQL</strong>. I built and deployed <span className="text-white">Dexter Men's Wear</span>, an active production e-commerce application on Vercel.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Concurrently, I bring hands-on experience in enterprise campus facility engineering at <strong className="text-white">Tata Consultancy Services (TCS)</strong> (via Johnson Controls), maintaining 24/7 Building Management Systems (Metasys), Fire Alarm networks, and critical data room infrastructure with zero operational downtime.
              </p>
            </div>

            {/* Small Highlight Statistics / Facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-center">
                <div className="text-2xl font-bold text-white font-mono">85%</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">MCA Distinction</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-center">
                <div className="text-2xl font-bold text-blue-400 font-mono">TCS</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Facility BMS</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-center">
                <div className="text-2xl font-bold text-white font-mono">3+</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Shipped Projects</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-center">
                <div className="text-2xl font-bold text-emerald-400 font-mono">
                  <i className="fa-solid fa-passport text-lg" />
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Passport Ready</div>
              </div>
            </div>
          </div>

          {/* Right Column: Education Milestones (5 cols) */}
          <div className="lg:col-span-5 space-y-4" data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Academic Background
            </h3>

            {EDUCATION_DATA.map((edu, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="font-semibold text-blue-400">Score: {edu.score}</span>
                  <span className="text-slate-500">{edu.period}</span>
                </div>
                <h4 className="text-base font-bold text-white">{edu.degree}</h4>
                <p className="text-xs font-medium text-slate-300 mt-0.5">{edu.institution}</p>
                {edu.description && (
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{edu.description}</p>
                )}
              </div>
            ))}

            {/* Passport & Mobility Note */}
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-slate-300 flex items-start gap-3">
              <i className="fa-solid fa-plane-departure text-blue-400 text-sm mt-0.5" />
              <div>
                <span className="font-semibold text-white">Global Relocation Ready</span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Valid Indian passport holder with clean credentials, prepared for immediate onsite deployment and work permits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
