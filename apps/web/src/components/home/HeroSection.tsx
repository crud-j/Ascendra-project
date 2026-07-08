"use client";

import React, { forwardRef, useImperativeHandle, useEffect, useRef, useMemo, type FC, type ReactNode } from "react";
import Link from "next/link";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { motion, useAnimation, useInView, type Variants } from "framer-motion";
import { AscendraNavbar } from "@/components/ui/navbar";

// ============================================================================
// 3D BEAMS BACKGROUND SYSTEM (Premium Grayscale Edition)
// ============================================================================

type UniformValue = THREE.IUniform<unknown> | unknown;

interface ExtendMaterialConfig {
  header: string;
  vertexHeader?: string;
  fragmentHeader?: string;
  material?: THREE.MeshPhysicalMaterialParameters & { fog?: boolean };
  uniforms?: Record<string, UniformValue>;
  vertex?: Record<string, string>;
  fragment?: Record<string, string>;
}

type ShaderWithDefines = THREE.ShaderLibShader & {
  defines?: Record<string, string | number | boolean>;
};

function extendMaterial<T extends THREE.Material = THREE.Material>(
  BaseMaterial: new (params?: THREE.MaterialParameters) => T,
  cfg: ExtendMaterialConfig,
): THREE.ShaderMaterial {
  const physical = THREE.ShaderLib.physical as ShaderWithDefines;
  const { vertexShader: baseVert, fragmentShader: baseFrag, uniforms: baseUniforms } = physical;
  const baseDefines = physical.defines ?? {};

  const uniforms: Record<string, THREE.IUniform> = THREE.UniformsUtils.clone(baseUniforms);

  const defaults = new BaseMaterial(cfg.material || {}) as T & {
    color?: THREE.Color;
    roughness?: number;
    metalness?: number;
    envMap?: THREE.Texture;
    envMapIntensity?: number;
  };

  if (defaults.color) uniforms.diffuse.value = defaults.color;
  if ("roughness" in defaults) uniforms.roughness.value = defaults.roughness;
  if ("metalness" in defaults) uniforms.metalness.value = defaults.metalness;
  if ("envMap" in defaults) uniforms.envMap.value = defaults.envMap;
  if ("envMapIntensity" in defaults) uniforms.envMapIntensity.value = defaults.envMapIntensity;

  Object.entries(cfg.uniforms ?? {}).forEach(([key, u]) => {
    uniforms[key] =
      u !== null && typeof u === "object" && "value" in u
        ? (u as THREE.IUniform<unknown>)
        : ({ value: u } as THREE.IUniform<unknown>);
  });

  let vert = `${cfg.header}\n${cfg.vertexHeader ?? ""}\n${baseVert}`;
  let frag = `${cfg.header}\n${cfg.fragmentHeader ?? ""}\n${baseFrag}`;

  for (const [inc, code] of Object.entries(cfg.vertex ?? {})) {
    vert = vert.replace(inc, `${inc}\n${code}`);
  }

  for (const [inc, code] of Object.entries(cfg.fragment ?? {})) {
    frag = frag.replace(inc, `${inc}\n${code}`);
  }

  return new THREE.ShaderMaterial({
    defines: { ...baseDefines },
    uniforms,
    vertexShader: vert,
    fragmentShader: frag,
    lights: true,
    fog: !!cfg.material?.fog,
  });
}

const CanvasWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <Canvas dpr={[1, 2]} frameloop="always" className="w-full h-full relative">
    {children}
  </Canvas>
);

const hexToNormalizedRGB = (hex: string): [number, number, number] => {
  const clean = hex.replace("#", "");
  const r = Number.parseInt(clean.substring(0, 2), 16);
  const g = Number.parseInt(clean.substring(2, 4), 16);
  const b = Number.parseInt(clean.substring(4, 6), 16);
  return [r / 255, g / 255, b / 255];
};

const noise = `
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
           (c - a)* u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
}

vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec3 P){
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x,Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x,Pf1.y,Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy,Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy,Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x,Pf0.y,Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x,Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);
  vec2 n_yz = mix(n_z.xy,n_z.zw,fade_xyz.y);
  float n_xyz = mix(n_yz.x,n_yz.y,fade_xyz.x);
  return 2.2 * n_xyz;
}
`;

interface BeamsProps {
  beamWidth?: number;
  beamHeight?: number;
  beamNumber?: number;
  lightColor?: string;
  speed?: number;
  noiseIntensity?: number;
  scale?: number;
  rotation?: number;
}

function createStackedPlanesBufferGeometry(
  n: number,
  width: number,
  height: number,
  spacing: number,
  heightSegments: number,
): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const numVertices = n * (heightSegments + 1) * 2;
  const numFaces = n * heightSegments * 2;

  const positions = new Float32Array(numVertices * 3);
  const indices = new Uint32Array(numFaces * 3);
  const uvs = new Float32Array(numVertices * 2);

  let vertexOffset = 0;
  let indexOffset = 0;
  let uvOffset = 0;

  const totalWidth = n * width + (n - 1) * spacing;
  const xOffsetBase = -totalWidth / 2;

  for (let i = 0; i < n; i++) {
    const xOffset = xOffsetBase + i * (width + spacing);
    const uvXOffset = Math.random() * 300;
    const uvYOffset = Math.random() * 300;

    for (let j = 0; j <= heightSegments; j++) {
      const y = height * (j / heightSegments - 0.5);
      const v0 = [xOffset, y, 0];
      const v1 = [xOffset + width, y, 0];

      positions.set([...v0, ...v1], vertexOffset * 3);

      const uvY = j / heightSegments;
      uvs.set([uvXOffset, uvY + uvYOffset, uvXOffset + 1, uvY + uvYOffset], uvOffset);

      if (j < heightSegments) {
        const a = vertexOffset,
          b = vertexOffset + 1,
          c = vertexOffset + 2,
          d = vertexOffset + 3;
        indices.set([a, b, c, c, b, d], indexOffset);
        indexOffset += 6;
      }

      vertexOffset += 2;
      uvOffset += 4;
    }
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeVertexNormals();

  return geometry;
}

const MergedPlanes = forwardRef<
  THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>,
  {
    material: THREE.ShaderMaterial;
    width: number;
    count: number;
    height: number;
  }
>(({ material, width, count, height }, ref) => {
  const mesh = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null!);

  useImperativeHandle(ref, () => mesh.current);

  const geometry = useMemo(
    () => createStackedPlanesBufferGeometry(count, width, height, 0, 100),
    [count, width, height],
  );

  // Reverted entirely back to the original animation logic
  useFrame((_, delta) => {
    mesh.current.material.uniforms.time.value += 0.1 * delta;
  });

  return <mesh ref={mesh} geometry={geometry} material={material} />;
});

MergedPlanes.displayName = "MergedPlanes";

const PlaneNoise = forwardRef<
  THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>,
  {
    material: THREE.ShaderMaterial;
    width: number;
    count: number;
    height: number;
  }
>((props, ref) => (
  <MergedPlanes ref={ref} material={props.material} width={props.width} count={props.count} height={props.height} />
));

PlaneNoise.displayName = "PlaneNoise";

const DirLight: FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {
  const dir = useRef<THREE.DirectionalLight>(null!);

  useEffect(() => {
    if (!dir.current) return;
    const cam = dir.current.shadow.camera as THREE.Camera & {
      top: number;
      bottom: number;
      left: number;
      right: number;
      far: number;
    };
    cam.top = 24;
    cam.bottom = -24;
    cam.left = -24;
    cam.right = 24;
    cam.far = 64;
    dir.current.shadow.bias = -0.004;
  }, []);

  return <directionalLight ref={dir} color={color} intensity={1.5} position={position} />;
};

const Beams: FC<BeamsProps> = ({
  beamWidth = 2,
  beamHeight = 15,
  beamNumber = 12,
  lightColor = "#ffffff",
  speed = 2.5,
  noiseIntensity = 2,
  scale = 0.15,
  rotation = 0,
}) => {
  const meshRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null!);

  const beamMaterial = useMemo(
    () =>
      extendMaterial(THREE.MeshStandardMaterial, {
        header: `
  varying vec3 vEye;
  varying float vNoise;
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float time;
  uniform float uSpeed;
  uniform float uNoiseIntensity;
  uniform float uScale;
  ${noise}`,
        vertexHeader: `
  float getPos(vec3 pos) {
    // Reverted to original logic (pos.x * 0.) to ensure rigid beams
    vec3 noisePos = vec3(pos.x * 0., pos.y - uv.y, pos.z + time * uSpeed * 3.) * uScale;
    return cnoise(noisePos);
  }

  vec3 getCurrentPos(vec3 pos) {
    vec3 newpos = pos;
    newpos.z += getPos(pos);
    return newpos;
  }

  vec3 getNormal(vec3 pos) {
    vec3 curpos = getCurrentPos(pos);
    vec3 nextposX = getCurrentPos(pos + vec3(0.01, 0.0, 0.0));
    vec3 nextposZ = getCurrentPos(pos + vec3(0.0, -0.01, 0.0));
    vec3 tangentX = normalize(nextposX - curpos);
    vec3 tangentZ = normalize(nextposZ - curpos);
    return normalize(cross(tangentZ, tangentX));
  }`,
        fragmentHeader: "",
        vertex: {
          "#include <begin_vertex>": `transformed.z += getPos(transformed.xyz);`,
          "#include <beginnormal_vertex>": `objectNormal = getNormal(position.xyz);`,
        },
        fragment: {
          // Reverted to original noise intensity logic
          "#include <dithering_fragment>": `
    float randomNoise = noise(gl_FragCoord.xy);
    gl_FragColor.rgb -= randomNoise / 15. * uNoiseIntensity;`,
        },
        material: { fog: true },
        uniforms: {
          // Improvised Lighting/Material for premium dark/light/gray look
          diffuse: new THREE.Color(...hexToNormalizedRGB("#111111")), // Dark charcoal base
          time: { shared: true, mixed: true, linked: true, value: 0 },
          roughness: 0.15, // Extremely smooth and glassy
          metalness: 0.85, // High refraction for sharp white highlights
          uSpeed: { shared: true, mixed: true, linked: true, value: speed },
          envMapIntensity: 10,
          uNoiseIntensity: noiseIntensity,
          uScale: scale,
        },
      }),
    [speed, noiseIntensity, scale],
  );

  return (
    <CanvasWrapper>
      <group rotation={[0, 0, THREE.MathUtils.degToRad(rotation)]}>
        <PlaneNoise ref={meshRef} material={beamMaterial} count={beamNumber} width={beamWidth} height={beamHeight} />
        <DirLight color={lightColor} position={[0, 3, 10]} />
      </group>
      <ambientLight intensity={1.2} color="#666666" />
      <color attach="background" args={["#000000"]} />
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={30} />
    </CanvasWrapper>
  );
};

// ============================================================================
// ASCENDRA HERO SECTION
// ============================================================================

const stats = [
  { display: "12,400+", label: "Learners climbing" },
  { display: "280", label: "Courses across tracks" },
  { display: "540", label: "Mentors earning" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const staggerChildren: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.1, ease: "easeOut" },
    },
  };

  const childVariant: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section
      ref={containerRef}
      data-section="hero"
      className="relative min-h-screen w-full overflow-hidden bg-black pb-24 pt-32 sm:pt-40"
    >
      {/* 3D Beams Background Container */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Beams
          beamWidth={2.8}      // Slightly wider for full coverage
          beamHeight={20}      // Taller to ensure it reaches screen edges
          beamNumber={20}      // Increased density for a richer background
          lightColor="#ffffff" // Crisp pure white light for silver reflections
          speed={2}            // Clean, steady motion
          noiseIntensity={1.8} // Maintained original sharp noise feel
          scale={0.15}
          rotation={43}
        />
        {/* Soft edge gradient to blend everything smoothly into the black container */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top,transparent_20%,#000000_100%)] opacity-80" />
      </div>

      <AscendraNavbar />

      <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center">
        
        {/* Main Content Area */}
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate={controls}
          className="flex w-full flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.div variants={childVariant} className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Learn&nbsp;·&nbsp;Build&nbsp;·&nbsp;Contribute&nbsp;·&nbsp;Earn
            </span>
          </motion.div>

          {/* Headline - Polished Grayscale gradient */}
          <motion.h1
            variants={childVariant}
            className="max-w-4xl text-[3.25rem] font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-[5rem]"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Climb from first lesson <br className="hidden sm:block" />
            to mastery — and earn <br className="hidden sm:block" />
            <span className="bg-gradient-to-br from-white via-neutral-400 to-neutral-700 bg-clip-text text-transparent drop-shadow-sm">
              real value on the way up.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={childVariant}
            className="mt-6 max-w-2xl text-base font-normal leading-relaxed text-neutral-400 sm:text-lg"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Ascendra is a learning ecosystem where you don&apos;t just complete
            courses. You build, help others, and your contributions earn Skill
            Coins you can actually withdraw.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={childVariant} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-lg bg-white px-8 text-sm font-semibold text-black transition-all hover:bg-neutral-200"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Start climbing
            </Link>

            <Link
              href="/how-it-works"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-lg border border-white/20 bg-white/5 px-8 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/40"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              See how it works
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div variants={childVariant} className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-6 sm:gap-10">
                <div className="flex flex-col items-center">
                  <span className="text-xl font-semibold tracking-tight text-white/90">{stat.display}</span>
                  <span className="mt-1 text-[10px] font-medium uppercase tracking-widest text-neutral-500">{stat.label}</span>
                </div>
                {i < stats.length - 1 && <div className="h-8 w-px bg-white/10 hidden sm:block" />}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-20 w-full rounded-[2rem] border border-white/10 bg-white/5 p-2 shadow-[0_0_80px_rgba(255,255,255,0.05)] backdrop-blur-xl sm:p-4"
        >
          {/* Inner Light Container */}
          <div className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-[1.5rem] bg-neutral-50 text-black sm:min-h-[600px]">
            
            {/* Subtle light grid background inside the dashboard */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)]" />

            <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center px-6">
              
              <div className="mb-6 rounded-full border border-black/10 bg-black/5 px-4 py-1.5 backdrop-blur-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-black/60">
                  Coming Soon
                </span>
              </div>
              
              <h3 className="mb-4 text-3xl font-bold tracking-tight text-black sm:text-5xl" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                Dashboard Preview
              </h3>
              
              <p className="max-w-lg text-sm text-neutral-600 sm:text-base">
                The Ascendra learning environment is currently under construction. We are building a world-class experience for our climbers.
              </p>

              {/* Minimal UI Skeleton */}
              <div className="mt-12 flex w-full flex-col gap-4">
                <div className="h-12 w-full animate-pulse rounded-xl bg-black/5" />
                <div className="flex w-full gap-4">
                  <div className="h-32 flex-1 animate-pulse rounded-xl bg-black/5" style={{ animationDelay: "150ms" }} />
                  <div className="h-32 flex-1 animate-pulse rounded-xl bg-black/5" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>

            {/* Bottom fading gradient to blend with the mockup edges */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-50 via-neutral-50/80 to-transparent" />
          </div>
        </motion.div>

      </div>

            {/* Continuity System Ambient Backdrop Design Mapping - Bracket Chassis Transition */} 
<div className="absolute inset-x-0 bottom-0 h-[65%] overflow-hidden pointer-events-none"> 
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden"> 
    <div className="absolute inset-0 z-[-1]"> 
      
      {/* --- CHASSIS BRACKETS --- */}
      {/* Container wrapper for structural line masking */}
      <div className="absolute inset-x-6 top-0 bottom-4 rounded-[40px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]">
        
        {/* Top-Left Corner Bracket Fragment */}
        <div className="absolute left-0 top-0 w-12 h-12 border-l border-t rounded-tl-[24px]" style={{ borderColor: "rgba(255, 255, 255, 0.25)" }} />
        
        {/* Top-Right Corner Bracket Fragment */}
        <div className="absolute right-0 top-0 w-12 h-12 border-r border-t rounded-tr-[24px]" style={{ borderColor: "rgba(255, 255, 255, 0.25)" }} />
        
        {/* Left Vertical Runner Rail */}
        <div className="absolute left-0 top-12 bottom-12 w-[1px]" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(255,255,255,0.05))" }} />
        
        {/* Right Vertical Runner Rail */}
        <div className="absolute right-0 top-12 bottom-12 w-[1px]" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(255,255,255,0.05))" }} />

        {/* Bottom-Left Corner Bracket Fragment */}
        <div className="absolute left-0 bottom-0 w-12 h-12 border-l border-b rounded-bl-[24px]" style={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />
        
        {/* Bottom-Right Corner Bracket Fragment */}
        <div className="absolute right-0 bottom-0 w-12 h-12 border-r border-b rounded-br-[24px]" style={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />
      </div>


      {/* --- AMBIENT VOLUMETRIC LIGHTING --- */}
      {/* Left Base Flare */}
      <div className="js-aurora-blob absolute left-[-15%] bottom-[-15%] h-[80%] w-[70%] rounded-full opacity-[0.22] blur-[150px] will-change-transform" 
        style={{ background: "radial-gradient(circle at center, #FFFFFF 0%, rgba(255,255,255,0.5) 40%, transparent 100%)" }} 
      /> 
      
      {/* Right Base Flare */}
      <div className="js-aurora-blob absolute right-[-15%] bottom-[-15%] h-[80%] w-[70%] rounded-full opacity-[0.22] blur-[150px] will-change-transform" 
        style={{ background: "radial-gradient(circle at center, #FFFFFF 0%, rgba(255,255,255,0.5) 40%, transparent 100%)" }} 
      /> 

      {/* Center Grounding Glow (Prevents a hollow middle gap) */}
      <div className="absolute left-1/4 right-1/4 bottom-[-10%] h-[50%] opacity-[0.15] blur-[120px]"
        style={{ background: "radial-gradient(ellipse at bottom, #FFFFFF 0%, transparent 80%)" }}
      />


      {/* --- TRANSITION FLOOR --- */}
      {/* Heavy white bleed that ensures 100% solid white at the section seam */}
      <div className="absolute inset-x-0 bottom-0 h-72" 
        style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.03) 20%, rgba(255,255,255,0.4) 65%, #FFFFFF 100%)" }} 
      /> 
    
    </div> 
  </div> 
</div>


    </section>
  );
}