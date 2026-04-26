import { getTranslations, getLocale } from "next-intl/server";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return { title: `${t("terms_of_service")} — FindFood` };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();
  const isZhTW = locale === "zh-TW";

  return (
    <div>
      <Nav />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-black mb-2" style={{ color: "#F4F6FF" }}>{t("terms_of_service")}</h1>
        <p className="text-sm mb-10" style={{ color: "#5A6278" }}>
          {isZhTW ? "最後更新：2026年4月" : "Last updated: April 2026"}
        </p>

        {isZhTW ? (
          <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-6" style={{ color: "#8892A4" }}>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>1. 服務說明</h2>
              <p>FindFood（「本服務」）是一款美食探索平台，讓使用者能夠探索、分享及評論餐廳菜餚。本服務由 FindFood 提供，並依據本條款運作。</p>
            </section>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>2. 使用者責任</h2>
              <p>使用本服務時，您同意不得上傳違法、誤導性或侵害他人權利的內容。您須對自己的帳號活動負責。</p>
            </section>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>3. 贊助內容揭露</h2>
              <p>依據《公平交易法》，本平台上的付費推廣菜餚將清楚標示「贊助」或「AD」字樣。贊助商支付費用以提升其菜餚的能見度，但不影響使用者評論或評分。</p>
            </section>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>4. 智慧財產權</h2>
              <p>您上傳的評論與照片著作權歸您所有，但您授予 FindFood 非排他性授權，以在本服務範圍內使用這些內容。</p>
            </section>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>5. 免責聲明</h2>
              <p>本服務依「現狀」提供，FindFood 不對菜餚資訊的準確性作出保證。餐廳資訊可能已過時，請在前往前向餐廳確認。</p>
            </section>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>6. 聯絡方式</h2>
              <p>如有任何疑問，請寄信至 <a href="mailto:legal@findfood.tw" style={{ color: "#F07832" }}>legal@findfood.tw</a></p>
            </section>
          </div>
        ) : (
          <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-6" style={{ color: "#8892A4" }}>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>1. Description of Service</h2>
              <p>FindFood ("the Service") is a food discovery platform allowing users to explore, share, and review restaurant dishes. The Service is operated by FindFood and governed by these Terms.</p>
            </section>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>2. User Responsibilities</h2>
              <p>By using the Service, you agree not to upload content that is illegal, misleading, or infringes the rights of others. You are responsible for all activity under your account.</p>
            </section>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>3. Sponsored Content Disclosure</h2>
              <p>Paid promotional dishes on this platform are clearly labelled "Sponsored" or "AD" in compliance with applicable law. Sponsors pay to increase dish visibility but cannot influence user reviews or ratings.</p>
            </section>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>4. Intellectual Property</h2>
              <p>You retain copyright over reviews and photos you upload, but grant FindFood a non-exclusive licence to display that content within the Service.</p>
            </section>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>5. Disclaimer</h2>
              <p>The Service is provided "as is." FindFood makes no warranties about the accuracy of dish information. Restaurant details may be outdated — please confirm with the restaurant before visiting.</p>
            </section>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>6. Contact</h2>
              <p>For any questions, email <a href="mailto:legal@findfood.tw" style={{ color: "#F07832" }}>legal@findfood.tw</a></p>
            </section>
          </div>
        )}
      </main>
      <Footer locale={locale} />
    </div>
  );
}
