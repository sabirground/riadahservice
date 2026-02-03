import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import WhatsAppButton from "@/app/components/WhatsAppButton";

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
      </head>
      <body className="font-body antialiased bg-sand-50">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
