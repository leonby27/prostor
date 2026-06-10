"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Star,
  MapPin,
  PlayCircle,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react/dist/ssr";
import { MediaSlot } from "@/components/ui/media-slot";
import { reviews, type Review } from "@/lib/content";

const avatarTones = ["bg-clay/15 text-clay", "bg-espresso/10 text-espresso"];

// Делители 16 → страницы всегда заполнены целиком, клоны цикла сходятся ровно.
function getPerView(w: number) {
  if (w >= 1024) return 4;
  if (w >= 640) return 2;
  return 1;
}

const N = reviews.length;

export function ReviewsRow() {
  const [perView, setPerView] = useState(4);
  const pvRef = useRef(4);
  // pos — индекс левого слайда в расширенной ленте (с клонами в начале).
  const [pos, setPos] = useState(4);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const pv = getPerView(window.innerWidth);
      if (pv !== pvRef.current) {
        pvRef.current = pv;
        setPerView(pv);
        setAnimate(false);
        setPos(pv); // первый реальный слайд для нового режима
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pages = Math.ceil(N / perView);
  // Лента: [клоны последней страницы] + [реальные] + [клоны первой страницы]
  const lead = reviews.slice(N - perView);
  const trail = reviews.slice(0, perView);
  const display = [...lead, ...reviews, ...trail];

  const go = (dir: 1 | -1) => {
    setAnimate(true);
    setPos((p) => p + dir * perView);
  };

  const goPage = (i: number) => {
    setAnimate(true);
    setPos(perView + i * perView);
  };

  // После анимации, если уехали в зону клонов — мгновенно перескакиваем к оригиналу.
  const onTransitionEnd = (e: React.TransitionEvent<HTMLUListElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    if (pos >= perView + N) {
      setAnimate(false);
      setPos(pos - N);
    } else if (pos < perView) {
      setAnimate(false);
      setPos(pos + N);
    }
  };

  const currentPage = (((pos - perView) / perView) % pages + pages) % pages;

  return (
    <div className="mt-12">
      <div className="relative">
        <div className="overflow-hidden">
          <ul
            onTransitionEnd={onTransitionEnd}
            className={`-mx-2.5 flex ${
              animate
                ? "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                : ""
            }`}
            style={{ transform: `translateX(-${(pos * 100) / perView}%)` }}
          >
            {display.map((r, i) => (
              <li
                key={`${r.id}-${i}`}
                className="shrink-0 px-2.5"
                style={{ width: `${100 / perView}%` }}
                aria-hidden={i < perView || i >= perView + N}
              >
                <ReviewCard
                  review={r}
                  tone={avatarTones[i % avatarTones.length]}
                />
              </li>
            ))}
          </ul>
        </div>

        <ArrowButton dir="left" onClick={() => go(-1)} />
        <ArrowButton dir="right" onClick={() => go(1)} />
      </div>

      {pages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goPage(i)}
              aria-label={`Страница ${i + 1}`}
              aria-current={i === currentPage}
              className={`h-2 rounded-full transition-all ${
                i === currentPage
                  ? "w-6 bg-clay"
                  : "w-2 bg-stone hover:bg-clay/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ArrowButton({
  dir,
  onClick,
}: {
  dir: "left" | "right";
  onClick: () => void;
}) {
  const Icon = dir === "left" ? CaretLeft : CaretRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "left" ? "Предыдущие отзывы" : "Следующие отзывы"}
      className={`absolute top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-stone bg-paper text-ink shadow-card transition-all hover:bg-sand lg:grid ${
        dir === "left" ? "-left-5" : "-right-5"
      }`}
    >
      <Icon weight="bold" className="h-5 w-5" />
    </button>
  );
}

function ReviewCard({ review, tone }: { review: Review; tone: string }) {
  return (
    <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone bg-paper shadow-soft">
      {/* Компактное фото кухни клиента */}
      <div className="relative">
        <MediaSlot
          src={review.kitchenPhoto}
          alt={`Кухня — ${review.name}, ${review.district}`}
          label="Фото кухни"
          aspect="aspect-[4/3]"
          rounded="rounded-none"
          sizes="(max-width: 640px) 90vw, 280px"
        />
        {review.video && (
          <a
            href={review.video}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 grid place-items-center bg-ink/20 transition-colors hover:bg-ink/30"
            aria-label="Смотреть видео-отзыв"
          >
            <PlayCircle weight="fill" className="h-12 w-12 text-paper drop-shadow" />
          </a>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} weight="fill" className="h-3.5 w-3.5 text-clay" />
          ))}
        </div>

        <blockquote className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-ink/85">
          {review.text}
        </blockquote>

        <figcaption className="mt-4 flex items-center gap-2.5 border-t border-stone/70 pt-4">
          <Avatar review={review} tone={tone} />
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-ink">
              {review.name}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted">
              <MapPin weight="fill" className="h-3 w-3 shrink-0 text-clay/70" />
              <span className="truncate">{review.district}</span>
            </span>
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

function Avatar({ review, tone }: { review: Review; tone: string }) {
  if (review.avatar) {
    return (
      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-stone">
        <Image
          src={review.avatar}
          alt={review.name}
          fill
          sizes="36px"
          className="object-cover"
        />
      </span>
    );
  }
  const initial = review.name.trim().charAt(0).toUpperCase();
  return (
    <span
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-base font-bold ${tone}`}
    >
      {initial}
    </span>
  );
}
