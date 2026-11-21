"use client";

import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Center,
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
  Sparkles,
  Text3D,
} from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";

const FONT = "/fonts/helvetiker_bold.typeface.json";

/** Logo DAXEN en cromo que sigue al mouse y gira con el scroll. */
function Logo() {
  const group = useRef<THREE.Group>(null);
  const { viewport, pointer } = useThree();
  const scale = Math.min(1, viewport.width / 6.8);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const scroll = typeof window !== "undefined" ? window.scrollY / window.innerHeight : 0;
    const targetY = pointer.x * 0.45 + Math.sin(t * 0.35) * 0.18 + scroll * 1.6;
    const targetX = -pointer.y * 0.25 + Math.cos(t * 0.3) * 0.05 + scroll * 0.35;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3, delta);
    g.position.z = THREE.MathUtils.damp(g.position.z, -scroll * 2.5, 3, delta);
  });

  return (
    <group ref={group} scale={scale}>
      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.6}>
        <Center>
          <Text3D
            font={FONT}
            size={1.05}
            height={0.38}
            curveSegments={10}
            bevelEnabled
            bevelThickness={0.05}
            bevelSize={0.025}
            bevelSegments={6}
            letterSpacing={0.06}
          >
            DAXEN
            <meshPhysicalMaterial
              color="#e9e9e9"
              metalness={1}
              roughness={0.1}
              clearcoat={1}
              clearcoatRoughness={0.05}
              envMapIntensity={1.6}
            />
          </Text3D>
        </Center>
      </Float>
    </group>
  );
}

/** Anillos orbitando con brillo rosa (se encienden con el bloom). */
function Rings() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const rings = useMemo(
    () => [
      { r: 3.6, tube: 0.012, tilt: [1.2, 0.2, 0], speed: 0.25, color: "#f1a2c7", glow: 3 },
      { r: 4.3, tube: 0.008, tilt: [1.45, -0.4, 0.3], speed: -0.18, color: "#ffffff", glow: 1.5 },
      { r: 5.1, tube: 0.02, tilt: [0.9, 0.6, -0.2], speed: 0.12, color: "#d4669b", glow: 2 },
    ],
    [],
  );
  useFrame((_, delta) => {
    refs.current.forEach((m, i) => {
      if (m) m.rotation.z += rings[i].speed * delta;
    });
  });
  return (
    <group position={[0, 0, -1]}>
      {rings.map((r, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }} rotation={r.tilt as [number, number, number]}>
          <torusGeometry args={[r.r, r.tube, 16, 220]} />
          <meshStandardMaterial color={r.color} emissive={r.color} emissiveIntensity={r.glow} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/** Esfera líquida oscura detrás del logo. */
function Blob() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.1;
  });
  return (
    <mesh ref={ref} position={[0, 0, -4]} scale={2.6}>
      <icosahedronGeometry args={[1, 64]} />
      <MeshDistortMaterial color="#1a0b13" metalness={0.95} roughness={0.18} distort={0.42} speed={1.8} envMapIntensity={1.2} />
    </mesh>
  );
}

function Rig() {
  const { camera, pointer } = useThree();
  useFrame((_, delta) => {
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.6, 2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * 0.35, 2, delta);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene({ onReady }: { onReady?: () => void }) {
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 42 }}
      dpr={mobile ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => onReady?.()}
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 7, 16]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 3]} intensity={6} color="#f1a2c7" />
      <Suspense fallback={null}>
        <Logo />
        <Blob />
        <Rings />
        <Sparkles count={mobile ? 60 : 160} scale={[14, 8, 6]} size={2.4} speed={0.35} color="#f1a2c7" opacity={0.8} />
        <Sparkles count={mobile ? 30 : 80} scale={[14, 8, 6]} size={1.4} speed={0.2} color="#ffffff" opacity={0.6} />
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={4} position={[0, 4, -2]} scale={[12, 1.5, 1]} color="#ffffff" />
          <Lightformer form="rect" intensity={6} position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} color="#f1a2c7" />
          <Lightformer form="rect" intensity={3} position={[5, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} color="#ffffff" />
          <Lightformer form="ring" intensity={2} position={[0, -3, 4]} scale={4} color="#d4669b" />
          <Lightformer form="rect" intensity={1.5} position={[0, 0, 6]} scale={[10, 4, 1]} color="#ffffff" />
        </Environment>
      </Suspense>
      <Rig />
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur intensity={1.1} luminanceThreshold={0.55} luminanceSmoothing={0.2} />
        <Vignette eskil={false} offset={0.2} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  );
}
