import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/**
 * InteractiveBasketball: A premium, highly detailed 3D basketball model
 * with physics-based inertial cursor tracking and realistic textures.
 */
function InteractiveBasketball() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const leatherMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const { viewport } = useThree();

  // Procedural Pebbled Leather Texture
  const normalMap = useMemo(() => {
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = 'rgb(128, 128, 255)'; // Neutral Normal
    ctx.fillRect(0, 0, size, size);

    ctx.globalAlpha = 0.5;
    for (let i = 0; i < 180000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = Math.random() * 1.0 + 0.3;
      const val = Math.floor(Math.random() * 30 + 120);
      ctx.fillStyle = `rgb(${val}, ${val}, 255)`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(14, 7);
    return texture;
  }, []);

  // Recessed Seam Channels Alpha Map
  const seamMap = useMemo(() => {
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 14;

    // Classic Basketball Channel Design
    ctx.beginPath(); ctx.moveTo(0, size / 2); ctx.lineTo(size, size / 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(size / 2, 0); ctx.lineTo(size / 2, size); ctx.stroke();
    
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(0, size/2, size/2.5, -Math.PI/2, Math.PI/2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(size, size/2, size/2.5, Math.PI/2, -Math.PI/2);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);

  // GSAP ScrollTrigger Integration
  useGSAP(() => {
    if (!groupRef.current) return;
    
    const isMobile = window.innerWidth < 768;
    const s = isMobile ? 0.6 : 1.0;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    // Transition 1: Hero (Sec 1) -> Elite Control (Sec 2)
    // Move right (or up on mobile), scale up slightly, and roll
    tl.to(groupRef.current.position, { x: isMobile ? 0 : viewport.width / 4.5, y: isMobile ? 2.5 : 0, z: 0, ease: "power1.inOut", duration: 1 }, 0)
      .to(groupRef.current.scale, { x: s * 2.0, y: s * 2.0, z: s * 2.0, ease: "power1.inOut", duration: 1 }, 0)
      .to(groupRef.current.rotation, { y: Math.PI * 2, x: Math.PI * 0.1, ease: "power1.inOut", duration: 1 }, 0);

    // Transition 2: Elite Control (Sec 2) -> Perfect Flight (Sec 3)
    // Move across to the left (or down on mobile), maintain scale, continue rolling
    tl.to(groupRef.current.position, { x: isMobile ? 0 : -viewport.width / 4.5, y: isMobile ? -2.5 : 0, ease: "power1.inOut", duration: 1 }, "+=0.2")
      .to(groupRef.current.rotation, { y: Math.PI * 4, ease: "power1.inOut", duration: 1 }, "<");

    // Transition 3: Perfect Flight (Sec 3) -> HUD (Sec 4)
    // Return to dead center, scale back down, and adjust to technical angle
    tl.to(groupRef.current.position, { x: 0, y: 0, ease: "power1.inOut", duration: 1 }, "+=0.2")
      .to(groupRef.current.scale, { x: s * 1.2, y: s * 1.2, z: s * 1.2, ease: "power1.inOut", duration: 1 }, "<")
      .to(groupRef.current.rotation, { y: Math.PI * 6.5, x: Math.PI * 0.35, ease: "power1.inOut", duration: 1 }, "<");

  }, { dependencies: [viewport.width] });

  // Physics-based smooth inertia tracking
  useFrame((state) => {
    if (!meshRef.current) return;

    // Mouse Tracking - Subtle when scrolling is active
    const targetX = state.pointer.x * 0.4;
    const targetY = state.pointer.y * 0.2;
    
    // Slow continuous rotation
    meshRef.current.rotation.y += 0.003;

    // Smooth Inertia for mouse influence
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.03);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.03);
    
    // Tracking Rotation (Tilt the ball towards movement)
    const rotX = -targetY * 0.2;
    const rotZ = -targetX * 0.2;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, rotX, 0.02);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, rotZ, 0.02);
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[0.9, 128, 128]} />
        <meshPhysicalMaterial
          ref={leatherMaterialRef}
          color="#E55419"
          roughness={0.98}
          metalness={0.0}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(2.0, 2.0)}
          clearcoat={0.0}
          reflectivity={0.1}
          sheen={0.8}
          sheenRoughness={1.0}
          sheenColor="#F26C31"
        />
        <mesh scale={[1.002, 1.002, 1.002]}>
          <sphereGeometry args={[0.9, 64, 64]} />
          <meshPhysicalMaterial 
            alphaMap={seamMap} 
            transparent 
            color="#000000" 
            roughness={0.2} 
            metalness={0.0}
            side={THREE.DoubleSide}
          />
        </mesh>
      </mesh>
    </group>
  );
}

export default function BasketballScene() {
  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas 
        shadows={{ type: THREE.PCFShadowMap }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          toneMapping: THREE.ACESFilmicToneMapping,
          alpha: true 
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.type = THREE.PCFShadowMap;
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={25} />
        
        <ambientLight intensity={0.1} />
        {/* Key Light - Warm */}
        <spotLight position={[5, 10, 10]} angle={0.3} penumbra={1} intensity={1500} color="#fff0e0" castShadow />
        {/* Rim Light - Cool Cyan (Calibrated to Mineral Teal) */}
        <spotLight position={[-10, 8, -10]} angle={0.2} penumbra={0.1} intensity={3000} color="#1BAAA0" />
        {/* Bottom Fill - Orange (Calibrated to Terracotta Orange) */}
        <pointLight position={[0, -8, 2]} intensity={200} color="#E55419" />

        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.1}>
          <InteractiveBasketball />
        </Float>
        
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={5} resolution={256} />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
