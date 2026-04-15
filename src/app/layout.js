import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "AL-HAYAT | Семейный ресторан в Бухаре",
    template: "%s | AL-HAYAT"
  },
  description: "AL-HAYAT - семейный ресторан в Бухаре с живой музыкой, халяль кухней и уютной атмосферой. Традиционные узбекские блюда, семейные обеды, банкеты. Забронируйте столик по телефону +998 (91) 980-00-38.",
  keywords: [
    "ресторан Бухара",
    "семейный ресторан",
    "AL-HAYAT",
    "узбекская кухня",
    "халяль ресторан",
    "живая музыка Бухара",
    "ресторан с доставкой",
    "банкетный зал Бухара",
    "национальная кухня",
    "плов",
    "шашлык",
    "лагман",
    "самса"
  ],
  authors: [{ name: "Akbar Soft", url: "https://akbarsoft.uz" }],
  creator: "Akbar Soft",
  publisher: "Akbar Soft",
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
  metadataBase: new URL("https://alhayat.uz"),
  alternates: {
    canonical: "https://alhayat.uz",
    languages: {
      'ru': 'https://alhayat.uz/ru',
      'uz': 'https://alhayat.uz/uz',
    },
  },
  openGraph: {
    title: "AL-HAYAT | Семейный ресторан в Бухаре",
    description: "Лучший семейный ресторан в Бухаре. Традиционная узбекская кухня, живая музыка, халяль, уютная атмосфера. Забронируйте столик!",
    url: "https://alhayat.uz",
    siteName: "AL-HAYAT",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AL-HAYAT Ресторан в Бухаре",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AL-HAYAT | Семейный ресторан в Бухаре",
    description: "Лучший семейный ресторан в Бухаре. Традиционная узбекская кухня, живая музыка, халяль.",
    images: ["/images/og-image.jpg"],
    site: "@alhayat_restaurant",
    creator: "@alhayat_restaurant",
  },
  icons: {
    icon: [
      { url: "/images/logo.png", sizes: "any" },
      { url: "/images/logo.png", sizes: "16x16", type: "image/png" },
      { url: "/images/logo.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#8b5cf6",
      },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "ваш_google_verification_код",
    yandex: "ваш_yandex_verification_код",
  },
  category: "restaurant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="format-detection" content="telephone=+998919800038" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="canonical" href="https://alhayat.uz" />
      </head>
      <body>{children}</body>
    </html>
  );
};