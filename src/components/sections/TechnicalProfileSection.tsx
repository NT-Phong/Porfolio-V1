import { OWNER, SKILLS } from '../../data/portfolio';
import SkillBadge from '../ui/SkillBadge';

export default function TechnicalProfileSection() {
  return (
    <section id="about" className="hero-section-panel section-2 relative z-20 flex min-h-[100dvh] w-full items-center justify-center px-6 py-24 md:px-24">
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-12 justify-between items-center">
        
        {/* Left Content Area (Takes 55% width) */}
        <div className="w-full md:w-[55%] flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="status-dot-cyan animate-pulse" />
              <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[color:var(--accent-cyan)]">
                // 01 / TECHNICAL PROFILE
              </span>
            </div>
            <h2 className="font-display text-[13vw] md:text-[9vw] lg:text-[9.5rem] xl:text-[11rem] font-black leading-[0.85] text-[color:var(--text-primary)] tracking-tighter flex flex-col mt-2">
              <span className="motion-mask overflow-hidden">
                <span className="motion-line inline-block text-transparent [-webkit-text-stroke:1.5px_rgba(248,250,252,0.2)]" data-reveal-title>
                  MY
                </span>
              </span>
              <span className="motion-mask overflow-hidden">
                <span className="motion-line inline-block text-[color:var(--text-primary)] drop-shadow-[0_0_30px_rgba(255,255,255,0.06)]" data-reveal-title>
                  STACK
                </span>
              </span>
            </h2>
          </div>

          {/* Grid of stacks */}
          <div className="flex flex-col gap-6">
            <div className="hero-metric-line-left flex flex-col gap-2.5 pl-6">
              <span className="font-display text-2xl font-black text-[color:var(--text-primary)]">Back-End</span>
              <div className="flex flex-wrap gap-2">
                {['C#', 'ASP.NET Core', 'Node.js', 'Python', 'Java'].map((s) => (
                  <SkillBadge key={s} label={s} accent="orange" />
                ))}
              </div>
            </div>
            <div className="hero-metric-line-left flex flex-col gap-2.5 pl-6">
              <span className="font-display text-2xl font-black text-[color:var(--text-primary)]">Front-End</span>
              <div className="flex flex-wrap gap-2">
                {['ReactJS', 'JavaScript', 'Bootstrap', 'Tailwind CSS'].map((s) => (
                  <SkillBadge key={s} label={s} accent="cyan" />
                ))}
              </div>
            </div>
            <div className="hero-metric-line-left flex flex-col gap-2.5 pl-6">
              <span className="font-display text-2xl font-black text-[color:var(--text-primary)]">Database</span>
              <div className="flex flex-wrap gap-2">
                {SKILLS.databases.map((s) => (
                  <SkillBadge key={s} label={s} accent="cyan" />
                ))}
              </div>
            </div>
          </div>

          {/* Summary & Tools (moved from Col 2) */}
          <div className="flex flex-col gap-5 border-t border-[color:var(--border-subtle)] pt-6 mt-2">
            <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]" data-reveal-desc>
              {OWNER.summary}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {SKILLS.tools.map((t) => (
                <div key={t} className="flex items-center gap-2" data-reveal-tool>
                  <span className="h-[1px] w-6 bg-[color:var(--accent-orange)]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--text-secondary)] font-mono">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Spacer for 3D Model (Takes 40% width) */}
        <div className="w-full md:w-[40%] h-[300px] md:h-[400px] pointer-events-none" />
      </div>
    </section>
  );
}
