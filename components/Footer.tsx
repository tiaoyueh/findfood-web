import { useTranslations } from "next-intl";
import Link from "next/link";

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations();
  const base = locale === "zh-TW" ? "" : "/en";

  return (
    <footer className="border-t mt-20 py-10 px-4" style={{ borderColor: "#222D40" }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-lg font-black tracking-tight">
          Find<span style={{ color: "#F07832" }}>Food</span>
          <span className="text-xs font-normal ml-2" style={{ color: "#5A6278" }}>
            © {new Date().getFullYear()} · {t("all_rights_reserved")}
          </span>
        </span>
        <div className="flex gap-6 text-sm" style={{ color: "#8892A4" }}>
          <Link href={`${base}/legal/terms`} className="hover:text-white transition-colors">{t("terms_of_service")}</Link>
          <Link href={`${base}/legal/privacy`} className="hover:text-white transition-colors">{t("privacy_policy")}</Link>
        </div>
      </div>
    </footer>
  );
}
