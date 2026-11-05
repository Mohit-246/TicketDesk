import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { pick } from "@/lib/pick";
import Ticket from "@/models/Ticket";

const reply = (message, status, extra = {}) =>
  NextResponse.json({ message, ...extra }, { status });

const invalid = () => reply("Invalid ticket id", 400);
const missing = () => reply("Ticket not found", 404);

const failure = (error) => {
  console.error("Ticket API error:", error);
  const status =
    error.name === "ValidationError" || error.name === "SyntaxError"
      ? 400
      : 500;
  return reply(error.message || "Server error", status);
};

// GET /api/tickets/:id — fetch one ticket.
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return invalid();

    await connectDB();
    const ticket = await Ticket.findById(id);

    return ticket
      ? NextResponse.json({ ticket }, { status: 200 })
      : missing();
  } catch (error) {
    return failure(error);
  }
}

// PUT /api/tickets/:id — update a ticket.
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return invalid();

    const updates = pick(await request.json());
    await connectDB();

    const ticket = await Ticket.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!ticket) return missing();

    return NextResponse.json(
      { message: "Ticket updated", ticket },
      { status: 200 }
    );
  } catch (error) {
    return failure(error);
  }
}

// DELETE /api/tickets/:id — permanently delete a ticket.
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return invalid();

    await connectDB();
    const ticket = await Ticket.findByIdAndDelete(id);

    return ticket ? reply("Ticket deleted", 200) : missing();
  } catch (error) {
    return failure(error);
  }
}
