import React from 'react';
import { ColorTheme } from '../data/colorThemes';

interface SectionDividerProps {
  theme?: ColorTheme;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ theme }) => {
  const primaryColor = theme?.primary || '#06b6d4';
  const secondaryColor = theme?.secondary || '#6366f1';
  const accentColor = theme?.accent || '#f43f5e';

  return (
    <div className="relative w-full overflow-hidden py-2 z-20 select-none" aria-hidden="true">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-center">
        {/* Subtle Background Rail */}
        <div className="absolute inset-x-4 sm:inset-x-8 h-[1px] bg-zinc-800/40" />

        {/* Animated Fluid Gradient Flow Line */}
        <div
          className="relative w-full h-[1.5px] animated-divider-line rounded-full opacity-75 sm:opacity-85 hover:opacity-100 transition-opacity"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${primaryColor}30 18%, ${secondaryColor}95 50%, ${accentColor}70 82%, transparent 100%)`
          }}
        />

        {/* Ambient Center Glow Blur */}
        <div
          className="absolute w-28 h-4 rounded-full blur-md pointer-events-none -translate-y-1/2 top-1/2 transition-colors duration-500"
          style={{
            backgroundColor: secondaryColor,
            opacity: 0.28
          }}
        />

        {/* Center Glowing Accent Diamond Node */}
        <div
          className="absolute divider-center-node w-2 h-2 rounded-[1.5px] border shadow-md transition-all duration-500"
          style={{
            backgroundColor: primaryColor,
            borderColor: secondaryColor,
            boxShadow: `0 0 10px ${primaryColor}90`
          }}
        />
      </div>
    </div>
  );
};
