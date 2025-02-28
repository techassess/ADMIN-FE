import request from "@/utils/request";

const ProjectService = {
  fetchProjects: async () => {
    try {
      const response = await request.get("/api/projects");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  fetchProjectById: async (id) => {
    try {
      const response = await request.get(`/api/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  fetchUsersInProject: async (projectId) => {
    try {
      const response = await request.get(`/api/projects/${projectId}/users`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  deleteEmployeeFromProject: async (projectId, employeeId) => {
    try {
      const response = await request.delete(
        `/api/projects/${projectId}?userId=${employeeId}`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }
};
export default ProjectService;
