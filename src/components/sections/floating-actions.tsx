"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  TelegramLogo,
  InstagramLogo,
  ChatsCircle,
  X,
  Phone,
} from "@phosphor-icons/react";
import { ViberIcon } from "@/components/ui/brand-icons";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const messengers = [
  {
    label: "Viber",
    href: site.messengers.viber,
    color: "bg-[#7360f2]",
    Icon: ViberIcon,
  },
  {
    label: "Telegram",
    href: site.messengers.telegram,
    color: "bg-[#2aabee]",
    Icon: TelegramLogo,
  },
  {
    label: "Instagram",
    href: site.messengers.instagram,
    color: "bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#962fbf]",
    Icon: InstagramLogo,
  },
];

export function FloatingActions() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Плавающие мессенджеры */}
      <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6">
        <AnimatePresence>
          {open &&
            messengers.map((m, i) => (
              <motion.a
                key={m.label}
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={m.label}
                initial={reduce ? false : { opacity: 0, y: 12, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, y: 12, scale: 0.8 }}
                transition={{ duration: 0.2, delay: reduce ? 0 : i * 0.05 }}
                className={cn(
                  "grid h-12 w-12 place-items-center rounded-full text-white shadow-lift transition-transform hover:scale-105",
                  m.color,
                )}
              >
                <m.Icon className="h-6 w-6" />
              </motion.a>
            ))}
        </AnimatePresence>

        <AnimatePresence>
          {visible && (
            <motion.button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Скрыть мессенджеры" : "Написать нам"}
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.6 }}
              className="relative grid h-14 w-14 place-items-center rounded-full bg-clay text-white shadow-lift transition-colors hover:bg-clay-dark"
            >
              {!open && (
                <span className="absolute inset-0 animate-ping rounded-full bg-clay/40" />
              )}
              <span className="relative">
                {open ? (
                  <X weight="bold" className="h-6 w-6" />
                ) : (
                  <ChatsCircle weight="fill" className="h-7 w-7" />
                )}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Липкий CTA-бар на мобильном */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-stone bg-paper/95 px-4 py-3 backdrop-blur-md sm:hidden">
        <div className="flex items-center gap-3">
          <a
            href={site.phone.href}
            aria-label="Позвонить"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-stone text-ink"
          >
            <Phone weight="fill" className="h-5 w-5 text-clay" />
          </a>
          <a
            href="#quiz"
            className="flex h-12 flex-1 items-center justify-center rounded-full bg-clay font-display font-semibold text-white shadow-soft active:scale-[0.98]"
          >
            {site.cta.primary}
          </a>
        </div>
      </div>
    </>
  );
}
