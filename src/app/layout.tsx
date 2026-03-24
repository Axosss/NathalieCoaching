import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@/components/analytics/Analytics";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { CookieConsent } from "@/components/analytics/CookieConsent";
import { BUSINESS_INFO } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${BUSINESS_INFO.name} - Coaching Professionnel`,
    template: `%s | ${BUSINESS_INFO.name}`,
  },
  description: BUSINESS_INFO.description,
  keywords: [
    "coaching professionnel",
    "leadership",
    "transition de carriere",
    "performance",
    "coaching",
    "developpement personnel",
  ],
  authors: [{ name: BUSINESS_INFO.name }],
  creator: BUSINESS_INFO.name,
  metadataBase: new URL(BUSINESS_INFO.url),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: BUSINESS_INFO.url,
    siteName: BUSINESS_INFO.name,
    title: `${BUSINESS_INFO.name} - Coaching Professionnel`,
    description: BUSINESS_INFO.description,
  },
  twitter: {
    card: "summary_large_image",
    title: BUSINESS_INFO.name,
    description: BUSINESS_INFO.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BUSINESS_INFO.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Analytics />
        <LayoutWrapper footer={<Footer />}>{children}</LayoutWrapper>
        <CookieConsent />
        <WhatsAppButton />
      </body>
    </html>
  );
}
