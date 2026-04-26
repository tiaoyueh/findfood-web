import { getTranslations } from "next-intl/server";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return { title: `${t("privacy_policy")} — FindFood` };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();
  const isZhTW = locale === "zh-TW";

  return (
    <div>
      <Nav />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-black mb-2" style={{ color: "#F4F6FF" }}>{t("privacy_policy")}</h1>
        <p className="text-sm mb-10" style={{ color: "#5A6278" }}>
          {isZhTW ? "最後更新：2026年4月" : "Last updated: April 2026"}
        </p>

        {isZhTW ? (
          <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-6" style={{ color: "#8892A4" }}>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>1. 資料蒐集</h2>
              <p>我們蒐集您在使用本服務時提供的資料，包括帳號資訊（電子郵件、使用者名稱）、您發布的評論與照片，以及位置資料（僅在您授予權限時）。</p>
            </section>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>2. 資料使用目的</h2>
              <p>我們使用您的資料以提供本服務功能、改善使用者體驗，以及（如您選擇接受）傳送服務相關通知。我們不會將您的個人資料出售予第三方。</p>
            </section>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>3. 個人資料保護法（PDPA）遵循</h2>
              <p>依據中華民國《個人資料保護法》，您有權要求查閱、更正或刪除我們持有的您的個人資料。如需行使此等權利，請聯絡 <a href="mailto:privacy@findfood.tw" style={{ color: "#F07832" }}>privacy@findfood.tw</a>。</p>
            </section>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>4. 資料儲存</h2>
              <p>您的資料儲存於 Supabase 平台（資料中心位於美國）。我們採用業界標準加密措施保護您的資料。</p>
            </section>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>5. Cookie</h2>
              <p>本網站使用必要的 Cookie 以維持登入狀態。我們不使用追蹤型 Cookie 或第三方廣告追蹤器。</p>
            </section>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>6. 聯絡方式</h2>
              <p>隱私相關問題請聯絡 <a href="mailto:privacy@findfood.tw" style={{ color: "#F07832" }}>privacy@findfood.tw</a></p>
            </section>
          </div>
        ) : (
          <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-6" style={{ color: "#8892A4" }}>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>1. Data We Collect</h2>
              <p>We collect information you provide when using the Service, including account information (email, username), reviews and photos you post, and location data (only when you grant permission).</p>
            </section>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>2. How We Use Your Data</h2>
              <p>We use your data to provide Service features, improve user experience, and (if you opt in) send service notifications. We do not sell your personal data to third parties.</p>
            </section>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>3. Taiwan PDPA Compliance</h2>
              <p>Under the Republic of China Personal Data Protection Act, you have the right to access, correct, or delete personal data we hold about you. To exercise these rights, contact <a href="mailto:privacy@findfood.tw" style={{ color: "#F07832" }}>privacy@findfood.tw</a>.</p>
            </section>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>4. Data Storage</h2>
              <p>Your data is stored on Supabase (data centres in the United States) with industry-standard encryption.</p>
            </section>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>5. Cookies</h2>
              <p>This site uses only essential cookies to maintain your login session. We do not use tracking cookies or third-party ad trackers.</p>
            </section>
            <section>
              <h2 className="text-base font-bold mb-2" style={{ color: "#F4F6FF" }}>6. Contact</h2>
              <p>Privacy enquiries: <a href="mailto:privacy@findfood.tw" style={{ color: "#F07832" }}>privacy@findfood.tw</a></p>
            </section>
          </div>
        )}
      </main>
      <Footer locale={locale} />
    </div>
  );
}
