import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import "./globals.css";
import { RegistroModalProvider } from "@/components/RegistroModal";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "La Pizarra | Análisis deportivo para latinos",
  description:
    "Picks diarios con análisis a fondo. La Tiza, La Yunta y El Tridente. Canal gratis en Telegram + premium desde $15/semana.",
  openGraph: {
    title: "La Pizarra | Análisis deportivo para latinos",
    description:
      "Picks diarios con análisis a fondo para latinos que siguen béisbol, fútbol americano y más. Sin hype vacío.",
    type: "website",
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Pizarra | Análisis deportivo para latinos",
    description: "Picks diarios con análisis a fondo. Canal gratis en Telegram.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${barlowCondensed.variable} ${manrope.variable} dark`}
    >
      <body className="min-h-full flex flex-col antialiased">
          <RegistroModalProvider>{children}</RegistroModalProvider>
        </body>
    </html>
  );
}
