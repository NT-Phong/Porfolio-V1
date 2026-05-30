import type { SectionAnchor } from '../../lib/navigation';

export function scrollToSection(section: SectionAnchor) {
  if (typeof window === 'undefined') {
    return;
  }

  const smoother = (window as any).smoother;
  const lenis = (window as any).lenis;
  const targetElement = document.getElementById(section);

  if (targetElement) {
    if (smoother) {
      smoother.scrollTo(targetElement, true, 'top top');
    } else if (lenis) {
      lenis.scrollTo(targetElement, { 
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Expo out
      });
    } else {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

export function scrollToHomeTop() {
  if (typeof window === 'undefined') {
    return;
  }

  const smoother = (window as any).smoother;
  const lenis = (window as any).lenis;

  if (smoother) {
    smoother.scrollTo(0, true);
  } else if (lenis) {
    lenis.scrollTo(0, { 
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
