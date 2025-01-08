import ApiResponse from "@/model/ApiResponse";
import axios from "axios";

const RatedRankService = {

    fetchOverallRated: async (userId) => {
        try {
            const response = await axios.get("http://localhost:8080/api/rated-rank/overall-rated/" + userId);
            /**
             * @type {ApiResponse}
             */
            const data = response.data;
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
export default RatedRankService;