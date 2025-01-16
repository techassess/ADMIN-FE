import axios from "axios";
const QuestionService = {
  addQuestion: async (formData) => {
    const resp = await axios.post(
      process.env.VUE_APP_DB_URL + "/api/questions",
      formData,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    return resp.data;
  },

  deletedQuestion: async (id) => {
    try {
      const response = await axios.delete(
        process.env.VUE_APP_DB_URL + `/api/questions/${id}`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  getQuestionById: async (id) => {
    try {
      const response = await axios.get(
        process.env.VUE_APP_DB_URL + `/api/questions/v2/${id}`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }
};

export default QuestionService;
