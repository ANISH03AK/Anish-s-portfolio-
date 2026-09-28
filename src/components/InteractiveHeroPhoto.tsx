import React, { useState, useEffect, useRef } from 'react';

interface InteractiveHeroPhotoProps {
  className?: string;
}

export const InteractiveHeroPhoto: React.FC<InteractiveHeroPhotoProps> = ({ className = '' }) => {
  const [photoSrc, setPhotoSrc] = useState<string>('/src/assets/profile.jpg');
  const [transformStyle, setTransformStyle] = useState<string>('perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load custom photo if saved in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('user_custom_avatar');
      if (saved) {
        setPhotoSrc(saved);
      }
    } catch (e) {}

    const handleAvatarUpdate = () => {
      try {
        const saved = localStorage.getItem('user_custom_avatar');
        if (saved) setPhotoSrc(saved);
      } catch (e) {}
    };

    window.addEventListener('userAvatarUpdated', handleAvatarUpdate);
    return () => window.removeEventListener('userAvatarUpdated', handleAvatarUpdate);
  }, []);

  // Handle local file upload directly from device
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        try {
          localStorage.setItem('user_custom_avatar', result);
          setPhotoSrc(result);
          window.dispatchEvent(new Event('userAvatarUpdated'));
        } catch (err) {
          setPhotoSrc(result);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Interactive mouse tracking with subtle tilt & parallax
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    let rafId: number;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let targetTranslateX = 0;
    let targetTranslateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let currentTranslateX = 0;
    let currentTranslateY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from center (-1 to 1)
      const normX = (e.clientX - centerX) / (window.innerWidth / 2);
      const normY = (e.clientY - centerY) / (window.innerHeight / 2);

      // Subtle professional range: tilt max 7deg, parallax max 12px
      targetRotateY = Math.max(-7, Math.min(7, normX * 7));
      targetRotateX = Math.max(-7, Math.min(7, -normY * 7));
      targetTranslateX = Math.max(-12, Math.min(12, normX * 12));
      targetTranslateY = Math.max(-12, Math.min(12, normY * 12));
    };

    const handleMouseLeave = () => {
      targetRotateX = 0;
      targetRotateY = 0;
      targetTranslateX = 0;
      targetTranslateY = 0;
    };

    const animate = () => {
      // Smooth interpolation (lerp)
      currentRotateX += (targetRotateX - currentRotateX) * 0.1;
      currentRotateY += (targetRotateY - currentRotateY) * 0.1;
      currentTranslateX += (targetTranslateX - currentTranslateX) * 0.1;
      currentTranslateY += (targetTranslateY - currentTranslateY) * 0.1;

      setTransformStyle(
        `perspective(1000px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) translate3d(${currentTranslateX.toFixed(1)}px, ${currentTranslateY.toFixed(1)}px, 0)`
      );

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hidden file input for 1-click replacing photo from local device */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Modern Circular Frame Container with Smooth Floating Animation */}
      <div
        className="relative group transition-all duration-300 ease-out"
        style={{
          transform: transformStyle
        }}
      >
        {/* Subtle Ambient Outer Ring & Glow */}
        <div
          className={`absolute -inset-2 sm:-inset-3 rounded-full bg-gradient-to-tr from-blue-600/20 via-indigo-500/15 to-transparent blur-md transition-opacity duration-500 ${
            isHovered ? 'opacity-90' : 'opacity-60'
          }`}
        />

        {/* Circular Framing Shell */}
        <div
          className={`relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-92 lg:h-92 rounded-full p-1.5 sm:p-2 bg-slate-900 border border-slate-800 shadow-2xl transition-all duration-300 ${
            isHovered ? 'scale-[1.02] shadow-blue-900/20' : 'scale-100'
          }`}
        >
          {/* Inner Photo Container with Gentle Floating Animation */}
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 relative animate-gentle-float">
            <img
              src={photoSrc}
              alt="Anish Kumar"
              onError={() => {
                // Fallback to /profile.jpg or /profile.png if src/assets path varies
                if (photoSrc !== '/profile.jpg') {
                  setPhotoSrc('/profile.jpg');
                } else if (photoSrc !== '/profile.png') {
                  setPhotoSrc('/profile.png');
                }
              }}
              className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
            />

            {/* Quick Upload / Replace Photo Overlay Button on Hover */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white cursor-pointer z-20 gap-1.5"
              title="Click to select your personal photograph"
              aria-label="Upload personal photo"
            >
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md">
                <i className="fa-solid fa-camera text-sm" />
              </div>
              <span className="text-xs font-mono font-semibold tracking-wide text-slate-100">
                Replace Photo
              </span>
            </button>
          </div>
        </div>

        {/* Subtle Status Pill Tag */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-[11px] font-mono text-slate-300 shadow-lg flex items-center gap-2 whitespace-nowrap z-20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-white">Anish Kumar</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">Available</span>
        </div>
      </div>
    </div>
  );
};
