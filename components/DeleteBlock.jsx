
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteBlock({ id }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmed = window.confirm(
      "Are you sure you want to delete this ticket permanently? This action cannot be undone."
    );

    if (!confirmed) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/tickets/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to delete ticket.");
      }

      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        aria-label="Delete ticket"
        title="Delete ticket"
        className="group flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition-all duration-200 hover:border-red-300 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Deleting...
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14M10 11v5m4-5v5"
              />
            </svg>
            Delete
          </>
        )}
      </button>

      {error && (
        <p role="alert" className="absolute right-0 top-full z-20 mt-2 w-48 rounded-lg border border-red-200 bg-white p-2 text-xs text-red-600 shadow-lg">
          {error}
        </p>
      )}
    </div>
  );
}
