import { useRef, useState } from 'react';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { OWNER } from '../../data/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutMeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  // Khởi chạy các hoạt ảnh cuộn
  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    // 1. Khởi tạo trạng thái ẩn ban đầu để cuộn hiển thị
    gsap.set(socialsRef.current ? socialsRef.current.children : [], { y: 20, opacity: 0 });
    gsap.set(avatarRef.current, { x: -80, opacity: 0, filter: 'blur(8px)', rotateY: -10 });
    gsap.set(textRef.current ? textRef.current.children : [], { x: 50, opacity: 0, filter: 'blur(6px)' });
    gsap.set(orbRef.current, { scale: 0, opacity: 0 });

    // 2. Tạo timeline ScrollTrigger reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom top', // Chỉ biến mất khi đã cuộn hoàn toàn qua section
        toggleActions: 'play reverse play reverse',
      }
    });

    tl.to(avatarRef.current, { x: 0, opacity: 1, filter: 'blur(0px)', rotateY: 0, duration: 1.0, ease: 'power3.out' })
      .to(textRef.current ? textRef.current.children : [], {
        x: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out'
      }, '-=0.6')
      .to(socialsRef.current ? socialsRef.current.children : [], {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out'
      }, '-=0.5')
      .to(orbRef.current, { scale: 1, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)' }, '-=0.8');

    // 3. Hiệu ứng bay bổng liên tục của Quả Cầu
    const orb = orbRef.current;
    if (orb) {
      gsap.to(orb, {
        y: '+=20',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about-me" className="hero-section-panel about-me-section relative z-20 flex min-h-[100dvh] w-full items-center justify-center px-6 py-24 md:px-24 overflow-hidden">
      {/* Hiệu ứng màu nền nhẹ cho phần này */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_40%,rgba(18,214,221,0.03)_0%,transparent_60%)] pointer-events-none" />

      {/* Quả Cầu Phát Sáng Thủy Tinh (Đã tách phần Hào quang cực mịn phía sau và quả cầu phía trước) */}
      <div 
        ref={orbRef}
        className="absolute top-24 right-[10%] w-16 h-16 pointer-events-none z-10 hidden md:block"
      >
        {/* Vầng hào quang mịn tỏa rộng phía sau */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none blur-[48px] opacity-60 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(18, 214, 221, 0.6) 0%, rgba(18, 214, 221, 0.15) 45%, transparent 75%)',
          }}
        />
        {/* Quả cầu thủy tinh vật lý phía trước */}
        <div 
          className="absolute inset-0 rounded-full border border-white/10 backdrop-blur-sm"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.18) 0%, rgba(18, 214, 221, 0.25) 55%, rgba(5, 7, 12, 0.5) 100%)',
            boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.25), 0 8px 16px rgba(0, 0, 0, 0.4)',
          }}
        />
      </div>

      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center justify-between relative z-10">
        
        {/* Cột Trái: Các liên kết mạng xã hội dọc + Ảnh chân dung Sci-Fi nâng cấp */}
        <div className="w-full md:w-[50%] flex items-center justify-center md:justify-start gap-8 md:gap-12">
          
          {/* Menu Mạng Xã Hội Dọc */}
          <div ref={socialsRef} className="flex flex-col items-center gap-6 justify-center">
            <a
              href={`https://${OWNER.github}`}
              target="_blank"
              rel="noreferrer"
              className="text-[color:var(--text-secondary)] hover:text-[color:var(--accent-orange)] transition-colors"
              data-motion="magnetic"
            >
              <Github size={20} strokeWidth={1.5} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-[color:var(--text-secondary)] hover:text-[color:var(--accent-orange)] transition-colors"
              data-motion="magnetic"
            >
              <Linkedin size={20} strokeWidth={1.5} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="text-[color:var(--text-secondary)] hover:text-[color:var(--accent-orange)] transition-colors"
              data-motion="magnetic"
            >
              <svg 
                viewBox="0 0 24 24" 
                width="18" 
                height="18" 
                fill="currentColor"
                className="transition-colors hover:text-[color:var(--accent-orange)]"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-[color:var(--text-secondary)] hover:text-[color:var(--accent-orange)] transition-colors"
              data-motion="magnetic"
            >
              <Instagram size={20} strokeWidth={1.5} />
            </a>
          </div>

          {/* Vùng chứa Ảnh chân dung thật và Khung hình Sci-Fi nâng cấp (To hơn 100%) */}
          <div ref={avatarRef} className="relative group flex items-center justify-center" style={{ perspective: '1000px' }}>
            
            {/* Lớp ánh sáng phát quang phía sau (Cyan & Orange backlight) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,26,0.18)_0%,rgba(18,214,221,0.08)_50%,transparent_100%)] blur-[50px] opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem] scale-110" />

            {/* Hộp bo viền Sci-Fi Glassmorphism (Kích thước to hơn 100%) */}
            <div className="relative rounded-[2rem] border border-white/5 bg-white/[0.01] p-3.5 backdrop-blur-md shadow-2xl transition-all duration-500 group-hover:border-white/10 group-hover:shadow-[0_30px_60px_rgba(255,122,26,0.12)] w-[300px] h-[380px] sm:w-[460px] sm:h-[560px] flex items-center justify-center">
              
              {/* Sci-Fi Corner Brackets */}
              {/* Top-Left Bracket */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[color:var(--accent-orange)] rounded-tl-[2rem] transition-colors duration-500 group-hover:border-[color:var(--accent-cyan)]" />
              {/* Top-Right Bracket */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[color:var(--accent-orange)] rounded-tr-[2rem] transition-colors duration-500 group-hover:border-[color:var(--accent-cyan)]" />
              {/* Bottom-Left Bracket */}
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[color:var(--accent-orange)] rounded-bl-[2rem] transition-colors duration-500 group-hover:border-[color:var(--accent-cyan)]" />
              {/* Bottom-Right Bracket */}
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[color:var(--accent-orange)] rounded-br-[2rem] transition-colors duration-500 group-hover:border-[color:var(--accent-cyan)]" />

              {/* Technical Labels (Sci-Fi Overlay) */}
              <div className="absolute top-3 left-6 z-20 flex items-center gap-1.5 pointer-events-none opacity-45 group-hover:opacity-75 transition-opacity duration-500">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent-orange)] animate-pulse" />
                <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-white">
                  SYS_BIO.REF // VER_1.0
                </span>
              </div>
              <div className="absolute bottom-3 right-6 z-20 pointer-events-none opacity-45 group-hover:opacity-75 transition-opacity duration-500">
                <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-white">
                  LOC.SYS_EST: VN
                </span>
              </div>

              {/* Animated Scanner Laser Line */}
              <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[color:var(--accent-cyan)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-scanner-line pointer-events-none z-20" />

              {/* Real Portrait Image */}
              <img
                src="/assets/images/avatars/avatar-2-isolated.png"
                alt="Portrait Photo"
                className="w-full h-full object-cover rounded-[1.6rem] filter saturate-[0.82] contrast-[1.05] transition-all duration-700 group-hover:scale-[1.02] group-hover:saturate-100"
              />
            </div>
            
            {/* Lớp lưới kỹ thuật ảo ảnh mờ */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:16px_16px] rounded-[2rem] pointer-events-none border border-transparent group-hover:border-white/5 transition-all duration-500" />
          </div>

        </div>

        {/* Cột Phải: Đoạn tự giới thiệu */}
        <div ref={textRef} className="w-full md:w-[48%] flex flex-col gap-6 text-left">
          
          <div className="flex items-center gap-3">
            <span className="status-dot-cyan animate-pulse" />
            <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[color:var(--accent-cyan)]">
              // 01.5 / ABOUT ME
            </span>
          </div>

          <p className="font-sans text-xl sm:text-2xl md:text-3xl text-[color:var(--text-primary)] leading-[1.35] tracking-tight font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            I'm a <span className="font-serif italic font-normal text-[color:var(--accent-orange)]">creative developer</span> & <span className="font-serif italic font-normal text-[color:var(--accent-orange)]">designer</span> with a passion for blending technical expertise with creative edge.
          </p>

          <p className="text-sm leading-relaxed text-[color:var(--text-secondary)] font-normal border-l border-[color:var(--accent-cyan)]/20 pl-5">
            Driven by curiosity, I always try to explore and learn new skills to push the boundaries of what is possible on the web. Crafting unique interactive experiences, cinematically styling interfaces, and optimizing performances are core values of my workflow.
          </p>

        </div>

      </div>
    </section>
  );
}
