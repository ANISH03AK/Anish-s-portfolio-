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

  const primaryColor = theme?.primary || '#ef4444';
  const secondaryColor = theme?.secondary || '#facc15';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;

    setFeedback('Message prepared! Opening your email client to dispatch to anish03ak@gmail.com...');

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <footer id="contact" className="border-t border-zinc-800 section-scrim relative z-10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* International Mobility Callout Banner (Passport Details) */}
        <div
          className="glass-card tech-brackets p-8 rounded-3xl mb-16 transition-colors"
          style={{
            borderColor: `${secondaryColor}66`,
            boxShadow: `0 0 24px ${theme?.glowColor || 'rgba(239, 68, 68, 0.2)'}`
          }}
          data-aos="fade-up"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs font-bold border transition-colors"
                style={{
                  backgroundColor: `${secondaryColor}18`,
                  color: secondaryColor,
                  borderColor: `${secondaryColor}50`
                }}
              >
                <i className="fa-solid fa-passport" />
                <span>VALID INDIAN PASSPORT HOLDER</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Ready for Global Relocation & Onsite Deployment
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed max-w-2xl">
                Holding a valid passport with verified credentials and clean record. Fully prepared for immediate international work permits, client deployments, and remote/hybrid or onsite software engineering and BMS engineering engagements worldwide.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=International%20Opportunity%20Inquiry%20-%20Anish%20Kumar`}
                className="px-6 py-3 rounded-xl text-black font-extrabold text-xs font-mono uppercase tracking-wider text-center transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  boxShadow: `0 0 16px ${theme?.glowColor || 'rgba(239, 68, 68, 0.3)'}`
                }}
              >
                <i className="fa-solid fa-envelope" />
                <span>DISCUSS GLOBAL ROLES</span>
              </a>
              <button
                onClick={onOpenResume}
                className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border font-bold text-xs font-mono uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 cursor-pointer"
                style={{
                  color: secondaryColor,
                  borderColor: `${secondaryColor}50`
                }}
              >
                <i className="fa-solid fa-file-invoice" />
                <span>VIEW PASSPORT IN RESUME</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-zinc-800/80">
          {/* Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-xl p-[2px] shrink-0 shadow-lg relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    boxShadow: `0 0 14px ${theme?.glowColor || 'rgba(239, 68, 68, 0.25)'}`
                  }}
                >
                  <img
                    src="profile.jpg"
                    alt="Anish Kumar"
                    className="w-full h-full object-cover rounded-[10px]"
                    style={{ objectPosition: 'center 28%' }}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.hasFallenBack) {
                        target.dataset.hasFallenBack = 'true';
                        target.src = 'IMG_20260904_140606_442.jpg';
                      } else if (target.dataset.hasFallenBack === 'true') {
                        target.dataset.hasFallenBack = 'second';
                        target.src = 'profile.svg';
                      }
                    }}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white font-display">ANISH KUMAR</h2>
                  <p className="text-[10px] font-mono uppercase font-semibold" style={{ color: secondaryColor }}>
                    Software Engineer & BMS Specialist
                  </p>
                </div>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mt-2">
                Available for full-time Software Developer (React / Full-Stack) and BMS / ELV Engineer opportunities.
              </p>
            </div>

            <div className="space-y-3.5 text-sm font-mono">
              <div className="flex items-center gap-3 text-zinc-300">
                <div
                  className="w-9 h-9 rounded-xl telemetry-block border border-zinc-800 flex items-center justify-center transition-colors"
                  style={{ color: primaryColor }}
                >
                  <i className="fa-solid fa-location-dot" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase">Address</div>
                  <div>{PERSONAL_INFO.location}</div>
                </div>
              </div>

              <a href={`tel:${PERSONAL_INFO.phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group">
                <div
                  className="w-9 h-9 rounded-xl telemetry-block border border-zinc-800 flex items-center justify-center transition-colors"
                  style={{ color: secondaryColor }}
                >
                  <i className="fa-solid fa-phone" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase">Direct Phone</div>
                  <div>{PERSONAL_INFO.phone}</div>
                </div>
              </a>

              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group">
                <div
                  className="w-9 h-9 rounded-xl telemetry-block border border-zinc-800 flex items-center justify-center transition-colors"
                  style={{ color: primaryColor }}
                >
                  <i className="fa-solid fa-envelope" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase">Email Address</div>
                  <div>{PERSONAL_INFO.email}</div>
                </div>
              </a>

              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group">
                <div
                  className="w-9 h-9 rounded-xl telemetry-block border border-zinc-800 flex items-center justify-center transition-colors"
                  style={{ color: secondaryColor }}
                >
                  <i className="fa-brands fa-github" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase">GitHub Repository</div>
                  <div>{PERSONAL_INFO.githubHandle}</div>
                </div>
              </a>
            </div>
          </div>

          {/* Working Quick Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-card tech-brackets p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white font-display mb-1">Dispatch Direct Message</h3>
              <p className="text-xs text-zinc-400 font-mono mb-6">Fills your email client directly for an immediate response.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5" htmlFor="sender-name">Your Name</label>
                    <input
                      type="text"
                      id="sender-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Hiring Manager"
                      className="w-full px-4 py-2.5 rounded-xl telemetry-block border border-zinc-800/80 focus:border-yellow-400 focus:outline-none text-white text-sm font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5" htmlFor="sender-email">Your Email</label>
                    <input
                      type="email"
                      id="sender-email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. recruiter@company.com"
                      className="w-full px-4 py-2.5 rounded-xl telemetry-block border border-zinc-800/80 focus:border-yellow-400 focus:outline-none text-white text-sm font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5" htmlFor="sender-subject">Subject</label>
                  <input
                    type="text"
                    id="sender-subject"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Frontend Developer / BMS Engineer Role"
                    className="w-full px-4 py-2.5 rounded-xl telemetry-block border border-zinc-800/80 focus:border-yellow-400 focus:outline-none text-white text-sm font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5" htmlFor="sender-message">Message</label>
                  <textarea
                    id="sender-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hello Anish, we reviewed your resume and would like to discuss..."
                    className="w-full px-4 py-2.5 rounded-xl telemetry-block border border-zinc-800/80 focus:border-yellow-400 focus:outline-none text-white text-sm font-sans resize-none"
                  />
                </div>

                {feedback && (
                  <div
                    className="text-xs font-mono p-3 rounded-xl border block transition-colors"
                    style={{
                      backgroundColor: `${secondaryColor}15`,
                      borderColor: `${secondaryColor}50`,
                      color: secondaryColor
                    }}
                  >
                    <strong>Message prepared!</strong> {feedback}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-black font-extrabold text-xs font-mono uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    boxShadow: `0 0 16px ${theme?.glowColor || 'rgba(239, 68, 68, 0.3)'}`
                  }}
                >
                  <i className="fa-solid fa-paper-plane" />
                  <span>TRANSMIT INQUIRY</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © 2026 ANISH KUMAR · React JS Developer & BMS/ELV Engineer · All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#hero" className="hover:text-white transition-colors flex items-center gap-1.5" style={{ color: secondaryColor }}>
              <span>BACK TO TOP</span>
              <i className="fa-solid fa-arrow-up" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
