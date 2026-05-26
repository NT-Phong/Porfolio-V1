import { motion } from 'motion/react';
import { EXPERIENCE } from '../../data/portfolio';
import SkillBadge from '../ui/SkillBadge';

export default function CareerSection() {
  return (
    <section id="career" className="hero-section-panel career-section relative z-20 min-h-[100dvh] w-full px-6 py-24 md:px-24">
      <div className="w-full flex flex-col md:flex-row gap-12 justify-between items-start">
        
        {/* Left Column Content (Takes 55% width) */}
        <div className="w-full md:w-[55%] flex flex-col">
          {/* Header */}
          <div className="mb-12 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent-orange)] animate-pulse" />
              <span className="font-serif italic text-lg text-[color:var(--accent-orange)] tracking-wide">
                Milestones
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-8xl font-black uppercase tracking-tight text-[color:var(--text-primary)]">
              <span className="motion-mask">
                <span className="motion-line" data-reveal-title>MY CAREER &</span>
              </span>
              <br />
              <span className="motion-mask">
                <span className="motion-line" data-reveal-title>EXPERIENCE</span>
              </span>
            </h2>
          </div>

          {/* Timeline Container (shifted left asymmetric layout) */}
          <div className="timeline-container timeline-asymmetric-container relative mt-8 w-full">
            {/* Axis line */}
            <div className="timeline-axis">
              <div className="timeline-line-base" />
              <div className="timeline-line-progress" />
            </div>

            {/* Glowing Tracer Dot */}
            <div className="timeline-tracer-dot" />

            {/* Timeline Items */}
            {EXPERIENCE.map((item, idx) => (
              <div key={idx} className="career-item">
                {/* Left Side (Empty on desktop, handles year on mobile) */}
                <div className="career-left">
                  <span className="career-mobile-year">{item.year}</span>
                </div>

                {/* Center Node / Year Column */}
                <div className="career-center">
                  <div className="career-item-node" />
                  <span className="career-year">{item.year}</span>
                </div>

                {/* Right Side (Desktop text-left: Job title & Description combined) */}
                <div className="career-right">
                  <motion.div
                    className="group relative rounded-[2rem] border border-[color:var(--border-glass)] bg-[color:var(--surface-card)] p-1 transition-all duration-300"
                    whileHover={{
                      y: -5,
                      borderColor: 'var(--accent-cyan)',
                      boxShadow: 'var(--shadow-card)',
                    }}
                  >
                    <div className="flex flex-col rounded-[calc(2rem-4px)] bg-[color:var(--surface-glass)] backdrop-blur-md p-7 shadow-[var(--shadow-glass)] h-full">
                      <h3 className="font-display text-2xl font-black text-[color:var(--text-primary)] leading-tight">
                        {item.role}
                      </h3>
                      <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--accent-cyan)] mt-1.5 font-mono">
                        {item.company}
                      </p>
                      <p className="text-[10px] text-[color:var(--text-muted)] mt-1 font-mono">
                        {item.period}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-secondary)]">
                        {item.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2 justify-start">
                        {item.skills.map((s) => (
                          <SkillBadge key={s} label={s} accent="cyan" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column Spacer for 3D Model (Takes 40% width) */}
        <div className="w-full md:w-[40%] h-[300px] md:h-[400px] pointer-events-none" />
      </div>
    </section>
  );
}
