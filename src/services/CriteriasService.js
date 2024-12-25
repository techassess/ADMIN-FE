import axios from "axios";
const CriteriasService = {

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
      const response = await axios.get(
        `http://localhost:8080/api/criterias/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default CriteriasService;
