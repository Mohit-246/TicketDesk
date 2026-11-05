import "./globals.css";
import NavMenu from "@/components/NavMenu";
 
export const metadata = { title: "TicketDesk" };
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-100">
        <NavMenu />
        {children}
      </body>
    </html>
  );
}
