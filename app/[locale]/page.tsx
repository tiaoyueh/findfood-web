import { getTranslations, getLocale } from "next-intl/server";
import { supabase } from "@/lib/supabase";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { DishCard } from "@/components/DishCard";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations();
  const title = `FindFood — ${t("tagline")}`;
  const description = t("hero_sub");
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: locale === "zh-TW" ? "https://findfood.tw" : "https://findfood.tw/en",
      siteName: "FindFood",
      locale: locale === "zh-TW" ? "zh_TW" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: {
      canonical: locale === "zh-TW" ? "https://findfood.tw" : "https://findfood.tw/en",
      languages: { "zh-TW": "https://findfood.tw", en: "https://findfood.tw/en" },
    },
  };
}

async function getFeaturedDishes() {
  const { data } = await supabase
    .from("dishes")
    .select(`
      id, name, name_zh_tw, price_cents, cover_image_url,
      restaurant:restaurants(id, name),
      dish_sponsorships(id),
      reviews(rating, review_photos(storage_url, is_featured))
    `)
    .or("upvote_count.gt.0,cover_image_url.not.is.null")
    .order("upvote_count", { ascending: false })
    .limit(20);
  return data ?? [];
}

const STEPS = [
  { icon: "📷", titleKey: "step1_title", descKey: "step1_desc" },
  { icon: "🍜", titleKey: "step2_title", descKey: "step2_desc" },
  { icon: "⭐", titleKey: "step3_title", descKey: "step3_desc" },
] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();
  const dishes = await getFeaturedDishes();

  return (
    <div style={{ backgroundColor: "#0D1117" }}>
      <Nav />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-4 pt-20 pb-24 text-center"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(240,120,50,0.18) 0%, transparent 70%), #0D1117",
        }}
      >
        {/* Wordmark */}
        <div className="mb-6 inline-flex items-center gap-2">
          <span className="text-4xl font-black tracking-tight" style={{ color: "#F4F6FF" }}>
            Find<span style={{ color: "#F07832" }}>Food</span>
          </span>
        </div>

        {/* Headline */}
        <h1
          className="mx-auto mb-5 max-w-2xl text-5xl font-black leading-[1.1] tracking-tight sm:text-6xl"
          style={{ color: "#F4F6FF", whiteSpace: "pre-line" }}
        >
          {t("hero_headline")}
        </h1>

        {/* Sub */}
        <p
          className="mx-auto mb-10 max-w-xl text-base leading-relaxed sm:text-lg"
          style={{ color: "#8892A4" }}
        >
          {t("hero_sub")}
        </p>

        {/* App store buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://apps.apple.com"
            className="flex items-center gap-2 rounded-2xl px-6 py-3.5 font-bold text-sm transition-opacity hover:opacity-85"
            style={{ backgroundColor: "#F07832", color: "#fff" }}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            {t("download_ios")}
          </a>
          <a
            href="https://play.google.com"
            className="flex items-center gap-2 rounded-2xl px-6 py-3.5 font-bold text-sm transition-opacity hover:opacity-85"
            style={{ backgroundColor: "#1E2738", color: "#F4F6FF", border: "1px solid #222D40" }}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.76c.3.17.65.19.97.08l12.53-7.23-2.88-2.89-10.62 10zM.54 2.1A1.54 1.54 0 0 0 0 3.25v17.5c0 .46.19.88.54 1.15l.07.06 9.8-9.8v-.23L.61 2.04zm20.1 8.88-2.65-1.53-3.22 3.22 3.22 3.22 2.66-1.54c.76-.44.76-1.93-.01-2.37zM4.15.24l12.52 7.23-2.88 2.88L3.18.24a1.11 1.11 0 0 1 .97 0z" />
            </svg>
            {t("download_android")}
          </a>
        </div>

        {/* Decorative bottom fade */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{ background: "linear-gradient(to bottom, transparent, #0D1117)" }}
        />
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2
          className="mb-10 text-center text-sm font-bold uppercase tracking-widest"
          style={{ color: "#5A6278" }}
        >
          {t("how_it_works")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {STEPS.map(({ icon, titleKey, descKey }, i) => (
            <div
              key={i}
              className="rounded-3xl p-6"
              style={{ backgroundColor: "#161C26", border: "1px solid #222D40" }}
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
                style={{ backgroundColor: "#1E2738" }}
              >
                {icon}
              </div>
              <div
                className="mb-1 text-xs font-bold uppercase tracking-widest"
                style={{ color: "#F07832" }}
              >
                0{i + 1}
              </div>
              <h3 className="mb-2 text-base font-bold" style={{ color: "#F4F6FF" }}>
                {t(titleKey)}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#8892A4" }}>
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Live dish feed ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-black" style={{ color: "#F4F6FF" }}>
            {t("live_feed_heading")}
          </h2>
          <p className="mt-1 text-sm" style={{ color: "#5A6278" }}>
            {t("live_feed_sub")}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {dishes.map((dish: any) => (
            <DishCard key={dish.id} dish={dish} locale={locale} />
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section
        className="mx-4 mb-16 rounded-3xl px-6 py-12 text-center sm:mx-auto sm:max-w-2xl"
        style={{
          background: "linear-gradient(135deg, #1E2738 0%, #161C26 100%)",
          border: "1px solid #222D40",
        }}
      >
        <div className="mb-1 text-4xl">🍜</div>
        <h2 className="mb-2 text-2xl font-black" style={{ color: "#F4F6FF" }}>
          {t("download_app")}
        </h2>
        <p className="mb-7 text-sm" style={{ color: "#8892A4" }}>{t("tagline")}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://apps.apple.com"
            className="rounded-2xl px-6 py-3 font-bold text-sm transition-opacity hover:opacity-85"
            style={{ backgroundColor: "#F07832", color: "#fff" }}
          >
            {t("download_ios")}
          </a>
          <a
            href="https://play.google.com"
            className="rounded-2xl px-6 py-3 font-bold text-sm transition-opacity hover:opacity-85"
            style={{ backgroundColor: "#0D1117", color: "#F4F6FF", border: "1px solid #222D40" }}
          >
            {t("download_android")}
          </a>
        </div>
      </section>

      <Footer locale={locale} />
    </div>
  );
}
