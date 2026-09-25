import React, { useState, useEffect, useRef } from 'react';

interface FloatingProfileCornerProps {
  onOpenResume: () => void;
}

export const FloatingProfileCorner: React.FC<FloatingProfileCornerProps> = ({ onOpenResume }) => {
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
      title="Anish Kumar - Touch / Hover for Quick Profile"
      onClick={() => setPopupOpen(!popupOpen)}
    >
      {/* Interactive Corner Hover / Tap Popup */}
      <div
        className="corner-info-popup text-left"
        id="corner-popup"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2.5 pb-2.5 border-b border-zinc-800">
          <img
            src="profile.jpg"
            alt="Anish Kumar"
            className="w-8 h-8 rounded-full object-cover border border-yellow-400"
            style={{ objectPosition: 'center 36%' }}
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.hasFallenBack) {
                target.dataset.hasFallenBack = 'true';
                target.src = 'profile.svg';
              }
            }}
          />
          <div>
            <div className="text-xs font-bold text-white font-display leading-tight">ANISH KUMAR</div>
            <div className="text-[9px] font-mono text-yellow-400">React Dev & BMS Engineer</div>
          </div>
        </div>
        <div className="py-2 space-y-1.5 text-[11px] font-mono text-zinc-300">
          <div className="flex items-center gap-1.5">
            <i className="fa-solid fa-graduation-cap text-yellow-400 text-xs" />
            <span>MCA: 85% Distinction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <i className="fa-solid fa-briefcase text-red-400 text-xs" />
            <span>TCS BMS Operations</span>
          </div>
          <div className="flex items-center gap-1.5 text-yellow-300">
            <i className="fa-solid fa-passport text-xs" />
            <span>Valid Passport · Mobile</span>
          </div>
        </div>
        <button
          onClick={() => {
            setPopupOpen(false);
            onOpenResume();
          }}
          className="w-full mt-1 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-red-600/30"
        >
          VIEW FULL RESUME
        </button>
      </div>

      {/* Glowing Rim Container with Scale & Rotate Interaction */}
      <div className="profile-glow-ring">
        <div className="profile-orbit-halo" />
        <div className="profile-circle-crop">
          <img
            src="profile.jpg"
            alt="Anish Kumar"
            id="corner-profile-img"
            style={{ objectPosition: 'center 36%' }}
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.hasFallenBack) {
                target.dataset.hasFallenBack = 'true';
                target.src = 'profile.svg';
              }
            }}
          />
        </div>

        {/* Status Tag on Corner Image */}
        <div className="profile-corner-status">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
          <span>ANISH · AK</span>
        </div>
      </div>
    </div>
  );
};
