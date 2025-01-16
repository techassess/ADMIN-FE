import axios from "axios";
const DepartmentsService = {
  // department
  fetchDepartment: async () => {
    try {
      const response = await axios.get(process.env.VUE_APP_DB_URL + "/api/departments");
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  addDepartment: async (formData) => {
    const resp = await axios.post(
      process.env.VUE_APP_DB_URL + "/api/departments",
      formData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return resp.data;
  },

  fetchDepartmentById: async (id) => {
    try {
      const response = await axios.get(
        process.env.VUE_APP_DB_URL + `/api/departments/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  updateDepartments: async (id, departmentData) => {
    try {
      const updateDepartments = {
        name: departmentData.name,
      };

      const response = await axios.put(
        process.env.VUE_APP_DB_URL + `/api/departments/${id}`,
        updateDepartments
      );
      return response.data;
    } catch (error) {
      console.error("Error updating department:", error);
      throw error;
    }
  },

  deletedDepartments: async (id) => {
    console.log("id ", id);
    try {
      const response = await axios.delete(
        process.env.VUE_APP_DB_URL + `/api/departments/${id}`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  },
};

export default DepartmentsService;
