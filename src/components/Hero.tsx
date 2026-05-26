import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplineHeroScene from './hero/SplineHeroScene';
import { useMagneticElements } from '../hooks/useMagneticElements';

// Import Modular Sections
import HeroIntroSection from './sections/HeroIntroSection';
import TechnicalProfileSection from './sections/TechnicalProfileSection';
import ProjectsSection from './sections/ProjectsSection';
import CareerSection from './sections/CareerSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Kích hoạt tương tác vi mô hút nam châm
  useMagneticElements();

  useGSAP(
    () => {
      // 1. Entrance timeline
      const entryTl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.4 } });

      entryTl.from('.gsap-fade-down', { y: -30, opacity: 0, stagger: 0.1 })
        .from('.gsap-social-icons > *', { y: 20, opacity: 0, stagger: 0.1 }, '-=0.8')
        .from('.gsap-left-col', { x: -50, opacity: 0 }, '-=0.8')
        .from('.gsap-right-col', { x: 50, opacity: 0 }, '-=0.8')
        .from('.gsap-scale', { scale: 0.8, opacity: 0, duration: 1.5 }, '-=1.2')
        .from('.gsap-side', { x: 30, opacity: 0 }, '-=1');

      // 2. Responsive detection
      const isDesktop = window.innerWidth > 768;

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

        aboutTl.from('#about [data-reveal-title]', { yPercent: 105, rotate: 3, opacity: 0, stagger: 0.1, ease: 'power4.out' })
          .from('#about .hero-metric-line-left', { x: -50, opacity: 0, stagger: 0.15, ease: 'power3.out' }, '-=0.4')
          .from('#about [data-reveal-desc]', { y: 30, opacity: 0, ease: 'power3.out' }, '-=0.5')
          .from('#about [data-reveal-tool]', { scale: 0.8, opacity: 0, stagger: 0.08, ease: 'power3.out' }, '-=0.3');
      } else {
        gsap.from('#about [data-reveal-title]', {
          yPercent: 100,
          rotate: 3,
          opacity: 0,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#about',
            start: 'top 85%',
          }
        });
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
      gsap.from('#projects [data-reveal-title]', {
        yPercent: 105,
        rotate: -3,
        opacity: 0,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 85%',
        }
      });

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

        contactTl.from('#contact [data-reveal-title]', { yPercent: 105, rotate: 3, opacity: 0, stagger: 0.1, ease: 'power4.out' })
          .from('#contact .hero-hud-ring-1, #contact .hero-hud-ring-2, #contact .hero-hud-ring-3', { scale: 0.8, opacity: 0, ease: 'power3.out' }, 0)
          .to('#contact .hero-hud-ring-1', { rotation: 120 }, 0)
          .to('#contact .hero-hud-ring-2', { rotation: -90 }, 0)
          .to('#contact .hero-hud-ring-3', { rotation: 60 }, 0)
          .from('#contact [data-reveal-certifications]', { x: -60, opacity: 0, ease: 'power3.out' }, '-=0.4')
          .from('#contact [data-reveal-contact]', { x: 60, opacity: 0, ease: 'power3.out' }, '-=0.4');
      } else {
        gsap.from('#contact [data-reveal-title]', {
          yPercent: 100,
          rotate: 3,
          opacity: 0,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#contact',
            start: 'top 85%',
          }
        });
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
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="hero-shell main-scroll-container relative w-full bg-bg-deep">
      {/* ── Sticky 3D Canvas ── */}
      <div className="fixed inset-0 z-[10] h-screen w-screen pointer-events-none 3d-canvas-container">
        <div className="h-full w-full 3d-canvas-inner">
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
