import { CommonHeader } from "@/components/organisms/common/CommonHeader";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ちょいスケ | 30分単位で調整できる無料日程調整ツール",
  description:
    "【会員登録不要】複数人での日程調整をシンプルに。30分単位で細かく調整でき、候補日を選んで共有するだけで最適な日程が見つかります。無料ですぐに使える日程調整サービス「ちょいスケ」",
  keywords:
    "日程調整, スケジュール調整, カレンダー, 予定調整, ミーティング, 会議設定, 無料, 簡単, 30分単位, 会員登録不要",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "ちょいスケ | 30分単位で調整できる無料日程調整ツール",
    description:
      "会員登録不要で簡単に使える日程調整サービス。30分単位の細かい調整が可能で、URLを共有するだけですぐに最適な日程が見つかります。",
    type: "website",
    locale: "ja_JP",
    siteName: "ちょいスケ",
    url: "https://choiske.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ちょいスケ - 30分単位で調整できる日程調整ツール",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ちょいスケ | 30分単位で調整できる無料日程調整ツール",
    description:
      "会員登録不要で簡単に使える日程調整サービス。30分単位の細かい調整が可能。",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* 構造化データ (JSON-LD) をheadに追加 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "ちょいスケ",
              url: "https://choiske.com",
              applicationCategory: "BusinessApplication",
              operatingSystem: "All",
              description:
                "会員登録不要で使える30分単位の日程調整ツール。複数人の予定を簡単に調整できます。",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "JPY",
              },
              featureList: "30分単位の時間調整、会員登録不要、シンプル操作",
              screenshot: "https://choiske.com/og-image.png",
            }),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-br from-white via-blue-50 to-blue-100 min-h-screen`}
      >
        <CommonHeader />
        {children}
      </body>
    </html>
  );
}
