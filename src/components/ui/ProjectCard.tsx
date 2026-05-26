import { motion } from 'motion/react';
import { Github, Calendar, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../../data/portfolio';
import SkillBadge from './SkillBadge';

interface ProjectCardProps {
  project: (typeof PROJECTS)[number];
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      className="group relative rounded-[2rem] border border-[color:var(--border-glass)] bg-[color:var(--surface-card)] p-1 transition-all duration-500"
      data-motion="card"
      data-project-card
      whileHover={{
        y: -8,
        borderColor: 'var(--accent-orange)',
        boxShadow: 'var(--shadow-card)',
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="flex flex-col gap-5 rounded-[calc(2rem-4px)] bg-[color:var(--surface-glass)] backdrop-blur-md p-7 shadow-[var(--shadow-glass)] h-full">
        {/* Tag */}
        <span className="self-start rounded-full bg-[rgba(20,199,192,0.06)] border border-[color:var(--border-cyan)] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[color:var(--accent-cyan)] font-mono">
          {project.tag}
        </span>

        {/* Title */}
        <div>
          <h3 className="font-display text-2xl font-black text-[color:var(--text-primary)] leading-tight tracking-tight">
            {project.name}
          </h3>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[color:var(--text-muted)] font-mono">
            {project.subtitle}
          </p>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-[10px] text-[color:var(--text-secondary)] font-mono">
          <span className="flex items-center gap-1.5">
            <Calendar size={11} className="text-[color:var(--accent-orange)]" />
            {project.period}
          </span>
          <span className="opacity-30">|</span>
          <span>{project.role}</span>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="flex flex-col gap-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-xs text-[color:var(--text-secondary)]">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[color:var(--accent-cyan)]" />
              {h}
            </li>
          ))}
        </ul>

        {/* Stack */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <SkillBadge key={s} label={s} accent={project.accent as 'cyan' | 'orange'} />
          ))}
        </div>

        {/* GitHub Link */}
        <a
          href={`https://${project.github}`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[color:var(--accent-orange)] opacity-80 transition-opacity hover:opacity-100 font-mono"
        >
          <Github size={13} />
          <span>View Source</span>
          <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );
}
