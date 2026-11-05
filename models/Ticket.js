import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Hardware Problem",
        "Software Problem",
        "Application Development",
        "Project",
      ],
    },
    priority: {
      type: Number,
      min: 1,
      max: 5,
      default: 1,
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Not Started", "Started", "Done"],
      default: "Not Started",
    },
  },
  { timestamps: true }
);

const Ticket =
  mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;
