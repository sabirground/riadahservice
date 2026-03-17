import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import ChatWidget from "@/app/components/ChatWidget";
import StructuredData from "@/app/components/StructuredData";

// Import custom fonts for Why Us page
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  title: "Riadah Services | Top UAE Business Professionals & Corporate Solutions",
  description:
    "Leading UAE business professionals offering company formation, PRO services, visa processing, and business setup in Dubai, Abu Dhabi & Al Ain. Trusted by 1000+ businesses across the UAE.",
  keywords: [
    "UAE business professional",
    "business professional UAE",
    "UAE corporate services",
    "business setup UAE",
    "company formation Dubai",
    "PRO services UAE",
    "professional business consultant UAE",
    "corporate services Dubai",
    "business visa UAE",
    "trade license UAE",
    "typing services UAE",
    "document clearing UAE",
    "Riadah typing office",
    "Riadah UAE",
    "Best Visa Services in UAE",
    "Quick Visa in UAE",
    "business services Al Ain",
    "business services Dubai",
    "business services Abu Dhabi",
    "UAE business consultant",
  ],
  authors: [{ name: "Riadah Services" }],
  openGraph: {
    title: "Riadah Services | Top UAE Business Professionals & Corporate Solutions",
    description:
      "Leading UAE business professionals offering company formation, PRO services, visa processing, and business setup in Dubai, Abu Dhabi & Al Ain. Trusted by 1000+ businesses across the UAE.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_AE"],
    siteName: "Riadah Services",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://riadahservices.com',
    languages: {
      'en': 'https://riadahservices.com',
      'ar': 'https://riadahservices.com',
    },
  },
  icons: {
    icon: "/Images/logo.png-removebg-preview.png",
    shortcut: "/Images/logo.png-removebg-preview.png",
    apple: "/Images/logo.png-removebg-preview.png",
    other: [
      { rel: "icon", type: "image/png", sizes: "16x16", url: "/Images/logo.png-removebg-preview.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", url: "/Images/logo.png-removebg-preview.png" },
      { rel: "icon", type: "image/png", sizes: "96x96", url: "/Images/logo.png-removebg-preview.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", url: "/Images/logo.png-removebg-preview.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", url: "/Images/logo.png-removebg-preview.png" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <StructuredData />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Windows High-DPI Display Optimization */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        {/* Favicon */}
        <link rel="icon" href="/Images/logo.png-removebg-preview.png" type="image/png" />
        <link rel="shortcut icon" href="/Images/logo.png-removebg-preview.png" type="image/png" />
        <link rel="apple-touch-icon" href="/Images/logo.png-removebg-preview.png" type="image/png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/Images/logo.png-removebg-preview.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/Images/logo.png-removebg-preview.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/Images/logo.png-removebg-preview.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/Images/logo.png-removebg-preview.png" />
      </head>
      <body className={`${cormorant.variable} ${dmSans.variable} font-body antialiased bg-sand-50`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <WhatsAppButton />
        <ChatWidget />
        <Footer />
      </body>
    </html>
  );
}
