import { getTranslations, getLocale } from "next-intl/server";
import { supabase } from "@/lib/supabase";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

async function getDish(id: string) {
  const { data } = await supabase
    .from("dishes")
    .select(`
      id, name, name_zh_tw, description, price_cents, cover_image_url,
      restaurant:restaurants(id, name, address),
      dish_sponsorships(id),
      reviews(
        id, body, rating,
        author:profiles!author_id(username),
        review_photos(storage_url, is_featured, sort_order)
      )
    `)
    .eq("id", id)
    .single();
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) return { title: "FindFood" };
  const locale = await getLocale();
  const name = locale === "zh-TW" ? (dish.name_zh_tw || dish.name) : dish.name;
  return {
    title: `${name} — FindFood`,
    description: dish.description ?? `${name} at ${(dish.restaurant as any)?.name}`,
    openGraph: {
      title: `${name} — FindFood`,
      images: dish.cover_image_url ? [dish.cover_image_url] : [],
    },
  };
}

export default async function DishPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;
  const t = await getTranslations();
  const dish = await getDish(id);
  if (!dish) notFound();

  const base = locale === "zh-TW" ? "" : "/en";
  const displayName = locale === "zh-TW" ? ((dish as any).name_zh_tw || dish.name) : dish.name;
  const isSponsored = ((dish as any).dish_sponsorships?.length ?? 0) > 0;

  const allPhotos = ((dish as any).reviews ?? []).flatMap((r: any) =>
    (r.review_photos ?? []).sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
  );
  const heroUrl = allPhotos.find((p: any) => p.is_featured)?.storage_url
    ?? allPhotos[0]?.storage_url
    ?? (dish as any).cover_image_url
    ?? null;

  const reviews: any[] = (dish as any).reviews ?? [];
  const rated = reviews.filter((r) => r.rating != null);
  const avgRating = rated.length > 0
    ? (rated.reduce((s: number, r: any) => s + r.rating, 0) / rated.length).toFixed(1)
    : null;

  return (
    <div>
      <Nav />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Link href={base || "/"} className="text-sm font-semibold mb-6 inline-block hover:text-white transition-colors" style={{ color: "#8892A4" }}>
          ← {t("back")}
        </Link>

        {/* Hero */}
        {heroUrl && (
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6">
            <Image src={heroUrl} alt={displayName} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
          </div>
        )}

        {/* Sponsored disclosure */}
        {isSponsored && (
          <div className="mb-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm" style={{ backgroundColor: "#1E2738", border: "1px solid #222D40" }}>
            <span className="font-black text-xs" style={{ color: "#F07832" }}>AD</span>
            <span style={{ color: "#8892A4" }}>{t("sponsored_disclosure")}</span>
          </div>
        )}

        {/* Title block */}
        <div className="mb-6">
          <h1 className="text-3xl font-black" style={{ color: "#F4F6FF" }}>{displayName}</h1>
          {(dish as any).restaurant && (
            <p className="mt-1 text-base" style={{ color: "#8892A4" }}>
              {(dish as any).restaurant.name}
              {(dish as any).restaurant.address && (
                <span className="text-sm ml-2" style={{ color: "#5A6278" }}>· {(dish as any).restaurant.address}</span>
              )}
            </p>
          )}
          <div className="flex gap-4 mt-3 text-sm">
            {(dish as any).price_cents && (
              <span className="font-bold" style={{ color: "#F07832" }}>NT${Math.round((dish as any).price_cents / 100)}</span>
            )}
            {avgRating && (
              <span style={{ color: "#8892A4" }}>{t("avg_rating")} ★ {avgRating}</span>
            )}
          </div>
          {(dish as any).description && (
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "#8892A4" }}>{(dish as any).description}</p>
          )}
        </div>

        {/* Reviews */}
        <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#5A6278" }}>
          {t("reviews")} ({reviews.length})
        </h2>
        {reviews.length === 0 ? (
          <p style={{ color: "#5A6278" }}>{t("no_reviews")}</p>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map((r: any) => (
              <div key={r.id} className="rounded-2xl p-4" style={{ backgroundColor: "#161C26", border: "1px solid #222D40" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold" style={{ color: "#F4F6FF" }}>@{r.author?.username ?? "—"}</span>
                  {r.rating && <span className="text-sm" style={{ color: "#F07832" }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>}
                </div>
                {r.body && <p className="text-sm leading-relaxed" style={{ color: "#8892A4" }}>{r.body}</p>}
                {r.review_photos?.length > 0 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto">
                    {r.review_photos.map((p: any) => (
                      <div key={p.storage_url} className="relative shrink-0 w-24 h-24 rounded-xl overflow-hidden">
                        <Image src={p.storage_url} alt="" fill className="object-cover" sizes="96px" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer locale={locale} />
    </div>
  );
}
