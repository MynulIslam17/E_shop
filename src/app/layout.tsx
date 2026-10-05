import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Anton } from "next/font/google";
import "@/styles/globals.css";
import { defaultSEO } from "@/config/seo.config";
import { Providers } from "@/components/common/Providers";
import { TopLoader } from "@/components/common/TopLoader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = defaultSEO;

export const viewport: Viewport = {
  themeColor: "#0B0B10",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${anton.variable} dark`}
    >
      <body className="min-h-screen bg-[#0B0B10] text-white font-sans antialiased selection:bg-brand-orange selection:text-white">
        <TopLoader />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
