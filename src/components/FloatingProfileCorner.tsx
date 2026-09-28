import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FloatingProfileCornerProps {
  onOpenResume?: () => void;
}

export const FloatingProfileCorner: React.FC<FloatingProfileCornerProps> = ({ onOpenResume = () => {} }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const cornerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cornerRef.current && !cornerRef.current.contains(e.target as Node)) {
        setPopupOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div
      ref={cornerRef}
      className={`fixed-profile-corner ${popupOpen ? 'popup-open' : ''}`}
      id="floating-profile"
      title="Anish Kumar · Quick Profile & Resume"
      onClick={() => setPopupOpen(!popupOpen)}
    >
      {/* Interactive Corner Hover / Tap Popup */}
      <div
        className="corner-info-popup text-left"
        id="corner-popup"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 pb-2.5 border-b border-zinc-800">
          <img
            src="/profile.svg"
            alt="Anish Kumar"
            className="w-10 h-10 rounded-full object-cover border border-amber-400 bg-zinc-900 shrink-0"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.hasFallenBack) {
                target.dataset.hasFallenBack = 'true';
                target.src = '/profile.png';
              }
            }}
          />
          <div className="min-w-0">
            <div className="text-xs font-bold text-white font-name-stylish whitespace-nowrap">
              ANISH KUMAR
            </div>
            <div className="text-[10px] font-mono text-cyan-400 truncate">
              Software Developer &amp; BMS Engineer
            </div>
          </div>
        </div>

        <div className="py-2.5 space-y-2 text-[11px] font-mono text-zinc-300">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-graduation-cap text-cyan-400 text-xs w-4 text-center" />
            <span>MCA: 85% Distinction</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-briefcase text-indigo-400 text-xs w-4 text-center" />
            <span>BMS &amp; Facility Operations (Johnson Controls)</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-passport text-rose-400 text-xs w-4 text-center" />
            <span className="text-rose-300 font-semibold">Passport Ready</span>
          </div>
        </div>

        <div className="pt-2 border-t border-zinc-800 flex items-center justify-between gap-2">
          <button
            onClick={() => {
              setPopupOpen(false);
              onOpenResume();
            }}
            className="w-full py-1.5 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold font-mono text-[10px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-file-pdf" />
            <span>OPEN RESUME (PDF)</span>
          </button>
        </div>
      </div>

      {/* Profile Halo Ring & Avatar */}
      <div className="profile-glow-ring">
        <div className="profile-orbit-halo" />
        <div className="profile-circle-crop">
          <img
            src="/profile.svg"
            alt="Anish Kumar - Software Developer & BMS Operations Specialist"
            loading="eager"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.hasFallenBack) {
                target.dataset.hasFallenBack = 'true';
                target.src = '/profile.png';
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
