"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Vignette, Noise } from "@react-three/postprocessing";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// --- Data ---
const currencies = [
  {
    symbol: "XP",
    name: "Experience Points",
    tagline: "How far along am I?",
    description: "XP only grows. Every lesson, every contribution, every milestone adds to your permanent score. It never resets.",
    textClass: "text-blue-600",
    bgClass: "bg-blue-50/50",
    glowBg: "radial-gradient(ellipse at top left, rgba(59,130,246,0.12) 0%, transparent 75%)",
    barClass: "from-blue-400 to-blue-600",
    barShadow: "shadow-[0_0_16px_rgba(59,130,246,0.5)]",
    barWidth: "68%",
    displayValue: "48,920",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} className="h-5 w-5 stroke-blue-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    symbol: "REP",
    name: "Reputation",
    tagline: "Should others trust me?",
    description: "Reputation is earned through contribution and can decrease through misconduct. A live signal of your ecosystem standing.",
    textClass: "text-violet-600",
    bgClass: "bg-violet-50/50",
    glowBg: "radial-gradient(ellipse at top left, rgba(139,92,246,0.12) 0%, transparent 75%)",
    barClass: "from-violet-400 to-violet-600",
    barShadow: "shadow-[0_0_16px_rgba(139,92,246,0.5)]",
    barWidth: "42%",
    displayValue: "3,240",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} className="h-5 w-5 stroke-violet-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    symbol: "SC",
    name: "Skill Coins",
    tagline: "What value have I created?",
    description: "Skill Coins are real transferable value. Earn them from bounties, spend in the marketplace, or withdraw. Backed by contribution.",
    textClass: "text-amber-600",
    bgClass: "bg-amber-50/50",
    glowBg: "radial-gradient(ellipse at top left, rgba(245,158,11,0.12) 0%, transparent 75%)",
    barClass: "from-amber-400 to-amber-500",
    barShadow: "shadow-[0_0_16px_rgba(245,158,11,0.5)]",
    barWidth: "55%",
    displayValue: "1,875",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} className="h-5 w-5 stroke-amber-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
];

// --- Framer Motion Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// --- 3D Components ---

interface TokenProps {
  position: [number, number, number];
  color: string;
  type: "XP" | "REP" | "SC" | "BG";
  index: number;
}

function GlowMaterial({ color }: { color: string }) {
  return (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={1.8}
      roughness={0.1}
      metalness={0.9}
      toneMapped={false}
    />
  );
}

function TokenGeometry({ type, color }: { type: string; color: string }) {
  switch (type) {
    case "XP":
      return (
        <group scale={1.2}>
          <mesh>
            <tetrahedronGeometry args={[1, 0]} />
            <GlowMaterial color={color} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} scale={[-1, 1, 1]}>
            <tetrahedronGeometry args={[1, 0]} />
            <GlowMaterial color={color} />
          </mesh>
        </group>
      );

    case "REP":
      return (
        <group scale={1.1}>
          <mesh>
            <torusGeometry args={[1, 0.15, 32, 64]} />
            <GlowMaterial color={color} />
          </mesh>
          <mesh position={[-0.25, -0.15, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.2, 0.6, 0.2]} />
            <GlowMaterial color={color} />
          </mesh>
          <mesh position={[0.2, 0.25, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.2, 1.2, 0.2]} />
            <GlowMaterial color={color} />
          </mesh>
        </group>
      );

    case "SC":
      return (
        <group rotation={[Math.PI / 2.5, 0, 0]} scale={1.1}>
          <mesh>
            <cylinderGeometry args={[1.1, 1.1, 0.2, 64]} />
            <GlowMaterial color={color} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 0.05, 64]} />
            <GlowMaterial color={color} />
          </mesh>
          <mesh position={[0, -0.12, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 0.05, 64]} />
            <GlowMaterial color={color} />
          </mesh>
        </group>
      );

    default:
      return (
        <mesh>
          <icosahedronGeometry args={[1, 0]} />
          <GlowMaterial color={color} />
        </mesh>
      );
  }
}

function FloatingToken({ position, color, type, index }: TokenProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Scale down slightly on mobile to keep layout clean
  const scale = viewport.width < 5 ? 0.6 : 1;
  const parallaxDirection = index % 2 === 0 ? 1 : -1;

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Calculate global scroll progress for parallax
    const section = document.getElementById("economy-section");
    if (section) {
      const rect = section.getBoundingClientRect();
      const scrollProgress = rect.top / window.innerHeight;

      // Smooth vertical parallax
      const targetY = position[1] + scrollProgress * (2 * parallaxDirection);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
      
      // Continuous gentle rotation combined with scroll-based rotation
      groupRef.current.rotation.x += 0.002;
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, scrollProgress * 1.5, 0.05);
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <Float 
        speed={2 + index * 0.4} 
        rotationIntensity={type === "SC" ? 0.3 : 1.2} 
        floatIntensity={type === "BG" ? 4 : 2}
      >
        <TokenGeometry type={type} color={color} />
      </Float>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} />
      <Environment preset="city" />

      {/* Primary Hero Tokens (Star, Check, Coin) */}
      <FloatingToken type="XP" index={0} position={[5, 4, -3]} color="#3b82f6" />
      <FloatingToken type="REP" index={1} position={[-6, 0, -4]} color="#8b5cf6" />
      <FloatingToken type="SC" index={2} position={[4, -4, -2]} color="#f59e0b" />

      {/* Deep Background Complementary Elements */}
      <FloatingToken type="BG" index={3} position={[-8, 6, -12]} color="#60a5fa" />
      <FloatingToken type="BG" index={4} position={[8, -7, -10]} color="#c4b5fd" />
      <FloatingToken type="BG" index={5} position={[-4, -8, -14]} color="#fcd34d" />

      {/* High-End Post-Processing Pipeline */}
      <EffectComposer enableNormalPass={false}>
        <Bloom 
          luminanceThreshold={1.2} 
          mipmapBlur 
          intensity={1.4} 
          radius={0.8}
        />
        <DepthOfField 
          focusDistance={0.0} 
          focalLength={0.03} 
          bokehScale={5} 
          height={480} 
        />
        <Vignette 
          eskil={false} 
          offset={0.1} 
          darkness={0.45} 
        />
        <Noise 
          opacity={0.025} 
        />
      </EffectComposer>
    </>
  );
}

// --- Main Section Component ---

export function EconomySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section 
      id="economy-section"
      ref={ref} 
      className="relative overflow-hidden bg-[#FAFAFA] py-32 sm:py-40"
    >
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
          <Scene />
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col xl:flex-row xl:items-stretch gap-16 px-6 lg:px-8">
        
        {/* Sticky Header Column */}
        <div className="xl:w-90 shrink-0 relative">
          <div className="xl:sticky xl:top-32 py-2">
            <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
              
              {/* Premium Top Eyebrow */}
              <motion.div variants={itemVariants} className="mb-8 flex items-center gap-4">
                <div className="h-px w-10 bg-[#C19562]/80" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#C19562]">The Economy</span>
              </motion.div>
              
              {/* Refined Typography Scale */}
              <motion.h2 variants={itemVariants} className="text-[3.5rem] lg:text-[4rem] font-medium leading-[1.05] tracking-tight text-gray-900 mb-6 drop-shadow-sm">
                Three currencies.<br />
                <span className="text-gray-400 font-normal">One ecosystem.</span>
              </motion.h2>
              
              <motion.p variants={itemVariants} className="text-[15px] leading-[1.8] text-gray-500 max-w-75">
                Unlike basic badges or streaks, Ascendra's three-currency model creates tangible value, trust, and real incentives.
              </motion.p>
              
            </motion.div>
          </div>
        </div>

        {/* Currency Stack */}
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="flex-1 flex flex-col gap-8">
          {currencies.map((c) => (
            <motion.div
              key={c.symbol}
              variants={itemVariants}
              // Ultra-premium glassmorphism card
              className="group relative overflow-hidden rounded-[2.5rem] bg-white/70 backdrop-blur-2xl p-8 sm:p-12 border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(0,0,0,0.08)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: c.glowBg }} />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm border border-black/5", c.bgClass)}>
                      {c.icon}
                    </div>
                    <span className="font-semibold text-gray-900 tracking-tight">{c.name}</span>
                  </div>
                  <div className="text-6xl sm:text-7xl font-medium tracking-tight text-gray-950 mb-3 drop-shadow-sm">{c.displayValue}</div>
                  <p className="text-[14px] font-medium text-[#C19562] uppercase tracking-wider">{c.tagline}</p>
                </div>

                <div className="flex-1 md:border-l md:border-gray-200/50 md:pl-12">
                  <p className="text-[14.5px] leading-[1.8] text-gray-500 mb-10">{c.description}</p>
                  
                  {/* Elegant Thin Progress Bar */}
                  <div>
                    <div className="flex justify-between items-end mb-4 text-[11px] font-semibold text-gray-900 uppercase tracking-widest">
                      <span>Distribution</span>
                      <span className={c.textClass}>{c.barWidth}</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200/60 rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={isInView ? { width: c.barWidth } : {}}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className={cn("h-full rounded-full bg-linear-to-r", c.barClass, c.barShadow)} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}