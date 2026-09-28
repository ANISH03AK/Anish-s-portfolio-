import React from 'react';

export const ModernBackground: React.FC = () => {
  return (
    <div
      id="modern-portfolio-background"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#090d16]"
      aria-hidden="true"
    >
      {/* Subtle radial ambient light top-center */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-20 pointer-events-none blur-[140px]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.45) 0%, rgba(30, 27, 75, 0.2) 50%, transparent 80%)'
        }}
      />

      {/* Extremely subtle secondary glow near right edge */}
      <div
        className="absolute top-1/3 -right-48 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none blur-[160px]"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, transparent 70%)'
        }}
      />

      {/* Understated modern micro-dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.7) 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      {/* Subtle bottom gradient vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 60%, rgba(7, 10, 19, 0.6) 100%)'
        }}
      />
    </div>
  );
};
