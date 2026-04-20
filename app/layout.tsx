import type { Metadata } from "next";
import "@/styles/globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { AppProviders } from "@/providers/app-providers";
import { siteConfig } from "@/lib/constants/site";
import { MetaPixel } from "@/lib/analytics/meta-pixel";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ReCaptchaProvider } from "@/components/recaptcha/recaptcha-provider";

import { Preloader } from "@/components/animations/preloader";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>
          <ReCaptchaProvider>
            <Preloader />
            <Header />
            <main className="ds-page-pad">{children}</main>
            <Footer />
          </ReCaptchaProvider>
        </AppProviders>

        <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
