
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const CATEGORIES = [
  "Hardware Problem",
  "Software Problem",
  "Application Development",
  "Project",
];

const STATUSES = ["Not Started", "Started", "Done"];

const PRIORITIES = [
  { value: 1, label: "Low", color: "border-green-300 bg-green-50 text-green-700" },
  { value: 2, label: "Normal", color: "border-blue-300 bg-blue-50 text-blue-700" },
  { value: 3, label: "Medium", color: "border-yellow-300 bg-yellow-50 text-yellow-700" },
  { value: 4, label: "High", color: "border-orange-300 bg-orange-50 text-orange-700" },
  { value: 5, label: "Critical", color: "border-red-300 bg-red-50 text-red-700" },
];

export default function TicketForm({ ticket }) {
  const router = useRouter();
  const editing = Boolean(ticket?._id);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: ticket?.title ?? "",
    description: ticket?.description ?? "",
    category: ticket?.category ?? CATEGORIES[0],
    priority: ticket?.priority ?? 1,
    progress: ticket?.progress ?? 0,
    status: ticket?.status ?? "Not Started",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numeric = ["priority", "progress"].includes(name);

    setForm((prev) => ({
      ...prev,
      [name]: numeric ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim() || !form.description.trim()) {
      setError("Please enter both a title and description.");
      return;
    }

    setLoading(true);

    try {
      const url = editing
        ? `/api/tickets/${ticket._id}`
        : "/api/tickets";

      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Unable to save ticket.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectedPriority = PRIORITIES.find(
    (p) => p.value === form.priority
  );

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-7 py-8 text-white">
          <p className="mb-2 text-sm font-medium text-blue-100">
            TICKETDESK MANAGEMENT
          </p>

          <h2 className="text-3xl font-bold">
            {editing ? "Update Ticket" : "Create New Ticket"}
          </h2>

          <p className="mt-2 text-sm text-blue-100">
            {editing
              ? "Modify the details and keep your ticket up to date."
              : "Add a new task, report a problem, or track project progress."}
          </p>
        </div>

        <div className="space-y-6 p-7">

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              ⚠️ {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Ticket Title *
            </label>

            <input
              id="title"
              name="title"
              required
              maxLength={100}
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Fix laptop startup issue"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

            <p className="mt-1 text-right text-xs text-slate-400">
              {form.title.length}/100
            </p>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Description *
            </label>

            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the issue or task in detail..."
              className="w-full resize-y rounded-xl border border-slate-300 bg-slate-50 p-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Category
            </label>

            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Priority Level
            </label>

            <div className="grid grid-cols-5 gap-2">
              {PRIORITIES.map((priority) => (
                <button
                  key={priority.value}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      priority: priority.value,
                    }))
                  }
                  aria-pressed={form.priority === priority.value}
                  className={`rounded-xl border p-3 text-center transition ${
                    form.priority === priority.value
                      ? `${priority.color} ring-2 ring-offset-1 ring-current`
                      : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <span className="block text-lg font-bold">
                    {priority.value}
                  </span>
                  <span className="text-xs">{priority.label}</span>
                </button>
              ))}
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Selected:{" "}
              <span className="font-semibold text-slate-800">
                {selectedPriority?.label}
              </span>
            </p>
          </div>

          {/* Progress */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label
                htmlFor="progress"
                className="text-sm font-semibold text-slate-700"
              >
                Task Progress
              </label>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700">
                {form.progress}%
              </span>
            </div>

            <input
              id="progress"
              type="range"
              name="progress"
              min="0"
              max="100"
              step="5"
              value={form.progress}
              onChange={handleChange}
              className="w-full cursor-pointer accent-blue-600"
            />

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all"
                style={{ width: `${form.progress}%` }}
              />
            </div>

            <div className="mt-2 flex justify-between text-xs text-slate-400">
              <span>Not started</span>
              <span>In progress</span>
              <span>Completed</span>
            </div>
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Ticket Status
            </label>

            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex-1 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Saving..."
                : editing
                  ? "Update Ticket"
                  : "Create Ticket"}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}
