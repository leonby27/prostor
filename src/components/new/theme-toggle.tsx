"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "@phosphor-icons/react";

/** Подписка на класс .v2-light у <html> — источник правды о теме v2. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getSnapshot = () =>
  document.documentElement.classList.contains("v2-light");
const getServerSnapshot = () => false;

/**
 * Переключатель темы страницы /new. По умолчанию — тёмная («ночной шоурум»),
 * выбор сохраняется в localStorage (theme-v2) и ставится до отрисовки
 * inline-скриптом на странице.
 */
export function ThemeToggleNew() {
  const light = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = !light;
    document.documentElement.classList.toggle("v2-light", next);
    try {
      localStorage.setItem("theme-v2", next ? "light" : "dark");
    } catch {
      /* приватный режим — просто не сохраняем */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Включить тёмную тему" : "Включить светлую тему"}
      title={light ? "Тёмная тема" : "Светлая тема"}
      className="grid h-10 w-10 place-items-center rounded-full border border-stone text-ink transition-colors hover:text-clay"
    >
      {light ? (
        <Moon weight="bold" className="h-[18px] w-[18px]" />
      ) : (
        <Sun weight="bold" className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
