import React from 'react';

interface TechBrandLogoProps {
  name: string;
  className?: string;
  size?: number;
}

export const TechBrandLogo: React.FC<TechBrandLogoProps> = ({ name, className = '', size = 28 }) => {
  const norm = name.trim().toLowerCase();

  // 1. PYTHON - Official Python Software Foundation logo
  if (norm === 'python') {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <path fill="#3776AB" d="M63.3 3.3c-28.7 0-26.9 12.4-26.9 12.4l.1 12.9h27.4v3.9H25.3S3.3 30.1 3.3 64.6c0 34.6 19.3 33.4 19.3 33.4h11.5v-16.2s-.6-19.3 19-19.3h27.1s18.2.3 18.2-17.7V21s2.7-17.7-35.1-17.7zm-14.7 9.8c3.4 0 6.1 2.7 6.1 6.1s-2.7 6.1-6.1 6.1-6.1-2.7-6.1-6.1 2.7-6.1 6.1-6.1z" />
        <path fill="#FFD438" d="M64.7 124.7c28.7 0 26.9-12.4 26.9-12.4l-.1-12.9H64.1v-3.9h38.6s22 2.4 22-32.1c0-34.6-19.3-33.4-19.3-33.4h-11.5v16.2s.6 19.3-19 19.3H47.8s-18.2-.3-18.2 17.7V107s-2.7 17.7 35.1 17.7zm14.7-9.8c-3.4 0-6.1-2.7-6.1-6.1s2.7-6.1 6.1-6.1 6.1 2.7 6.1 6.1-2.7 6.1-6.1 6.1z" />
      </svg>
    );
  }

  // 2. JAVASCRIPT - Official JS Foundation yellow badge
  if (norm === 'javascript' || norm === 'js') {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="16" fill="#F7DF1E" />
        <path fill="#000000" d="M67.3 100.9c2.8 4.7 6.5 8.1 13.2 8.1 5.6 0 9.2-2.8 9.2-6.6 0-4.6-3.7-6.3-9.9-8.9l-3.4-1.5c-9.9-4.2-16.4-9.5-16.4-20.7 0-10.3 7.9-18.1 20.3-18.1 8.8 0 15.1 3.1 19.4 10.7l-9.5 6.1c-2.1-3.7-4.4-5.2-9.9-5.2-4.5 0-7.3 2.8-7.3 5.9 0 4.1 2.9 5.8 8.4 8.2l3.4 1.5c11.6 4.9 18.1 10.2 18.1 21.6 0 12.3-9.7 19.2-22.6 19.2-12.7 0-20.7-6.1-24.8-14.2l9.8-5.6zM24.7 101.9l9.3-5.7c1.9 3.4 3.7 6.2 7.7 6.2 4.1 0 6.7-1.6 6.7-7.8V53.8h11.9v41.1c0 12.7-7.4 18.4-18.4 18.4-10 0-15.6-5.1-17.2-11.4z" />
      </svg>
    );
  }

  // 3. REACT JS - Official React Atom Logo
  if (norm === 'react js' || norm === 'react' || norm === 'react.js') {
    return (
      <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // 4. REACT NATIVE - Mobile atom
  if (norm === 'react native') {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect x="24" y="8" width="80" height="112" rx="14" fill="#0f172a" stroke="#61DAFB" strokeWidth="4" />
        <rect x="46" y="16" width="36" height="4" rx="2" fill="#61DAFB" opacity="0.6" />
        <circle cx="64" cy="110" r="4" fill="#61DAFB" />
        <g transform="translate(64, 64) scale(2.8)">
          <circle cx="0" cy="0" r="1.8" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="0.8" fill="none">
            <ellipse rx="9" ry="3.5" />
            <ellipse rx="9" ry="3.5" transform="rotate(60)" />
            <ellipse rx="9" ry="3.5" transform="rotate(120)" />
          </g>
        </g>
      </svg>
    );
  }

  // 5. SQL & MYSQL - Official Dolphin & SQL database
  if (norm === 'sql' || norm === 'mysql') {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="16" fill="#00758F" />
        <path fill="#F29111" d="M106.8 61.2c-3.2-1.9-8.4-3.1-13.6-2.5-4.4.5-9.3 2.4-13.1 5.3-7.5 5.8-9.8 14.5-12.7 23.3-1.6 4.9-3.9 10-7.8 13.3-3.4 2.8-7.8 4.2-12.2 4.4-6.4.3-12.8-2.2-17.5-6.6-4.6-4.3-7.3-10.4-7.4-16.7-.1-8.1 4.5-15.8 11.3-20.1 5.7-3.6 12.6-4.9 19.3-4.7 4.2.1 8.5.8 12.5 2.1 1.7.5 3.5 1.3 5.3 1.3 1.4 0 2.8-.8 3.5-2 1.3-2.1.8-4.9-.9-6.7-5.5-5.9-13.4-9.6-21.5-10.3-9-.8-18.1 1.8-25.2 7.4-7.6 6-12.4 15-13.2 24.7-.9 10.4 3 20.9 10.5 28.2 7.6 7.4 18.2 11.1 28.8 10 9.8-1 18.9-6.9 24.3-15.1 3.5-5.3 5.6-11.6 8.3-17.3 2.1-4.4 4.8-8.7 8.9-11.4 3.9-2.6 8.7-3.6 13.3-3.2 1.8.2 4.2 1.1 5.5-.3.9-.9.8-2.6-.4-3.4z" />
        <text x="64" y="44" fill="#ffffff" fontFamily="sans-serif" fontWeight="900" fontSize="24" textAnchor="middle" letterSpacing="1">SQL</text>
      </svg>
    );
  }

  // 6. HTML5 - Official W3C Orange Shield
  if (norm === 'html5' || norm === 'html') {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <path fill="#E34F26" d="M19.3 115.1L8.1 0h111.8l-11.2 115.1-44.7 12.9z" />
        <path fill="#EF652A" d="M64 117.1l36.3-10.4 9.1-93.7H64z" />
        <path fill="#ECECEC" d="M64 52.4h19.8l-1.4 15.7H64v15.6h17.9l-1.7 19.3-16.2 4.4V123l31-8.6 4.1-46.3H64zm0-24.9h40.9l1.4-15.7H64z" />
        <path fill="#FFFFFF" d="M64 52.4H44.2l-1.4-15.7H64V21.1H25.3l4.1 47h34.6zm0 43.1l-16.2-4.4-1-11.4H31.2l2 22.7 30.8 8.6z" />
      </svg>
    );
  }

  // 7. CSS3 - Official W3C Blue Shield
  if (norm === 'css3' || norm === 'css') {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <path fill="#1572B6" d="M19.3 115.1L8.1 0h111.8l-11.2 115.1-44.7 12.9z" />
        <path fill="#33A9DC" d="M64 117.1l36.3-10.4 9.1-93.7H64z" />
        <path fill="#ECECEC" d="M64 52.5h18.8l-1.8 19.8-17 4.6V93l31.7-8.8 4.2-47.3H64zm0-24.9h41.4l1.4-15.7H64z" />
        <path fill="#FFFFFF" d="M64 52.5H45.2l-1.4-15.7H64V21.1H25.8l4.2 47h34zm0 40.5l-16.9-4.6-1.1-12H30.4l2.1 23.3L64 108.9z" />
      </svg>
    );
  }

  // 8. SUPABASE - Official Emerald Lightning
  if (norm === 'supabase') {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="20" fill="#1C1C1C" />
        <path fill="url(#supabaseGrad)" d="M69.7 116.5c-2.3 3.1-7.2 1.6-7.4-2.3l-2.1-45.3h37.4c5.1 0 7.9 5.8 4.7 9.8l-32.6 37.8z" />
        <path fill="#3ECF8E" d="M58.3 11.5c2.3-3.1 7.2-1.6 7.4 2.3l2.1 45.3H30.4c-5.1 0-7.9-5.8-4.7-9.8l32.6-37.8z" />
        <defs>
          <linearGradient id="supabaseGrad" x1="60" y1="68" x2="90" y2="116" gradientUnits="userSpaceOnUse">
            <stop stopColor="#249361" />
            <stop offset="1" stopColor="#3ECF8E" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // 9. GIT - Official Git Orange Diamond
  if (norm === 'git') {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <path fill="#F05032" d="M124.7 57.6L70.4 3.3c-4.4-4.4-11.6-4.4-16 0L42.5 15.2l20.4 20.4c4.7-1.6 10.2-.5 13.9 3.2 3.7 3.7 4.8 9.2 3.2 13.9l19.7 19.7c4.7-1.6 10.2-.5 13.9 3.2 5.3 5.3 5.3 13.9 0 19.2-5.3 5.3-13.9 5.3-19.2 0-4-4-4.9-9.9-2.8-14.8L73.4 61.8v31.4c1.3 1 2.4 2.3 3.2 3.8 3.7 6.4 1.5 14.6-4.9 18.3-6.4 3.7-14.6 1.5-18.3-4.9-3.7-6.4-1.5-14.6 4.9-18.3 2.1-1.2 4.5-1.8 6.9-1.8.8 0 1.6.1 2.4.3V60.2c-1.3-1-2.4-2.3-3.2-3.8-2-3.5-2.2-7.5-1.1-11.1L39.8 21.8 3.3 58.3c-4.4 4.4-4.4 11.6 0 16l54.3 54.3c4.4 4.4 11.6 4.4 16 0l51.1-51.1c4.4-4.3 4.4-11.5 0-15.9z" />
      </svg>
    );
  }

  // 10. GITHUB - Official GitHub Octocat Invertocat
  if (norm === 'github') {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="64" cy="64" r="64" fill="#181717" />
        <path fill="#FFFFFF" fillRule="evenodd" clipRule="evenodd" d="M64 16.6c-26.2 0-47.4 21.2-47.4 47.4 0 21 13.6 38.8 32.5 45.1 2.4.4 3.2-1 3.2-2.3 0-1.1 0-4.2-.1-8.2-13.2 2.9-16-6.4-16-6.4-2.2-5.5-5.3-7-5.3-7-4.3-2.9.3-2.9.3-2.9 4.8.3 7.3 4.9 7.3 4.9 4.2 7.2 11.1 5.2 13.8 3.9.4-3.1 1.7-5.2 3-6.4-10.5-1.2-21.6-5.3-21.6-23.5 0-5.2 1.9-9.5 4.9-12.8-.5-1.2-2.1-6.1.5-12.6 0 0 4-.1 13.1 4.9 3.8-1.1 7.9-1.6 12-1.6 4.1 0 8.2.5 12 1.6 9.1-6.2 13.1-4.9 13.1-4.9 2.6 6.5 1 11.4.5 12.6 3.1 3.4 4.9 7.6 4.9 12.8 0 18.3-11.1 22.3-21.7 23.4 1.7 1.5 3.3 4.4 3.3 8.9 0 6.4-.1 11.6-.1 13.2 0 1.3.8 2.8 3.3 2.3 18.9-6.3 32.5-24.1 32.5-45.1 0-26.2-21.2-47.4-47.4-47.4z" />
      </svg>
    );
  }

  // 11. RESTful APIs
  if (norm.includes('rest') || norm.includes('api')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="20" fill="#0284C7" />
        <circle cx="34" cy="64" r="14" fill="#ffffff" />
        <circle cx="94" cy="38" r="12" fill="#38BDF8" />
        <circle cx="94" cy="90" r="12" fill="#38BDF8" />
        <path d="M48 64h24M72 64l12-18M72 64l12 18" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <text x="64" y="118" fill="#ffffff" fontFamily="monospace" fontWeight="bold" fontSize="14" textAnchor="middle">REST</text>
      </svg>
    );
  }

  // 12. RDBMS / Databases
  if (norm === 'rdbms') {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="20" fill="#1E293B" />
        <ellipse cx="64" cy="34" rx="38" ry="14" fill="#3B82F6" />
        <path d="M26 34v26c0 7.7 17 14 38 14s38-6.3 38-14V34" fill="none" stroke="#60A5FA" strokeWidth="6" />
        <path d="M26 60v26c0 7.7 17 14 38 14s38-6.3 38-14V60" fill="none" stroke="#93C5FD" strokeWidth="6" />
        <path d="M26 86v18c0 7.7 17 14 38 14s38-6.3 38-14V86" fill="none" stroke="#BFDBFE" strokeWidth="6" />
      </svg>
    );
  }

  // 13. UI/UX
  if (norm.includes('ui/ux') || norm.includes('ui') || norm.includes('ux')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="20" fill="#0F172A" />
        {/* Figma inspired layout palette */}
        <path d="M42 24h22v22H42z" fill="#F24E1E" rx="11" />
        <path d="M64 24h22v22H64z" fill="#FF7262" rx="11" />
        <path d="M42 46h22v22H42z" fill="#A259FF" rx="11" />
        <circle cx="75" cy="57" r="11" fill="#1ABCFE" />
        <path d="M42 68h22v22H42z" fill="#0ACF83" rx="11" />
        <text x="96" y="104" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="bold" fontSize="16" textAnchor="end">UI/UX</text>
      </svg>
    );
  }

  // 14. MS OFFICE SUITE
  if (norm.includes('office') || norm.includes('ms office')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="20" fill="#D83B01" />
        <rect x="24" y="24" width="36" height="36" rx="6" fill="#F25022" />
        <rect x="68" y="24" width="36" height="36" rx="6" fill="#7FBA00" />
        <rect x="24" y="68" width="36" height="36" rx="6" fill="#00A4EF" />
        <rect x="68" y="68" width="36" height="36" rx="6" fill="#FFB900" />
      </svg>
    );
  }

  // 15. FIRE ALARM (BMS)
  if (norm.includes('fire')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="20" fill="#DC2626" />
        <circle cx="64" cy="56" r="32" fill="#991B1B" stroke="#FECACA" strokeWidth="4" />
        <circle cx="64" cy="56" r="16" fill="#EF4444" />
        <path d="M44 98h40v14H44z" rx="4" fill="#FEE2E2" />
        <path d="M60 92h8v12h-8z" fill="#DC2626" />
        <text x="64" y="62" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="16" textAnchor="middle">ALARM</text>
      </svg>
    );
  }

  // 16. WLD (Water Leak Detection)
  if (norm.includes('wld') || norm.includes('water')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="20" fill="#0284C7" />
        <path d="M64 24c0 0-28 36-28 54a28 28 0 0 0 56 0c0-18-28-54-28-54z" fill="#38BDF8" stroke="#E0F2FE" strokeWidth="4" />
        <circle cx="56" cy="68" r="6" fill="#FFFFFF" opacity="0.6" />
        <text x="64" y="116" fill="#FFFFFF" fontFamily="monospace" fontWeight="bold" fontSize="14" textAnchor="middle">WLD SENSOR</text>
      </svg>
    );
  }

  // 17. VESDA (Aspirated Smoke Detection)
  if (norm.includes('vesda') || norm.includes('smoke')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="20" fill="#334155" />
        <rect x="24" y="28" width="80" height="54" rx="8" fill="#0F172A" stroke="#38BDF8" strokeWidth="3" />
        <line x1="34" y1="55" x2="94" y2="55" stroke="#22C55E" strokeWidth="4" strokeDasharray="6 4" />
        <circle cx="64" cy="55" r="7" fill="#EF4444" />
        <path d="M38 82v20h52V82" fill="none" stroke="#94A3B8" strokeWidth="4" />
        <text x="64" y="118" fill="#F8FAFC" fontFamily="sans-serif" fontWeight="900" fontSize="13" textAnchor="middle">VESDA LASER</text>
      </svg>
    );
  }

  // 18. AHU (Air Handling Unit)
  if (norm.includes('ahu') || norm.includes('air') || norm.includes('hvac')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="20" fill="#0D9488" />
        <circle cx="64" cy="56" r="30" fill="#134E4A" stroke="#5EEAD4" strokeWidth="3" />
        {/* Fan blades */}
        <g transform="translate(64, 56)">
          <path d="M0 0c14-14 26 0 20 12s-20-12-20-12z" fill="#5EEAD4" />
          <path d="M0 0c14 14 0 26-12 20s12-20 12-20z" fill="#5EEAD4" />
          <path d="M0 0c-14 14-26 0-20-12s20 12 20 12z" fill="#5EEAD4" />
          <path d="M0 0c-14-14 0-26 12-20s-12 20-12 20z" fill="#5EEAD4" />
          <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
        </g>
        <text x="64" y="112" fill="#FFFFFF" fontFamily="monospace" fontWeight="bold" fontSize="14" textAnchor="middle">AHU BMS</text>
      </svg>
    );
  }

  // 19. NOVEC (Clean Agent Fire Suppression)
  if (norm.includes('novec')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="20" fill="#B91C1C" />
        {/* Suppression Cylinder */}
        <rect x="44" y="32" width="40" height="68" rx="14" fill="#EF4444" stroke="#FECACA" strokeWidth="3" />
        <path d="M56 18h16v14H56z" fill="#94A3B8" />
        <circle cx="64" cy="18" r="8" fill="#F8FAFC" stroke="#475569" strokeWidth="2" />
        <line x1="64" y1="18" x2="68" y2="14" stroke="#DC2626" strokeWidth="2" />
        <text x="64" y="70" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="11" textAnchor="middle">NOVEC</text>
        <text x="64" y="82" fill="#FEF08A" fontFamily="mono" fontSize="9" textAnchor="middle">1230 GAS</text>
      </svg>
    );
  }

  // 20. CCTV (Surveillance)
  if (norm.includes('cctv') || norm.includes('camera')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="20" fill="#1E293B" />
        {/* Dome Camera */}
        <path d="M26 36h76v12H26z" fill="#475569" rx="3" />
        <path d="M34 48c0 24 13 44 30 44s30-20 30-44z" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
        <circle cx="64" cy="62" r="14" fill="#0F172A" stroke="#38BDF8" strokeWidth="3" />
        <circle cx="64" cy="62" r="6" fill="#38BDF8" />
        <circle cx="82" cy="42" r="3" fill="#EF4444" className="animate-pulse" />
        <text x="64" y="114" fill="#F1F5F9" fontFamily="sans-serif" fontWeight="bold" fontSize="13" textAnchor="middle">CCTV CAM</text>
      </svg>
    );
  }

  // 21. FLAP BARRIER
  if (norm.includes('barrier') || norm.includes('flap')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="20" fill="#0F172A" />
        {/* Barrier Stanchions */}
        <rect x="22" y="30" width="24" height="74" rx="4" fill="#64748B" stroke="#94A3B8" strokeWidth="2" />
        <rect x="82" y="30" width="24" height="74" rx="4" fill="#64748B" stroke="#94A3B8" strokeWidth="2" />
        {/* Optical Glass Flap */}
        <polygon points="46,50 64,68 64,88 46,70" fill="#38BDF8" opacity="0.8" />
        <polygon points="82,50 64,68 64,88 82,70" fill="#38BDF8" opacity="0.8" />
        <circle cx="34" cy="44" r="4" fill="#22C55E" />
        <circle cx="94" cy="44" r="4" fill="#22C55E" />
        <text x="64" y="118" fill="#E2E8F0" fontFamily="sans-serif" fontWeight="bold" fontSize="12" textAnchor="middle">BARRIER</text>
      </svg>
    );
  }

  // 22. PA (Public Address System)
  if (norm === 'pa' || norm.includes('public address') || norm.includes('pa system')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="20" fill="#7C3AED" />
        {/* PA Speaker horn */}
        <path d="M34 50h18l24-18v64l-24-18H34z" fill="#EDE9FE" />
        <path d="M84 46c6 6 10 12 10 18s-4 12-10 18" fill="none" stroke="#C4B5FD" strokeWidth="6" strokeLinecap="round" />
        <path d="M96 36c10 10 16 18 16 28s-6 18-16 28" fill="none" stroke="#A78BFA" strokeWidth="6" strokeLinecap="round" />
        <text x="64" y="116" fill="#FFFFFF" fontFamily="monospace" fontWeight="bold" fontSize="14" textAnchor="middle">PA AUDIO</text>
      </svg>
    );
  }

  // 23. RODENT REPELLENT
  if (norm.includes('rodent') || norm.includes('ultrasonic')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="20" fill="#4338CA" />
        {/* Ultrasonic transducer emitting waves */}
        <circle cx="64" cy="60" r="18" fill="#1E1B4B" stroke="#A5B4FC" strokeWidth="3" />
        <circle cx="64" cy="60" r="6" fill="#38BDF8" />
        <path d="M34 32c18-14 42-14 60 0M24 22c24-18 56-18 80 0" fill="none" stroke="#818CF8" strokeWidth="4" strokeLinecap="round" />
        <text x="64" y="112" fill="#E0E7FF" fontFamily="monospace" fontWeight="bold" fontSize="12" textAnchor="middle">ULTRASONIC</text>
      </svg>
    );
  }

  // 24. TAILWIND CSS
  if (norm.includes('tailwind')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="20" fill="#0F172A" />
        <path fill="#38BDF8" d="M64 43.6c-13.8 0-22.4 6.9-25.8 20.7 5.2-6.9 11.2-9.5 18.1-7.8 3.9 1 6.8 3.9 9.9 7.1C71.3 68.8 77.2 75 89.8 75c13.8 0 22.4-6.9 25.8-20.7-5.2 6.9-11.2 9.5-18.1 7.8-3.9-1-6.8-3.9-9.9-7.1-5.1-5.2-11-11.4-23.6-11.4zm-25.8 24.8c-13.8 0-22.4 6.9-25.8 20.7 5.2-6.9 11.2-9.5 18.1-7.8 3.9 1 6.8 3.9 9.9 7.1C35.5 93.6 41.4 100 54 100c13.8 0 22.4-6.9 25.8-20.7-5.2 6.9-11.2 9.5-18.1 7.8-3.9-1-6.8-3.9-9.9-7.1-5.1-5.2-11-11.4-23.6-11.4z" />
      </svg>
    );
  }

  // 25. TYPESCRIPT
  if (norm.includes('typescript') || norm === 'ts') {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="20" fill="#3178C6" />
        <path fill="#FFFFFF" d="M72.2 73.1c2.4 3.7 5.7 6.1 11.1 6.1 4.7 0 7.7-2.3 7.7-5.6 0-3.9-3.2-5.4-8.6-7.7l-3-1.3c-8.6-3.7-14.3-8.3-14.3-18.1 0-8.9 6.8-15.6 17.6-15.6 7.6 0 13.1 2.7 16.9 9.3l-8.3 5.3c-1.8-3.2-3.8-4.5-8.6-4.5-3.9 0-6.3 2.4-6.3 5.1 0 3.5 2.5 5 7.3 7.1l3 1.3c10.1 4.3 15.7 8.9 15.7 18.8 0 10.7-8.4 16.7-19.6 16.7-11 0-18-5.3-21.6-12.3l8.6-4.7zM35.6 50.1h30.2v9.6H51.4v40.7H40.2V59.7H35.6v-9.6z" />
      </svg>
    );
  }

  // 26. GSAP (GreenSock)
  if (norm.includes('gsap') || norm.includes('greensock')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="20" fill="#0B0F19" />
        <circle cx="64" cy="64" r="44" fill="#0EA5E9" opacity="0.15" />
        <path fill="#0AE448" d="M64 28c19.8 0 36 16.2 36 36s-16.2 36-36 36c-19.8 0-36-16.2-36-36 0-10 4.1-19 10.6-25.4l9.9 9.9C83.3 53.3 80 58.3 80 64c0 8.8-7.2 16-16 16s-16-7.2-16-16 7.2-16 16-16c4.1 0 7.8 1.5 10.6 4.1l9.2-9.2C75.2 30.6 69.8 28 64 28z" />
        <circle cx="82" cy="46" r="6" fill="#0AE448" />
        <text x="64" y="118" fill="#0AE448" fontFamily="sans-serif" fontWeight="900" fontSize="14" textAnchor="middle" letterSpacing="2">GSAP</text>
      </svg>
    );
  }

  // 27. FIGMA
  if (norm.includes('figma')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="20" fill="#1E1E1E" />
        <g transform="translate(18, 14) scale(0.95)">
          <path d="M26 8h22v22H26z" fill="#F24E1E" rx="11" />
          <path d="M48 8h22v22H48z" fill="#FF7262" rx="11" />
          <path d="M26 30h22v22H26z" fill="#A259FF" rx="11" />
          <circle cx="59" cy="41" r="11" fill="#1ABCFE" />
          <path d="M26 52h22v22H26z" fill="#0ACF83" rx="11" />
        </g>
      </svg>
    );
  }

  // 28. THREE.JS / 3D DESIGN / 360
  if (norm.includes('three') || norm.includes('3d') || norm.includes('360') || norm.includes('perspective')) {
    return (
      <svg width={size} height={size} viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="20" fill="#000000" />
        <path fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" d="M64 22L106 94H22L64 22z" />
        <path fill="none" stroke="#38BDF8" strokeWidth="4" strokeLinejoin="round" d="M64 22v72M22 94l42-38 42 38" />
        <circle cx="64" cy="56" r="6" fill="#61DAFB" />
        <text x="64" y="118" fill="#38BDF8" fontFamily="sans-serif" fontWeight="900" fontSize="12" textAnchor="middle" letterSpacing="1">THREE·3D</text>
      </svg>
    );
  }

  // Default fallback badge with initial
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-lg bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center border border-slate-700 shadow-xs ${className}`}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
};
