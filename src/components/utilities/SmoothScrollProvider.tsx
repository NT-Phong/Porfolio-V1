import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLoading } from '../../hooks/useLoading';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const { isLoading } = useLoading();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Bỏ qua smooth scroll trên mobile để tối ưu hóa hiệu năng cuộn gốc
    if (window.innerWidth <= 768) return;

    const lenis = new Lenis({
      duration: 1.6, // Tăng duration để cuộn mượt và đằm hơn
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85, // Giảm nhẹ hệ số cuộn chuột để tốc độ cuộn chậm lại một chút
    });

    // Sync Lenis scroll updates with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    (window as any).lenis = lenis;
    lenisRef.current = lenis;

    // Ngay lập tức khóa cuộn nếu đang trong trạng thái tải trang
    if (isLoading) {
      lenis.stop();
    }

    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      (window as any).lenis = undefined;
      lenisRef.current = null;
      gsap.ticker.remove(updateRaf);
    };
  }, []);

  // Theo dõi trạng thái loading để bật/tắt cuộn mượt tương ứng
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (isLoading) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [isLoading]);

  return <>{children}</>;
}
