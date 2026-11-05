
import Link from "next/link";
import DeleteBlock from "./DeleteBlock";

const statusStyles = {
  "Not Started": "bg-red-50 text-red-700 border-red-200",
  Started: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Done: "bg-green-50 text-green-700 border-green-200",
};

const priorityStyles = {
  1: { label: "Low", color: "bg-green-500" },
  2: { label: "Normal", color: "bg-blue-500" },
  3: { label: "Medium", color: "bg-yellow-500" },
  4: { label: "High", color: "bg-orange-500" },
  5: { label: "Critical", color: "bg-red-500" },
};

const categoryIcons = {
  "Hardware Problem": "💻",
  "Software Problem": "⚙️",
  "Application Development": "🚀",
  Project: "📁",
};

const formatTime = (iso) => {
  if (!iso) return "Date unavailable";

  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

export default function TicketCard({ ticket }) {
  const priority = priorityStyles[ticket.priority] || priorityStyles[1];

  const statusStyle =
    statusStyles[ticket.status] || statusStyles["Not Started"];

  const categoryIcon =
    categoryIcons[ticket.category] || "📌";

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">

      {/* Top Section */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-4">

        {/* Priority */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                className={`h-2.5 w-2.5 rounded-full ${
                  n <= ticket.priority
                    ? priority.color
                    : "bg-slate-200"
                }`}
              />
            ))}
          </div>

          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
            {priority.label} Priority
          </span>
        </div>

        {/* Delete */}
        <div className="transition-transform duration-200 hover:scale-110">
          <DeleteBlock id={ticket._id} />
        </div>
      </div>

      {/* Main Content */}
      <Link
        href={`/ticket/${ticket._id}`}
        className="flex flex-1 flex-col p-5"
      >

        {/* Category */}
        <div className="mb-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            <span>{categoryIcon}</span>
            {ticket.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-bold text-slate-800 transition-colors group-hover:text-blue-700">
          {ticket.title}
        </h3>

        {/* Description */}
        <p className="mb-5 line-clamp-3 whitespace-pre-wrap text-sm leading-6 text-slate-500">
          {ticket.description}
        </p>

        {/* Progress */}
        <div className="mt-auto">

          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Progress
            </span>

            <span className="text-sm font-bold text-blue-700">
              {ticket.progress}%
            </span>
          </div>

          <div
            className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-valuenow={ticket.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Ticket progress"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-700"
              style={{ width: `${ticket.progress}%` }}
            />
          </div>

        </div>

      </Link>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 border-t border-slate-100 px-5 py-4">

        {/* Status */}
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle}`}
        >
          {ticket.status}
        </span>

        {/* Date */}
        <span className="text-right text-xs text-slate-400">
          🕒 {formatTime(ticket.createdAt)}
        </span>

      </div>

    </div>
  );
}
