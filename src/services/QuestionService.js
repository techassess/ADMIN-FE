import axios from "axios";
const QuestionService = {
  addQuestion: async (formData) => {
    const resp = await axios.post(
      "http://localhost:8080/api/questions",
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
        `http://localhost:8080/api/questions/${id}`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  getQuestionById: async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/questions/v2/${id}`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }
};

export default QuestionService;
