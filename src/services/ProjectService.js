import axios from 'axios';
const ProjectService = {
    fetchProjects: async () => {
        try {
            const response = await axios.get(process.env.VUE_APP_DB_URL + '/api/projects');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    fetchProjectById: async (id) => {
        try {
            const response = await axios.get(process.env.VUE_APP_DB_URL + `/api/projects/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}
export default ProjectService