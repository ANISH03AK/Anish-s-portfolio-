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
      'Full-Stack Developer'
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

      let speed = isDeleting ? 30 : 65;

      if (!isDeleting && charIndex === currentTitle.length) {
        speed = 2200;
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

  const primaryColor = theme?.primary || '#06b6d4';
  const secondaryColor = theme?.secondary || '#6366f1';
  const accentColor = theme?.accent || '#f43f5e';

  return (
    <section id="hero" className="pt-24 sm:pt-28 pb-14 relative overflow-hidden z-10 scroll-mt-24">
      {/* Dynamic Ambient Multi-Color Glowing Orbs matching 3-Color Combination */}
      <div
        className="absolute -top-32 left-1/4 w-[34rem] h-[34rem] rounded-full blur-[140px] pointer-events-none transition-all duration-700"
        style={{
          backgroundColor: primaryColor,
          opacity: 0.18
        }}
      />
      <div
        className="absolute top-1/3 right-10 w-[30rem] h-[30rem] rounded-full blur-[140px] pointer-events-none transition-all duration-700"
        style={{
          backgroundColor: secondaryColor,
          opacity: 0.16
        }}
      />
      <div
        className="absolute bottom-10 left-10 w-[24rem] h-[24rem] rounded-full blur-[150px] pointer-events-none transition-all duration-700"
        style={{
          backgroundColor: accentColor,
          opacity: 0.14
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-1 sm:pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Hero Presentation (7 cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5" data-aos="fade-up" data-aos-duration="800">
            {/* Status Ribbon with 3-Color Combination Accents */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-full bg-black/85 border border-zinc-800 text-xs font-mono shadow-md backdrop-blur-md">
              <span className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: primaryColor }} />
                <span className="w-2 h-2 rounded-full absolute" style={{ backgroundColor: primaryColor }} />
              </span>
              <span className="font-bold tracking-wide" style={{ color: primaryColor }}>TCS BMS ENGINEER</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-200 font-semibold">MCA 85% DISTINCTION</span>
              <span className="text-zinc-600 hidden sm:inline">·</span>
              <span className="font-semibold flex items-center gap-1" style={{ color: accentColor }}>
                <i className="fa-solid fa-passport" />
                <span>PASSPORT READY</span>
              </span>
            </div>

            {/* Main Section Headline - Strictly One Line across Every Device */}
            <div className="space-y-1.5">
              <div className="text-zinc-300 text-sm sm:text-lg lg:text-xl font-sans font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                Software Developer &amp; BMS Operations Specialist
              </div>
              <div className="flex items-center min-h-[46px] whitespace-nowrap overflow-visible">
                <span
                  id="typing-text"
                  className="font-extrabold transition-colors font-name-stylish whitespace-nowrap text-[6vw] sm:text-4xl md:text-5xl lg:text-6xl leading-none inline-block"
                  style={{
                    color: primaryColor,
                    textShadow: `0 0 20px ${primaryColor}55`
                  }}
                >
                  {typedText}
                </span>
                <span className="cursor-blink ml-1.5 inline-block" style={{ backgroundColor: primaryColor }}>&nbsp;</span>
              </div>
            </div>

            {/* Professional Summary */}
            <p className="text-zinc-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              MCA graduate and Software Developer specialized in{' '}
              <strong className="font-bold transition-colors underline decoration-cyan-500/40" style={{ color: primaryColor }}>
                React JS, Python, and SQL
              </strong>
              . Experienced in developing responsive single-page web applications, consuming RESTful APIs, and maintaining mission-critical building management infrastructure at{' '}
              <strong className="font-bold transition-colors" style={{ color: secondaryColor }}>
                Tata Consultancy Services (TCS)
              </strong>
              . Indian passport holder fully ready for global IT engineering roles.
            </p>

            {/* Direct Resume Contact Details */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-300 py-1">
              <span className="flex items-center gap-1.5 text-zinc-200">
                <i className="fa-solid fa-location-dot transition-colors" style={{ color: primaryColor }} />
                <span>{PERSONAL_INFO.location}</span>
              </span>
              <span className="text-zinc-600">·</span>
              <a href={`tel:${PERSONAL_INFO.phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-1.5 text-zinc-200 hover:text-white transition-colors">
                <i className="fa-solid fa-phone transition-colors" style={{ color: secondaryColor }} />
                <span>{PERSONAL_INFO.phoneFormatted}</span>
              </a>
              <span className="text-zinc-600">·</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-1.5 text-zinc-200 hover:text-white transition-colors">
                <i className="fa-solid fa-envelope transition-colors" style={{ color: accentColor }} />
                <span>{PERSONAL_INFO.email}</span>
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onOpenResume}
                className="px-5 sm:px-6 py-3.5 rounded-xl text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer group"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  boxShadow: `0 0 24px ${theme?.glowColor || 'rgba(6, 182, 212, 0.4)'}`
                }}
              >
                <i className="fa-solid fa-file-pdf text-sm group-hover:scale-110 transition-transform" />
                <span>View &amp; Download Resume (PDF)</span>
              </button>

              <a
                href={PERSONAL_INFO.dexterUrl}
                target="_blank"
                rel="noreferrer"
                id="hero-bolt-button"
                className="px-4 sm:px-5 py-3.5 rounded-xl bg-black/85 hover:bg-zinc-900 font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md flex items-center gap-2 group cursor-pointer border"
                style={{
                  color: primaryColor,
                  borderColor: `${primaryColor}66`,
                  boxShadow: `0 0 16px ${theme?.glowColor || 'rgba(6, 182, 212, 0.2)'}`
                }}
              >
                <i
                  className="fa-solid fa-bag-shopping group-hover:scale-125 transition-transform"
                  style={{ color: primaryColor }}
                />
                <span>Live Store: Dexter</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-xs opacity-75" />
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-black/75 hover:bg-zinc-900 text-zinc-200 hover:text-white border border-zinc-800 transition-colors"
                title="GitHub Profile"
              >
                <i className="fa-brands fa-github text-lg" />
              </a>
            </div>

            {/* Proof Metrics Bar - Perfectly Responsive Grid on All Screens */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-zinc-800/80">
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div className="text-xl sm:text-2xl font-bold font-mono transition-colors" style={{ color: primaryColor }}>85%</div>
                <div className="text-xs font-bold text-white mt-0.5">MCA Distinction</div>
                <div className="text-[10px] text-zinc-300 mt-0.5 leading-tight">Meenakshi Ramasamy College</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">TCS</div>
                <div className="text-xs font-bold text-white mt-0.5">BMS Operations</div>
                <div className="text-[10px] text-zinc-300 mt-0.5 leading-tight">Johnson Controls Facility</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div className="text-xl sm:text-2xl font-bold font-mono transition-colors" style={{ color: secondaryColor }}>3+</div>
                <div className="text-xs font-bold text-white mt-0.5">Core Projects</div>
                <div className="text-[10px] text-zinc-300 mt-0.5 leading-tight">React · Python · SQL</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/80 border transition-colors" style={{ borderColor: `${accentColor}55` }}>
                <div className="text-xl sm:text-2xl font-bold font-mono transition-colors" style={{ color: accentColor }}>
                  <i className="fa-solid fa-passport" />
                </div>
                <div className="text-xs font-bold text-white mt-0.5">Passport Ready</div>
                <div className="text-[10px] font-mono font-bold mt-0.5" style={{ color: accentColor }}>GLOBAL RELOCATION</div>
              </div>
            </div>
          </div>

          {/* Right Side: Dual-Domain Experience Console (5 cols) */}
          <div className="lg:col-span-5" data-aos="fade-left" data-aos-duration="900">
            <div
              className="rounded-2xl p-[1.5px] shadow-2xl transition-all"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}90, ${secondaryColor}90, ${accentColor}90)`
              }}
            >
              <div className="rounded-2xl p-5 sm:p-6 relative overflow-hidden bg-zinc-950/95 backdrop-blur-xl">
                {/* Console Header */}
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-zinc-800/80">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: secondaryColor }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                    <span className="text-xs font-mono text-zinc-300 ml-2 font-medium">anish-kumar.profile</span>
                  </div>
                  <div
                    className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded border font-semibold"
                    style={{
                      backgroundColor: `${primaryColor}18`,
                      color: primaryColor,
                      borderColor: `${primaryColor}45`
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
                    <span>VERIFIED PROFILE</span>
                  </div>
                </div>

                {/* Domain Mode Switcher Tabs */}
                <div className="grid grid-cols-2 gap-2 p-1.5 bg-zinc-900 rounded-xl mb-4 text-xs font-mono border border-zinc-800">
                  <button
                    onClick={() => setDomainTab('software')}
                    className={`py-2 px-3 rounded-lg font-bold transition-all cursor-pointer ${
                      domainTab === 'software'
                        ? 'text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                    style={
                      domainTab === 'software'
                        ? {
                            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                            boxShadow: `0 0 14px ${theme?.glowColor || 'rgba(6, 182, 212, 0.4)'}`
                          }
                        : {}
                    }
                  >
                    <i className="fa-brands fa-react mr-1.5" />
                    SOFTWARE DEV
                  </button>
                  <button
                    onClick={() => setDomainTab('bms')}
                    className={`py-2 px-3 rounded-lg font-bold transition-all cursor-pointer ${
                      domainTab === 'bms'
                        ? 'text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                    style={
                      domainTab === 'bms'
                        ? {
                            background: `linear-gradient(135deg, ${secondaryColor}, ${accentColor})`,
                            boxShadow: `0 0 14px ${theme?.glowColor || 'rgba(6, 182, 212, 0.4)'}`
                          }
                        : {}
                    }
                  >
                    <i className="fa-solid fa-building-shield mr-1.5" />
                    BMS / ELV OPS
                  </button>
                </div>

                {/* Tab 1: Software Development Telemetry */}
                {domainTab === 'software' && (
                  <div className="space-y-3.5">
                    <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="font-bold flex items-center text-white text-xs sm:text-sm">
                          <i className="fa-brands fa-react mr-1.5" style={{ color: primaryColor }} />
                          React.js &amp; Frontend Engineering
                        </span>
                        <span className="font-bold text-[11px]" style={{ color: primaryColor }}>ACTIVE</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                        Engineered responsive SPAs, scalable modular components, custom hooks, and dynamic API integrations with clean UX and Tailwind styling.
                      </p>
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">React.js</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">Tailwind CSS</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">RESTful APIs</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">JavaScript ES6+</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="font-bold flex items-center text-white text-xs sm:text-sm">
                          <i className="fa-brands fa-python mr-1.5" style={{ color: secondaryColor }} />
                          Python, SQL &amp; Deep Learning
                        </span>
                        <span className="font-bold text-[11px]" style={{ color: secondaryColor }}>VERIFIED</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                        Backend services, relational database management with MySQL and daily SQL queries, plus CNN computer vision research for fake face detection.
                      </p>
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">Python</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">MySQL / SQL</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">Supabase</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">CNN Models</span>
                      </div>
                    </div>

                    {/* Live Store Callout */}
                    <div
                      className="p-3 rounded-xl bg-zinc-900/90 border flex items-center justify-between gap-2"
                      style={{ borderColor: `${primaryColor}60` }}
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white font-mono flex items-center gap-1.5 truncate">
                          <i className="fa-solid fa-store" style={{ color: primaryColor }} />
                          <span className="truncate">Dexter Men's Wear (Live)</span>
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400 truncate">dexter-style-elevation.vercel.app</div>
                      </div>
                      <a
                        href={PERSONAL_INFO.dexterUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg text-white font-bold text-xs font-mono transition-all shadow-md active:scale-95 flex items-center gap-1 cursor-pointer shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
                        }}
                      >
                        VISIT <i className="fa-solid fa-arrow-up-right-from-square text-[9px]" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Tab 2: BMS & ELV Telemetry */}
                {domainTab === 'bms' && (
                  <div className="space-y-3.5">
                    <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="font-bold flex items-center text-white text-xs sm:text-sm">
                          <i className="fa-solid fa-building mr-1.5" style={{ color: primaryColor }} />
                          TCS Campus BMS (Johnson Controls)
                        </span>
                        <span className="font-bold text-[11px]" style={{ color: primaryColor }}>ACTIVE</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                        Real-time operational monitoring of HVAC, chillers, VAVs, and automated environmental setpoints across large enterprise facilities.
                      </p>
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">Johnson Controls</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">Honeywell BMS</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">HVAC Control</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="font-bold flex items-center text-white text-xs sm:text-sm">
                          <i className="fa-solid fa-shield-halved mr-1.5" style={{ color: accentColor }} />
                          Fire Alarm &amp; Security Systems
                        </span>
                        <span className="font-bold text-[11px]" style={{ color: accentColor }}>UPTIME 100%</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                        Addressable fire alarm testing, CCTV diagnostics, WLD, VESDA, AHU, and NOVEC gas fire suppression systems at TCS.
                      </p>
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">Fire Alarms</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">CCTV &amp; ACS</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700">VESDA &amp; NOVEC</span>
                      </div>
                    </div>

                    {/* Relocation Callout */}
                    <div
                      className="p-3 rounded-xl bg-zinc-900/90 border flex items-center justify-between gap-2"
                      style={{ borderColor: `${accentColor}60` }}
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white font-mono flex items-center gap-1.5 truncate">
                          <i className="fa-solid fa-plane-departure" style={{ color: accentColor }} />
                          <span className="truncate">Global Mobility Ready</span>
                        </div>
                        <div className="text-[10px] text-zinc-300 font-mono truncate">Indian Passport · Immediate Deployment</div>
                      </div>
                      <span
                        className="px-2.5 py-1 rounded text-[10px] font-mono font-bold shrink-0"
                        style={{
                          backgroundColor: `${accentColor}25`,
                          color: accentColor,
                          border: `1px solid ${accentColor}60`
                        }}
                      >
                        READY
                      </span>
                    </div>
                  </div>
                )}

                {/* Console Footer */}
                <div className="mt-3.5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-zinc-400">
                  <span>LOCATION: CHENNAI</span>
                  <span className="font-bold" style={{ color: primaryColor }}>READY TO HIRE</span>
                  <span>ATS VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Banner with Proper Responsive Overflow */}
      <div
        className="w-full mt-8 sm:mt-10 py-3 bg-black/70 backdrop-blur-md border-y transition-colors relative z-20 overflow-hidden"
        style={{
          borderColor: `${primaryColor}40`,
          boxShadow: `0 0 24px ${theme?.glowColor || 'rgba(6, 182, 212, 0.2)'}`
        }}
      >
        <div className="ticker-tape-container overflow-hidden">
          <div className="ticker-tape-track flex items-center gap-8 text-xs sm:text-sm font-mono tracking-widest uppercase font-bold text-zinc-200 whitespace-nowrap">
            <span className="flex items-center gap-2" style={{ color: primaryColor }}>
              <i className="fa-solid fa-bolt" />
              <span>PASSPORT READY · GLOBAL CAREER</span>
            </span>
            <span style={{ color: `${secondaryColor}80` }}>✦</span>
            <span className="flex items-center gap-2 text-white">
              <i className="fa-solid fa-graduation-cap" style={{ color: accentColor }} />
              <span>MCA 85% DISTINCTION</span>
            </span>
            <span style={{ color: `${secondaryColor}80` }}>✦</span>
            <span className="flex items-center gap-2" style={{ color: secondaryColor }}>
              <i className="fa-solid fa-building-shield" />
              <span>TCS BMS &amp; FACILITY OPERATIONS</span>
            </span>
            <span style={{ color: `${secondaryColor}80` }}>✦</span>
            <span className="flex items-center gap-2" style={{ color: primaryColor }}>
              <i className="fa-brands fa-react" style={{ color: accentColor }} />
              <span>REACT JS · PYTHON · SQL FULL-STACK</span>
            </span>
            <span style={{ color: `${secondaryColor}80` }}>✦</span>
            <span className="flex items-center gap-2" style={{ color: accentColor }}>
              <i className="fa-solid fa-file-pdf" style={{ color: primaryColor }} />
              <span>OFFICIAL RESUME DOWNLOADABLE</span>
            </span>
            <span style={{ color: `${secondaryColor}80` }}>✦</span>

            {/* Set 2 for loop */}
            <span className="flex items-center gap-2" style={{ color: primaryColor }}>
              <i className="fa-solid fa-bolt" />
              <span>PASSPORT READY · GLOBAL CAREER</span>
            </span>
            <span style={{ color: `${secondaryColor}80` }}>✦</span>
            <span className="flex items-center gap-2 text-white">
              <i className="fa-solid fa-graduation-cap" style={{ color: accentColor }} />
              <span>MCA 85% DISTINCTION</span>
            </span>
            <span style={{ color: `${secondaryColor}80` }}>✦</span>
            <span className="flex items-center gap-2" style={{ color: secondaryColor }}>
              <i className="fa-solid fa-building-shield" />
              <span>TCS BMS &amp; FACILITY OPERATIONS</span>
            </span>
            <span style={{ color: `${secondaryColor}80` }}>✦</span>
          </div>
        </div>
      </div>
    </section>
  );
};
