import React, { useState } from 'react';
import { INTERVIEW_FAQS } from '../data/portfolioData';
import { ChevronDown, ChevronUp, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

export const InterviewFAQ: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const toggleOpen = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="interview-faq" className="py-16 sm:py-24 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-8 border-b border-zinc-800/60 mb-10">
          <div className="text-xs font-semibold text-blue-400 tracking-wide">
            TECHNICAL & BEHAVIORAL DEEP DIVE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Interview Q&A & Engineering Philosophy
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mt-2 leading-relaxed">
            Real engineering perspectives on architecture, failure forensics, team communication, and managing technical debt.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {INTERVIEW_FAQS.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className="bg-[#0f111a] border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-200 hover:border-zinc-700"
              >
                <button
                  onClick={() => toggleOpen(faq.id)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-blue-400 font-mono">
                      <span>{faq.category}</span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-zinc-400">{faq.keyPrinciple}</span>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-zinc-100">
                      {faq.question}
                    </div>
                    <div className="text-xs text-zinc-400 font-sans leading-relaxed">
                      {faq.shortAnswer}
                    </div>
                  </div>

                  <div className="p-1.5 rounded-lg bg-zinc-800/80 text-zinc-300 shrink-0 mt-1">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-zinc-800/60 bg-zinc-950/40 text-sm text-zinc-300 leading-relaxed space-y-3">
                    <p>{faq.detailedResponse}</p>
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono pt-2">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Guiding Principle: {faq.keyPrinciple}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
