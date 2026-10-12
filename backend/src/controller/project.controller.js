import {
  createProject as saveProject,
  listProjects as getProjects,
  removeProject as deleteProject,
} from "../services/project.service.js";

export const listProjects = async (_request, response) => {
  const projects = await getProjects();
  return response.json({ projects });
};

export const createProject = async (request, response) => {
  const project = await saveProject(request.body);
  return response.status(201).json({ project });
};

export const removeProject = async (request, response) => {
  const project = await deleteProject(request.params.id);
  if (!project) {
    return response.status(404).json({ message: "Project not found." });
  }
  return response.json({ message: "Project removed.", projectId: project.id });
};
