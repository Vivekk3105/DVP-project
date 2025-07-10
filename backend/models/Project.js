import mongoose from "mongoose"

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    dvpCategory: {
      type: String,
      required: true,
      enum: ["Exterior trims", "IP and Console trims", "Interior Trims"],
    },
    subSystem: {
      type: String,
      required: true,
    },
    assignedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["pending", "active", "completed"],
      default: "pending",
    },
    documents: [
      {
        filename: String,
        originalName: String,
        path: String,
        size: Number,
        uploadDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

export default mongoose.model("Project", projectSchema)
