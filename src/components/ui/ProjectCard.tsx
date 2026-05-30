import { useRef, useState, useEffect } from 'react';
import { Github, ArrowUpRight } from 'lucide-react';
import SkillBadge from './SkillBadge';
import { playClickSound } from '../utilities/clickSound';
import ScrambleText from '../utilities/ScrambleText';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  name: string;
  subtitle: string;
  period: string;
  role: string;
  stack: readonly string[];
  description: string;
  highlights: readonly string[];
  github: string;
  demoUrl?: string;
  videoUrl?: string;
  tag: string;
  accent: string;
  layout: string;
  image: string;
}

interface ProjectCardProps {
  project: Project;
  isSectionActive: boolean;
  onExplore: () => void;
}

export default function ProjectCard({ project, isSectionActive, onExplore }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isVideoActive, setIsVideoActive] = useState(false);

  const isOrange = project.accent === 'orange';
  const accentVar = isOrange ? 'var(--accent-orange)' : 'var(--accent-cyan)';

  // Lớp chiều cao tương ứng cho bố cục Bento trên Desktop
  const layoutClasses = {
    wide: 'lg:col-span-2 h-[520px]',
    tall: 'lg:row-span-2 lg:col-span-1 h-[520px] lg:h-[1080px]',
    normal: 'lg:col-span-1 h-[520px]',
  }[project.layout] || 'lg:col-span-1 h-[520px]';

  // Lớp đệm đè lên vùng Media để chừa khoảng trống cho hộp chữ trượt ở dưới
  const mediaPaddingClasses = {
    wide: 'pb-[180px] lg:pb-[190px] pt-10 px-10',
    tall: 'pb-[300px] lg:pb-[440px] pt-10 px-8',
    normal: 'pb-[220px] lg:pb-[260px] pt-10 px-8',
  }[project.layout] || 'pb-[260px] pt-10 px-8';

  // Quản lý phát/tải video dựa trên trạng thái của section dự án để tối ưu hóa băng thông
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isSectionActive && project.videoUrl) {
      // Thiết lập nguồn và bắt đầu tải video
      video.src = project.videoUrl;
      video.load();
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Trình duyệt có thể chặn tự động phát trước khi người dùng tương tác, điều này là bình thường
          console.warn("Autoplay blocked or interrupted:", err);
        });
      }
    } else {
      // Tắt và huỷ tải video ngay lập tức khi cuộn ra ngoài để tiết kiệm dung lượng
      video.pause();
      video.removeAttribute('src');
      try {
        video.load();
      } catch (e) {
        // bỏ qua lỗi load
      }
      setIsVideoActive(false);
    }

    return () => {
      // Dọn dẹp khi component unmount
      video.pause();
      video.removeAttribute('src');
      try {
        video.load();
      } catch (e) {
        // bỏ qua
      }
    };
  }, [isSectionActive, project.videoUrl]);

  useGSAP(() => {
    if (!containerRef.current) return;
    const card = containerRef.current;
    const media = mediaRef.current;

    // 1. Page Scroll Parallax (Nền trượt theo cuộn trang)
    let scrollTriggerInstance: ScrollTrigger | null = null;
    if (media) {
      const pAnim = gsap.fromTo(media,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.3,
            invalidateOnRefresh: true,
          }
        }
      );
      scrollTriggerInstance = pAnim.scrollTrigger || null;
    }

    // 2. 3D Mouse Tilt & Mouse Parallax (Xoay 3D & trượt nền nhẹ theo chuột)
    const xTo = gsap.quickTo(card, 'rotateY', { duration: 0.5, ease: 'power2.out' });
    const yTo = gsap.quickTo(card, 'rotateX', { duration: 0.5, ease: 'power2.out' });
    const mediaXTo = media ? gsap.quickTo(media, 'x', { duration: 0.7, ease: 'power2.out' }) : null;
    const mediaYTo = media ? gsap.quickTo(media, 'y', { duration: 0.7, ease: 'power2.out' }) : null;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleY = ((mouseX - centerX) / centerX) * 5; // max 5 độ
      const angleX = ((mouseY - centerY) / centerY) * -5; // max 5 độ
      
      xTo(angleY);
      yTo(angleX);

      if (mediaXTo && mediaYTo) {
        const moveX = ((mouseX - centerX) / centerX) * -12;
        const moveY = ((mouseY - centerY) / centerY) * -12;
        mediaXTo(moveX);
        mediaYTo(moveY);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      if (mediaXTo && mediaYTo) {
        mediaXTo(0);
        mediaYTo(0);
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={`group relative p-1.5 rounded-[2.5rem] border border-white/[0.04] bg-white/[0.01] transition-all duration-500 cursor-pointer select-none overflow-hidden ${layoutClasses}`}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
      data-motion="card"
      data-project-card
      onClick={onExplore}
    >
      {/* Lớp lõi trong (Inner Core Bezel Enclosure) */}
      <div className="relative w-full h-full rounded-[calc(2.5rem-0.375rem)] overflow-hidden border border-white/[0.05] bg-[color:var(--bg-surface)]/20 transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
        
        {/* Lớp viền sáng tinh tế xuất hiện khi hover */}
        <div 
          className="absolute inset-0 z-30 rounded-[calc(2.5rem-0.375rem)] border border-transparent transition-all duration-500 pointer-events-none group-hover:border-white/10"
          style={{
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        />

        {/* ── Background Media: Blurred Backdrop Mirror + Foreground Contain ── */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[calc(2.5rem-0.375rem)]">
        {/* 1. Blurred Backdrop (Glow Ambient) - Tối ưu hoá chỉ dùng ảnh tĩnh */}
        <div className="absolute inset-0 filter blur-3xl opacity-35 scale-110 pointer-events-none z-0">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 2. Foreground Sharp Contained Media (Đúng tỷ lệ video gốc, chừa không gian đệm ở đáy) */}
        <div 
          ref={mediaRef} 
          className={`absolute inset-0 w-full h-[116%] -top-[8%] z-10 flex items-center justify-center will-change-transform ${mediaPaddingClasses}`}
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            {/* Fallback Cover Image */}
            <img
              src={project.image}
              alt={project.name}
              className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 group-hover:scale-[1.03] ${
                isVideoActive ? 'opacity-0' : 'opacity-100'
              }`}
            />

            {/* Video Player */}
            {project.videoUrl && (
              <video
                ref={videoRef}
                loop
                muted
                playsInline
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 group-hover:scale-[1.03] ${
                  isVideoActive ? 'opacity-100' : 'opacity-0'
                }`}
                onPlaying={() => setIsVideoActive(true)}
                onPause={() => setIsVideoActive(false)}
                onWaiting={() => setIsVideoActive(false)}
              />
            )}
          </div>
        </div>
        
        {/* Lớp lưới kỹ thuật ảo ảnh mờ */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-20" />
      </div>

      {/* ── Top Row: Tag phân loại & Thời hạn (Cố định góc trên) ── */}
      <div 
        className="absolute top-8 left-8 right-8 z-20 flex items-center justify-between pointer-events-none"
        style={{ transform: 'translateZ(20px)' }}
      >
        <span 
          className="rounded-full border px-3.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em] font-mono transition-all duration-300 group-hover:border-current"
          style={{
            borderColor: isOrange ? 'rgba(255,122,26,0.3)' : 'rgba(18,214,221,0.3)',
            color: accentVar,
            backgroundColor: isOrange ? 'rgba(255,122,26,0.05)' : 'rgba(18,214,221,0.05)',
          }}
        >
          {project.tag}
        </span>
        <span className="font-mono text-[9px] text-[color:var(--text-secondary)] opacity-60 tracking-wider">
          {project.period}
        </span>
      </div>

      {/* ── Bottom Content Area: Drawer trượt đẩy nội dung nghệ thuật ── */}
      <div 
        className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-20 flex flex-col justify-end pt-36 rounded-b-[2rem]"
        style={{
          background: 'linear-gradient(to top, rgba(2,4,6,0.98) 0%, rgba(2,4,6,0.85) 45%, rgba(2,4,6,0.2) 75%, rgba(2,4,6,0) 100%)',
          transformStyle: 'preserve-3d',
          transform: 'translateZ(30px)',
        }}
        onClick={(e) => {
          e.stopPropagation();
          onExplore();
        }}
      >
        {/* Nhóm tiêu đề chính (Cố định hiển thị) */}
        <div className="flex flex-col">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] mb-1.5 opacity-80" style={{ color: accentVar }}>
            <ScrambleText text={project.subtitle} />
          </span>
          {/* Kiểu chữ Instrument Serif nghệ thuật & bay bổng */}
          <h3 className="font-serif italic font-medium text-4xl text-white leading-[1.1] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            {project.name}
          </h3>
        </div>

        {/* Ngăn kéo chi tiết (Drawer) - Trượt lên khi hover */}
        <div className="max-h-0 opacity-0 translate-y-6 overflow-hidden transition-all duration-700 ease-in-out group-hover:max-h-[380px] group-hover:opacity-100 group-hover:translate-y-0 group-hover:mt-6">
          
          {/* Mô tả tóm tắt */}
          <p className="text-xs leading-relaxed text-[color:var(--text-secondary)] font-normal">
            {project.description}
          </p>

          {/* Điểm nhấn kỹ thuật */}
          <ul className="mt-4 flex flex-col gap-2">
            {project.highlights.slice(0, project.layout === 'tall' ? 3 : 2).map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[10px] text-[color:var(--text-secondary)] leading-relaxed font-normal">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: accentVar }} />
                <span className="line-clamp-1">{h}</span>
              </li>
            ))}
          </ul>

          {/* Danh mục công nghệ & Nút bấm */}
          <div className="flex flex-col gap-4 mt-5 pt-4 border-t border-white/5">
            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1">
              {project.stack.slice(0, 4).map((s) => (
                <SkillBadge key={s} label={s} accent={project.accent as 'cyan' | 'orange'} />
              ))}
              {project.stack.length > 4 && (
                <span className="rounded-full border border-white/5 bg-white/[0.01] px-2 py-0.5 text-[8px] font-bold text-[color:var(--text-secondary)] font-mono">
                  +{project.stack.length - 4}
                </span>
              )}
            </div>

            {/* Các link liên kết */}
            <div className="flex items-center justify-between">
              <a
                href={`https://${project.github}`}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  playClickSound();
                }}
                className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-[color:var(--text-secondary)] hover:text-white transition-colors font-mono"
              >
                <Github size={11} />
                <span>Source</span>
              </a>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playClickSound();
                  onExplore();
                }}
                className="flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-[9px] font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black cursor-pointer font-mono"
              >
                <span>Explore</span>
                <ArrowUpRight size={11} />
              </button>
            </div>
          </div>

        </div>
      </div>
      </div>
    </div>
  );
}
