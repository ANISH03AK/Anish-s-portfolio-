import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ColorTheme } from '../data/colorThemes';

interface HeroProps {
  onOpenResume: () => void;
  theme?: ColorTheme;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, theme }) => {
  const [domainTab, setDomainTab] = useState<'software' | 'bms'>('software');
  const [typedText, setTypedText] = useState('');

  // Sub-headline Rotating Typing Effect
  useEffect(() => {
    const titles = [
      'React JS Developer',
      'BMS & ELV Engineer',
      'Full-Stack Enthusiast'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const tick = () => {
      const currentTitle = titles[titleIndex];

      if (isDeleting) {
        setTypedText(currentTitle.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentTitle.substring(0, charIndex + 1));
        charIndex++;
      }

      let speed = isDeleting ? 35 : 75;

      if (!isDeleting && charIndex === currentTitle.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        speed = 400;
      }

      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, 100);
    return () => clearTimeout(timer);
  }, []);

  const primaryColor = theme?.primary || '#ef4444';
  const secondaryColor = theme?.secondary || '#facc15';

  return (
    <section id="hero" className="min-h-screen pt-28 pb-14 flex flex-col justify-center relative overflow-hidden z-10">
      {/* Ambient Neon Lights adapted to theme */}
      <div
        className="absolute -top-32 left-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-all duration-700"
        style={{
          backgroundColor: primaryColor,
          opacity: 0.16
        }}
      />
      <div
        className="absolute top-1/2 right-12 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-all duration-700"
        style={{
          backgroundColor: secondaryColor,
          opacity: 0.14
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center my-auto">
          {/* Left Hero Presentation (7 cols) */}
          <div className="lg:col-span-7 space-y-6" data-aos="fade-up" data-aos-duration="800">
            {/* Status Ribbon with Live Pulse */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/90 border border-zinc-700 text-xs font-mono shadow-md">
              <span className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: secondaryColor }} />
                <span className="w-2 h-2 rounded-full absolute" style={{ backgroundColor: secondaryColor }} />
              </span>
              <span className="font-bold tracking-wide" style={{ color: secondaryColor }}>TCS BMS ENGINEER</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-300">MCA GRADUATE (85%)</span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="font-semibold hidden sm:inline" style={{ color: primaryColor }}>
                <i className="fa-solid fa-passport mr-1" />
                PASSPORT READY
              </span>
            </div>

            {/* Main Bold Headline with Shimmer Text */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-display leading-[1.1]">
                HI, I'M <span className="shimmer-headline font-black">ANISH KUMAR</span>
              </h1>

              {/* Animated Rotating Typing Effect cycling through titles */}
              <div className="text-2xl sm:text-4xl font-bold font-mono flex items-center min-h-[48px]">
                <span className="text-zinc-400 text-lg sm:text-2xl mr-2 font-normal font-sans">I am a</span>
                <span
                  id="typing-text"
                  className="font-extrabold uppercase transition-colors"
                  style={{
                    color: secondaryColor,
                    textShadow: `0 0 16px ${primaryColor}66`
                  }}
                >
                  {typedText}
                </span>
                <span className="cursor-blink" style={{ backgroundColor: secondaryColor }}>&nbsp;</span>
              </div>
            </div>

            {/* Professional Summary Extract */}
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              MCA graduate and Software Developer skilled in{' '}
              <strong className="font-semibold transition-colors theme-bold" style={{ color: secondaryColor }}>
                React JS, Python, and SQL
              </strong>
              . Proven experience building responsive web applications, consuming RESTful APIs, and maintaining critical enterprise infrastructure (BMS, Fire Alarms, CCTV) at{' '}
              <strong className="font-semibold transition-colors" style={{ color: primaryColor }}>
                Tata Consultancy Services (TCS)
              </strong>
              . Seeking to leverage full-stack development and complex system troubleshooting skills in a fast-paced IT role.
            </p>

            {/* Direct Resume Contact Details */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 py-1">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <i className="fa-solid fa-location-dot transition-colors" style={{ color: primaryColor }} />
                <span>{PERSONAL_INFO.location}</span>
              </span>
              <span className="text-zinc-700">·</span>
              <a href={`tel:${PERSONAL_INFO.phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors">
                <i className="fa-solid fa-phone transition-colors" style={{ color: secondaryColor }} />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <span className="text-zinc-700">·</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors">
                <i className="fa-solid fa-envelope transition-colors" style={{ color: primaryColor }} />
                <span>{PERSONAL_INFO.email}</span>
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenResume}
                className="px-6 py-3.5 rounded-xl text-black font-extrabold text-sm tracking-wider uppercase transition-all shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  boxShadow: `0 0 20px ${theme?.glowColor || 'rgba(239, 68, 68, 0.35)'}`
                }}
              >
                <i className="fa-solid fa-file-arrow-down text-base" />
                <span>Download Resume</span>
              </button>
              <a
                href={PERSONAL_INFO.dexterUrl}
                target="_blank"
                rel="noreferrer"
                id="hero-bolt-button"
                className="px-6 py-3.5 rounded-xl bg-black/90 hover:bg-zinc-900 font-semibold text-sm tracking-wide transition-all shadow-md flex items-center gap-2 group cursor-pointer border"
                style={{
                  color: secondaryColor,
                  borderColor: `${primaryColor}99`,
                  boxShadow: `0 0 16px ${theme?.glowColor || 'rgba(239, 68, 68, 0.25)'}`
                }}
              >
                <i
                  className="fa-solid fa-bolt group-hover:scale-125 transition-transform"
                  style={{ color: secondaryColor }}
                />
                <span>Live Store: Dexter</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-xs opacity-75" />
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-black/80 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
                title="GitHub Profile"
              >
                <i className="fa-brands fa-github text-lg" />
              </a>
            </div>

            {/* Proof Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-zinc-800/80">
              <div className="p-3 rounded-xl telemetry-block border border-zinc-800/80 hover:border-yellow-500/40 transition-colors">
                <div className="text-2xl font-bold font-mono text-yellow-400">85%</div>
                <div className="text-xs font-medium text-zinc-300">MCA Distinction</div>
                <div className="text-[10px] text-zinc-500">MREC (2022–2024)</div>
              </div>
              <div className="p-3 rounded-xl telemetry-block border border-zinc-800/80 hover:border-red-500/40 transition-colors">
                <div className="text-2xl font-bold font-mono text-white">TCS</div>
                <div className="text-xs font-medium text-zinc-300">BMS Operations</div>
                <div className="text-[10px] text-zinc-500">Via Johnson Controls</div>
              </div>
              <div className="p-3 rounded-xl telemetry-block border border-zinc-800/80 hover:border-yellow-500/40 transition-colors">
                <div className="text-2xl font-bold font-mono text-yellow-400">3+</div>
                <div className="text-xs font-medium text-zinc-300">Core Projects</div>
                <div className="text-[10px] text-zinc-500">React · CNN · SQL</div>
              </div>
              <div className="p-3 rounded-xl telemetry-block border border-red-500/40">
                <div className="text-2xl font-bold font-mono text-red-400">
                  <i className="fa-solid fa-passport" />
                </div>
                <div className="text-xs font-medium text-red-300">Valid Passport</div>
                <div className="text-[10px] text-red-400/80 font-mono">READY TO RELOCATE</div>
              </div>
            </div>
          </div>

          {/* Right Side: Dual-Domain System Command Architecture Console (5 cols) */}
          <div className="lg:col-span-5" data-aos="fade-left" data-aos-duration="900">
            <div className="laser-beam-border rounded-2xl p-[1.5px] shadow-2xl">
              <div className="laser-beam-content glass-card tech-brackets rounded-2xl p-6 relative overflow-hidden bg-black/90">
                {/* Console Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_6px_rgba(234,179,8,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                  <span className="text-xs font-mono text-zinc-400 ml-2">anish-kumar-system.sys</span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-yellow-400 bg-yellow-950/60 px-2 py-0.5 rounded border border-yellow-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                  <span>SYSTEM ACTIVE</span>
                </div>
              </div>

              {/* Domain Mode Switcher Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1 telemetry-block rounded-xl mb-4 text-xs font-mono">
                <button
                  id="btn-tab-software"
                  onClick={() => setDomainTab('software')}
                  className={`py-2 px-3 rounded-lg font-bold transition-all ${
                    domainTab === 'software'
                      ? 'text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  style={
                    domainTab === 'software'
                      ? {
                          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                          boxShadow: `0 0 14px ${theme?.glowColor || 'rgba(239, 68, 68, 0.3)'}`
                        }
                      : {}
                  }
                >
                  <i className="fa-brands fa-react mr-1.5" />
                  REACT / DEV
                </button>
                <button
                  id="btn-tab-bms"
                  onClick={() => setDomainTab('bms')}
                  className={`py-2 px-3 rounded-lg font-bold transition-all ${
                    domainTab === 'bms'
                      ? 'text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  style={
                    domainTab === 'bms'
                      ? {
                          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                          boxShadow: `0 0 14px ${theme?.glowColor || 'rgba(239, 68, 68, 0.3)'}`
                        }
                      : {}
                  }
                >
                  <i className="fa-solid fa-building-shield mr-1.5" />
                  BMS / ELV
                </button>
              </div>

              {/* Tab 1: Software Development Telemetry */}
              {domainTab === 'software' && (
                <div id="domain-content-software" className="space-y-4">
                  <div className="p-3.5 rounded-xl telemetry-block border border-zinc-800/80 space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-semibold transition-colors flex items-center" style={{ color: secondaryColor }}>
                        <i className="fa-brands fa-react mr-1.5" />
                        React 18 & Frontend Pipeline
                      </span>
                      <span className="font-semibold transition-colors" style={{ color: primaryColor }}>100% OPERATIONAL</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Engineered responsive SPAs, custom hooks, reusable UI component libraries, and integrated REST APIs with asynchronous state handling.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border transition-colors" style={{ backgroundColor: `${primaryColor}15`, color: secondaryColor, borderColor: `${primaryColor}35` }}>React.js</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border transition-colors" style={{ backgroundColor: `${primaryColor}15`, color: secondaryColor, borderColor: `${primaryColor}35` }}>Tailwind CSS</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border transition-colors" style={{ backgroundColor: `${primaryColor}15`, color: secondaryColor, borderColor: `${primaryColor}35` }}>RESTful APIs</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border transition-colors" style={{ backgroundColor: `${primaryColor}15`, color: secondaryColor, borderColor: `${primaryColor}35` }}>JavaScript ES6+</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl telemetry-block border border-zinc-800/80 space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-semibold transition-colors flex items-center" style={{ color: primaryColor }}>
                        <i className="fa-brands fa-python mr-1.5" />
                        Python & Relational DBs
                      </span>
                      <span className="font-semibold transition-colors" style={{ color: secondaryColor }}>VERIFIED</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Backend logic with Python, relational data schemas in MySQL and Supabase, alongside CNN image/video classification models.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border transition-colors" style={{ backgroundColor: `${secondaryColor}15`, color: secondaryColor, borderColor: `${secondaryColor}35` }}>Python</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border transition-colors" style={{ backgroundColor: `${secondaryColor}15`, color: secondaryColor, borderColor: `${secondaryColor}35` }}>MySQL / SQL</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border transition-colors" style={{ backgroundColor: `${secondaryColor}15`, color: secondaryColor, borderColor: `${secondaryColor}35` }}>Supabase</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border transition-colors" style={{ backgroundColor: `${secondaryColor}15`, color: secondaryColor, borderColor: `${secondaryColor}35` }}>CNN Deep Learning</span>
                    </div>
                  </div>

                  {/* Live Store Callout */}
                  <div
                    className="p-3 rounded-xl telemetry-block border flex items-center justify-between transition-colors"
                    style={{ borderColor: `${secondaryColor}60` }}
                  >
                    <div>
                      <div className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                        <i className="fa-solid fa-bag-shopping transition-colors" style={{ color: secondaryColor }} />
                        <span className="bolt-heading" style={{ color: secondaryColor }}>Dexter Men's Wear (Live)</span>
                      </div>
                      <div className="text-[10px] font-mono opacity-80" style={{ color: secondaryColor }}>dexter-style-elevation.vercel.app</div>
                    </div>
                    <a
                      href={PERSONAL_INFO.dexterUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg text-black font-extrabold text-xs font-mono transition-all shadow-md active:scale-95 flex items-center gap-1 cursor-pointer"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                        boxShadow: `0 0 10px ${theme?.glowColor || 'rgba(239, 68, 68, 0.25)'}`
                      }}
                    >
                      VISIT <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                    </a>
                  </div>
                </div>
              )}

              {/* Tab 2: BMS & ELV Telemetry */}
              {domainTab === 'bms' && (
                <div id="domain-content-bms" className="space-y-4">
                  <div className="p-3.5 rounded-xl telemetry-block border border-zinc-800/80 space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-semibold transition-colors flex items-center" style={{ color: primaryColor }}>
                        <i className="fa-solid fa-building mr-1.5" />
                        TCS Campus BMS (Johnson Controls)
                      </span>
                      <span className="font-semibold transition-colors" style={{ color: secondaryColor }}>LIVE SUPERVISION</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Real-time operational monitoring of HVAC, chillers, VAVs, and automated environmental setpoints across large enterprise facilities.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border transition-colors" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor, borderColor: `${primaryColor}35` }}>Johnson Controls Metasys</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border transition-colors" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor, borderColor: `${primaryColor}35` }}>Honeywell BMS</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border transition-colors" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor, borderColor: `${primaryColor}35` }}>HVAC Control</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl telemetry-block border border-zinc-800/80 space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-semibold transition-colors flex items-center" style={{ color: secondaryColor }}>
                        <i className="fa-solid fa-shield-halved mr-1.5" />
                        Fire Alarm & CCTV Infrastructure
                      </span>
                      <span className="font-semibold transition-colors" style={{ color: primaryColor }}>ZERO DOWNTIME</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Addressable fire alarm panel testing, CCTV multi-tier network diagnostics, and rapid emergency incident containment protocols.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border transition-colors" style={{ backgroundColor: `${secondaryColor}15`, color: secondaryColor, borderColor: `${secondaryColor}35` }}>Addressable Fire Panels</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border transition-colors" style={{ backgroundColor: `${secondaryColor}15`, color: secondaryColor, borderColor: `${secondaryColor}35` }}>CCTV Surveillance</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border transition-colors" style={{ backgroundColor: `${secondaryColor}15`, color: secondaryColor, borderColor: `${secondaryColor}35` }}>Access Control (ACS)</span>
                    </div>
                  </div>

                  {/* Relocation Callout */}
                  <div className="p-3 rounded-xl telemetry-block border border-red-500/40 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                        <i className="fa-solid fa-passport text-yellow-400" />
                        <span>International Deployment</span>
                      </div>
                      <div className="text-[10px] text-yellow-300/80 font-mono">Indian Passport Holder · Immediate Relocation</div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-yellow-500/20 text-yellow-300 text-[10px] font-mono border border-yellow-500/50">READY</span>
                  </div>
                </div>
              )}

              {/* Terminal Status Bar */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>HOST: TCS CHENNAI</span>
                <span className="text-yellow-400">LATENCY: 14ms</span>
                <span>PORT: 3000</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Ticker Tape Infinite Marquee Tagline Banner */}
      <div
        className="w-full mt-10 py-3 section-scrim border-y transition-colors relative z-20"
        style={{
          borderColor: `${primaryColor}4d`,
          boxShadow: `0 0 20px ${theme?.glowColor || 'rgba(239,68,68,0.15)'}`
        }}
      >
        <div className="ticker-tape-container">
          <div className="ticker-tape-track flex items-center gap-8 text-xs sm:text-sm font-mono tracking-widest uppercase font-bold text-zinc-300">
            {/* Set 1 */}
            <span className="flex items-center gap-2 bolt-heading" style={{ color: secondaryColor }}>
              <i className="fa-solid fa-bolt animate-bounce" style={{ color: secondaryColor }} />
              <span className="font-extrabold">GLOBAL CAREER | PASSPORT READY</span>
            </span>
            <span style={{ color: `${primaryColor}99` }}>✦</span>
            <span className="flex items-center gap-2 text-white">
              <i className="fa-solid fa-graduation-cap" style={{ color: secondaryColor }} />
              <span>MCA 85% DISTINCTION</span>
            </span>
            <span style={{ color: `${primaryColor}99` }}>✦</span>
            <span className="flex items-center gap-2" style={{ color: primaryColor }}>
              <i className="fa-solid fa-building-shield" />
              <span>TCS BMS & CRITICAL OPERATIONS</span>
            </span>
            <span style={{ color: `${primaryColor}99` }}>✦</span>
            <span className="flex items-center gap-2" style={{ color: secondaryColor }}>
              <i className="fa-brands fa-react" style={{ color: primaryColor }} />
              <span>REACT JS · PYTHON · SQL FULL-STACK</span>
            </span>
            <span style={{ color: `${primaryColor}99` }}>✦</span>
            <span className="flex items-center gap-2" style={{ color: primaryColor }}>
              <i className="fa-solid fa-plane-departure" style={{ color: secondaryColor }} />
              <span>IMMEDIATE GLOBAL RELOCATION READY</span>
            </span>
            <span style={{ color: `${primaryColor}99` }}>✦</span>
            <span className="flex items-center gap-2" style={{ color: secondaryColor }}>
              <i className="fa-solid fa-store" />
              <span>DEXTER LIVE: DEXTER-STYLE-ELEVATION.VERCEL.APP</span>
            </span>
            <span style={{ color: `${primaryColor}99` }}>✦</span>

            {/* Set 2 (for seamless loop) */}
            <span className="flex items-center gap-2 bolt-heading" style={{ color: secondaryColor }}>
              <i className="fa-solid fa-bolt animate-bounce" style={{ color: secondaryColor }} />
              <span className="font-extrabold">GLOBAL CAREER | PASSPORT READY</span>
            </span>
            <span style={{ color: `${primaryColor}99` }}>✦</span>
            <span className="flex items-center gap-2 text-white">
              <i className="fa-solid fa-graduation-cap" style={{ color: secondaryColor }} />
              <span>MCA 85% DISTINCTION</span>
            </span>
            <span style={{ color: `${primaryColor}99` }}>✦</span>
            <span className="flex items-center gap-2" style={{ color: primaryColor }}>
              <i className="fa-solid fa-building-shield" />
              <span>TCS BMS & CRITICAL OPERATIONS</span>
            </span>
            <span style={{ color: `${primaryColor}99` }}>✦</span>
            <span className="flex items-center gap-2" style={{ color: secondaryColor }}>
              <i className="fa-brands fa-react" style={{ color: primaryColor }} />
              <span>REACT JS · PYTHON · SQL FULL-STACK</span>
            </span>
            <span style={{ color: `${primaryColor}99` }}>✦</span>
            <span className="flex items-center gap-2" style={{ color: primaryColor }}>
              <i className="fa-solid fa-plane-departure" style={{ color: secondaryColor }} />
              <span>IMMEDIATE GLOBAL RELOCATION READY</span>
            </span>
            <span style={{ color: `${primaryColor}99` }}>✦</span>
            <span className="flex items-center gap-2" style={{ color: secondaryColor }}>
              <i className="fa-solid fa-store" />
              <span>DEXTER LIVE: DEXTER-STYLE-ELEVATION.VERCEL.APP</span>
            </span>
            <span style={{ color: `${primaryColor}99` }}>✦</span>
          </div>
        </div>
      </div>
    </section>
  );
};
