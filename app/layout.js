import "./globals.css";
import NavMenu from "@/components/NavMenu";
import { Suspense } from "react";

export const metadata = {
  metadataBase: new URL("https://ticket-desk-one.vercel.app"),

  title: {
    default: "TicketDesk | Smart Ticket Management System",
    template: "%s | TicketDesk",
  },

  description:
    "TicketDesk is a smart ticket management system that helps you create, organize, track, and manage support tickets efficiently.",

  keywords: [
    "TicketDesk",
    "Ticket Management System",
    "Support Ticket Management",
    "Issue Tracking System",
    "Task Management",
  ],

  applicationName: "TicketDesk",

  openGraph: {
    title: "TicketDesk | Smart Ticket Management System",
    description:
      "Manage, organize, and track your support tickets efficiently with TicketDesk.",
    url: "https://ticket-desk-one.vercel.app",
    siteName: "TicketDesk",
    locale: "en_US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};


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
