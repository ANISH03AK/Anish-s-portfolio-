import React from 'react';
import { ArrowUp, Globe, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon } from './icons/GithubIcon';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-zinc-800/80 bg-[#04060c] text-xs text-zinc-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Passport Relocation Readiness Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#091122]/80 border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 shrink-0">
              <Globe className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                  INTERNATIONAL RELOCATION READY
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-semibold">
                  VALID INDIAN PASSPORT
                </span>
              </div>
              <p className="text-xs text-zinc-300 mt-1">
                Possesses a valid Indian Passport and active police verification clearance. Immediate readiness for global software engineering assignments, onsite relocations, and hybrid enterprise deployments.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenResume}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-600/30 cursor-pointer"
            >
              Verify Credentials (PDF)
            </button>
          </div>
        </div>

        {/* Footer Navigation & Contact Columns */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-zinc-900">
          {/* Brand & Identity */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span className="font-extrabold text-sm text-white tracking-tight">
              {PERSONAL_INFO.name}
            </span>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <span className="text-zinc-400 font-mono text-[11px]">
              MCA Graduate (85%) · React JS & BMS Systems Engineer
            </span>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-zinc-400">
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
            <a href="#education" className="hover:text-cyan-400 transition-colors">Education & Awards</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#interview-faq" className="hover:text-cyan-400 transition-colors">STAR Interview Q&A</a>
            <button
              onClick={onOpenResume}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Resume (PDF)
            </button>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer text-xs font-mono"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>TOP // 0PX</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
