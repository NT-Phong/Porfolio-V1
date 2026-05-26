import Spline from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';
import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function SplineHeroScene() {
  const spline = useRef<Application | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollState = useRef<'hero' | 'about' | 'past'>('hero');

  // Tránh lặp lại onLoad khi StrictMode render 2 lần
  const [isLoaded, setIsLoaded] = useState(false);

  // Danh sách các đối tượng 3D trong Scene
  const [objectList, setObjectList] = useState<string[]>([]);
  const [selectedObjectName, setSelectedObjectName] = useState<string>('');
  const selectedObjectRef = useRef<any>(null);

  // Trạng thái cân chỉnh góc quay (để false làm mặc định để kích hoạt hover ngay lập tức)
  const [calibrationMode, setCalibrationMode] = useState(false);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [rotZ, setRotZ] = useState(0);

  // useGSAP sẽ quản lý vòng đời và dọn dẹp Timeline/ScrollTrigger khi component unmount
  const { contextSafe } = useGSAP({ scope: containerRef });

  const setupAnimations = contextSafe(() => {
    if (!containerRef.current) return;

    // Thiết lập hiển thị ban đầu ổn định cho container 3D
    gsap.set(containerRef.current, {
      x: 0,
      scale: 1.62,
      y: '8vh',
      opacity: 1,
      visibility: "visible",
      force3D: true
    });

    // Thay thế "vw" String bằng Pixel số thực tuyệt đối
    const xOffset = window.innerWidth > 768 ? window.innerWidth * 0.28 : window.innerWidth * 0.4;

    // 1. Bản đồ di chuyển gốc của Spline đi qua toàn bộ các section của trang
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        invalidateOnRefresh: true,
      }
    });

    tl.to(containerRef.current, {
      x: xOffset * 1.25, // About (phải)
      y: '8vh', 
      scale: 1.62,
      force3D: true, // Kích hoạt Hardware Acceleration
      ease: "none"
    })
    .to(containerRef.current, {
      x: xOffset * 1.25, // Giữ nguyên ở vị trí bên phải tối đa ở Projects
      y: '8vh',
      scale: 1.62,
      force3D: true,
      ease: "none"
    })
    .to(containerRef.current, {
      x: xOffset * 1.25, // Giữ nguyên ở vị trí bên phải tối đa ở Career
      y: '8vh',
      scale: 1.62,
      force3D: true,
      ease: "none"
    })
    .to(containerRef.current, {
      x: xOffset * 1.25, // Giữ nguyên ở vị trí bên phải tối đa ở Contact
      y: '8vh',
      scale: 1.62,
      force3D: true,
      ease: "none"
    });

    // 2. Cập nhật trạng thái cuộn khi người dùng đi vào/ra phần Technical Profile (About)
    ScrollTrigger.create({
      trigger: "#about",
      start: "top top",
      onEnter: () => {
        scrollState.current = 'about';
        gsap.fromTo('.spline-dialogue-bubble',
          { opacity: 0, scaleX: 0.88, scaleY: 0.88 },
          { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.45, ease: "back.out(1.7)", overwrite: "auto" }
        );
      },
      onLeaveBack: () => {
        scrollState.current = 'hero';
        gsap.to('.spline-dialogue-bubble', {
          opacity: 0,
          scaleX: 0.88,
          scaleY: 0.88,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    });
    // Buộc ScrollTrigger tính toán lại toàn bộ vị trí các trigger trên trang sau khi layout đã ổn định hoàn toàn
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  });

  // Áp dụng góc xoay trực tiếp khi kéo thanh trượt ở chế độ calibration
  useEffect(() => {
    const obj = selectedObjectRef.current;
    if (!obj || !calibrationMode) return;
    obj.rotation.x = rotX;
    obj.rotation.y = rotY;
    obj.rotation.z = rotZ;
  }, [rotX, rotY, rotZ, calibrationMode]);

  useEffect(() => {
    if (!isLoaded) return;

    // Khởi tạo trạng thái ban đầu ổn định
    if (containerRef.current) {
      containerRef.current.style.display = "block";
      containerRef.current.style.opacity = "1";
    }

    // Refresh ScrollTrigger sau khi React DOM render đã hoàn tất để tính toán vị trí pin spacer chính xác nhất
    ScrollTrigger.refresh();

    const handleWindowHover = contextSafe((e: MouseEvent) => {
      if (!spline.current || calibrationMode) return;
      
      const monitor = spline.current.findObjectByName('Monitor');
      if (!monitor) return;

      const state = scrollState.current;

      if (state === 'hero') {
        // Khi ở Hero: Di chuyển và xoay theo chuột toàn màn hình bình thường
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;

        const theta = 0.820;
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);

        const pitch = -y * 0.4;
        const yaw = x * 0.4;

        gsap.to(monitor.rotation, {
          x: pitch * cosT,
          y: 0.630 + yaw,
          z: -pitch * sinT,
          duration: 0.15,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      } else if (state === 'about') {
        // Khi ở Technical Profile (About): Giới hạn chỉ hover theo trỏ chuột bên trái
        const isLeft = e.clientX < window.innerWidth * 0.55;

        if (isLeft) {
          const x = (e.clientX / window.innerWidth) * 2 - 1;
          const y = -(e.clientY / window.innerHeight) * 2 + 1;

          const theta = 0.820;
          const cosT = Math.cos(theta);
          const sinT = Math.sin(theta);

          const pitch = -y * 0.4;
          const yaw = x * 0.4;

          gsap.to(monitor.rotation, {
            x: pitch * cosT,
            y: 0.630 + yaw,
            z: -pitch * sinT,
            duration: 0.15,
            ease: 'power1.out',
            overwrite: 'auto'
          });
        } else {
          // Khi trỏ chuột sang phải, monitor quay về hướng trái nhìn vào text và đứng yên
          const theta = 0.820;
          const cosT = Math.cos(theta);
          const sinT = Math.sin(theta);
          
          const yaw = -0.25; // Quay sang trái -0.25 rad
          const pitch = 0;   // Góc nhìn ngang

          gsap.to(monitor.rotation, {
            x: pitch * cosT,
            y: 0.630 + yaw, // Khóa góc nhìn về bên trái
            z: -pitch * sinT,
            duration: 0.3,   // Mượt mà trượt về vị trí khóa
            ease: 'power1.out',
            overwrite: 'auto'
          });
        }
      }
    });

    const handleScroll = contextSafe(() => {
      const projectsEl = document.getElementById('projects');
      if (!projectsEl || !containerRef.current) return;

      const rect = projectsEl.getBoundingClientRect();
      const threshold = window.innerHeight - (rect.height * 0.3);

      const shouldHide = rect.top <= threshold;

      if (shouldHide && scrollState.current !== 'past') {
        scrollState.current = 'past';
        gsap.to('.spline-dialogue-bubble', {
          opacity: 0,
          scaleX: 0.88,
          scaleY: 0.88,
          duration: 0.3,
          overwrite: "auto"
        });
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            if (scrollState.current === 'past' && containerRef.current) {
              containerRef.current.style.display = "none";
            }
          }
        });
      } else if (!shouldHide && scrollState.current === 'past') {
        const aboutEl = document.getElementById('about');
        const aboutRect = aboutEl ? aboutEl.getBoundingClientRect() : null;
        
        const newState = (aboutRect && aboutRect.top <= 0) ? 'about' : 'hero';
        scrollState.current = newState;
        
        containerRef.current.style.display = "block";
        gsap.to(containerRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        });

        if (newState === 'about') {
          gsap.fromTo('.spline-dialogue-bubble',
            { opacity: 0, scaleX: 0.88, scaleY: 0.88 },
            { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.45, ease: "back.out(1.7)", overwrite: "auto" }
          );
        } else {
          gsap.to('.spline-dialogue-bubble', {
            opacity: 0,
            scaleX: 0.88,
            scaleY: 0.88,
            duration: 0.3,
            overwrite: "auto"
          });
        }
      }
    });

    window.addEventListener('mousemove', handleWindowHover);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Gọi lập tức để cập nhật trạng thái chuẩn xác khi reload trang
    handleScroll();

    // Chặn sự kiện wheel và touch để Spline không "nuốt" scroll của trang
    const blockScrollPropagation = (e: Event) => {
      e.stopPropagation();
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', blockScrollPropagation, { capture: true, passive: false });
      container.addEventListener('touchstart', blockScrollPropagation, { capture: true, passive: false });
      container.addEventListener('touchmove', blockScrollPropagation, { capture: true, passive: false });
    }

    return () => {
      window.removeEventListener('mousemove', handleWindowHover);
      window.removeEventListener('scroll', handleScroll);
      if (container) {
        container.removeEventListener('wheel', blockScrollPropagation, { capture: true });
        container.removeEventListener('touchstart', blockScrollPropagation, { capture: true });
        container.removeEventListener('touchmove', blockScrollPropagation, { capture: true });
      }
    };
  }, [isLoaded, calibrationMode, contextSafe]);

  function onLoad(splineApp: Application) {
    if (isLoaded) return; // Chặn StrictMode chạy 2 lần

    spline.current = splineApp;

    // Duyệt qua scene để lấy danh sách tên các object 3D
    let sceneObj = (splineApp as any).scene;
    if (!sceneObj && (splineApp as any)._scene) {
      sceneObj = (splineApp as any)._scene;
    }

    const names: string[] = [];
    if (sceneObj) {
      const traverse = (obj: any) => {
        if (obj.name && !names.includes(obj.name) && !obj.name.startsWith('Default') && obj.name !== 'Scene') {
          names.push(obj.name);
        }
        if (obj.children) {
          obj.children.forEach((child: any) => traverse(child));
        }
      };
      traverse(sceneObj);
    }

    if (names.length === 0) {
      names.push('Monitor');
    }

    setObjectList(names);

    // Áp dụng các góc quay tối ưu đã được bạn hiệu chỉnh ở P1 và P2:
    const monitor = splineApp.findObjectByName('Monitor');
    const scene1 = splineApp.findObjectByName('Scene 1');
    const body = splineApp.findObjectByName('Body');
    const podium = splineApp.findObjectByName('Podium');
    const plant = splineApp.findObjectByName('Plant');

    if (monitor) {
      gsap.set(monitor.rotation, { x: 0, y: 0.630, z: 0 });
      // Phóng to riêng Monitor lên 20%
      monitor.scale.x *= 1.2;
      monitor.scale.y *= 1.2;
      monitor.scale.z *= 1.2;
    }
    if (scene1) gsap.set(scene1.rotation, { x: 0, y: -0.340, z: 0 });
    // Đồng bộ góc quay Y của Body khớp với Monitor (0.630) để thẳng hàng và không bị lệch
    if (body) gsap.set(body.rotation, { x: 0, y: 0.630, z: 0 });
    if (podium) gsap.set(podium.rotation, { x: -1.570, y: 0.000, z: -1.015 });
    if (plant) gsap.set(plant.rotation, { x: -0.050, y: 2.295, z: 0.050 });
    
    // Chọn đối tượng Monitor mặc định trong Dropdown
    const defaultObjName = 'Monitor';
    setSelectedObjectName(defaultObjName);
    selectedObjectRef.current = monitor;

    if (monitor) {
      setRotX(monitor.rotation.x);
      setRotY(monitor.rotation.y);
      setRotZ(monitor.rotation.z);
    }

    setIsLoaded(true);
    setupAnimations();
  }

  // Khi người dùng chọn đối tượng khác trong dropdown
  const handleObjectChange = (name: string) => {
    setSelectedObjectName(name);
    if (!spline.current) return;
    const obj = spline.current.findObjectByName(name);
    selectedObjectRef.current = obj;
    if (obj) {
      setRotX(obj.rotation.x);
      setRotY(obj.rotation.y);
      setRotZ(obj.rotation.z);
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className="w-full h-full relative z-[10] pointer-events-auto will-change-transform"
        style={{ transformOrigin: 'center center' }}
      >
        <Spline
          scene="https://prod.spline.design/4QDf3qwGtpRrRVFU/scene.splinecode"
          onLoad={onLoad}
        />

        {/* Bong bóng thoại (Dialogue/Thought Bubble) giới thiệu kỹ năng thân thiện */}
        <div 
          className="spline-dialogue-bubble pointer-events-none opacity-0"
          style={{
            position: 'absolute',
            bottom: '72%',         /* neo phía trên màn hình, sát nóc monitor */
            left: '50%',
            transform: 'translateX(-50%) scale(0.9)',
            transformOrigin: 'bottom center',
            zIndex: 20,
            width: 'max-content',
            maxWidth: '220px',
          }}
        >
          <div className="spline-dialogue-bubble-float">
            {/* Card kính mờ cao cấp */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(7,26,31,0.96) 0%, rgba(16,42,48,0.94) 100%)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(18,214,221,0.5)',
              borderRadius: '16px',
              boxShadow: '0 0 30px rgba(18,214,221,0.2), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
              padding: '12px 16px 14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              position: 'relative',
            }}>
              {/* Mũi tên trỏ xuống */}
              <div style={{
                position: 'absolute',
                bottom: '-7px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '14px',
                height: '14px',
                background: 'linear-gradient(135deg, rgba(16,42,48,0.94), rgba(16,42,48,0.94))',
                border: '1px solid rgba(18,214,221,0.5)',
                borderTop: 'none',
                borderLeft: 'none',
                rotate: '45deg',
              }} />

              {/* Label */}
              <span style={{
                fontSize: '9px',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#FF7A1A',
                lineHeight: 1,
              }}>MY SKILLS</span>

              {/* Nội dung chính */}
              <p style={{
                fontSize: '11px',
                color: '#F8FAFC',
                lineHeight: '1.5',
                fontWeight: 500,
                textAlign: 'center',
                margin: 0,
              }}>
                Đây là những kỹ năng<br/>của tôi đó! 😎⚡
              </p>

              {/* Mini tech tags */}
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2px' }}>
                {['C#', 'React', 'Node'].map(tag => (
                  <span key={tag} style={{
                    fontSize: '8px',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'rgba(18,214,221,0.12)',
                    border: '1px solid rgba(18,214,221,0.3)',
                    color: '#12D6DD',
                    letterSpacing: '0.05em',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Floating keyframes cho bong bóng thoại để tạo cảm giác sinh động */}
      <style>{`
        @keyframes spline-bubble-float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .spline-dialogue-bubble-float {
          animation: spline-bubble-float 4s ease-in-out infinite;
        }
      `}</style>

      {/* Bảng cân chỉnh góc xoay mô hình 3D sử dụng Portal để đưa ra ngoài stacking context */}
      {isLoaded && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed bottom-12 left-6 z-[99999] p-4 bg-[#071A1F]/90 backdrop-blur-md border border-[#12D6DD]/30 rounded-xl text-[#A7B4BD] font-mono text-[11px] w-[310px] pointer-events-auto flex flex-col gap-3 shadow-lg select-none"
          style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
        >
          <div className="flex items-center justify-between border-b border-[#12D6DD]/20 pb-2">
            <span className="text-[#12D6DD] font-bold tracking-widest uppercase">3D CALIBRATION PANEL</span>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input 
                type="checkbox" 
                checked={calibrationMode}
                onChange={(e) => setCalibrationMode(e.target.checked)}
                className="accent-[#FF7A1A]"
              />
              <span className={calibrationMode ? "text-[#FF7A1A]" : ""}>Calib</span>
            </label>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[#A7B4BD]/80">Select Object:</span>
            <select
              value={selectedObjectName}
              onChange={(e) => handleObjectChange(e.target.value)}
              className="bg-[#102A30] border border-[#12D6DD]/20 rounded px-2 py-1 text-white font-mono text-[11px] focus:outline-none focus:border-[#12D6DD]/50"
            >
              {objectList.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <span>Rotation X (Pitch):</span>
                <span className="text-white font-bold">{rotX.toFixed(3)} rad</span>
              </div>
              <input 
                type="range" 
                min="-3.14" 
                max="3.14" 
                step="0.005"
                value={rotX} 
                disabled={!calibrationMode}
                onChange={(e) => setRotX(parseFloat(e.target.value))}
                className="w-full accent-[#12D6DD]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <span>Rotation Y (Yaw):</span>
                <span className="text-white font-bold">{rotY.toFixed(3)} rad</span>
              </div>
              <input 
                type="range" 
                min="-3.14" 
                max="3.14" 
                step="0.005"
                value={rotY} 
                disabled={!calibrationMode}
                onChange={(e) => setRotY(parseFloat(e.target.value))}
                className="w-full accent-[#12D6DD]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <span>Rotation Z (Roll):</span>
                <span className="text-white font-bold">{rotZ.toFixed(3)} rad</span>
              </div>
              <input 
                type="range" 
                min="-3.14" 
                max="3.14" 
                step="0.005"
                value={rotZ} 
                disabled={!calibrationMode}
                onChange={(e) => setRotZ(parseFloat(e.target.value))}
                className="w-full accent-[#12D6DD]"
              />
            </div>
          </div>

          <div className="text-[10px] border-t border-[#12D6DD]/20 pt-2 text-[#A7B4BD]/70 flex flex-col gap-1">
            {calibrationMode ? (
              <span className="text-[#FF7A1A]">⚠️ Kéo thanh trượt để xoay, bỏ tích 'Calib' để kiểm tra hiệu ứng chuột hover.</span>
            ) : (
              <span className="text-green-400">✔️ Chế độ chuột theo dõi đang bật.</span>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
