const BENGALI_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliNumber(val: number | string | null | undefined): string {
  if (val === null || val === undefined || val === "") return "";
  const str = String(val);
  return str.replace(/\d/g, (digit) => BENGALI_DIGITS[parseInt(digit, 10)]);
}

export function toBengaliCurrency(val: number | string | null | undefined): string {
  if (val === null || val === undefined) return "০ টাকা";
  const num = typeof val === "string" ? parseFloat(val) : val;
  if (isNaN(num)) return "০ টাকা";

  // Format with thousands separator
  const formattedEn = num.toLocaleString("en-IN");
  const bnFormatted = formattedEn.replace(/\d/g, (digit) => BENGALI_DIGITS[parseInt(digit, 10)]);
  return `${bnFormatted} টাকা`;
}

export function formatUnitBn(unit: string | undefined): string {
  if (!unit) return "প্রতি কেজি";
  const u = unit.toLowerCase();
  if (u.includes("kg") || u.includes("কেজি")) return "প্রতি কেজি";
  if (u.includes("liter") || u.includes("লিটার") || u.includes("litre")) return "প্রতি লিটার";
  if (u.includes("dozen") || u.includes("ডজন")) return "প্রতি ডজন";
  if (u.includes("piece") || u.includes("পিস") || u.includes("pc")) return "প্রতি পিস";
  if (u.includes("gram") || u.includes("গ্রাম") || u.includes("gm")) return "প্রতি ১০০ গ্রাম";
  return `প্রতি ${unit}`;
}

export function getBengaliDate(): string {
  try {
    return new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  } catch {
    return "বুধবার, ৭ অক্টোবর, ২০২৬";
  }
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
