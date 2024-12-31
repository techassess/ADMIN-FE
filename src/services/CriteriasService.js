import axios from "axios";
const CriteriasService = {
  addCriteria: async (formData) => {
    const resp = await axios.post(
      "http://localhost:8080/api/criterias",
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
        `http://localhost:8080/api/criterias/${id}`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  fetchCriterias: async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/criterias");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  fetchCriteriasById: async (id) => {
    try {
      let department_id = JSON.parse(localStorage.getItem("department_id"))
      const response = await axios.get(
        `http://localhost:8080/api/criterias/${id}/${department_id}`
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
        `http://localhost:8080/api/criterias/${id}`,
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
          point: criteriaReqDto.point,
          visibleFor: criteriaReqDto.visibleFor
        },
        critediaId: critediaId,
        departmentId: departmentId
      }
      const response = await axios.put(
        `http://localhost:8080/api/criterias/update-criterion-in-department`,
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
      const response = await axios.get("http://localhost:8080/api/departments");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },


};

export default CriteriasService;
