import { NextRequest, NextResponse } from "next/server";

/**
 * Приём заявок с сайта.
 * Поддерживает JSON и multipart/form-data (с файлом плана/фото).
 * Готов к интеграции: задайте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в .env
 * — и заявки будут уходить в Telegram. Аналогично можно подключить email/CRM.
 */
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    const data: Record<string, string> = {};
    let fileName: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      for (const [key, value] of form.entries()) {
        if (value instanceof File) {
          if (value.size > 0) fileName = value.name;
        } else {
          data[key] = String(value);
        }
      }
    } else {
      Object.assign(data, await req.json());
    }

    const phoneDigits = (data.phone || "").replace(/\D/g, "");
    if (!/^375(29|33|44|25)\d{7}$/.test(phoneDigits)) {
      return NextResponse.json(
        { ok: false, error: "Некорректный номер телефона" },
        { status: 400 },
      );
    }

    const lead = {
      name: data.name || "",
      phone: data.phone || "",
      source: data.source || "quiz",
      details: data.details || "",
      estimate: data.estimate || "",
      fileName,
      receivedAt: new Date().toISOString(),
    };

    // Лог на сервере (видно в консоли dev-сервера)
    console.log("[lead]", lead);

    // Доставка в Telegram, если настроено
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (token && chatId) {
      const text = [
        "🆕 <b>Новая заявка — Простор</b>",
        `Имя: ${lead.name || "—"}`,
        `Телефон: ${lead.phone}`,
        `Источник: ${lead.source}`,
        lead.details ? `Детали: ${lead.details}` : "",
        lead.estimate ? `Оценка: ${lead.estimate}` : "",
        lead.fileName ? `Файл: ${lead.fileName}` : "",
      ]
        .filter(Boolean)
        .join("\n");
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
