import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OWNER, SKILLS } from '../../data/portfolio';
import SkillBadge from '../ui/SkillBadge';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function TechnicalProfileSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // 0. Parallax Background Gradient Wash
    gsap.to('.parallax-bg', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    // 1. Kicker Animation with Line Expand
    const kickerTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      }
    });
    
    kickerTl.to('.kicker-line', {
      width: '40px',
      duration: 1,
      ease: 'expo.out',
    }).fromTo(
      '.kicker-text',
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      "-=0.6"
    );

    // 2. Cinematic Title Animation (Blur + 3D Rotation)
    gsap.fromTo(
      '[data-reveal-title]',
      { y: '120%', rotationZ: 3, opacity: 0, filter: 'blur(10px)' },
      {
        y: '0%',
        rotationZ: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );

    // 3. Skills Categories 3D Staggered Reveal
    gsap.fromTo(
      '.skill-category',
      { opacity: 0, y: 80, rotationX: -15, filter: 'blur(8px)' },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.categories-grid',
          start: 'top 80%',
        }
      }
    );

    // 4. Badges Micro-Interactions (Pop in)
    gsap.fromTo(
      '.skill-badge-item',
      { opacity: 0, scale: 0, rotation: -10 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '.categories-grid',
          start: 'top 70%',
        }
      }
    );

    // 5. Profile Summary Text Scrubbing (Word by Word)
    gsap.fromTo(
      '.summary-word',
      { opacity: 0.1, y: 10 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: '.profile-summary',
          start: 'top 90%',
          end: 'bottom 70%',
          scrub: 1,
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="about" className="hero-section-panel section-2 relative z-20 flex min-h-[100dvh] w-full items-center justify-center px-6 py-24 md:px-24 overflow-hidden">
      
      {/* Decorative Parallax Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="parallax-bg absolute top-[-20%] left-0 w-full h-[140%] bg-[radial-gradient(circle_at_20%_30%,_rgba(18,214,221,0.03)_0%,_transparent_50%),radial-gradient(circle_at_80%_80%,_rgba(255,122,26,0.03)_0%,_transparent_50%)]" />
      </div>

      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-12 justify-between items-center relative z-10">
        
        {/* Left Content Area */}
        <div className="w-full md:w-[55%] flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="kicker-wrapper flex items-center gap-3">
              <span className="kicker-line w-0 h-[1px] bg-[color:var(--accent-cyan)]" />
              <div className="kicker-text flex items-center gap-3">
                <span className="status-dot-cyan animate-pulse" />
                <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[color:var(--accent-cyan)]">
                  // 01 / TECHNICAL PROFILE
                </span>
              </div>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] text-[color:var(--text-primary)] tracking-tighter flex flex-col mt-2">
              <span className="motion-mask overflow-hidden py-1">
                <span className="motion-line inline-block text-transparent [-webkit-text-stroke:1.5px_rgba(248,250,252,0.2)] origin-bottom-left" data-reveal-title>
                  MY
                </span>
              </span>
              <span className="motion-mask overflow-hidden py-1">
                <span className="motion-line inline-block text-[color:var(--text-primary)] drop-shadow-[0_0_30px_rgba(255,255,255,0.06)] origin-bottom-left" data-reveal-title>
                  STACK
                </span>
              </span>
            </h2>
          </div>

          {/* Categories Grid with Perspective for 3D transforms */}
          <div className="flex flex-col gap-10 w-full">
            <div className="categories-grid grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12 w-full" style={{ perspective: '1000px' }}>
              
              {/* Category 1: Back-End */}
              <div className="skill-category pl-6 border-l-[1.5px] border-white/15 hover:border-[color:var(--accent-orange)]/40 transition-colors duration-500 flex flex-col gap-2 group/skill">
                <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-[color:var(--text-secondary)]/40 uppercase select-none">
                  [ 01 // BACK-END ]
                </span>
                <h3 className="font-display text-xl font-black text-[color:var(--text-primary)] group-hover/skill:text-[color:var(--accent-orange)] transition-colors duration-300">
                  Back-End
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {SKILLS.backend.map((s) => (
                    <div key={s} className="skill-badge-item">
                      <SkillBadge label={s} accent="orange" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 2: Front-End */}
              <div className="skill-category pl-6 border-l-[1.5px] border-white/15 hover:border-[color:var(--accent-cyan)]/40 transition-colors duration-500 flex flex-col gap-2 group/skill">
                <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-[color:var(--text-secondary)]/40 uppercase select-none">
                  [ 02 // FRONT-END ]
                </span>
                <h3 className="font-display text-xl font-black text-[color:var(--text-primary)] group-hover/skill:text-[color:var(--accent-cyan)] transition-colors duration-300">
                  Front-End
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {SKILLS.frontend.map((s) => (
                    <div key={s} className="skill-badge-item">
                      <SkillBadge label={s} accent="cyan" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 3: Database */}
              <div className="skill-category pl-6 border-l-[1.5px] border-white/15 hover:border-[color:var(--accent-cyan)]/40 transition-colors duration-500 flex flex-col gap-2 group/skill">
                <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-[color:var(--text-secondary)]/40 uppercase select-none">
                  [ 03 // DATABASE ]
                </span>
                <h3 className="font-display text-xl font-black text-[color:var(--text-primary)] group-hover/skill:text-[color:var(--accent-cyan)] transition-colors duration-300">
                  Database
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {SKILLS.databases.map((s) => (
                    <div key={s} className="skill-badge-item">
                      <SkillBadge label={s} accent="cyan" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 4: Tools & Environment */}
              <div className="skill-category pl-6 border-l-[1.5px] border-white/15 hover:border-[color:var(--accent-orange)]/40 transition-colors duration-500 flex flex-col gap-2 group/skill">
                <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-[color:var(--text-secondary)]/40 uppercase select-none">
                  [ 04 // ENVIRONMENT ]
                </span>
                <h3 className="font-display text-xl font-black text-[color:var(--text-primary)] group-hover/skill:text-[color:var(--accent-orange)] transition-colors duration-300">
                  Tools & Deployments
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {SKILLS.tools.map((s) => (
                    <div key={s} className="skill-badge-item">
                      <SkillBadge label={s} accent="orange" />
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Profile Summary with Scrubbing Effect */}
            <div className="profile-summary flex flex-col gap-4 border-t border-white/5 pt-8 mt-4 w-full">
              <span className="font-mono text-[9px] font-bold tracking-[0.22em] text-[color:var(--accent-orange)] uppercase select-none">
                [ PROFILE SUMMARY ]
              </span>
              <p className="text-sm leading-relaxed text-[color:var(--text-secondary)] max-w-2xl flex flex-wrap gap-x-[0.25em]" data-reveal-desc>
                {OWNER.summary.split(' ').map((word, i) => (
                  <span key={i} className="summary-word inline-block">{word}</span>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* Right Spacer for 3D Model */}
        <div className="w-full md:w-[40%] h-[300px] md:h-[400px] pointer-events-none" />
      </div>
    </section>
  );
}
