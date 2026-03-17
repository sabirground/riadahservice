import "./../globals.css";
import { ClientLayout } from "./ClientLayout";
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
  title: "Riadah Admin Panel",
  description: "Admin panel for Riadah Services",
  keywords: ["admin", "Riadah Services", "dashboard"],
  authors: [{ name: "Riadah Services" }],
  openGraph: {
    title: "Riadah Admin Panel",
    description: "Admin panel for Riadah Services",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/Images/logo.png-removebg-preview.png",
    shortcut: "/Images/logo.png-removebg-preview.png",
    apple: "/Images/logo.png-removebg-preview.png",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/Images/logo.png-removebg-preview.png" type="image/png" />
        <link rel="shortcut icon" href="/Images/logo.png-removebg-preview.png" type="image/png" />
        <link rel="apple-touch-icon" href="/Images/logo.png-removebg-preview.png" type="image/png" />
      </head>
      <body className={`${cormorant.variable} ${dmSans.variable} font-body antialiased bg-sand-50`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
