import "./globals.css";
import NavMenu from "@/components/NavMenu";
import { Suspense } from "react";

export const metadata = { title: "TicketDesk" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-100">
        <Suspense fallback={<div className="h-16" />}>
          <NavMenu />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
