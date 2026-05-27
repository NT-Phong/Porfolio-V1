import { Github, ArrowRight } from 'lucide-react';
import { OWNER, PROJECTS } from '../../data/portfolio';
import ProjectCard from '../ui/ProjectCard';

export default function ProjectsSection() {
  return (
    <section id="projects" className="hero-section-panel section-3 relative z-20 min-h-[100dvh] w-full px-6 py-24 md:px-24">
      <div className="w-full flex flex-col md:flex-row gap-12 justify-between items-start">
        {/* Left Column Spacer for 3D Model (Takes 40% width) */}
        <div className="w-full md:w-[40%] h-[300px] md:h-[400px] pointer-events-none" />

        {/* Right Column Content (Takes 55% width) */}
        <div className="w-full md:w-[55%] flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="status-dot-cyan animate-pulse" />
              <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[color:var(--accent-cyan)]">
                // 02 / SELECTED WORK
              </span>
            </div>
            <h2 className="font-display text-[12vw] md:text-[8.5vw] lg:text-[8.5rem] xl:text-[9.5rem] font-black leading-[0.85] text-[color:var(--text-primary)] tracking-tighter flex flex-col mt-2">
              <span className="motion-mask overflow-hidden">
                <span className="motion-line inline-block text-transparent [-webkit-text-stroke:1.5px_rgba(248,250,252,0.2)]" data-reveal-title>
                  SELECTED
                </span>
              </span>
              <span className="motion-mask overflow-hidden">
                <span className="motion-line inline-block text-[color:var(--text-primary)] drop-shadow-[0_0_30px_rgba(255,255,255,0.06)]" data-reveal-title>
                  PROJECTS
                </span>
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-8" data-motion-group="cards">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-4 flex justify-start">
            <a
              href={`https://${OWNER.github}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-full border border-[color:var(--border-strong)] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[color:var(--text-primary)] transition-all hover:border-[color:var(--accent-orange)] hover:text-[color:var(--accent-orange)]"
            >
              <Github size={16} />
              All Repositories on GitHub
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
