import type { Metadata } from "next";
import { Outfit, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Primary font - Modern, warm, great for French
const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Serif font - For narrative/storytelling sections
const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Mono font - For code/tech elements
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://village-nird.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Village NIRD - Le Village Numérique Résistant",
    template: "%s | Village NIRD",
  },
  description: "Comment les écoles peuvent-elles résister à Big Tech ? Découvrez le mouvement NIRD - Numérique Inclusif, Responsable, Durable. La Nuit de l'Info 2025.",
  keywords: ["NIRD", "Linux", "open source", "éducation", "écoles", "Big Tech", "souveraineté numérique", "nuit de l'info", "2025"],
  authors: [{ name: "Team Mauritania" }],
  creator: "Team Mauritania",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Village NIRD",
    title: "Village NIRD - Le Village Numérique Résistant",
    description: "Comment les écoles peuvent-elles résister à Big Tech ? Rejoignez le mouvement NIRD !",
  },
  twitter: {
    card: "summary_large_image",
    title: "Village NIRD - Le Village Numérique Résistant",
    description: "Comment les écoles peuvent-elles résister à Big Tech ? Rejoignez le mouvement NIRD !",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            className: 'bg-slate-900 border-slate-700 text-white',
          }}
        />
      </body>
    </html>
  );
}
