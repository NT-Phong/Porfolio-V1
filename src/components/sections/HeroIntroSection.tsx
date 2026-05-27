import { Github, MapPin, Linkedin, Twitter, Instagram, ArrowRight } from 'lucide-react';
import { OWNER, EDUCATION } from '../../data/portfolio';
import ScrambleText from '../utilities/ScrambleText';

export default function HeroIntroSection() {

  return (
    <section className="relative z-20 flex min-h-[100dvh] w-full flex-col font-sans overflow-hidden">
      {/* Wordmark */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
        <h1 className="portfolio-wordmark gsap-scale font-display text-[18vw] font-black uppercase leading-none tracking-tighter opacity-[0.03] md:text-[220px]">
          PHONG
        </h1>
      </div>

      {/* Hero Main Content */}
      <main className="relative z-30 flex flex-1 flex-col justify-center px-6 md:px-12 pb-16 md:grid md:grid-cols-[80px_1fr_1.2fr_1fr] md:items-center md:gap-4">
        
        {/* Social Icons (Far Left) */}
        <div className="gsap-social-icons flex flex-row md:flex-col items-center justify-start gap-6 md:gap-8 mb-8 md:mb-0 md:self-end md:pb-8">
          <a
            href={`https://${OWNER.github}`}
            target="_blank"
            rel="noreferrer"
            className="social-icon-link"
            data-motion="magnetic"
          >
            <Github size={22} strokeWidth={1.5} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="social-icon-link"
            data-motion="magnetic"
          >
            <Linkedin size={22} strokeWidth={1.5} />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="social-icon-link"
            data-motion="magnetic"
          >
            <Twitter size={22} strokeWidth={1.5} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="social-icon-link"
            data-motion="magnetic"
          >
            <Instagram size={22} strokeWidth={1.5} />
          </a>
        </div>

        {/* Left Content (Name) */}
        <div className="gsap-left-col flex flex-col justify-center gap-4 text-left select-none z-40">
          <div>
            <div className="font-serif italic text-lg tracking-wide text-[color:var(--accent-orange)] normal-case mb-1" data-motion="hero-kicker">
              <ScrambleText text="Hello! I'm" />
            </div>
            <div className="relative flex flex-col items-start leading-[0.8]">
              {/* Background hollow name */}
              <h2 
                className="font-display text-5xl md:text-8xl font-black uppercase tracking-tighter" 
                data-motion="hero-title"
                style={{
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.12)',
                  color: 'transparent',
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)',
                  WebkitBackgroundClip: 'text',
                  opacity: 0.95
                }}
              >
                NGUYEN
              </h2>
              {/* Foreground solid name, overlapping */}
              <h2 
                className="font-display text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mt-[-0.8rem] md:mt-[-2rem] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]" 
                data-motion="hero-title"
              >
                THANH PHONG
              </h2>
            </div>
          </div>
          
          <p className="text-[color:var(--text-secondary)] text-sm font-medium max-w-xs leading-relaxed mt-2" data-motion="hero-copy">
            {OWNER.tagline}
          </p>

          <div className="flex flex-col gap-3 mt-4 font-mono">
            <div className="flex items-center gap-2 text-xs text-[color:var(--text-muted)]">
              <MapPin size={14} className="text-[color:var(--accent-cyan)]" />
              <span>{OWNER.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent-cyan)] animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[color:var(--accent-cyan)]">
                Available for Internship
              </span>
            </div>
          </div>
        </div>

        {/* Center (Spacer for 3D model) */}
        <div className="hidden md:block pointer-events-none" />

        {/* Right Content (Roles & CTA) */}
        <div className="gsap-right-col flex flex-col justify-center items-start gap-6 text-left mt-8 md:mt-0 select-none z-40">
          <div className="flex flex-col items-start">
            <div className="font-serif italic text-lg tracking-wide text-[color:var(--accent-orange)] normal-case mb-1" data-motion="hero-kicker">
              <ScrambleText text="A Creative" />
            </div>
            <div className="relative flex flex-col items-start leading-[0.8]">
              {/* Background hollow role */}
              <h2 
                className="font-display text-5xl md:text-8xl font-black uppercase tracking-tighter" 
                data-motion="hero-title"
                style={{
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.12)',
                  color: 'transparent',
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)',
                  WebkitBackgroundClip: 'text',
                  opacity: 0.95
                }}
              >
                FULL-STACK
              </h2>
              {/* Foreground solid role, overlapping */}
              <h2 
                className="font-display text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mt-[-0.8rem] md:mt-[-2rem] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]" 
                data-motion="hero-title"
              >
                DEVELOPER
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-start gap-1.5 mt-2 font-mono">
            <span className="text-4xl font-black text-[color:var(--accent-orange)] tracking-tight">{EDUCATION.gpa}</span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-[color:var(--text-muted)]">GPA · HUTECH</span>
            <span className="text-[9px] text-[color:var(--text-muted)]">{EDUCATION.period}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-4 w-full md:w-auto">
            <a
              href={`mailto:${OWNER.email}`}
              className="hero-cta-btn group relative flex items-center justify-between gap-6 cursor-pointer rounded-full bg-gradient-to-r from-[color:var(--accent-orange)] to-[color:var(--accent-orange-hover)] pl-8 pr-3 py-3 text-xs font-extrabold uppercase tracking-widest text-white shadow-[var(--shadow-orange)] w-full md:w-auto"
              data-motion="magnetic"
            >
              <span>HIRE ME</span>
              <span className="hero-cta-btn-arrow w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                <ArrowRight size={14} />
              </span>
            </a>
          </div>
        </div>

      </main>

      {/* Side Label */}
      <div className="gsap-side absolute top-1/2 right-4 md:right-8 z-40 hidden -translate-y-1/2 flex-col items-center md:flex">
        <div className="origin-center rotate-90 whitespace-nowrap">
          <span className="text-[color:var(--text-muted)] text-[9px] font-bold uppercase tracking-[0.5em]">
            {OWNER.role} · {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </section>
  );
}
