import { getTranslations, getLocale } from "next-intl/server";
import { supabase } from "@/lib/supabase";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { DishCard } from "@/components/DishCard";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations();
  return {
    title: `FindFood — ${t("tagline")}`,
    description: t("tagline"),
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
    .limit(24);
  return data ?? [];
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();
  const dishes = await getFeaturedDishes();

  return (
    <div>
      <Nav />
      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black tracking-tight mb-3">
            Find<span style={{ color: "#F07832" }}>Food</span>
          </h1>
          <p className="text-lg" style={{ color: "#8892A4" }}>{t("tagline")}</p>
        </div>

        {/* Dish grid */}
        <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: "#5A6278" }}>
          {t("trending")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {dishes.map((dish: any) => (
            <DishCard key={dish.id} dish={dish} locale={locale} />
          ))}
        </div>

        {/* App download CTA */}
        <div className="mt-16 rounded-3xl p-8 text-center" style={{ backgroundColor: "#161C26", border: "1px solid #222D40" }}>
          <p className="text-2xl font-black mb-2">{t("download_app")}</p>
          <p className="text-sm mb-6" style={{ color: "#8892A4" }}>{t("tagline")}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://apps.apple.com"
              className="px-6 py-3 rounded-2xl font-bold text-sm transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#F07832", color: "#fff" }}
            >
              {t("download_ios")}
            </a>
            <a
              href="https://play.google.com"
              className="px-6 py-3 rounded-2xl font-bold text-sm transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#1E2738", color: "#F4F6FF", border: "1px solid #222D40" }}
            >
              {t("download_android")}
            </a>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
