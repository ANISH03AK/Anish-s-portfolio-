import React from 'react';
import { PROJECTS_DATA, PERSONAL_INFO } from '../data/portfolioData';
import { ColorTheme } from '../data/colorThemes';

interface ProjectDisplay {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl: string;
  previewBg: string;
  icon: string;
}

const PROJECTS: ProjectDisplay[] = [
  {
    id: 'dexter',
    title: "Dexter Men's Wear",
    category: 'E-Commerce Web Application',
    description: 'A responsive full-stack e-commerce web platform featuring dynamic catalog filtering, cart management, checkout workflows, and modern responsive UI.',
    technologies: ['React JS', 'Tailwind CSS', 'RESTful APIs', 'Vercel'],
    liveUrl: PERSONAL_INFO.dexterUrl,
    githubUrl: PERSONAL_INFO.github,
    previewBg: 'linear-gradient(135deg, #0e2a47 0%, #090d16 100%)',
    icon: 'fa-solid fa-shirt'
  },
  {
    id: 'fraud-detection',
    title: 'Facial Fraud & Fake Detection',
    category: 'Computer Vision & Deep Learning',
    description: 'A convolutional neural network (CNN) trained in Python to detect, classify, and prevent fraudulent, spoofed, and AI-synthesized facial identities.',
    technologies: ['Python', 'CNN', 'OpenCV', 'TensorFlow', 'REST APIs'],
    githubUrl: PERSONAL_INFO.github,
    previewBg: 'linear-gradient(135deg, #2b134d 0%, #090d16 100%)',
    icon: 'fa-solid fa-brain'
  },
  {
    id: 'tourism-system',
    title: 'Tourism Operations Platform',
    category: 'Database & Web Architecture',
    description: 'A comprehensive travel booking and destination management system built with relational schema design, administrative controls, and secure booking APIs.',
    technologies: ['MySQL', 'Web Platform', 'REST APIs', 'RDBMS'],
    githubUrl: PERSONAL_INFO.github,
    previewBg: 'linear-gradient(135deg, #063d2e 0%, #090d16 100%)',
    icon: 'fa-solid fa-route'
  }
];

interface ProjectsSectionProps {
  theme?: ColorTheme;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ theme }) => {
  const primaryColor = theme?.primary || '#06b6d4';
  const secondaryColor = theme?.secondary || '#6366f1';
  const accentColor = theme?.accent || '#f43f5e';

  return (
    <section id="projects" className="py-28 sm:py-36 border-t border-zinc-800/80 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Generous Space */}
        <div className="max-w-2xl mb-16 sm:mb-20" data-aos="fade-up">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold mb-3 border"
            style={{
              backgroundColor: `${accentColor}15`,
              color: accentColor,
              borderColor: `${accentColor}40`
            }}
          >
            <i className="fa-solid fa-cubes" />
            <span>03. Featured Deployments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Key Software Projects
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-2.5 leading-relaxed">
            Production web platforms, deep learning neural networks, and relational database systems.
          </p>
        </div>

        {/* Clean Project Grid with Generous Gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9">
          {PROJECTS.map((proj, idx) => (
            <div
              key={proj.id}
              className="group rounded-3xl bg-zinc-950/85 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 flex flex-col overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={idx * 120}
            >
              {/* Project Preview Header */}
              <div
                className="h-44 relative p-6 flex flex-col justify-between overflow-hidden border-b border-zinc-800/80"
                style={{ background: proj.previewBg }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-lg shadow-md"
                    style={{ color: primaryColor }}
                  >
                    <i className={proj.icon} />
                  </div>
                  <span
                    className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-black/70 border border-white/15 text-zinc-200 font-medium"
                  >
                    {proj.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                  {proj.title}
                </h3>
              </div>

              {/* Project Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <p className="text-sm text-zinc-200 leading-relaxed font-normal">
                  {proj.description}
                </p>

                <div>
                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {proj.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center gap-3 pt-3 border-t border-zinc-900">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2 px-3 rounded-xl text-white font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                        style={{
                          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
                        }}
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square text-[11px]" />
                        <span>LIVE DEMO</span>
                      </a>
                    )}
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
                      title="View GitHub Repository"
                    >
                      <i className="fa-brands fa-github text-sm" />
                      <span>CODE</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
