"use client";

import dynamic from "next/dynamic";
import { Suspense, useSyncExternalStore } from "react";
import Image from "next/image";

/**
 * Клиентская обёртка над 3D-сценой кухни.
 *
 * Best-practice для Next.js:
 * - сама сцена грузится только в браузере (`ssr: false`) и отдельным чанком,
 *   чтобы three.js не попадал в SSR и в первый бандл;
 * - до загрузки и при `prefers-reduced-motion` показываем статичное фото —
 *   тот же визуал, без WebGL и без движения.
 */

const KitchenScene = dynamic(() => import("./kitchen-scene"), { ssr: false });

function Fallback() {
  return (
    <Image
      src="/images/hero-kitchen.jpg"
      alt="Современная светлая кухня на заказ"
      fill
      priority
      sizes="(max-width: 1024px) 100vw, 50vw"
      className="object-cover"
    />
  );
}

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduce(cb: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function Kitchen3D() {
  // На сервере и до гидрации возвращаем фолбэк; в браузере включаем 3D,
  // если пользователь не просил reduced-motion. Без setState в эффекте.
  const enabled = useSyncExternalStore(
    subscribeReduce,
    () => !window.matchMedia(REDUCE_QUERY).matches,
    () => false,
  );

  if (!enabled) return <Fallback />;

  return (
    <Suspense fallback={<Fallback />}>
      <KitchenScene />
    </Suspense>
  );
}
