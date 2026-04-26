import Image from "next/image";
import Link from "next/link";

type Dish = {
  id: string;
  name: string;
  name_zh_tw?: string | null;
  price_cents?: number | null;
  cover_image_url?: string | null;
  restaurant?: { id: string; name: string } | null;
  dish_sponsorships?: { id: string }[];
  reviews?: { rating?: number; review_photos?: { storage_url: string; is_featured: boolean }[] }[];
};

export function DishCard({ dish, locale }: { dish: Dish; locale: string }) {
  const base = locale === "zh-TW" ? "" : "/en";
  const displayName = locale === "zh-TW" ? (dish.name_zh_tw || dish.name) : dish.name;
  const isSponsored = (dish.dish_sponsorships?.length ?? 0) > 0;

  const allPhotos = dish.reviews?.flatMap((r) => r.review_photos ?? []) ?? [];
  const featuredPhoto = allPhotos.find((p) => p.is_featured) ?? allPhotos[0];
  const photoUrl = featuredPhoto?.storage_url ?? dish.cover_image_url ?? null;

  return (
    <Link
      href={`${base}/dish/${dish.id}`}
      className="group rounded-2xl overflow-hidden transition-transform hover:scale-[1.02]"
      style={{ backgroundColor: "#161C26", border: "1px solid #222D40" }}
    >
      <div className="relative aspect-square bg-[#1E2738]">
        {photoUrl ? (
          <Image src={photoUrl} alt={displayName} fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-3xl opacity-20">🍽</div>
        )}
        {isSponsored && (
          <div className="absolute top-2 right-2 text-[10px] font-black px-2 py-0.5 rounded-md" style={{ backgroundColor: "#F07832", color: "#fff" }}>
            AD
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="font-bold text-sm leading-tight" style={{ color: "#F4F6FF" }} title={displayName}>
          {displayName}
        </p>
        {dish.restaurant && (
          <p className="text-xs mt-1 truncate" style={{ color: "#8892A4" }}>{dish.restaurant.name}</p>
        )}
        {dish.price_cents && (
          <p className="text-xs mt-1 font-semibold" style={{ color: "#F07832" }}>
            NT${Math.round(dish.price_cents / 100)}
          </p>
        )}
      </div>
    </Link>
  );
}
