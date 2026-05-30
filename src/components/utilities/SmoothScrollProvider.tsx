import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useLoading } from '../../hooks/useLoading';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const { isLoading } = useLoading();
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [isReady, setIsReady] = useState(false);

  // Monitor screen size to toggle engines responsively
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth > 768;
      setIsDesktop(desktop);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Initialize and destroy scroll smoothing engines based on platform
  useEffect(() => {
    setIsReady(false); // Unmount children during engine switch to rebuild ScrollTriggers

    if (isDesktop) {
      // 1. Desktop: GSAP ScrollSmoother
      console.log('SmoothScroll: Initializing GSAP ScrollSmoother for Desktop');
      
      const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.5, // Smooth scrolling factor
        effects: true, // Enables data-speed and data-lag parallax effects
        normalizeScroll: true, // Standardizes scroll across all touch and trackpad inputs
      });

      smootherRef.current = smoother;
      (window as any).smoother = smoother;

      if (isLoading) {
        smoother.paused(true);
      }

      setIsReady(true); // Mount children AFTER ScrollSmoother is created

      return () => {
        console.log('SmoothScroll: Destroying GSAP ScrollSmoother');
        smoother.kill();
        smootherRef.current = null;
        (window as any).smoother = undefined;
      };
    } else {
      // 2. Mobile: Lenis
      console.log('SmoothScroll: Initializing Lenis for Mobile');
      
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
      });

      lenis.on('scroll', ScrollTrigger.update);
      lenisRef.current = lenis;
      (window as any).lenis = lenis;

      if (isLoading) {
        lenis.stop();
      }

      const updateRaf = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(updateRaf);
      gsap.ticker.lagSmoothing(0);

      setIsReady(true); // Mount children AFTER Lenis is created

      return () => {
        console.log('SmoothScroll: Destroying Lenis');
        lenis.destroy();
        lenisRef.current = null;
        (window as any).lenis = undefined;
        gsap.ticker.remove(updateRaf);
      };
    }
  }, [isDesktop]);

  // Sync loading state with scroll lock/unlock
  useEffect(() => {
    if (!isReady) return;

    if (isDesktop) {
      const smoother = smootherRef.current;
      if (!smoother) return;

      if (isLoading) {
        smoother.paused(true);
      } else {
        smoother.paused(false);
        // Delay ScrollTrigger refresh slightly to allow loading screen exit animation to complete
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 400);
      }
    } else {
      const lenis = lenisRef.current;
      if (!lenis) return;

      if (isLoading) {
        lenis.stop();
      } else {
        lenis.start();
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 400);
      }
    }
  }, [isLoading, isReady, isDesktop]);

  return (
    <div id="smooth-wrapper" style={{ position: 'relative', zIndex: 10 }}>
      <div id="smooth-content">
        {isReady && children}
      </div>
    </div>
  );
}
