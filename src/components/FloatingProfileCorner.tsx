import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FloatingProfileCornerProps {
  onOpenResume?: () => void;
}

export const FloatingProfileCorner: React.FC<FloatingProfileCornerProps> = ({ onOpenResume = () => {} }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [isVisibleAtTop, setIsVisibleAtTop] = useState(true);
  const photoUrl = '/profile.jpg?v=3';

  const cornerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      // Show when at the top (scrollY <= 80px), hide smoothly when scrolled down
      if (scrollY > 80) {
        setIsVisibleAtTop(false);
        setPopupOpen(false); // Close popup if open when user scrolls down
      } else {
        setIsVisibleAtTop(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cornerRef.current && !cornerRef.current.contains(e.target as Node)) {
        setPopupOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPopupOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={cornerRef}
      className={`fixed-profile-corner ${popupOpen ? 'popup-open' : ''} ${!isVisibleAtTop ? 'corner-hidden' : ''}`}
      id="floating-profile"
      title={popupOpen ? 'Click to close details' : 'Click to view Anish Kumar details'}
      onClick={() => setPopupOpen(!popupOpen)}
    >
        {/* Interactive Details Popup Card */}
        <div
          className="corner-info-popup text-left"
          id="corner-popup"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Avatar, Name, and Close Button */}
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <img
                  src={photoUrl}
                  alt="Anish Kumar professional profile photo"
                  className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400 bg-zinc-900 shadow-md"
                  style={{ objectPosition: 'center 30%' }}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.hasFallenBack) {
                      target.dataset.hasFallenBack = 'true';
                      target.src = '/profile.png?v=3';
                    } else if (!target.dataset.hasFallenBack2) {
                      target.dataset.hasFallenBack2 = 'true';
                      target.src = '/profile.svg';
                    }
                  }}
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#070a12] shadow-sm animate-pulse" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white font-name-stylish whitespace-nowrap">
                    ANISH KUMAR
                  </span>
                  <span className="text-[10px] text-cyan-400" title="Verified Profile">
                    <i className="fa-solid fa-circle-check text-[11px]" />
                  </span>
                </div>
                <div className="text-[11px] font-mono text-cyan-400 truncate">
                  Software Developer &amp; BMS Engineer
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setPopupOpen(false)}
              className="text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800/80 transition-colors cursor-pointer shrink-0"
              title="Close details"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>
          </div>

          {/* Core Qualifications & Career Details */}
          <div className="py-3 space-y-2.5 text-[11px] font-mono text-zinc-300">
            <div className="flex items-start gap-2.5">
              <i className="fa-solid fa-graduation-cap text-cyan-400 text-xs w-4 text-center mt-0.5" />
              <span>
                <strong className="text-white">MCA: 85% Distinction</strong>
                <span className="block text-[10px] text-zinc-400">Meenakshi Ramasamy Engg. College</span>
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <i className="fa-solid fa-building text-indigo-400 text-xs w-4 text-center mt-0.5" />
              <span>
                <strong className="text-white">TCS BMS Operations</strong>
                <span className="block text-[10px] text-zinc-400">Via Johnson Controls (Sept 2025–Present)</span>
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <i className="fa-solid fa-location-dot text-amber-400 text-xs w-4 text-center mt-0.5" />
              <span>
                <strong className="text-white">Chennai, India</strong>
                <span className="block text-[10px] text-zinc-400">Anna Nagar West, 600040</span>
              </span>
            </div>
            <div className="flex items-center gap-2.5 pt-0.5">
              <i className="fa-solid fa-passport text-rose-400 text-xs w-4 text-center" />
              <span className="text-rose-300 font-semibold">Passport Active &amp; Ready</span>
            </div>
          </div>

          {/* Quick Actions Footer */}
          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2 px-2.5 rounded-lg bg-[#0077b5]/20 hover:bg-[#0077b5] text-[#38bdf8] hover:text-white border border-[#0077b5]/50 font-bold font-mono text-[10px] flex items-center justify-center gap-1.5 transition-all shadow-sm"
              title="Connect with Anish Kumar on LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in text-xs" />
              <span>LINKEDIN</span>
            </a>
            <button
              onClick={() => {
                setPopupOpen(false);
                onOpenResume();
              }}
              className="flex-1 py-2 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold font-mono text-[10px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <i className="fa-solid fa-file-pdf" />
              <span>RESUME (PDF)</span>
            </button>
          </div>
        </div>

        {/* Cyber-Holographic Arc-Reactor Floating Logo System */}
        <div className="profile-floating-wrapper">
          {/* Pulsing Ambient Aurora Core */}
          <div className="profile-ambient-aura" />

          {/* Counter-Spinning Outer HUD Dial with 3 Orbiting Plasma Satellites */}
          <div className="profile-outer-dial">
            <div className="satellite-dot satellite-dot-1" />
            <div className="satellite-dot satellite-dot-2" />
            <div className="satellite-dot satellite-dot-3" />
          </div>

          {/* Clockwise Flowing High-Speed Dotted Laser Ring */}
          <div className="profile-orbit-inner" />

          {/* Flowing Conic Gradient Animated Neon Border */}
          <div className="profile-flowing-conic-border">
            {/* Inner Crop & High-Fidelity Logo */}
            <div className="profile-circle-crop">
              {/* Animated Biometric Laser Scanner Sweep */}
              <div className="profile-laser-scanner" />

              <img
                src={photoUrl}
                alt="Anish Kumar professional profile photo - Software Developer & BMS Operations Specialist"
                className="profile-logo-img"
                loading="eager"
                style={{ objectPosition: 'center 30%' }}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.hasFallenBack) {
                    target.dataset.hasFallenBack = 'true';
                    target.src = '/profile.png?v=3';
                  } else if (!target.dataset.hasFallenBack2) {
                    target.dataset.hasFallenBack2 = 'true';
                    target.src = '/profile.svg';
                  }
                }}
              />
              {/* Luminous Glass Sheen Glare */}
              <div className="profile-glass-glare" />
            </div>
          </div>
        </div>
      </div>
  );
};
