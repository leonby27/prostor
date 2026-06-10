"use client";

import { useEffect, useState } from "react";
import { List, X, Phone } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { site, nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Блокируем скролл body при открытом меню
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-stone/70 bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <a href="#top" aria-label={site.brand} className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-clay"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={site.phone.href}
            className="hidden items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-clay md:flex"
          >
            <Phone weight="fill" className="h-4 w-4 text-clay" />
            {site.phone.display}
          </a>
          <ThemeToggle />
          <Button href="#quiz" size="sm" className="hidden sm:inline-flex">
            {site.cta.primary}
          </Button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Открыть меню"
            className="grid h-11 w-11 place-items-center rounded-full border border-stone bg-paper/60 text-ink lg:hidden"
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </Container>

      {/* Мобильное меню */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm dark:bg-black/60"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-paper p-6 shadow-lift"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Закрыть меню"
                  className="grid h-11 w-11 place-items-center rounded-full border border-stone text-ink"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-1">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-lg font-medium text-ink transition-colors hover:bg-sand"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3 pt-6">
                <a
                  href={site.phone.href}
                  className="flex items-center gap-2 text-lg font-semibold text-ink"
                >
                  <Phone weight="fill" className="h-5 w-5 text-clay" />
                  {site.phone.display}
                </a>
                <Button
                  href="#quiz"
                  size="lg"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  {site.cta.primary}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
