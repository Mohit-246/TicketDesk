"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import TicketCard from "@/components/TicketCard";

const CATEGORIES = [
  "All",
  "Hardware Problem",
  "Software Problem",
  "Application Development",
  "Project",
];

export default function DashboardContent({ tickets = [] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const stats = [
    {
      title: "Total Tickets",
      value: tickets.length,
    },
    {
      title: "Completed",
      value: tickets.filter((t) => t.status === "Done").length,
    },
    {
      title: "In Progress",
      value: tickets.filter((t) => t.status === "Started").length,
    },
    {
      title: "Not Started",
      value: tickets.filter((t) => t.status === "Not Started").length,
    },
  ];

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesCategory =
        category === "All" || ticket.category === category;

      const query = search.toLowerCase();

      const matchesSearch =
        ticket.title?.toLowerCase().includes(query) ||
        ticket.description?.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [tickets, category, search]);

  const groupedTickets = CATEGORIES.slice(1)
    .map((name) => ({
      name,
      tickets: filteredTickets.filter((t) => t.category === name),
    }))
    .filter((group) => group.tickets.length > 0);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Dashboard Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Overview of all your tickets and their current status.
            </p>
          </div>

          <Link
            href="/ticket/new"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white transition hover:bg-blue-700"
          >
            + Create Ticket
          </Link>
        </div>

        {/* Statistics */}
        <section className="grid md:grid-cols-1 gap-4 grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>

              <h2 className="mt-2 text-3xl font-semibold text-gray-900">
                {stat.value}
              </h2>
            </div>
          ))}
        </section>

        {/* Search and Filter */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <input
              type="search"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 lg:max-w-sm"
            />

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    category === item
                      ? "bg-blue-600 text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Ticket Groups */}
        {/* Ticket Groups */}
        <section>
          {filteredTickets.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white px-5 py-16 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                No tickets found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {tickets.length === 0
                  ? "Create your first ticket to get started."
                  : "Try changing your search or category filter."}
              </p>

              {tickets.length === 0 && (
                <Link
                  href="/ticket/new"
                  className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Create Ticket
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {category === "All" ? "All Tickets" : category}
                </h2>

                <span className="text-sm text-gray-500">
                  {filteredTickets.length} tickets
                </span>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredTickets.map((ticket) => (
                  <TicketCard key={ticket._id} ticket={ticket} />
                ))}
              </div>
            </>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-5 text-center text-xs text-gray-400">
          TicketDesk Management System
        </footer>
      </div>
    </main>
  );
}
