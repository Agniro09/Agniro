const readResponse = async (response) => {
  const result = await response.json();
  if (response.status === 401) {
    const error = new Error(result.message || "Your admin session has expired. Please sign in again.");
    error.status = 401;
    throw error;
  }
  if (!response.ok) throw new Error(result.message || "The project request could not be completed.");
  return result;
};

export const getProjects = async (admin = false) => {
  const response = await fetch(admin ? "/api/admin/projects" : "/api/projects", {
    credentials: admin ? "include" : "same-origin",
  });
  const result = await readResponse(response);
  return result.projects;
};

export const addProject = async (project) => {
  const response = await fetch("/api/admin/projects", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  const result = await readResponse(response);
  return result.project;
};

export const deleteProject = async (id) => {
  const response = await fetch(`/api/admin/projects/${encodeURIComponent(id)}`, {
    method: "DELETE",
    credentials: "include",
  });
  return readResponse(response);
};