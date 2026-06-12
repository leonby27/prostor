"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, ContactShadows } from "@react-three/drei";
import type { Group } from "three";

/* Палитра бренда (см. globals.css). Three не читает CSS-переменные,
   поэтому держим значения здесь синхронно с дизайн-системой. */
const C = {
  sand: "#efe7da", // корпус нижних/верхних шкафов
  sandDark: "#e4d9c8",
  clay: "#c15f3c", // акцентный пенал
  clayDark: "#a44c2d",
  espresso: "#26221d", // столешница
  ink: "#1c1a16",
  steel: "#b9b2a6", // смеситель / ручки
  floor: "#f4efe7",
};

/** Один шкаф со скруглёнными гранями и тонкой «филёнкой» (вставкой фасада). */
function Cabinet({
  position,
  size,
  color,
  handle = "bar",
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  handle?: "bar" | "none";
}) {
  const [w, h, d] = size;
  return (
    <group position={position}>
      <RoundedBox args={size} radius={0.03} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.55} metalness={0.04} />
      </RoundedBox>
      {/* Утопленная вставка фасада — лёгкая «премиальная» деталь */}
      <RoundedBox
        args={[w * 0.84, h * 0.8, 0.01]}
        radius={0.015}
        smoothness={3}
        position={[0, 0, d / 2 + 0.005]}
      >
        <meshStandardMaterial color={color} roughness={0.7} />
      </RoundedBox>
      {handle === "bar" && (
        <mesh position={[w * 0.3, h * 0.32, d / 2 + 0.02]} castShadow>
          <boxGeometry args={[0.02, h * 0.34, 0.02]} />
          <meshStandardMaterial color={C.steel} roughness={0.3} metalness={0.7} />
        </mesh>
      )}
    </group>
  );
}

/** Композиция кухни — стилизованный гарнитур в палитре бренда. */
function Kitchen() {
  const root = useRef<Group>(null);
  const { pointer } = useThree();

  // Медленное автоповорачивание + мягкий parallax от курсора.
  useFrame((_, delta) => {
    const g = root.current;
    if (!g) return;
    g.rotation.y += delta * 0.12;
    const targetTilt = pointer.y * 0.12 - 0.08;
    g.rotation.x += (targetTilt - g.rotation.x) * 0.04;
    const targetYaw = pointer.x * 0.18;
    g.position.x += (targetYaw - g.position.x) * 0.04;
  });

  return (
    <group ref={root} position={[0, -0.2, 0]}>
      {/* Столешница */}
      <RoundedBox
        args={[3.2, 0.12, 0.95]}
        radius={0.03}
        smoothness={4}
        position={[0, 0.62, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={C.espresso} roughness={0.4} metalness={0.08} />
      </RoundedBox>

      {/* Нижний ряд шкафов */}
      <Cabinet position={[-1.05, 0.18, 0]} size={[1.0, 0.82, 0.85]} color={C.sand} />
      <Cabinet position={[0.05, 0.18, 0]} size={[1.0, 0.82, 0.85]} color={C.sandDark} />
      <Cabinet position={[1.15, 0.18, 0]} size={[0.85, 0.82, 0.85]} color={C.sand} />

      {/* Мойка — врезка в столешницу */}
      <mesh position={[0.05, 0.69, 0.05]} receiveShadow>
        <boxGeometry args={[0.42, 0.04, 0.34]} />
        <meshStandardMaterial color={C.ink} roughness={0.5} />
      </mesh>
      {/* Смеситель */}
      <group position={[0.05, 0.7, -0.22]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.018, 0.022, 0.34, 16]} />
          <meshStandardMaterial color={C.steel} roughness={0.25} metalness={0.85} />
        </mesh>
        <mesh position={[0, 0.17, 0.07]} rotation={[0.5, 0, 0]} castShadow>
          <cylinderGeometry args={[0.018, 0.018, 0.18, 16]} />
          <meshStandardMaterial color={C.steel} roughness={0.25} metalness={0.85} />
        </mesh>
      </group>

      {/* Акцентный пенал (высокий шкаф) */}
      <Cabinet position={[-1.95, 0.62, 0]} size={[0.7, 1.7, 0.85]} color={C.clay} />

      {/* Верхние шкафы */}
      <Cabinet position={[-1.05, 1.55, -0.05]} size={[1.0, 0.62, 0.42]} color={C.sand} />
      <Cabinet position={[0.05, 1.55, -0.05]} size={[1.0, 0.62, 0.42]} color={C.sand} />

      {/* Открытая полка-акцент */}
      <RoundedBox
        args={[0.9, 0.05, 0.32]}
        radius={0.02}
        position={[1.15, 1.4, -0.05]}
        castShadow
      >
        <meshStandardMaterial color={C.clayDark} roughness={0.6} />
      </RoundedBox>

      {/* Подвесной светильник над рабочей зоной */}
      <group position={[1.15, 1.9, 0.1]}>
        <mesh>
          <cylinderGeometry args={[0.004, 0.004, 0.5, 8]} />
          <meshStandardMaterial color={C.ink} />
        </mesh>
        <mesh position={[0, -0.28, 0]} castShadow>
          <coneGeometry args={[0.13, 0.16, 24, 1, true]} />
          <meshStandardMaterial color={C.clay} roughness={0.4} side={2} />
        </mesh>
        <pointLight position={[0, -0.3, 0]} intensity={3} distance={2.4} color="#ffd9b0" />
      </group>
    </group>
  );
}

export default function KitchenScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [3.1, 2.2, 4.2], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      {/* Свет: мягкий «студийный» сетап под тёплый минимализм */}
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0003}
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#ffe6c8" />

      <Kitchen />

      <ContactShadows
        position={[0, -0.62, 0]}
        opacity={0.35}
        scale={9}
        blur={2.6}
        far={4}
        color="#3a2f24"
      />
    </Canvas>
  );
}
