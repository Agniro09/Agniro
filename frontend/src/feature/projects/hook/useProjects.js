import { useCallback, useEffect, useState } from "react";
import {
  addProject as createProjectRequest,
  deleteProject as deleteProjectRequest,
  getProjects,
} from "../api.project.js";

const useProjects = ({ admin = false, onUnauthorized } = {}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [removingId, setRemovingId] = useState("");

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setProjects(await getProjects(admin));
    } catch (loadError) {
      if (loadError.status === 401 && onUnauthorized) {
        onUnauthorized();
        return;
      }
      setError(loadError.message || "Could not load projects.");
    } finally {
      setLoading(false);
    }
  }, [admin, onUnauthorized]);

  useEffect(() => {
    let active = true;

    getProjects(admin)
      .then((loadedProjects) => {
        if (active) setProjects(loadedProjects);
      })
      .catch((loadError) => {
        if (!active) return;
        if (loadError.status === 401 && onUnauthorized) {
          onUnauthorized();
          return;
        }
        setError(loadError.message || "Could not load projects.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [admin, onUnauthorized]);

  const createProject = async (project) => {
    setSaving(true);
    setError("");
    try {
      const createdProject = await createProjectRequest(project);
      setProjects((current) => [createdProject, ...current]);
      return true;
    } catch (createError) {
      if (createError.status === 401 && onUnauthorized) onUnauthorized();
      setError(createError.message || "Could not add project.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const removeProject = async (id) => {
    setRemovingId(id);
    setError("");
    try {
      await deleteProjectRequest(id);
      setProjects((current) => current.filter((project) => project._id !== id));
      return true;
    } catch (deleteError) {
      if (deleteError.status === 401 && onUnauthorized) onUnauthorized();
      setError(deleteError.message || "Could not remove project.");
      return false;
    } finally {
      setRemovingId("");
    }
  };

  return {
    projects,
    loading,
    error,
    saving,
    removingId,
    loadProjects,
    createProject,
    removeProject,
  };
};

export default useProjects;
