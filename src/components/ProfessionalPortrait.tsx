import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Award, Briefcase, GraduationCap, Sparkles, ShieldCheck, Eye, RefreshCw } from 'lucide-react';

interface ProfessionalPortraitProps {
  onOpenResume?: () => void;
}

export const ProfessionalPortrait: React.FC<ProfessionalPortraitProps> = ({ onOpenResume }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [photoStyle, setPhotoStyle] = useState<'executive' | 'modern-accent'>('executive');

  // Mouse tracking physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid, non-laggy motion
  const springConfig = { damping: 20, stiffness: 220, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D rotation transforms
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);

  // Parallax offsets for depth layers
  const depthFarX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const depthFarY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);
  
  const depthNearX = useTransform(smoothX, [-0.5, 0.5], [16, -16]);
  const depthNearY = useTransform(smoothY, [-0.5, 0.5], [16, -16]);

  // Spotlight position
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized [-0.5, 0.5]
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);

    setGlarePos({
      x: Math.round(((e.clientX - rect.left) / width) * 100),
      y: Math.round(((e.clientY - rect.top) / height) * 100)
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    setGlarePos({ x: 50, y: 50 });
  };

  return (
    <div className="relative w-full max-w-md mx-auto select-none perspective-[1000px]">
      {/* Interactive Style Switcher Pill */}
      <div className="flex items-center justify-between px-3 py-1.5 mb-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs">
        <div className="flex items-center gap-1.5 text-zinc-400">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span className="font-mono text-[11px]">3D INTERACTIVE PORTRAIT</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPhotoStyle('executive')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
              photoStyle === 'executive' ? 'bg-blue-600 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Executive Suit
          </button>
          <button
            onClick={() => setPhotoStyle('modern-accent')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
              photoStyle === 'modern-accent' ? 'bg-blue-600 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Studio Lighting
          </button>
        </div>
      </div>

      {/* 3D Motion Card Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-700/80 bg-gradient-to-b from-[#141829] via-[#0d101d] to-[#07080f] shadow-2xl transition-shadow duration-300 hover:shadow-blue-500/20 group cursor-crosshair"
      >
        {/* Dynamic Studio Spotlight Following Mouse */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(59, 130, 246, 0.22), transparent 80%)`,
            opacity: isHovered ? 1 : 0.4
          }}
        />

        {/* Ambient Top Studio Light Beam */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-48 bg-blue-500/15 blur-3xl pointer-events-none" />

        {/* Background Grid Layer (Parallax Depth Far) */}
        <motion.div
          style={{ x: depthFarX, y: depthFarY }}
          className="absolute inset-0 opacity-20 pointer-events-none"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          />
        </motion.div>

        {/* High-Fidelity Executive Portrait Artwork of Anish Kumar */}
        <div className="absolute inset-0 flex items-center justify-center pt-4 overflow-hidden">
          <svg
            viewBox="0 0 400 500"
            className="w-full h-full max-h-[110%] object-cover transform translate-y-4 scale-105"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Skin Gradient */}
              <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c5926c" />
                <stop offset="50%" stopColor="#b47d55" />
                <stop offset="100%" stopColor="#9a6540" />
              </linearGradient>

              {/* Shadow Skin Gradient */}
              <linearGradient id="shadowSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#925c38" />
                <stop offset="100%" stopColor="#764525" />
              </linearGradient>

              {/* Hair Gradient: Lush wavy black with dark espresso luster */}
              <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e1c24" />
                <stop offset="40%" stopColor="#111116" />
                <stop offset="100%" stopColor="#08080b" />
              </linearGradient>

              {/* Suit Blazer Gradient */}
              <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={photoStyle === 'executive' ? '#18243c' : '#1e293b'} />
                <stop offset="50%" stopColor={photoStyle === 'executive' ? '#0f172a' : '#111827'} />
                <stop offset="100%" stopColor="#080c14" />
              </linearGradient>

              {/* Lapel & Shadow Gradient */}
              <linearGradient id="lapelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#223354" />
                <stop offset="100%" stopColor="#0b111e" />
              </linearGradient>

              {/* Studio Rim Light Filter */}
              <filter id="rimGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="3" dy="2" stdDeviation="4" floodColor="#38bdf8" floodOpacity="0.35" />
              </filter>
            </defs>

            {/* Background Halo Behind Anish */}
            <circle cx="200" cy="220" r="140" fill="url(#suitGrad)" opacity="0.4" />
            <circle cx="200" cy="210" r="110" fill="#1e293b" opacity="0.3" />

            {/* Shoulders & Torso - Executive Tailored Suit Blazer */}
            <path
              d="M 60 490 C 80 390 120 340 160 330 L 240 330 C 280 340 320 390 340 490 Z"
              fill="url(#suitGrad)"
            />

            {/* Crisp White Dress Shirt Underneath */}
            <polygon
              points="170,330 200,410 230,330 215,310 185,310"
              fill="#f8fafc"
            />
            {/* Shirt Collar Points */}
            <polygon points="175,310 200,350 188,310" fill="#e2e8f0" />
            <polygon points="225,310 200,350 212,310" fill="#cbd5e1" />
            
            {/* Elegant Silk Tie / Collar V-Line */}
            <polygon points="196,350 204,350 206,420 194,420" fill="#0f172a" opacity="0.6" />

            {/* Tailored Suit Lapels */}
            <path
              d="M 160 330 L 195 430 L 155 460 L 130 380 Z"
              fill="url(#lapelGrad)"
              stroke="#2e3e5c"
              strokeWidth="1"
            />
            <path
              d="M 240 330 L 205 430 L 245 460 L 270 380 Z"
              fill="url(#lapelGrad)"
              stroke="#2e3e5c"
              strokeWidth="1"
            />

            {/* Executive Pocket Square (Cobalt Blue) */}
            <polygon points="115,405 125,395 135,403 130,412 118,412" fill="#2563eb" />

            {/* Neck */}
            <rect x="182" y="270" width="36" height="50" rx="10" fill="url(#skinGrad)" />
            {/* Neck Shadow under chin */}
            <path d="M 182 270 Q 200 295 218 270 L 218 290 Q 200 305 182 290 Z" fill="url(#shadowSkinGrad)" />

            {/* Head Contour - Handsome oval jawline matching Anish's photo */}
            <path
              d="M 152 180 C 150 230 162 275 200 275 C 238 275 250 230 248 180 C 248 135 240 120 200 120 C 160 120 152 135 152 180 Z"
              fill="url(#skinGrad)"
            />

            {/* Ears */}
            <path d="M 150 185 C 144 185 144 215 152 215 Z" fill="#b47d55" />
            <path d="M 248 185 C 256 185 256 215 248 215 Z" fill="#b47d55" />

            {/* Facial Features: Expressive Dark Eyes */}
            {/* Left Eye */}
            <ellipse cx="178" cy="184" rx="8" ry="4.5" fill="#f8fafc" />
            <circle cx="178" cy="184" r="3.2" fill="#181513" />
            <circle cx="179.2" cy="182.8" r="1" fill="#ffffff" />
            <path d="M 169 180 Q 178 174 187 180" stroke="#261b14" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            {/* Left Eyebrow - Well-defined natural arch */}
            <path d="M 166 173 Q 177 166 189 172" stroke="#16151a" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Right Eye */}
            <ellipse cx="222" cy="184" rx="8" ry="4.5" fill="#f8fafc" />
            <circle cx="222" cy="184" r="3.2" fill="#181513" />
            <circle cx="223.2" cy="182.8" r="1" fill="#ffffff" />
            <path d="M 213 180 Q 222 174 231 180" stroke="#261b14" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            {/* Right Eyebrow */}
            <path d="M 211 172 Q 223 166 234 173" stroke="#16151a" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Nose Contour */}
            <path d="M 198 178 L 197 212 Q 200 216 204 212" stroke="#8d5631" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <ellipse cx="194" cy="213" rx="2" ry="1.2" fill="#714120" />
            <ellipse cx="206" cy="213" rx="2" ry="1.2" fill="#714120" />

            {/* Anish's Signature Mustache & Chin Goatee */}
            {/* Mustache with distinct stylish wing dip matching his real photo */}
            <path
              d="M 183 226 Q 192 222 200 225 Q 208 222 217 226 Q 212 232 200 230 Q 188 232 183 226 Z"
              fill="#18161c"
            />
            {/* Subtle Friendly Lips */}
            <path d="M 189 236 Q 200 240 211 236" stroke="#8a4f32" strokeWidth="2.2" fill="none" strokeLinecap="round" />

            {/* Soul Patch & Chin Goatee matching photo */}
            <ellipse cx="200" cy="244" rx="3.5" ry="2.5" fill="#18161c" />
            <path
              d="M 192 258 Q 200 264 208 258 Q 204 266 200 267 Q 196 266 192 258 Z"
              fill="#18161c"
            />

            {/* Voluminous, Stylish Hair (Full wavy top sweep matching photo) */}
            <path
              d="M 148 175 
                 C 142 140 148 110 165 92 
                 C 180 75 220 70 240 85 
                 C 255 96 262 120 258 145 
                 C 264 160 255 180 250 185
                 C 246 160 242 145 235 140
                 C 220 130 195 135 175 142
                 C 160 148 152 165 148 175 Z"
              fill="url(#hairGrad)"
              filter="url(#rimGlow)"
            />
            {/* Hair Wave Strands & Texture Highlights */}
            <path d="M 165 95 Q 195 82 225 90" stroke="#36384a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 175 110 Q 210 98 238 108" stroke="#36384a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 155 125 Q 185 115 220 125" stroke="#2d2f3d" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 190 76 Q 215 72 235 80" stroke="#4a5068" strokeWidth="1.8" fill="none" strokeLinecap="round" />

            {/* Sideburns */}
            <polygon points="152,180 155,205 151,205" fill="#18161c" />
            <polygon points="248,180 245,205 249,205" fill="#18161c" />
          </svg>
        </div>

        {/* Floating Holographic Depth Badges (Parallax Depth Near) */}
        <motion.div
          style={{ x: depthNearX, y: depthNearY }}
          className="absolute inset-0 pointer-events-none p-5 flex flex-col justify-between z-20"
        >
          {/* Top Floating Badge: Verified Role */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-zinc-700/80 shadow-lg text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-[10px] text-zinc-400 font-mono leading-none">VERIFIED ENGINEER</div>
                <div className="text-xs font-bold text-white mt-0.5">TCS BMS Operations</div>
              </div>
            </div>

            <div className="px-2.5 py-1 rounded-lg bg-blue-950/70 backdrop-blur-md border border-blue-500/40 text-blue-300 text-[11px] font-mono font-semibold">
              MCA 85%
            </div>
          </div>

          {/* Bottom Floating Identity Card */}
          <div className="p-4 rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-zinc-700/90 shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-white tracking-tight">
                  Anish Kumar
                </h3>
                <div className="text-xs text-blue-400 font-mono">
                  Software Developer & MCA Graduate
                </div>
              </div>

              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            </div>

            {/* Quick Unboxed Skills Bar */}
            <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-zinc-300 pt-1 border-t border-zinc-800">
              <span>React JS</span>
              <span className="text-zinc-600">·</span>
              <span>Python CNN</span>
              <span className="text-zinc-600">·</span>
              <span>SQL RDBMS</span>
              <span className="text-zinc-600">·</span>
              <span>BMS Systems</span>
            </div>
          </div>
        </motion.div>

        {/* 3D Glass Specular Highlight on Card Edge */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />
      </motion.div>

      {/* Mouse Interaction Tip */}
      <div className="mt-3 text-center text-[11px] font-mono text-zinc-500 flex items-center justify-center gap-1.5">
        <Sparkles className="w-3 h-3 text-blue-400" />
        <span>Hover & tilt cursor across the portrait for 3D parallax</span>
      </div>
    </div>
  );
};
