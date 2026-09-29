import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FloatingProfileCornerProps {
  onOpenResume?: () => void;
}

export const FloatingProfileCorner: React.FC<FloatingProfileCornerProps> = ({ onOpenResume = () => {} }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [isVisibleAtTop, setIsVisibleAtTop] = useState(true);
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    return localStorage.getItem('anish_profile_photo') || '/profile.jpg?v=3';
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const cornerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Handle User Photo File Selection
  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('Please choose an image under 8MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          setPhotoUrl(dataUrl);
          try {
            localStorage.setItem('anish_profile_photo', dataUrl);
          } catch {
            // Storage quota fallback
          }
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 3000);
          window.dispatchEvent(new Event('profilePhotoUpdated'));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = () => {
    localStorage.removeItem('anish_profile_photo');
    setPhotoUrl('/profile.jpg?v=3');
    window.dispatchEvent(new Event('profilePhotoUpdated'));
  };

  const isCustomPhoto = photoUrl.startsWith('data:');

  return (
    <div
      ref={cornerRef}
      className={`fixed-profile-corner ${popupOpen ? 'popup-open' : ''} ${!isVisibleAtTop ? 'corner-hidden' : ''}`}
      id="floating-profile"
      title="Anish Kumar · Quick Profile & Resume"
      onClick={() => setPopupOpen(!popupOpen)}
    >
      {/* Hidden File Input for Real Photo Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        className="hidden"
        onChange={handlePhotoFileChange}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Interactive Corner Hover / Tap Popup */}
      <div
        className="corner-info-popup text-left"
        id="corner-popup"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 pb-2.5 border-b border-zinc-800">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()} title="Click to upload your real photo">
            <img
              src={photoUrl}
              alt="Anish Kumar"
              className="w-11 h-11 rounded-full object-cover border border-amber-400 bg-zinc-900 shrink-0"
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
            {/* Quick Camera Hover Overlay on Avatar */}
            <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <i className="fa-solid fa-camera text-xs text-amber-300" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-bold text-white font-name-stylish whitespace-nowrap">
                ANISH KUMAR
              </span>
              {isCustomPhoto && (
                <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                  <i className="fa-solid fa-circle-check text-[8px]" /> Active
                </span>
              )}
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

        {/* Real Photo Quick Setting Action Button */}
        <div className="pt-2 border-t border-zinc-800 space-y-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-1.5 px-2.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 hover:text-white border border-cyan-500/40 font-bold font-mono text-[10px] flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <i className="fa-solid fa-camera" />
              <span>{isCustomPhoto ? 'CHANGE REAL PHOTO' : 'SET REAL PHOTO'}</span>
            </button>
            {isCustomPhoto && (
              <button
                onClick={handleResetPhoto}
                className="py-1.5 px-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-rose-400 border border-zinc-700 font-mono text-[10px] transition-colors"
                title="Reset to default logo"
              >
                <i className="fa-solid fa-rotate-left" />
              </button>
            )}
          </div>

          {uploadSuccess && (
            <div className="text-[10px] font-mono text-emerald-400 text-center animate-pulse">
              ✓ Real photo updated successfully!
            </div>
          )}

          <div className="flex items-center justify-between gap-2">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="py-1.5 px-2.5 rounded-lg bg-[#0077b5]/20 hover:bg-[#0077b5] text-[#38bdf8] hover:text-white border border-[#0077b5]/50 font-bold font-mono text-[10px] flex items-center justify-center gap-1.5 transition-all shadow-sm"
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
              className="flex-1 py-1.5 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold font-mono text-[10px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <i className="fa-solid fa-file-pdf" />
              <span>RESUME (PDF)</span>
            </button>
          </div>
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
              alt="Anish Kumar - Software Developer & BMS Operations Specialist"
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
