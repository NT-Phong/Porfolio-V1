import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playClickSound } from '../utilities/clickSound';
import { scrollToSection } from '../utilities/scrollNavigation';

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  { id: 'hero', title: 'SYS_INIT', num: '01' },
  { id: 'about', title: 'TECH_SPEC', num: '02' },
  { id: 'about-me', title: 'BIO_DATA', num: '03' },
  { id: 'career', title: 'LOG_BOOK', num: '04' },
  { id: 'projects', title: 'EXP_WORK', num: '05' },
  { id: 'contact', title: 'COM_LINK', num: '06' }
];

export default function StoryChapterHUD() {
  useGSAP(() => {
    const triggers: ScrollTrigger[] = [];

    CHAPTERS.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => {
          const hudEl = document.querySelector(`.hud-dot[data-chapter="${ch.id}"]`);
          const labelEl = document.querySelector(`.hud-label[data-chapter="${ch.id}"]`);
          if (self.isActive) {
            hudEl?.classList.add('is-active');
            labelEl?.classList.add('is-active');
          } else {
            hudEl?.classList.remove('is-active');
            labelEl?.classList.remove('is-active');
          }
        }
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []);

  const handleClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    playClickSound();
    
    // Custom mapping for home navigation
    if (id === 'hero') {
      const smoother = (window as any).smoother;
      const lenis = (window as any).lenis;
      if (smoother) {
        smoother.scrollTo(0, true);
      } else if (lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      scrollToSection(id as any);
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col gap-5 pointer-events-none select-none">
      {CHAPTERS.map((ch) => (
        <a
          key={ch.id}
          href={`#${ch.id}`}
          onClick={(e) => handleClick(ch.id, e)}
          className="group flex items-center justify-end gap-3.5 cursor-pointer pointer-events-auto text-decoration-none"
        >
          {/* Label on the left of the dot */}
          <span 
            className="hud-label font-mono text-[8px] font-bold tracking-widest text-[color:var(--text-secondary)] opacity-35 group-hover:opacity-100 group-hover:text-[color:var(--accent-orange)] transition-all duration-300 text-right" 
            data-chapter={ch.id}
          >
            {ch.num} // {ch.title}
          </span>

          {/* Indicator Dot */}
          <div className="relative flex items-center justify-center w-4 h-4">
            <div 
              className="hud-dot absolute w-2 h-2 rounded-full border border-white/15 transition-all duration-300 group-hover:border-[color:var(--accent-orange)] group-hover:bg-[color:var(--accent-orange)]/25" 
              data-chapter={ch.id} 
            />
          </div>
        </a>
      ))}

      {/* Styled states */}
      <style>{`
        .hud-label.is-active {
          opacity: 1 !important;
          color: var(--accent-orange) !important;
          text-shadow: 0 0 15px rgba(255, 122, 26, 0.4);
          transform: translateX(-2px);
        }
        .hud-dot.is-active {
          border-color: var(--accent-orange) !important;
          background-color: var(--accent-orange) !important;
          box-shadow: 0 0 10px var(--accent-orange);
          transform: scale(1.25);
        }
      `}</style>
    </div>
  );
}
