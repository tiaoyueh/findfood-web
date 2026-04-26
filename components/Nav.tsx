"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export function Nav() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function toggleLocale() {
    const next = locale === "zh-TW" ? "en" : "zh-TW";
    // Strip current locale prefix and re-prefix
    const stripped = pathname.replace(/^\/(en|zh-TW)/, "") || "/";
    router.push(next === "zh-TW" ? stripped : `/en${stripped}`);
  }

  return (
    <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: "#0D1117cc", borderColor: "#222D40", backdropFilter: "blur(12px)" }}>
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link href={locale === "zh-TW" ? "/" : "/en"} className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-black tracking-tight" style={{ color: "#F4F6FF" }}>
            Find<span style={{ color: "#F07832" }}>Food</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLocale}
            className="text-sm font-semibold px-3 py-1.5 rounded-full border transition-colors hover:border-[#F07832] hover:text-[#F07832]"
            style={{ borderColor: "#222D40", color: "#8892A4" }}
          >
            {t("language_toggle")}
          </button>
        </div>
      </div>
    </nav>
  );
}
