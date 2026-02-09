import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import ChatWidget from "@/app/components/ChatWidget";

export const metadata = {
  title: "Riadah Services | Professional Business Services in UAE",
  description:
    "Professional business services in UAE. We provide reliable, affordable, and professional services tailored for businesses and individuals across the UAE.",
  keywords: [
    "UAE business services",
    "typing services",
    "PRO services",
    "business setup UAE",
    "document clearing",
    "visa services",
    "Al Ain",
    "Dubai",
    "Abu Dhabi",
  ],
  authors: [{ name: "Riadah Services" }],
  openGraph: {
    title: "Riadah Services | Professional Business Services in UAE",
    description:
      "Professional business services in UAE. We provide reliable, affordable, and professional services tailored for businesses and individuals across the UAE.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_AE"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
    other: [
      { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon.png" },
      { rel: "icon", type: "image/png", sizes: "96x96", url: "/favicon.png" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
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
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.png" type="image/png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon.png" />
      </head>
      <body className="font-body antialiased bg-sand-50">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <WhatsAppButton />
        <ChatWidget />
        <Footer />
      </body>
    </html>
  );
}
