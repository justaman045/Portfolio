import "./globals.css";

import { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import siteMetadata, { BASE_URL, defaultAuthor } from "@/lib/metadata";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@/components/analytics";
import { BackTopButton } from "@/components/back-to-top";
import { ThemeProvider } from "@/components/theme-provider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space",
  weight: ["400", "600", "700"],
});
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter", weight: ["400"] });

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: siteMetadata.title,
  description: siteMetadata.description,
  authors: [{ name: defaultAuthor.name, url: defaultAuthor.website }],
  alternates: {
    canonical: "./",
    types: {
      "application/rss+xml": `${BASE_URL}/feed.xml`,
    },
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white text-slate-900 antialiased dark:bg-gradient-to-b dark:from-[#0a0e17] dark:via-[#0d1220] dark:to-[#0f1525] dark:text-slate-50">
        <ThemeProvider attribute="class" defaultTheme={siteMetadata.defaultTheme} enableSystem>
          {children}
          <BackTopButton />
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
