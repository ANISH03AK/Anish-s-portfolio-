import React from 'react';
import { EDUCATION, ACHIEVEMENTS } from '../data/portfolioData';
import { GraduationCap, Award, Trophy, CheckCircle2, Calendar } from 'lucide-react';

export const EducationAchievements: React.FC = () => {
  return (
    <section id="education" className="py-16 sm:py-24 border-b border-zinc-800/80 bg-[#090b12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Education Timeline (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-semibold text-blue-400 tracking-wide">
                ACADEMIC QUALIFICATIONS
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
                Education & Degree Credentials
              </h2>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                Strong academic track record in computer applications, software engineering, and hardware architecture with distinction.
              </p>
            </div>

            <div className="space-y-4">
              {EDUCATION.map((edu, idx) => (
                <div
                  key={edu.degree}
                  className="bg-[#0f111d] border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800/60">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-400">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white">
                          {edu.degree}
                        </h3>
                        <div className="text-xs text-zinc-400">
                          {edu.institution}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-start sm:self-auto font-mono text-xs">
                      <span className="px-2.5 py-1 rounded bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 font-bold">
                        Score: {edu.score}
                      </span>
                      <span className="text-zinc-500">{edu.period}</span>
                    </div>
                  </div>

                  <ul className="mt-3.5 space-y-2 text-xs sm:text-sm text-zinc-300">
                    {edu.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-zinc-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Achievements & Certifications (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-semibold text-emerald-400 tracking-wide">
                HONORS & SEMINARS
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
                Awards & Certifications
              </h2>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                Competitive programming recognition and specialized database/data science certifications.
              </p>
            </div>

            <div className="space-y-4">
              {ACHIEVEMENTS.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#0f111d] border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-colors flex items-start gap-4"
                >
                  <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-400 shrink-0">
                    {item.iconType === 'trophy' ? <Trophy className="w-5 h-5" /> : <Award className="w-5 h-5" />}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {item.title}
                    </h3>
                    <div className="text-xs text-zinc-400">
                      {item.context}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 pt-1">
                      <Calendar className="w-3 h-3 text-zinc-400" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick Summary Note */}
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 text-xs text-zinc-300 leading-relaxed">
                <span className="font-semibold text-blue-300">Fast-Learner Track Record: </span>
                Demonstrated ability to swiftly grasp programming languages, database internals, and operational systems under competitive and production environments.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
