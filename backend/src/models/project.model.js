import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    tagline: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2048,
    },
    projectUrl: {
      type: String,
      trim: true,
      maxlength: 2048,
      default: "",
    },
  },
  { timestamps: true },
);

projectSchema.index({ createdAt: -1 });

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema, "projects");

export default Project;
