
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMenu() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isNewTicket = pathname === "/ticket/new";

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-xl font-bold text-white shadow-md transition group-hover:scale-105">
            T
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-800">
              Ticket<span className="text-blue-600">Desk</span>
            </h1>
            <p className="text-[10px] font-semibold uppercase tracking-[2px] text-slate-400">
              Manage. Track. Resolve.
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2 sm:gap-4">

          <Link
            href="/"
            aria-current={isHome ? "page" : undefined}
            className={`rounded-xl px-3 py-2 text-sm font-semibold transition sm:px-4 ${
              isHome
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-blue-700"
            }`}
          >
            <span className="flex items-center gap-2">
              <span>⌂</span>
              <span className="hidden sm:inline">Dashboard</span>
            </span>
          </Link>

          <Link
            href="/ticket/new"
            aria-current={isNewTicket ? "page" : undefined}
            className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold shadow-sm transition sm:px-5 ${
              isNewTicket
                ? "bg-indigo-700 text-white"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-md"
            }`}
          >
            <span className="text-lg leading-none">+</span>
            <span>New Ticket</span>
          </Link>

        </div>
      </div>
    </nav>
  );
}
