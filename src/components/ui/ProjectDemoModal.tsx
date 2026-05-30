import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Film, Globe, Github, Sparkles, AlertCircle } from 'lucide-react';
import { playClickSound } from '../utilities/clickSound';

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

interface ProjectDemoModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDemoModal({ project, isOpen, onClose }: ProjectDemoModalProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'live' | 'video' | 'mockup'>('live');
  const [iframeLoading, setIframeLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Set mounted on client side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync project to activeProject only when it is not null
  useEffect(() => {
    if (project) {
      setActiveProject(project);
    }
  }, [project]);

  // Khóa cuộn trang chính khi mở Modal và giải phóng khi đóng
  useEffect(() => {
    if (isOpen && project) {
      document.body.style.overflow = 'hidden';
      // Xác định tab mặc định dựa trên dữ liệu có sẵn
      if (project.demoUrl) {
        setActiveTab('live');
      } else if (project.videoUrl) {
        setActiveTab('video');
      } else {
        setActiveTab('mockup');
      }
    } else if (!isOpen) {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, project]);

  if (!mounted) return null;

  const handleClose = () => {
    playClickSound();
    onClose();
  };

  // Determine display values using activeProject to avoid runtime errors during exit transitions
  const isOrange = activeProject?.accent === 'orange';
  const accentColor = isOrange ? 'var(--accent-orange)' : 'var(--accent-cyan)';
  const glowShadow = isOrange 
    ? '0 0 30px rgba(255, 122, 26, 0.15)' 
    : '0 0 30px rgba(18, 214, 221, 0.15)';

  return createPortal(
    <AnimatePresence>
      {isOpen && activeProject && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Overlay nền mờ tối dần */}
          <motion.div
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-6xl rounded-3xl border border-[color:var(--border-glass)] bg-[color:var(--bg-base)] overflow-hidden shadow-2xl z-10 flex flex-col lg:flex-row h-full max-h-[90vh] md:max-h-[85vh]"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
            style={{ boxShadow: glowShadow }}
          >
            {/* Cột trái: Trình diễn (Iframe / Video / Mockup) - Chiếm 65% trên màn hình lớn */}
            <div className="w-full lg:w-[65%] bg-black/40 flex flex-col relative h-[350px] sm:h-[450px] lg:h-full border-b lg:border-b-0 lg:border-r border-[color:var(--border-glass)]">
              {/* Thanh điều khiển Mock Browser Chrome */}
              <div className="flex items-center justify-between px-6 py-4 bg-[color:var(--bg-deep)] border-b border-[color:var(--border-glass)] shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-4 font-mono text-[10px] text-[color:var(--text-secondary)] opacity-50 tracking-wider hidden sm:inline">
                    {activeTab === 'live' ? 'sandbox_environment.bin' : activeTab === 'video' ? 'video_stream.mp4' : 'static_blueprint.raw'}
                  </span>
                </div>

                {/* Tabs điều khiển */}
                <div className="flex items-center gap-2">
                  {activeProject.demoUrl && (
                    <button
                      onClick={() => { playClickSound(); setActiveTab('live'); }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider transition-all ${
                        activeTab === 'live'
                          ? 'bg-[rgba(18,214,221,0.1)] text-[color:var(--accent-cyan)] border border-[color:var(--border-cyan)]'
                          : 'text-[color:var(--text-secondary)] hover:text-white border border-transparent'
                      }`}
                    >
                      <Globe size={12} />
                      Live Demo
                    </button>
                  )}
                  {activeProject.videoUrl && (
                    <button
                      onClick={() => { playClickSound(); setActiveTab('video'); }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider transition-all ${
                        activeTab === 'video'
                          ? 'bg-[rgba(255,122,26,0.1)] text-[color:var(--accent-orange)] border border-[color:var(--border-orange)]'
                          : 'text-[color:var(--text-secondary)] hover:text-white border border-transparent'
                      }`}
                    >
                      <Film size={12} />
                      Video
                    </button>
                  )}
                  <button
                    onClick={() => { playClickSound(); setActiveTab('mockup'); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider transition-all ${
                      activeTab === 'mockup' && !activeProject.demoUrl && !activeProject.videoUrl
                        ? 'bg-white/10 text-white border border-white/20'
                        : activeTab === 'mockup'
                        ? 'bg-white/5 text-white border border-white/10'
                        : 'text-[color:var(--text-secondary)] hover:text-white border border-transparent'
                    }`}
                  >
                    Mockup
                  </button>
                </div>
              </div>

              {/* Vùng hiển thị chính */}
              <div className="flex-1 w-full relative overflow-hidden bg-[color:var(--bg-deep)]">
                {/* 1. Live Iframe View */}
                {activeTab === 'live' && activeProject.demoUrl && (
                  <div className="w-full h-full relative">
                    {iframeLoading && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[color:var(--bg-deep)] gap-4">
                        <div className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: `${accentColor} transparent transparent transparent` }} />
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: accentColor }}>
                          Connecting to secure sandbox...
                        </span>
                      </div>
                    )}
                    <iframe
                      src={activeProject.demoUrl}
                      title={activeProject.name}
                      className="w-full h-full border-none bg-white"
                      onLoad={() => setIframeLoading(false)}
                      sandbox="allow-scripts allow-same-origin allow-popups"
                    />
                  </div>
                )}

                {/* 2. Video Player View */}
                {activeTab === 'video' && activeProject.videoUrl && (
                  <div className="w-full h-full flex items-center justify-center p-6 bg-black">
                    <video
                      src={activeProject.videoUrl}
                      controls
                      autoPlay
                      loop
                      muted
                      className="max-w-full max-h-full rounded-lg shadow-lg"
                    />
                  </div>
                )}

                {/* 3. Static Mockup View (Fallback) */}
                {(activeTab === 'mockup' || (!activeProject.demoUrl && activeTab === 'live') || (!activeProject.videoUrl && activeTab === 'video')) && (
                  <div className="w-full h-full relative overflow-hidden group">
                    <img
                      src={activeProject.image}
                      alt={activeProject.name}
                      className="w-full h-full object-cover object-center filter saturate-[0.85] transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--bg-deep)] via-transparent to-black/35" />
                    
                    {/* Sandbox Warning/Tip if no live demo is available */}
                    {!activeProject.demoUrl && (
                      <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 backdrop-blur-md flex items-start gap-3">
                        <AlertCircle className="text-yellow-500 shrink-0 mt-0.5" size={16} />
                        <div className="flex-1">
                          <h4 className="font-mono text-[10px] font-bold text-yellow-500 uppercase tracking-wider">Local/Intranet environment</h4>
                          <p className="text-[11px] text-[color:var(--text-secondary)] mt-0.5 leading-relaxed">
                            This project is hosted on private or secure local intranet networks. View code and configurations below.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Cột phải: Thông tin dự án (Sidebar) - Chiếm 35% */}
            <div className="w-full lg:w-[35%] flex flex-col h-[calc(100%-350px)] sm:h-[calc(100%-450px)] lg:h-full bg-[color:var(--bg-base)]">
              {/* Nút Đóng & Tiêu đề header phụ */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-[color:var(--border-glass)] shrink-0">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} style={{ color: accentColor }} />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
                    Project Blueprint
                  </span>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full border border-white/10 hover:border-white/20 text-[color:var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Nội dung chi tiết Scrollable */}
              <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6 scrollbar-thin">
                <div>
                  <span 
                    className="rounded-full border px-3 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em] font-mono"
                    style={{
                      borderColor: isOrange ? 'rgba(255,122,26,0.3)' : 'rgba(18,214,221,0.3)',
                      color: accentColor,
                      backgroundColor: isOrange ? 'rgba(255,122,26,0.06)' : 'rgba(18,214,221,0.06)',
                    }}
                  >
                    {activeProject.tag}
                  </span>
                  <h3 className="font-display text-3xl font-black text-white tracking-tight mt-3 leading-tight">
                    {activeProject.name}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-widest text-[color:var(--text-secondary)] mt-1.5">
                    {activeProject.subtitle}
                  </p>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl border border-[color:var(--border-glass)] bg-white/[0.02] text-[11px] font-mono text-[color:var(--text-secondary)] leading-relaxed">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider opacity-40 mb-0.5">Timeline</span>
                    <span className="text-white font-bold">{activeProject.period}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider opacity-40 mb-0.5">Role</span>
                    <span className="text-white font-bold">{activeProject.role}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[color:var(--text-secondary)] opacity-55 mb-2">
                    // Overview
                  </h4>
                  <p className="text-sm leading-relaxed text-[color:var(--text-secondary)] font-normal">
                    {activeProject.description}
                  </p>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[color:var(--text-secondary)] opacity-55 mb-3">
                    // Key Implementation
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {activeProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[color:var(--text-secondary)] leading-relaxed">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[color:var(--accent-cyan)]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Badges */}
                <div>
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[color:var(--text-secondary)] opacity-55 mb-3">
                    // Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/5 bg-white/[0.03] px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-[color:var(--text-secondary)] font-mono hover:border-white/10 hover:text-white transition-colors"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nút Github Link Footer */}
              <div className="p-8 border-t border-[color:var(--border-glass)] shrink-0 bg-[color:var(--bg-deep)]">
                <div className="flex gap-4">
                  <a
                    href={`https://${activeProject.github}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playClickSound()}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 hover:border-white/20 transition-all font-mono"
                  >
                    <Github size={14} />
                    View Code
                  </a>
                  {activeProject.demoUrl && (
                    <a
                      href={activeProject.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playClickSound()}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-wider text-black hover:opacity-90 transition-all font-mono"
                      style={{ backgroundColor: accentColor }}
                    >
                      <ExternalLink size={14} />
                      Launch Site
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
