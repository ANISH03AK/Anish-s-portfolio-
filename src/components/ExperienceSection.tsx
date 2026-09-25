import React from 'react';
import { ColorTheme } from '../data/colorThemes';

interface ExperienceSectionProps {
  theme?: ColorTheme;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ theme }) => {
  const primaryColor = theme?.primary || '#ef4444';
  const secondaryColor = theme?.secondary || '#facc15';

  return (
    <section id="experience" className="py-20 border-t border-zinc-800/80 section-scrim relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <h2
            className="text-xs font-mono tracking-widest uppercase font-semibold mb-2 transition-colors section-eyebrow"
            style={{ color: secondaryColor }}
          >
            03. Career Path
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Professional Experience
          </p>
          <p className="text-zinc-400 text-sm mt-3">Hands-on enterprise maintenance and operational technical support.</p>
          <div
            className="w-16 h-1 mx-auto mt-4 rounded-full transition-all duration-300 theme-gradient-divider"
            style={{
              background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor}, ${theme?.accent || '#f59e0b'})`
            }}
          />
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto pl-10 md:pl-0">
          {/* Desktop Central Line / Mobile Left Line */}
          <div className="timeline-line md:timeline-center-line" />

          {/* Experience 1: TCS (Tata Consultancy Services) */}
          <div className="relative mb-12 md:mb-20" data-aos="fade-up">
            {/* Timeline Node Icon */}
            <div
              className="absolute -left-10 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-zinc-950 border-2 flex items-center justify-center shadow-lg transition-all z-10"
              style={{
                borderColor: primaryColor,
                color: primaryColor,
                boxShadow: `0 0 16px ${primaryColor}55`
              }}
            >
              <i className="fa-solid fa-building-shield text-sm" />
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
              {/* Left Side / Card */}
              <div className="glass-card tech-brackets p-6 sm:p-8 rounded-2xl relative">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <span
                    className="px-3 py-1 rounded-full font-mono text-xs font-bold border transition-colors"
                    style={{
                      backgroundColor: `${primaryColor}18`,
                      color: primaryColor,
                      borderColor: `${primaryColor}40`
                    }}
                  >
                    TATA CONSULTANCY SERVICES (TCS)
                  </span>
                  <span className="text-xs font-mono text-zinc-400">Chennai, India</span>
                </div>

                <h3 className="text-xl font-bold text-white font-display">BMS Operations Engineer</h3>
                <p
                  className="text-xs font-mono mb-4 transition-colors font-medium"
                  style={{ color: secondaryColor }}
                >
                  Contract via Johnson Controls India Pvt. Ltd.
                </p>

                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-xs mt-1 shrink-0 transition-colors" style={{ color: secondaryColor }} />
                    <span>Monitored and maintained real-time enterprise Building Management Systems (BMS) for massive TCS corporate campuses.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-xs mt-1 shrink-0 transition-colors" style={{ color: secondaryColor }} />
                    <span>
                      Supervised critical HVAC plant operations, chillers, VAV parameters, and energy telemetry via{' '}
                      <strong className="font-semibold transition-colors theme-bold" style={{ color: secondaryColor }}>
                        Johnson Controls Metasys
                      </strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-xs mt-1 shrink-0 transition-colors" style={{ color: secondaryColor }} />
                    <span>Conducted regular testing and diagnostics on addressable Fire Alarm Systems and large-scale CCTV surveillance setups.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-xs mt-1 shrink-0 transition-colors" style={{ color: secondaryColor }} />
                    <span>Ensured rapid emergency response, root-cause troubleshooting, and SLA adherence to guarantee zero campus downtime.</span>
                  </li>
                </ul>

                <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-zinc-800 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded telemetry-block text-zinc-300">Johnson Controls</span>
                  <span className="px-2 py-0.5 rounded telemetry-block text-zinc-300">Metasys</span>
                  <span className="px-2 py-0.5 rounded telemetry-block text-zinc-300">HVAC Control</span>
                  <span className="px-2 py-0.5 rounded telemetry-block text-zinc-300">Fire Alarms</span>
                  <span className="px-2 py-0.5 rounded telemetry-block text-zinc-300">CCTV</span>
                </div>
              </div>

              {/* Right Side: Meta Callout (Desktop) */}
              <div className="hidden md:block pl-6">
                <div
                  className="inline-flex items-center gap-2 text-xs font-mono mb-2 transition-colors font-semibold"
                  style={{ color: secondaryColor }}
                >
                  <i className="fa-solid fa-clock" />
                  <span>ENTERPRISE FACILITY SLA</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Operating at TCS provided deep exposure to critical, real-time telemetry, automated sensor networks, and high-stakes uptime standards that directly inform scalable software architecture.
                </p>
              </div>
            </div>
          </div>

          {/* Experience 2: Fino Payment Bank */}
          <div className="relative" data-aos="fade-up">
            {/* Timeline Node Icon */}
            <div
              className="absolute -left-10 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-zinc-950 border-2 flex items-center justify-center shadow-lg transition-all z-10"
              style={{
                borderColor: secondaryColor,
                color: secondaryColor,
                boxShadow: `0 0 16px ${secondaryColor}55`
              }}
            >
              <i className="fa-solid fa-building-columns text-sm" />
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
              {/* Left Side: Meta Callout (Desktop) */}
              <div className="hidden md:block pr-6 text-right">
                <div
                  className="inline-flex items-center gap-2 text-xs font-mono mb-2 transition-colors font-semibold"
                  style={{ color: primaryColor }}
                >
                  <span>DIGITAL BANKING SYSTEMS</span>
                  <i className="fa-solid fa-wallet" />
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Interfacing with transaction databases, merchant verification systems, and digital settlement troubleshooting.
                </p>
              </div>

              {/* Right Side / Card */}
              <div className="glass-card tech-brackets p-6 sm:p-8 rounded-2xl relative">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <span
                    className="px-3 py-1 rounded-full font-mono text-xs font-bold border transition-colors"
                    style={{
                      backgroundColor: `${secondaryColor}18`,
                      color: secondaryColor,
                      borderColor: `${secondaryColor}40`
                    }}
                  >
                    FINO PAYMENT BANK
                  </span>
                  <span className="text-xs font-mono text-zinc-400">Operations</span>
                </div>

                <h3 className="text-xl font-bold text-white font-display">Technical Operations Associate</h3>

                <ul className="space-y-3 text-sm text-zinc-300 mt-4">
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-xs mt-1 shrink-0 transition-colors" style={{ color: secondaryColor }} />
                    <span>Facilitated digital banking operations, merchant verification workflows, and database log verifications.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-xs mt-1 shrink-0 transition-colors" style={{ color: secondaryColor }} />
                    <span>Troubleshot digital payment bottlenecks, merchant queries, and customer transaction discrepancy reports.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-xs mt-1 shrink-0 transition-colors" style={{ color: secondaryColor }} />
                    <span>Maintained documentation, transaction audit trails, and strict compliance protocols.</span>
                  </li>
                </ul>

                <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-zinc-800 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded telemetry-block text-zinc-300">Transaction Logs</span>
                  <span className="px-2 py-0.5 rounded telemetry-block text-zinc-300">Banking Portals</span>
                  <span className="px-2 py-0.5 rounded telemetry-block text-zinc-300">SQL Data Check</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
