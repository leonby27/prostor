"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

/** Подписка на класс .dark у <html> — источник правды о текущей теме. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => false;

/**
 * Переключатель светлая/тёмная тема.
 * По умолчанию тема берётся из системных настроек (см. inline-скрипт в layout),
 * после ручного выбора предпочтение сохраняется в localStorage.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* приватный режим — просто не сохраняем */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Включить светлую тему" : "Включить тёмную тему"}
      title={dark ? "Светлая тема" : "Тёмная тема"}
      className={cn(
        "grid h-11 w-11 place-items-center rounded-full border border-stone bg-paper/60 text-ink transition-colors hover:text-clay",
        className,
      )}
    >
      {dark ? (
        <Sun weight="bold" className="h-5 w-5" />
      ) : (
        <Moon weight="bold" className="h-5 w-5" />
      )}
    </button>
  );
}
