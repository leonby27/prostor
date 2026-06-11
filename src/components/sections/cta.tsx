"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, PaperPlaneTilt } from "@phosphor-icons/react";
import { site } from "@/lib/site";
import { formatByPhone, isValidByPhone } from "@/lib/phone";

type Status = "idle" | "sending" | "ok" | "error";

export function Cta({ source = "Лендинг (главная)" }: { source?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidByPhone(phone)) {
      setError("Проверьте номер — нужен белорусский формат +375");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, source }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
    } catch {
      setStatus("error");
      setError("Не получилось отправить. Позвоните нам или напишите в мессенджер.");
    }
  }

  return (
    <section id="lead" className="pt-24 pb-24 sm:pt-32 sm:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="overflow-hidden rounded-3xl bg-espresso px-6 py-14 sm:px-14 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
            Бесплатно и ни к чему не обязывает
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-cream sm:text-5xl">
            Начнём с замера —{" "}
            <span className="text-clay">увидите свою кухню в 3D</span>
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-cream/70">
            Дизайнер приедет в удобное время, всё измерит и покажет проект
            с точной ценой. Дальше — решать вам.
          </p>

          {status === "ok" ? (
            <div className="mt-10 flex max-w-xl items-start gap-4 rounded-2xl border border-clay/40 bg-clay-soft p-6">
              <CheckCircle weight="fill" className="h-7 w-7 shrink-0 text-clay" />
              <div>
                <p className="font-display text-lg font-bold text-cream">
                  Заявка у нас, спасибо!
                </p>
                <p className="mt-1 text-sm leading-relaxed text-cream/70">
                  Перезвоним в рабочее время ({site.hours.toLowerCase()})
                  и договоримся о замере.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row"
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Как вас зовут"
                autoComplete="name"
                className="h-14 flex-1 rounded-full border border-cream/20 bg-espresso-2 px-6 text-cream placeholder:text-cream/40 focus:border-clay focus:outline-none"
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(formatByPhone(e.target.value))}
                placeholder="+375 (29) 000-00-00"
                autoComplete="tel"
                inputMode="tel"
                className="h-14 flex-1 rounded-full border border-cream/20 bg-espresso-2 px-6 text-cream placeholder:text-cream/40 focus:border-clay focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-clay px-8 font-semibold text-white transition-colors hover:bg-clay-dark disabled:opacity-60"
              >
                {status === "sending" ? "Отправляем…" : "Записаться на замер"}
                <ArrowRight weight="bold" className="h-5 w-5" />
              </button>
            </form>
          )}

          {error && <p className="mt-3 text-sm text-clay">{error}</p>}

          <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-cream/50">
            <span>
              Удобнее написать?{" "}
              <a
                href={site.messengers.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-cream/80 underline-offset-4 hover:underline"
              >
                Telegram <PaperPlaneTilt weight="fill" className="h-3.5 w-3.5" />
              </a>
            </span>
            <span>
              Или позвоните:{" "}
              <a href={site.phone.href} className="font-semibold text-cream/80">
                {site.phone.display}
              </a>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
