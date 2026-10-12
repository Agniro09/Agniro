import mongoose from "mongoose";
import Project from "../models/project.model.js";

const ensureDatabaseReady = () => {
  if (mongoose.connection.readyState !== 1) {
    const error = new Error("Project storage is temporarily unavailable.");
    error.status = 503;
    throw error;
  }
};

export const listProjects = async () => {
  ensureDatabaseReady();
  return Project.find().sort({ createdAt: -1 }).lean();
};

export const createProject = async (projectData) => {
  ensureDatabaseReady();
  return Project.create(projectData);
};

export const removeProject = async (id) => {
  ensureDatabaseReady();
  if (!mongoose.isValidObjectId(id)) return null;
  return Project.findByIdAndDelete(id);
};
