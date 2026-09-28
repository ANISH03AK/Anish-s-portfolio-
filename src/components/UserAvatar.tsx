import React, { useState, useEffect, useRef } from 'react';
import { AnishPortraitSVG } from './AnishPortraitSVG';

interface UserAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'rounded';
  className?: string;
  showStatusIndicator?: boolean;
  allowUpload?: boolean;
  altText?: string;
  onImageUpdated?: (newUrl: string) => void;
}

const sizeClasses = {
  xs: 'w-7 h-7 text-[10px]',
  sm: 'w-9 h-9 text-xs',
  md: 'w-11 h-11 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
  '2xl': 'w-28 h-28 text-2xl'
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  size = 'md',
  shape = 'circle',
  className = '',
  showStatusIndicator = false,
  allowUpload = true,
  altText = 'Anish Kumar',
  onImageUpdated
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [useFallbackPortrait, setUseFallbackPortrait] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if user uploaded a custom avatar in localStorage
    try {
      const savedCustom = localStorage.getItem('user_custom_avatar');
      if (savedCustom) {
        setImageSrc(savedCustom);
        setUseFallbackPortrait(false);
      } else {
        // Default to the custom high-detail portrait of Anish directly
        setUseFallbackPortrait(true);
      }
    } catch (e) {
      setUseFallbackPortrait(true);
    }

    const handleCustomAvatarUpdated = () => {
      try {
        const saved = localStorage.getItem('user_custom_avatar');
        if (saved) {
          setImageSrc(saved);
          setUseFallbackPortrait(false);
        } else {
          setUseFallbackPortrait(true);
        }
      } catch (e) {}
    };

    window.addEventListener('userAvatarUpdated', handleCustomAvatarUpdated);
    return () => window.removeEventListener('userAvatarUpdated', handleCustomAvatarUpdated);
  }, []);

  const handleImageError = () => {
    // If the image fails to load, gracefully show the handsome custom vector portrait of Anish
    setUseFallbackPortrait(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        try {
          localStorage.setItem('user_custom_avatar', base64);
          setImageSrc(base64);
          setUseFallbackPortrait(false);
          window.dispatchEvent(new Event('userAvatarUpdated'));
          if (onImageUpdated) onImageUpdated(base64);
        } catch (err) {
          console.error('Failed to save avatar to localStorage:', err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const currentSizeClass = sizeClasses[size];
  const roundedClass = shape === 'circle' ? 'rounded-full' : 'rounded-2xl';

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <div
        className={`${currentSizeClass} ${roundedClass} overflow-hidden bg-slate-900 border-2 border-slate-200/90 shadow-sm relative flex items-center justify-center select-none group`}
      >
        {!useFallbackPortrait && imageSrc ? (
          <img
            src={imageSrc}
            alt={altText}
            onError={handleImageError}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          /* High-detail authentic vector portrait of Anish Kumar (no generic text letters) */
          <AnishPortraitSVG className="w-full h-full" />
        )}

        {/* Upload Overlay Button - Click to choose photo */}
        {allowUpload && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            title="Upload your photo (Select IMG_20260904_140606_442.jpg)"
            className={`absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white ${roundedClass} cursor-pointer z-10`}
          >
            <i className="fa-solid fa-camera text-xs sm:text-sm text-yellow-300 drop-shadow" />
            <span className="text-[7px] sm:text-[9px] font-mono mt-0.5 tracking-wider uppercase font-bold text-white">
              PHOTO
            </span>
          </button>
        )}
      </div>

      {allowUpload && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
      )}

      {/* Online Telemetry Status Indicator */}
      {showStatusIndicator && (
        <span
          className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white bg-emerald-500 animate-pulse shadow-xs z-10"
          title="Online & Ready for Relocation"
        />
      )}
    </div>
  );
};
