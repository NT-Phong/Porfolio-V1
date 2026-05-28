import { EXPERIENCE } from '../../data/portfolio';
import SkillBadge from '../ui/SkillBadge';

export default function CareerSection() {
  return (
    <section id="career" className="hero-section-panel career-section relative z-20 min-h-[100dvh] w-full px-6 py-24 md:px-24">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
        
        {/* Main Content Area */}
        <div className="w-full flex flex-col items-center">
          {/* Header */}
          <div className="mb-12 flex flex-col items-center text-center gap-3">
            <div className="flex items-center gap-3">
              <span className="status-dot-orange animate-pulse" />
              <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[color:var(--accent-orange)]">
                // 03 / MILESTONES
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase leading-[0.9] tracking-tighter text-[color:var(--text-primary)] flex flex-col mt-2 items-center">
              <span className="motion-mask overflow-hidden">
                <span className="motion-line inline-block text-transparent [-webkit-text-stroke:1.5px_rgba(248,250,252,0.2)]" data-reveal-title>
                  MY CAREER
                </span>
              </span>
              <span className="motion-mask overflow-hidden">
                <span className="motion-line inline-block text-[color:var(--text-primary)] drop-shadow-[0_0_30px_rgba(255,255,255,0.06)]" data-reveal-title>
                  EXPERIENCE
                </span>
              </span>
            </h2>
          </div>

          {/* Timeline Container */}
          <div className="timeline-container relative mt-8 w-full">
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
                {/* Left Side: Job Title & Company */}
                <div className="career-left">
                  <span className="career-mobile-year">{item.year}</span>
                  <h3 className="font-display text-xl md:text-2xl font-black text-[color:var(--text-primary)] leading-tight">
                    {item.role}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--accent-cyan)] mt-1 font-mono">
                    {item.company}
                  </p>
                  <p className="text-[10px] text-[color:var(--text-muted)] mt-0.5 font-mono">
                    {item.period}
                  </p>
                </div>

                {/* Center Node / Year Column */}
                <div className="career-center">
                  <div className="career-item-node" />
                  <span className="career-year">{item.year}</span>
                </div>

                {/* Right Side: Description */}
                <div className="career-right">
                  <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
                    {item.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 justify-start">
                    {item.skills.map((s) => (
                      <SkillBadge key={s} label={s} accent="cyan" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
