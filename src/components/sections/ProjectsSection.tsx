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
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent-cyan)] animate-pulse" />
              <span className="font-serif italic text-lg text-[color:var(--accent-cyan)] tracking-wide">
                Selected Work
              </span>
            </div>
            <h2 className="font-display text-7xl font-black leading-[0.9] text-[color:var(--text-primary)] md:text-8xl tracking-tight">
              <span className="motion-mask">
                <span className="motion-line" data-reveal-title>PROJECTS</span>
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
