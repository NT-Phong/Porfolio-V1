import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplineHeroScene from './hero/SplineHeroScene';
import { useMagneticElements } from '../hooks/useMagneticElements';
import { useLoading } from '../hooks/useLoading';

// Import Modular Sections
import HeroIntroSection from './sections/HeroIntroSection';
import TechnicalProfileSection from './sections/TechnicalProfileSection';
import ProjectsSection from './sections/ProjectsSection';
import CareerSection from './sections/CareerSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { revealApp } = useLoading();

  // Kích hoạt tương tác vi mô hút nam châm
  useMagneticElements();

  useEffect(() => {
    console.log("Hero: useEffect runs, revealApp =", revealApp);
    if (!revealApp) return;
    console.log("Hero: Entrance animation starts!");

    const ctx = gsap.context(() => {
      // 1. Initial settings to prevent instant flashes on load
      const headerEl = document.querySelector('.creative-header-wrap');
      
      gsap.set('.canvas-3d-container', { scale: 1.5, filter: 'blur(20px)', opacity: 0 });
      if (headerEl) {
        gsap.set(headerEl, { y: -50, scale: 1.08, opacity: 0 });
      }
      gsap.set('.gsap-left-col > *', { y: 35, opacity: 0 });
      gsap.set('.gsap-right-col > *', { y: 35, opacity: 0 });
      gsap.set('.gsap-social-icons > *', { y: 25, opacity: 0 });
      gsap.set('.gsap-side', { x: 30, opacity: 0 });

      // 2. Coordinated luxurious entrance timeline
      const entryTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      entryTl
        // Step A: Focus 3D Spline Model and slide down creative floating header
        .to('.canvas-3d-container', {
          scale: 1,
          filter: 'blur(0px)',
          opacity: 1,
          duration: 2.2,
          ease: 'power3.out'
        }, 0)
        .to(headerEl || [], {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.6,
          ease: 'back.out(1.2)'
        }, 0.2)
        // Step B: Stagger left column elements (Hello kicker, solid name, copy)
        .to('.gsap-left-col > *', {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1.2,
          ease: 'power4.out'
        }, 0.4)
        // Step C: Stagger right column elements (Creative kicker, fullstack developer, GPA, CTA)
        .to('.gsap-right-col > *', {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1.2,
          ease: 'power4.out'
        }, 0.6)
        // Step D: Social media icons slide up
        .to('.gsap-social-icons > *', {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 1.0,
          ease: 'power3.out'
        }, 0.8)
        // Step E: Side vertical calendar/role label slides in
        .to('.gsap-side', {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out'
        }, 1.0);

      // 2. Responsive detection
      const isDesktop = window.innerWidth > 768;

      // 2.5. Top Scroll Progress Bar Animation (Triggered stably on documentElement to prevent layout thrashing with pins)
      gsap.to('.scroll-progress-bar', {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.1,
        }
      });

      // 2.6. Active Navigation Link Tracker (HOME highlight)
      // Highly optimized: uses absolute scroll coordinates to completely avoid DOM recalculations
      ScrollTrigger.create({
        start: 0,
        end: 300,
        onToggle: (self) => {
          if (self.isActive) {
            document.querySelectorAll('.creative-menu a').forEach(a => a.classList.remove('active'));
            document.querySelectorAll('.creative-menu a[href="/"]').forEach(a => a.classList.add('active'));
          }
        }
      });

      const subSections = [
        { id: 'about', selector: '.creative-menu a[href="#about"]' },
        { id: 'projects', selector: '.creative-menu a[href="#projects"]' },
        { id: 'career', selector: '.creative-menu a[href="#projects"]' }, // Keep PROJECTS active during career experience
        { id: 'contact', selector: '.creative-menu a[href="#contact"]' }
      ];

      subSections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: 'top 40%',
          end: 'bottom 40%',
          onToggle: (self) => {
            if (self.isActive) {
              document.querySelectorAll('.creative-menu a').forEach(a => a.classList.remove('active'));
              document.querySelectorAll(sec.selector).forEach(a => a.classList.add('active'));
            }
          }
        });
      });

      // 3. Section 2 (About / My Stack) Pinning & Staged Reveal
      if (isDesktop) {
        const aboutTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#about',
            start: 'top top',
            end: '+=1200',
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
          }
        });

        aboutTl.fromTo('#about [data-reveal-title]', 
          { yPercent: 105, rotate: 3, opacity: 0 },
          { yPercent: 0, rotate: 0, opacity: 1, stagger: 0.1, ease: 'power4.out' }
        )
          .from('#about .hero-metric-line-left', { x: -50, opacity: 0, stagger: 0.15, ease: 'power3.out' }, '-=0.4')
          .from('#about [data-reveal-desc]', { y: 30, opacity: 0, ease: 'power3.out' }, '-=0.5')
          .from('#about [data-reveal-tool]', { scale: 0.8, opacity: 0, stagger: 0.08, ease: 'power3.out' }, '-=0.3');
      } else {
        gsap.fromTo('#about [data-reveal-title]',
          { yPercent: 100, rotate: 3, opacity: 0 },
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#about',
              start: 'top 85%',
            }
          }
        );
        gsap.from('#about .hero-metric-line-left', {
          x: -30,
          opacity: 0,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#about',
            start: 'top 75%',
          }
        });
      }

      // 4. Section 3 (Projects) Grid Reveal
      gsap.fromTo('#projects [data-reveal-title]',
        { yPercent: 105, rotate: -3, opacity: 0 },
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '#projects',
            start: 'top 85%',
          }
        }
      );

      gsap.from('#projects [data-project-card]', {
        y: 90,
        scale: 0.94,
        opacity: 0,
        filter: 'blur(12px)',
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-motion-group="cards"]',
          start: 'top 75%',
        }
      });

      // 4.3. Section Career Title Reveal
      gsap.fromTo('#career [data-reveal-title]',
        { yPercent: 105, rotate: 3, opacity: 0 },
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#career',
            start: 'top 85%',
          }
        }
      );

      // 4.5. Section Career Timeline & Scroll Animations
      gsap.fromTo(
        ".timeline-line-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 40%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
      
      gsap.fromTo(
        ".timeline-tracer-dot",
        { top: "0%" },
        {
          top: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 40%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );

      gsap.utils.toArray(".career-item").forEach((item: any) => {
        const left = item.querySelector(".career-left");
        const right = item.querySelector(".career-right");
        const year = item.querySelector(".career-year");
        const node = item.querySelector(".career-item-node");

        const itemTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 55%",
            toggleActions: "play none none reverse",
          },
        });

        if (left) {
          itemTl.fromTo(
            left,
            { x: -40, opacity: 0, filter: "blur(4px)" },
            { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power2.out" }
          );
        }
        if (right) {
          itemTl.fromTo(
            right,
            { x: 40, opacity: 0, filter: "blur(4px)" },
            { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power2.out" },
            0
          );
        }
        if (year) {
          itemTl.fromTo(
            year,
            { scale: 0.8, opacity: 0.4 },
            { scale: 1.1, opacity: 1, color: "var(--accent-orange)", duration: 0.4, ease: "back.out(1.5)" },
            0
          );
        }
        if (node) {
          itemTl.fromTo(
            node,
            { scale: 1, backgroundColor: "var(--bg-surface)", borderColor: "var(--border-strong)", boxShadow: "none" },
            {
              scale: 1.3,
              backgroundColor: "var(--accent-orange)",
              borderColor: "var(--accent-orange)",
              boxShadow: "0 0 12px var(--accent-orange)",
              duration: 0.4,
              ease: "back.out(1.5)",
            },
            0
          );
        }
      });

      // 5. Section 4 (Contact HUD) Pinning & Reveals
      if (isDesktop) {
        const contactTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#contact',
            start: 'top top',
            end: '+=1000',
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
          }
        });

        contactTl.fromTo('#contact [data-reveal-title]',
          { yPercent: 105, rotate: 3, opacity: 0 },
          { yPercent: 0, rotate: 0, opacity: 1, stagger: 0.1, ease: 'power4.out' }
        )
          .from('#contact .hero-hud-ring-1, #contact .hero-hud-ring-2, #contact .hero-hud-ring-3', { scale: 0.8, opacity: 0, ease: 'power3.out' }, 0)
          .to('#contact .hero-hud-ring-1', { rotation: 120 }, 0)
          .to('#contact .hero-hud-ring-2', { rotation: -90 }, 0)
          .to('#contact .hero-hud-ring-3', { rotation: 60 }, 0)
          .from('#contact [data-reveal-certifications]', { x: -60, opacity: 0, ease: 'power3.out' }, '-=0.4')
          .from('#contact [data-reveal-contact]', { x: 60, opacity: 0, ease: 'power3.out' }, '-=0.4');
      } else {
        gsap.fromTo('#contact [data-reveal-title]',
          { yPercent: 100, rotate: 3, opacity: 0 },
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#contact',
              start: 'top 85%',
            }
          }
        );
        gsap.from('#contact [data-reveal-certifications]', {
          x: -40,
          opacity: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#contact',
            start: 'top 75%',
          }
        });
        gsap.from('#contact [data-reveal-contact]', {
          x: 40,
          opacity: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#contact',
            start: 'top 70%',
          }
        });
      }
    }, containerRef.current || undefined);

    return () => ctx.revert();
  }, [revealApp]);

  return (
    <div ref={containerRef} className="hero-shell main-scroll-container relative w-full bg-bg-deep">
      {/* ── Fixed Scroll Progress Bar ── */}
      <div className="scroll-progress-bar" />

      {/* ── Sticky 3D Canvas ── */}
      <div className="fixed inset-0 z-[10] h-screen w-screen pointer-events-none canvas-3d-container">
        <div className="h-full w-full canvas-3d-inner">
          <SplineHeroScene />
        </div>
      </div>

      {/* ── Background Halo Glow (behind 3D model) ── */}
      <div className="fixed inset-0 z-[9] pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,rgba(242,92,5,0.04)_45%,rgba(5,7,12,0)_75%)] blur-[160px]" />
      </div>

      {/* Modular Section Rendering */}
      <HeroIntroSection />
      <TechnicalProfileSection />
      <ProjectsSection />
      <CareerSection />
      <ContactSection />
    </div>
  );
}
