import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { pick } from "@/lib/pick";
import Ticket from "@/models/Ticket";

// GET /api/tickets — list all tickets, newest first.
export async function GET() {
  try {
    await connectDB();
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    return NextResponse.json({ tickets }, { status: 200 });
  } catch (error) {
    console.error("GET /api/tickets:", error);
    return NextResponse.json(
      { message: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}

// POST /api/tickets — create a ticket.
export async function POST(request) {
  try {
    const data = pick(await request.json());
    await connectDB();

    const ticket = await Ticket.create(data);

    return NextResponse.json(
      { message: "Ticket created", ticket },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/tickets:", error);
    const status =
      error.name === "ValidationError" || error.name === "SyntaxError"
        ? 400
        : 500;

    return NextResponse.json(
      { message: error.message || "Failed to create ticket" },
      { status }
    );
  }
}
