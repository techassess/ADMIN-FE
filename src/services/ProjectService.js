import axios from 'axios';
const ProjectService = {
    fetchProjects: async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/projects');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    fetchProjectById: async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/projects/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}
export default ProjectService