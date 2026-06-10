/** Маска и валидация белорусского номера телефона: +375 (XX) XXX-XX-XX */

export function formatByPhone(input: string): string {
  let digits = input.replace(/\D/g, "");

  // Локальный формат 80XX -> 375XX
  if (digits.startsWith("80")) digits = "375" + digits.slice(2);
  // Если пользователь начал с кода оператора (29/33/44/25) — подставим 375
  if (digits && !digits.startsWith("375")) digits = "375" + digits;

  digits = digits.slice(0, 12); // 375 + 9 цифр
  const rest = digits.slice(3); // код оператора + номер

  if (rest.length === 0) return digits ? "+375" : "";

  let out = "+375 (" + rest.slice(0, 2);
  if (rest.length >= 2) out += ")";
  if (rest.length > 2) out += " " + rest.slice(2, 5);
  if (rest.length > 5) out += "-" + rest.slice(5, 7);
  if (rest.length > 7) out += "-" + rest.slice(7, 9);
  return out;
}

export function isValidByPhone(input: string): boolean {
  const digits = input.replace(/\D/g, "");
  return /^375(29|33|44|25)\d{7}$/.test(digits);
}

export function phoneDigits(input: string): string {
  return input.replace(/\D/g, "");
}
