import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLoading } from '../../hooks/useLoading';

gsap.registerPlugin(useGSAP);

export default function DownloadResumeButton() {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const innerCoreRef = useRef<HTMLDivElement>(null);
  const iconWrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useLoading();

  useGSAP((context, contextSafe) => {
    if (!containerRef.current) return;
    
    // Set initial entry state (hidden and pushed down)
    gsap.set(containerRef.current, { y: 100, opacity: 0, scale: 0.9 });

    // Only play entry animation when loading screen is finished
    if (!isLoading) {
      gsap.to(containerRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.6,
        ease: 'elastic.out(1.1, 0.65)',
        delay: 0.3 // slight delay after loading screen disappears
      });
    }

    // Magnetic quickTo engines with beautiful spring physics
    const xTo = gsap.quickTo(containerRef.current, "x", { duration: 0.75, ease: "elastic.out(1.05, 0.4)" });
    const yTo = gsap.quickTo(containerRef.current, "y", { duration: 0.75, ease: "elastic.out(1.05, 0.4)" });
    
    const innerXTo = gsap.quickTo(innerCoreRef.current, "x", { duration: 0.8, ease: "power2.out" });
    const innerYTo = gsap.quickTo(innerCoreRef.current, "y", { duration: 0.8, ease: "power2.out" });

    const iconXTo = gsap.quickTo(iconWrapperRef.current, "x", { duration: 0.65, ease: "power2.out" });
    const iconYTo = gsap.quickTo(iconWrapperRef.current, "y", { duration: 0.65, ease: "power2.out" });
    
    const glowXTo = gsap.quickTo(glowRef.current, "x", { duration: 0.8, ease: "power3.out" });
    const glowYTo = gsap.quickTo(glowRef.current, "y", { duration: 0.8, ease: "power3.out" });

    const glowOpTo = gsap.quickTo(glowRef.current, "opacity", { duration: 0.5, ease: "power2.out" });

    if (!contextSafe) return;

    // Handle mouse movement for 3D Parallax Magnetic Physics
    const handleMouseMove = contextSafe((e: MouseEvent) => {
      if (isLoading) return;
      
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      
      // Pull outer container (button base)
      xTo(relX * 0.22);
      yTo(relY * 0.22);
      
      // Pull inner core (text layer)
      innerXTo(relX * 0.08);
      innerYTo(relY * 0.08);

      // Pull trailing icon button-in-button (higher kinetic pull)
      iconXTo(relX * 0.45);
      iconYTo(relY * 0.45);

      // Push liquid refraction glow background in the opposite direction (lens depth effect)
      glowXTo(-relX * 0.2);
      glowYTo(-relY * 0.2);
    });

    // Reset components to home position
    const handleMouseLeave = contextSafe(() => {
      xTo(0);
      yTo(0);
      innerXTo(0);
      innerYTo(0);
      iconXTo(0);
      iconYTo(0);
      glowXTo(0);
      glowYTo(0);
      // Reset glow to its breathing baseline orange opacity
      gsap.to(glowRef.current, { opacity: 0.65, duration: 0.5, ease: "power2.out" });
    });

    // Fade in liquid refraction glow to full intensity
    const handleMouseEnter = contextSafe(() => {
      if (isLoading) return;
      glowOpTo(1.0);
    });

    // Precise mechanical click haptics (mousedown / mouseup)
    const handleMouseDown = contextSafe(() => {
      gsap.to(containerRef.current, { scale: 0.93, duration: 0.15, ease: 'power2.out' });
      gsap.to(glowRef.current, { scale: 1.25, duration: 0.15, ease: 'power2.out' });
    });

    const handleMouseUp = contextSafe(() => {
      // Spring back bounce
      gsap.to(containerRef.current, { scale: 1.04, duration: 0.2, ease: 'power2.out' });
      gsap.to(containerRef.current, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.45)', delay: 0.15 });
      gsap.to(glowRef.current, { scale: 1.0, duration: 0.5, ease: 'power2.out' });
    });

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    containerRef.current.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current.addEventListener('mousedown', handleMouseDown);
    containerRef.current.addEventListener('mouseup', handleMouseUp);

    return () => {
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      containerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      containerRef.current?.removeEventListener('mousedown', handleMouseDown);
      containerRef.current?.removeEventListener('mouseup', handleMouseUp);
    };
  }, { scope: containerRef, dependencies: [isLoading] });

  return (
    <a
      ref={containerRef}
      href="/portfolio.pdf"
      download="CV_PhongDev.pdf"
      className="group fixed bottom-8 left-8 z-[60] flex items-center p-[1.8px] rounded-full bg-white/[0.02] backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.85)] border border-accent-orange/20 cursor-pointer overflow-hidden select-none"
      aria-label="Download Portfolio"
      style={{ opacity: 0 }} // Prevent visual flash before GSAP registers
    >
      {/* High-Tech Glowing Laser Sweep Border - 100% Electric Amber Orange (Spins slowly, speeds up on hover) */}
      <div className="absolute inset-0 rounded-full overflow-hidden p-[1px] pointer-events-none z-0">
        <div className="absolute inset-[-150%] animate-[spin_6s_linear_infinite] group-hover:animate-[spin_3s_linear_infinite] opacity-80 group-hover:opacity-100 transition-opacity duration-500 bg-[conic-gradient(from_0deg,transparent_20%,var(--accent-orange)_50%,transparent_80%,var(--accent-orange)_100%)] z-0" />
      </div>

      {/* Liquid Glass Refraction Glow Behind Core (Constantly pulses to attract attention, intensifies on hover) */}
      <div 
        ref={glowRef}
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-[rgba(var(--accent-orange-rgb),0.55)] via-[rgba(var(--accent-orange-rgb),0.25)] to-transparent opacity-[0.65] blur-xl pointer-events-none z-0 animate-[pulse_2.8s_ease-in-out_infinite] group-hover:animate-none group-hover:blur-lg"
      />

      {/* Double Bezel Inner Core (Machined hardware casing with warm amber-tint base) */}
      <div 
        ref={innerCoreRef}
        className="relative z-10 flex items-center justify-center gap-4 pl-5 pr-1.5 py-1.5 rounded-full bg-gradient-to-r from-[var(--bg-surface)]/95 via-[var(--bg-deep)]/97 to-[var(--bg-deep)]/98 border border-white/[0.05] group-hover:from-[var(--bg-surface-hover)]/95 group-hover:via-[var(--bg-surface)]/95 group-hover:to-[var(--bg-deep)]/98 transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
      >
        {/* Cybernetic Live Status Indicator - Vibrant Orange Pulsing Beacon */}
        <div className="relative flex h-2.5 w-2.5 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange/60 opacity-80"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-orange shadow-[0_0_12px_var(--accent-orange),0_0_4px_var(--accent-orange)]"></span>
        </div>

        {/* Technical Micro-Badge Typography & Orange Metadata Info */}
        <span className="font-mono tracking-[0.22em] text-[9px] font-bold text-text-primary/75 group-hover:text-text-primary transition-colors duration-300 flex items-center gap-2.5">
          <span>CV_PORTFOLIO.PDF</span>
          <span className="text-text-muted/30 font-normal">|</span>
          <span className="px-2 py-0.5 rounded-full text-[8.5px] font-bold bg-accent-orange/15 border border-accent-orange/25 text-accent-orange tracking-wider drop-shadow-[0_0_6px_rgba(var(--accent-orange-rgb),0.35)]">
            118KB
          </span>
        </span>
        
        {/* Trailing Icon (Button-in-Button Island with solid glowing Orange highlight) */}
        <div 
          ref={iconWrapperRef}
          className="w-8 h-8 rounded-full bg-accent-orange border border-accent-orange/30 text-white shadow-[0_0_12px_rgba(var(--accent-orange-rgb),0.45)] group-hover:bg-accent-orange-hover group-hover:shadow-[0_0_20px_rgba(var(--accent-orange-rgb),0.7),_inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-10"
        >
          {/* Mechanical Arrow-Reload Reveal Animation */}
          <div className="relative overflow-hidden w-3.5 h-3.5 flex flex-col items-center justify-center">
            {/* Primary Arrow (Slides down on hover) */}
            <svg
              className="w-3.5 h-3.5 text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:translate-y-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            {/* Secondary Arrow (Enters from top on hover) */}
            <svg
              className="w-3.5 h-3.5 absolute -top-5 text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:translate-y-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}
