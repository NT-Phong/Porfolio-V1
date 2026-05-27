import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLoading } from "../../hooks/useLoading";

const WORDS = [
  "My Portfolio",
  "Fullstack Developer",
  "Create",
  "Inspire"
] as const;

export default function LoadingScreen() {
  const { setIsLoading, setRevealApp } = useLoading();
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [progress, setProgress] = useState(0);
  const [timeString, setTimeString] = useState("");
  const [ping, setPing] = useState<number | null>(null);
  const [phase, setPhase] = useState<"intro" | "branding" | "exit">("intro");

  // 1. Đồng hồ thời gian thực Hà Nội (Asia/Ho_Chi_Minh)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeString(now.toLocaleTimeString("en-US", options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Đo tốc độ phản hồi mạng thực tế (SYS.PING)
  useEffect(() => {
    const checkPing = async () => {
      const start = performance.now();
      try {
        await fetch("/favicon.ico", { method: "HEAD", cache: "no-store" });
        const latency = Math.round(performance.now() - start);
        setPing(latency);
      } catch (e) {
        setPing(Math.round(performance.now() - start) % 25 + 14);
      }
    };
    checkPing();
    const interval = setInterval(checkPing, 3000);
    return () => clearInterval(interval);
  }, []);

  // 3. Kích hoạt hiệu ứng Entrance Reveal ban đầu cho Live HUD & Kicker
  useEffect(() => {
    gsap.set(".loader-kicker, .loader-hud-container", { opacity: 0, y: -15 });
    gsap.to(".loader-kicker, .loader-hud-container", {
      opacity: 1,
      y: 0,
      duration: 1.0,
      stagger: 0.1,
      ease: "power3.out"
    });
  }, []);

  // 4. Bộ đếm tiến trình rAF mượt tuyệt đối 0 ➔ 100 trong 3600ms (mỗi từ chiếm đúng 900ms)
  useEffect(() => {
    const DURATION = 3600;
    let startTime: number | null = null;
    let rafId: number;

    function tick(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const next = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(next);

      if (next < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        // Khi đếm đạt 100%, chờ 300ms, fade-out intro và bottom UI rồi chuyển sang Phase 2 (Branding Climax)
        setTimeout(() => {
          gsap.to(".loader-intro-container, .loader-bottom-ui", {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power3.in",
            onComplete: () => {
              setPhase("branding");
            }
          });
        }, 300);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // 5. Quản lý trạng thái chuyển đổi giữa các pha (Phase 2 & Phase 3)
  useEffect(() => {
    if (phase === "branding") {
      triggerBrandingClimax();
    } else if (phase === "exit") {
      handleExitTransition();
    }
  }, [phase]);

  // Phase 2: Vẽ logo cơ khí kép & Stagger chữ PHONGDEV
  const triggerBrandingClimax = () => {
    const brandTl = gsap.timeline();

    // Thiết lập thuộc tính vẽ viền cho logo và chuẩn bị chữ trượt
    gsap.set(".logo-outer-bezel", { scale: 1.15, opacity: 0 });
    gsap.set(".logo-p-path", { strokeDasharray: 300, strokeDashoffset: 300 });
    gsap.set(".logo-orange-dot", { scale: 0, opacity: 0 });
    gsap.set(".char", { y: "105%" });
    gsap.set(".word", { y: 15, opacity: 0 });
    gsap.set(".loader-brand-container", { opacity: 0 });

    brandTl
      // 1. Hiện Brand Container
      .to(".loader-brand-container", {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      })
      // 2. Hiện Bezel kép và vẽ logo chữ P
      .fromTo(".logo-outer-bezel", 
        { scale: 1.15, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1.0, ease: "power3.out" },
        "-=0.2"
      )
      .fromTo(".logo-p-path", 
        { strokeDashoffset: 300 }, 
        { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, 
        "-=0.7"
      )
      .fromTo(".logo-orange-dot", 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(2)" }, 
        "-=0.6"
      )
      // 3. Đẩy chữ PHONGDEV trượt từ dưới lên so le ký tự
      .to(".char", {
        y: "0%",
        stagger: 0.06,
        duration: 0.8,
        ease: "power4.out"
      }, "-=0.8")
      // 4. Trượt dòng slogan phụ
      .to(".word", {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.6")
      // 5. Giữ màn chào thương hiệu này trong 1.4 giây để người xem tiếp thu đầy đủ rồi chuyển tiếp sang Phase 3
      .call(() => {
        setPhase("exit");
      }, [], "+=1.4");
  };

  // Phase 3: Hiệu ứng kéo rèm chất lỏng Lusion Liquid Swipe-Up bằng GPU Translation
  const handleExitTransition = () => {
    console.log("LoadingScreen: handleExitTransition called!");
    // Kích hoạt trang chủ lộ diện và chạy GSAP Entrance bên dưới trong lúc kéo rèm
    setRevealApp(true);

    const tl = gsap.timeline({
      onComplete: () => {
        console.log("LoadingScreen: Exit swipe timeline completed! Setting isLoading to false.");
        setIsLoading(false); // Tháo gỡ preloader hoàn toàn khỏi DOM
      }
    });

    // Gom cụm UI preloader fade-out nhanh
    tl.to(".loader-ui-container", {
      opacity: 0,
      y: -60,
      duration: 0.5,
      ease: "power3.in"
    })
    // Kéo toàn bộ container LoadingScreen lên phía trên bằng GPU Translate mượt mà tuyệt đối
    .to(containerRef.current, {
      yPercent: -130, // Dịch chuyển vượt quá 100% để kéo toàn bộ phần giọt nước trễ biến mất khỏi màn hình
      duration: 1.4,
      ease: "power3.inOut"
    }, "-=0.2");
  };

  // Tính toán toán học từ xoay chuyển ở tâm khớp 100% với Counter chạy
  const wordIndex = Math.min(
    Math.floor((progress / 100) * WORDS.length), 
    WORDS.length - 1
  );

  const headline = "PHONGDEV";
  const tagline = "CREATIVE FRONTEND & DIGITAL EXPERIENCES";

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9990,
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      {/* ── Layer 1: Tấm rèm nền chất lỏng (Kéo dài thêm 25% phía dưới cho phần giọt nước trễ) ── */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "125%",
          pointerEvents: "none",
          zIndex: 9991,
        }}
        viewBox="0 0 100 125"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M 0 0 L 100 0 L 100 100 Q 50 125 0 100 Z"
          fill="var(--bg-deep)"
        />
      </svg>

      {/* ── Layer 2: Giao diện UI Preloader ── */}
      <div
        className="loader-ui-container"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9992,
          pointerEvents: "none",
        }}
      >
        {/* Premium Ambient Background Mesh Glows */}
        <div 
          style={{
            position: "absolute",
            inset: 0,
            zIndex: -1,
            pointerEvents: "none",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {/* Ambient Cyber Cyan Glow */}
          <div style={{
            position: "absolute",
            top: "-15%",
            left: "-15%",
            width: "70vw",
            height: "70vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(18, 214, 221, 0.08) 0%, rgba(18, 214, 221, 0) 70%)",
            filter: "blur(120px)"
          }} />
          {/* Ambient Cyber Orange Glow */}
          <div style={{
            position: "absolute",
            bottom: "-15%",
            right: "-15%",
            width: "70vw",
            height: "70vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 122, 26, 0.06) 0%, rgba(255, 122, 26, 0) 70%)",
            filter: "blur(120px)"
          }} />
          {/* Central subtle technical grid pattern */}
          <div style={{
            position: "absolute",
            inset: 0,
            opacity: 0.02,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: "24px 24px"
          }} />
        </div>
        {/* Kicker "Portfolio" trên góc trái */}
        <div
          className="loader-kicker"
          style={{
            position: "absolute",
            top: "clamp(2rem, 3vw, 3rem)",
            left: "clamp(2rem, 3vw, 3rem)",
            color: "var(--muted)",
            fontSize: "clamp(0.7rem, 1vw, 0.85rem)",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            fontWeight: 500,
          }}
        >
          Portfolio
        </div>

        {/* Live HUD (SYS.PING + Availability FOMO + Ticking Local Clock) góc phải */}
        <div
          className="loader-hud-container"
          style={{
            position: "absolute",
            top: "clamp(2rem, 3vw, 3rem)",
            right: "clamp(2rem, 3vw, 3rem)",
            color: "var(--muted)",
            fontSize: "clamp(0.62rem, 0.85vw, 0.72rem)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.1em",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
          }}
        >
          {/* Live Connection segment */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
            <span className="status-dot-cyan" />
            <span style={{ opacity: 0.65 }}>SYS.PING:</span>
            <span style={{ color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>
              {ping !== null ? `${ping}ms` : "checking..."}
            </span>
          </div>

          {/* Vertical Divider */}
          <span style={{ opacity: 0.15 }}>|</span>

          {/* Premium Availability FOMO segment */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
            <span className="status-dot-orange" />
            <span style={{ color: "var(--accent-orange)", fontWeight: 700 }}>HIRE:</span>
            <span style={{ color: "var(--text-primary)" }}>1 SLOT LEFT</span>
          </div>

          {/* Vertical Divider */}
          <span style={{ opacity: 0.15 }}>|</span>

          {/* Live Hanoi GMT+7 Clock */}
          <div style={{ color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>
            {timeString || "00:00:00"}
          </div>
        </div>

        {/* ── PHẦN A: Cinematic Word Swaps (Intro Phase) ── */}
        <div
          className="loader-intro-container"
          style={{
            display: phase === "intro" ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
          }}
        >
          <span
            className="loader-font-display"
            style={{
              fontSize: "clamp(2rem, 6.5vw, 3.8rem)",
              color: "rgba(245,245,245,0.85)",
              lineHeight: 1.2,
              userSelect: "none",
              textAlign: "center",
              padding: "0 20px",
              letterSpacing: "0.02em",
              willChange: "transform, opacity",
              transition: "opacity 0.3s ease-out"
            }}
          >
            {WORDS[wordIndex]}
          </span>
        </div>

        {/* ── PHẦN B: Branding Climax (Logo & Brand Info Phase) ── */}
        <div
          className="loader-brand-container"
          style={{
            display: phase === "branding" || phase === "exit" ? "flex" : "none",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
          }}
        >
          {/* Logo lồng Bezel kép cơ khí kính mờ */}
          <div className="logo-outer-bezel">
            <div className="logo-inner-bezel">
              <svg 
                viewBox="0 0 100 100" 
                style={{ width: "64px", height: "64px", display: "block" }}
              >
                <path
                  className="logo-p-path"
                  d="M 35 85 V 25 C 35 25, 35 15, 45 15 H 60 C 72 15, 82 25, 82 37.5 C 82 50, 72 60, 60 60 H 35"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  className="logo-orange-dot"
                  cx="58.5"
                  cy="37.5"
                  r="8.5"
                  fill="var(--accent-orange)"
                  style={{ transformOrigin: "58.5px 37.5px" }}
                />
              </svg>
            </div>
          </div>

          {/* Tiêu đề chính PHONGDEV trượt so le */}
          <h1 
            className="text-4xl md:text-6xl font-bold tracking-tighter leading-none" 
            style={{ 
              display: "flex", 
              gap: "1px", 
              overflow: "hidden", 
              color: "var(--text-primary)",
              fontFamily: "var(--font-display)"
            }}
          >
            {headline.split("").map((char, idx) => (
              <span 
                key={idx} 
                className="char inline-block" 
                style={{ display: "inline-block", willChange: "transform" }}
              >
                {char}
              </span>
            ))}
          </h1>

          {/* Dòng slogan hổ phách lấp lánh */}
          <p 
            className="brand-tagline-shimmer"
            style={{ 
              display: "flex", 
              flexWrap: "wrap", 
              justifyContent: "center", 
              gap: "5px", 
              overflow: "hidden", 
              marginTop: "14px",
              fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)",
              letterSpacing: "0.22em",
              fontWeight: 500
            }}
          >
            {tagline.split(" ").map((word, idx) => (
              <span 
                key={idx} 
                className="word inline-block" 
                style={{ display: "inline-block", willChange: "transform" }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Full-width screen-edge progress bar at the absolute bottom */}
        <div
          style={{
            display: phase === "intro" ? "block" : "none",
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "4px",
            backgroundColor: "rgba(255,255,255,0.03)",
            zIndex: 9995,
            pointerEvents: "none",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, var(--accent-cyan) 0%, var(--accent-orange) 100%)",
              boxShadow: "0 0 15px rgba(255, 122, 26, 0.8), 0 0 5px rgba(18, 214, 221, 0.8)",
              transition: "width 0.1s linear"
            }}
          />
        </div>

        {/* ── UI BỘ ĐỆM GÓC (Dưới đáy) ── */}
        <div 
          className="loader-bottom-ui"
          style={{
            display: phase === "intro" ? "flex" : "none",
            position: "absolute",
            bottom: "clamp(2rem, 3vw, 3rem)",
            right: "clamp(2rem, 3vw, 3rem)",
            pointerEvents: "none"
          }}
        >
          {/* Bộ đếm phần trăm Monospace chữ số đĩnh đạc chạy song hành bên phải */}
          <div
            className="loader-font-display"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 8rem)",
              color: "var(--text-primary)",
              fontVariantNumeric: "tabular-nums",
              lineHeight: 0.8,
              userSelect: "none"
            }}
          >
            {Math.round(progress).toString().padStart(3, "0")}
          </div>
        </div>
      </div>
    </div>
  );
}
