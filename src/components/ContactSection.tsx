import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ColorTheme } from '../data/colorThemes';

interface ContactSectionProps {
  onOpenResume: () => void;
  theme?: ColorTheme;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume, theme }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const primaryColor = theme?.primary || '#06b6d4';
  const secondaryColor = theme?.secondary || '#6366f1';
  const accentColor = theme?.accent || '#f43f5e';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject || 'Portfolio Inquiry - Anish Kumar')}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;

    setFeedback('Opening your email client to dispatch message to anish03ak@gmail.com...');

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 500);
  };

  return (
    <footer id="contact" className="border-t border-zinc-800/80 relative z-10 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* International Mobility Callout Banner (Passport Details) */}
        <div
          className="p-8 sm:p-10 rounded-3xl mb-20 transition-colors border bg-zinc-950/90 shadow-2xl relative overflow-hidden"
          style={{
            borderColor: `${primaryColor}45`,
            boxShadow: `0 0 32px ${theme?.glowColor || 'rgba(6, 182, 212, 0.2)'}`
          }}
          data-aos="fade-up"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3.5">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full font-mono text-xs font-bold border transition-colors"
                style={{
                  backgroundColor: `${accentColor}18`,
                  color: accentColor,
                  borderColor: `${accentColor}50`
                }}
              >
                <i className="fa-solid fa-passport" />
                <span>VALID INDIAN PASSPORT HOLDER · GLOBAL MOBILITY</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Ready for International Relocation &amp; Worldwide Deployment
              </h3>
              <p className="text-zinc-200 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                Holding a valid passport with verified credentials and clean track record. Fully prepared for immediate international work permits, client deployments, and remote/hybrid or onsite software engineering and BMS engineering engagements worldwide.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center">
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=International%20Opportunity%20Inquiry%20-%20Anish%20Kumar`}
                className="px-6 py-3.5 rounded-xl text-white font-extrabold text-xs font-mono uppercase tracking-wider text-center transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  boxShadow: `0 0 20px ${theme?.glowColor || 'rgba(6, 182, 212, 0.3)'}`
                }}
              >
                <i className="fa-solid fa-envelope" />
                <span>DISCUSS ROLES</span>
              </a>
              <button
                onClick={onOpenResume}
                className="px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border font-bold text-xs font-mono uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 cursor-pointer text-white"
                style={{
                  borderColor: `${primaryColor}60`
                }}
              >
                <i className="fa-solid fa-file-pdf" style={{ color: primaryColor }} />
                <span>VIEW &amp; DOWNLOAD RESUME (PDF)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contact Grid with Generous Spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-zinc-800/80">
          {/* Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-7">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Get In Touch</h2>
                  <p className="text-xs font-mono uppercase font-bold mt-0.5" style={{ color: primaryColor }}>
                    Software Developer &amp; BMS Operations Specialist
                  </p>
                </div>
              </div>
              <p className="text-zinc-200 text-sm sm:text-base leading-relaxed mt-3">
                Available for full-time Software Developer (React / Full-Stack) and BMS / ELV Engineer opportunities.
              </p>
            </div>

            <div className="space-y-4 text-sm font-mono">
              <div className="flex items-center gap-3.5 text-zinc-200">
                <div
                  className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-colors shadow-sm"
                  style={{ color: primaryColor }}
                >
                  <i className="fa-solid fa-location-dot" />
                </div>
                <div>
                  <div className="text-[11px] text-zinc-400 font-semibold">LOCATION</div>
                  <div className="font-semibold text-white">{PERSONAL_INFO.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-zinc-200">
                <div
                  className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-colors shadow-sm"
                  style={{ color: secondaryColor }}
                >
                  <i className="fa-solid fa-phone" />
                </div>
                <div>
                  <div className="text-[11px] text-zinc-400 font-semibold">PHONE</div>
                  <a href={`tel:${PERSONAL_INFO.phone.replace(/[^0-9]/g, '')}`} className="font-semibold text-white hover:text-cyan-400 transition-colors">
                    {PERSONAL_INFO.phoneFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-zinc-200">
                <div
                  className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-colors shadow-sm"
                  style={{ color: accentColor }}
                >
                  <i className="fa-solid fa-envelope" />
                </div>
                <div>
                  <div className="text-[11px] text-zinc-400 font-semibold">EMAIL</div>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="font-semibold text-white hover:text-cyan-400 transition-colors">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 text-xs font-mono flex items-center gap-2 transition-colors"
              >
                <i className="fa-brands fa-github text-sm" />
                <span>GitHub Profile</span>
              </a>
              <a
                href={PERSONAL_INFO.dexterUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 text-xs font-mono flex items-center gap-2 transition-colors"
              >
                <i className="fa-solid fa-store text-sm" style={{ color: primaryColor }} />
                <span>Dexter Live</span>
              </a>
            </div>
          </div>

          {/* Direct Message Dispatch Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-8 rounded-3xl bg-zinc-950/85 border border-zinc-800 shadow-xl">
              <h3 className="text-xl font-bold text-white font-display mb-1.5 flex items-center gap-2">
                <i className="fa-solid fa-paper-plane text-sm" style={{ color: primaryColor }} />
                <span>Send a Direct Inquiry</span>
              </h3>
              <p className="text-xs text-zinc-300 font-mono mb-6">
                Direct dispatch to {PERSONAL_INFO.email}
              </p>

              {feedback && (
                <div
                  className="mb-5 p-3 rounded-xl text-xs font-mono border"
                  style={{
                    backgroundColor: `${primaryColor}15`,
                    color: primaryColor,
                    borderColor: `${primaryColor}40`
                  }}
                >
                  <i className="fa-solid fa-circle-check mr-2" />
                  {feedback}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-300 mb-1.5 font-semibold">YOUR NAME *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 mb-1.5 font-semibold">YOUR EMAIL *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. contact@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 mb-1.5 font-semibold">SUBJECT *</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Software Engineer Role Inquiry"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 mb-1.5 font-semibold">MESSAGE *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Brief description of the opportunity, project requirements, or role details..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-white font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    boxShadow: `0 0 20px ${theme?.glowColor || 'rgba(6, 182, 212, 0.3)'}`
                  }}
                >
                  <i className="fa-solid fa-paper-plane" />
                  <span>TRANSMIT MESSAGE</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Copyright with Spacing */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div>
            © {new Date().getFullYear()} <strong className="text-white font-name-stylish">ANISH KUMAR</strong>. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <span>React JS</span>
            <span>·</span>
            <span>Tailwind CSS</span>
            <span>·</span>
            <span>BMS Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
