import axios from "axios";
const CriteriasService = {
  addCriteria: async (formData) => {
    const resp = await axios.post(
      process.env.VUE_APP_DB_URL + "/api/criterias",
      formData,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    return resp.data;
  },

  deletedCriterias: async (id) => {
    try {
      const response = await axios.delete(
        process.env.VUE_APP_DB_URL + `/api/criterias/${id}`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  fetchCriterias: async () => {
    try {
      const response = await axios.get(process.env.VUE_APP_DB_URL + "/api/criterias");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  fetchCriteriasById: async (id, department_id) => {
    try {
      const response = await axios.get(
        process.env.VUE_APP_DB_URL + `/api/criterias/${id}/${department_id}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  updateCriterias: async (id, criteriaData) => {
    try {
      const updatedCriteria = {
        title: criteriaData.title,
        point: criteriaData.point,
      };

      const response = await axios.put(
        process.env.VUE_APP_DB_URL + `/api/criterias/${id}`,
        updatedCriteria
      );
      return response.data;
    } catch (error) {
      console.error("Error updating criteria:", error);
      throw error;
    }
  },
  updateCriteriaInDepartment: async (critediaId, departmentId, criteriaReqDto) => {
    try {
      const dto = {
        criteriaReqDTO: {
          title: criteriaReqDto.title,
          visibleFor: criteriaReqDto.visibleFor
        },
        criteriaId: critediaId,
        departmentId: departmentId
      };

      const response = await axios.put(
        process.env.VUE_APP_DB_URL + `/api/criterias/update-criterion-in-department`,
        dto
      );
      return response.data;
    } catch (error) {
      console.error("Error updating criteria:", error);
      throw error;
    }
  },

  // department
  fetchDepartment: async () => {
    try {
      const response = await axios.get(process.env.VUE_APP_DB_URL + "/api/departments");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },


};

export default CriteriasService;
