import axios from 'axios';
const UserService = {
    addUser: async (dto) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auths/register', dto);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    deletedUser: async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/users/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    fetchUsers: async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    fetchUserById: async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    updateUser: async (reqDto, id) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/users/${id}`, reqDto);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default UserService;