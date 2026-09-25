import React, { useState } from 'react';
import { Sparkles, FileText, Mail, Phone, ExternalLink, X, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FixedCornerAvatarProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const FixedCornerAvatar: React.FC<FixedCornerAvatarProps> = ({
  onOpenResume,
  onOpenContact,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <>
      {/* Critical Fixed Bottom-Right Corner Container */}
      <aside
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 100,
        }}
        aria-label="Anish Kumar interactive quick profile"
        className="group select-none"
      >
        {/* Floating Halo Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl scale-125 pointer-events-none group-hover:scale-150 group-hover:bg-cyan-400/40 transition-all duration-500" />

        {/* Outer Orbit Status Ring with Pulse Indicator */}
        <div className="absolute -top-1 -right-1 z-10 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#040711]" />
        </div>

        {/* The Interactive Circular Floating Avatar Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative block w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden p-0.5 border-2 border-cyan-400/80 shadow-[0_0_20px_rgba(0,242,254,0.45)] cursor-pointer transition-all duration-300 ease-out transform group-hover:scale-115 group-hover:-rotate-3 group-hover:border-cyan-300 group-hover:shadow-[0_0_35px_rgba(0,242,254,0.85)] animate-float focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#040711]"
          title="Click to view Anish Kumar's quick profile & credentials"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          {/* Inner Circular Frame */}
          <div className="w-full h-full rounded-full overflow-hidden bg-[#0d1527] relative">
            <img
              src={imgError ? "/profile.svg" : "/profile.jpg"}
              alt="Anish Kumar"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-[center_36%] transition-transform duration-500 group-hover:scale-110"
              loading="eager"
            />
            {/* Soft inner glass highlight overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/10 via-transparent to-white/20 pointer-events-none" />
          </div>
        </button>

        {/* Hover / Touch Quick Action Bubble */}
        <div className="hidden sm:block absolute bottom-full right-0 mb-3 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 whitespace-nowrap">
          <div className="px-3 py-1.5 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-cyan-500/40 shadow-xl shadow-cyan-500/10 text-xs text-zinc-200 flex items-center gap-1.5 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Click for Quick Dossier</span>
          </div>
        </div>
      </aside>

      {/* Expanded Quick Dossier Card on Click */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Executive Quick Dossier for Anish Kumar"
          className="fixed bottom-28 right-4 sm:right-8 z-[101] w-80 max-w-[calc(100vw-32px)] p-5 rounded-2xl bg-[#090e1d]/95 backdrop-blur-xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-zinc-200 animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors cursor-pointer"
            aria-label="Close dossier"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Dossier Header */}
          <div className="flex items-center gap-3 pb-3 border-b border-zinc-800">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-cyan-400 shrink-0">
              <img
                src={imgError ? "/profile.svg" : "/profile.jpg"}
                alt="Anish Kumar"
                className="w-full h-full object-cover object-[center_36%]"
              />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                <span>{PERSONAL_INFO.name}</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </h4>
              <p className="text-xs text-cyan-400 font-mono">React JS & BMS Engineer</p>
              <p className="text-[11px] text-zinc-400 font-mono mt-0.5">MCA 85% · TCS Facilities</p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 my-3 text-[11px] font-mono">
            <div className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">EXPERTISE</span>
              <span className="text-cyan-300 font-semibold">React + Python</span>
            </div>
            <div className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">RELOCATION</span>
              <span className="text-emerald-400 font-semibold">Passport Ready</span>
            </div>
          </div>

          {/* Direct CTA buttons */}
          <div className="space-y-2 pt-1">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-600/30 transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Open Executive Resume (PDF)</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 text-xs font-medium transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>Schedule Interview Screen</span>
            </button>
          </div>

          {/* Direct contact line */}
          <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <a
              href="tel:8668183926"
              className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>+91 8668183926</span>
            </a>
            <a
              href="mailto:anish03ak@gmail.com"
              className="hover:text-cyan-400 transition-colors"
            >
              Email Directly
            </a>
          </div>
        </div>
      )}
    </>
  );
};
