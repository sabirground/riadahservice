"use client";

import { usePathname } from "next/navigation";

export function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <>
      {isAdminPage && (
        <style jsx global>{`
          #navbar,
          #footer,
          #whatsapp-button,
          #chat-widget {
            display: none !important;
          }
        `}</style>
      )}
      
      {children}
    </>
  );
}
