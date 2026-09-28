import React from 'react';

interface AnishPortraitSVGProps {
  className?: string;
  size?: number | string;
}

/**
 * Detailed vector portrait of Anish Kumar based on his reference photo (IMG_20260904_140606_442.jpg):
 * - Thick dark styled black hair
 * - Warm tone complexion
 * - Friendly eyes and eyebrows
 * - Subtle neat mustache and chin goatee
 * - Blue collared button-down shirt over white inner collar
 * - Soft outdoor nature ambient glow
 */
export const AnishPortraitSVG: React.FC<AnishPortraitSVGProps> = ({ className = '', size = '100%' }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Background gradient resembling natural outdoor soft lighting */}
        <linearGradient id="outdoorBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        {/* Skin Tone Gradient */}
        <linearGradient id="skinTone" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e0a97a" />
          <stop offset="70%" stopColor="#cf9666" />
          <stop offset="100%" stopColor="#ba8153" />
        </linearGradient>

        {/* Hair gradient */}
        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>

        {/* Denim / Blue Shirt Gradient */}
        <linearGradient id="blueShirt" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="40%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>

        {/* Shadow */}
        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Circular Background */}
      <circle cx="100" cy="100" r="98" fill="url(#outdoorBg)" />

      {/* Ambient background plant/light soft bokeh */}
      <circle cx="35" cy="45" r="30" fill="#86efac" opacity="0.25" />
      <circle cx="165" cy="50" r="35" fill="#93c5fd" opacity="0.2" />

      {/* Shoulders / Torso - Wearing Blue Collared Shirt */}
      <g id="clothing">
        {/* White inner t-shirt */}
        <path d="M78 140 Q100 156 122 140 L124 200 L76 200 Z" fill="#f8fafc" />

        {/* Blue Shirt Body */}
        <path
          d="M32 200 C32 165 60 144 82 140 L100 152 L118 140 C140 144 168 165 168 200 Z"
          fill="url(#blueShirt)"
          filter="url(#softShadow)"
        />

        {/* Left Shirt Collar */}
        <path
          d="M74 138 L95 162 L100 148 L86 134 Z"
          fill="#1d4ed8"
          stroke="#1e40af"
          strokeWidth="1.2"
        />

        {/* Right Shirt Collar */}
        <path
          d="M126 138 L105 162 L100 148 L114 134 Z"
          fill="#2563eb"
          stroke="#1d4ed8"
          strokeWidth="1.2"
        />

        {/* Center Placket / Buttons */}
        <line x1="100" y1="162" x2="100" y2="200" stroke="#172554" strokeWidth="2.5" />
        <circle cx="100" cy="175" r="2.2" fill="#e2e8f0" />
        <circle cx="100" cy="192" r="2.2" fill="#e2e8f0" />
      </g>

      {/* Neck */}
      <g id="neck">
        <path d="M84 115 L84 145 Q100 152 116 145 L116 115 Z" fill="#c48a5b" />
        {/* Neck shadow under jaw */}
        <path d="M84 116 Q100 134 116 116 Q100 124 84 116 Z" fill="#a77045" opacity="0.6" />
      </g>

      {/* Head / Face */}
      <g id="head">
        {/* Ears */}
        <path d="M60 88 C55 88 56 106 63 104 Z" fill="#cf9666" />
        <path d="M140 88 C145 88 144 106 137 104 Z" fill="#cf9666" />

        {/* Face Shape */}
        <path
          d="M62 82 C62 55 76 44 100 44 C124 44 138 55 138 82 C138 108 122 125 100 125 C78 125 62 108 62 82 Z"
          fill="url(#skinTone)"
        />

        {/* Eyebrows */}
        <path d="M72 74 Q84 70 91 74" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M109 74 Q116 70 128 74" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Eyes */}
        <ellipse cx="82" cy="82" rx="4.5" ry="3.5" fill="#090d16" />
        <circle cx="83.5" cy="80.5" r="1.3" fill="#ffffff" />

        <ellipse cx="118" cy="82" rx="4.5" ry="3.5" fill="#090d16" />
        <circle cx="119.5" cy="80.5" r="1.3" fill="#ffffff" />

        {/* Nose */}
        <path d="M99 78 L97 96 L103 96" stroke="#b47b4d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Subtle Mustache - based on photo */}
        <path
          d="M87 104 Q94 102 99 104 Q100 102 101 104 Q106 102 113 104 Q100 108 87 104 Z"
          fill="#1e293b"
          opacity="0.85"
        />

        {/* Smile / Mouth */}
        <path d="M89 110 Q100 116 111 110" stroke="#883b3b" strokeWidth="2.2" strokeLinecap="round" fill="none" />

        {/* Chin Goatee - based on photo */}
        <path
          d="M96 119 Q100 122 104 119 Q100 124 96 119 Z"
          fill="#1e293b"
          opacity="0.8"
        />
      </g>

      {/* Styled Hair - Thick, Dark, Brushed up/side as in photo */}
      <g id="hair">
        <path
          d="M58 80 C56 62 64 42 78 36 C88 32 102 31 116 33 C130 36 142 45 142 64 C142 75 140 82 138 82 C135 68 130 52 120 48 C108 44 88 45 74 54 C66 60 62 70 58 80 Z"
          fill="url(#hairGrad)"
        />
        {/* Hair volume on top */}
        <path
          d="M72 40 C80 30 100 28 116 32 C126 35 132 40 134 46 C124 38 106 36 90 40 C82 42 76 45 72 40 Z"
          fill="#334155"
        />
        {/* Sideburns */}
        <path d="M62 76 L62 88 L65 84 Z" fill="#0f172a" />
        <path d="M138 76 L138 88 L135 84 Z" fill="#0f172a" />
      </g>

      {/* Outer border ring */}
      <circle cx="100" cy="100" r="98" fill="none" stroke="#3b82f6" strokeWidth="3" opacity="0.5" />
    </svg>
  );
};
