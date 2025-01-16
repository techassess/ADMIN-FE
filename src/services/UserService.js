import axios from 'axios';
const UserService = {
    addUser: async (dto) => {
        try {
            const response = await axios.post(process.env.VUE_APP_DB_URL + '/api/auths/register', dto);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    deletedUser: async (id) => {
        try {
            const response = await axios.delete(process.env.VUE_APP_DB_URL + `/api/users/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    fetchUsers: async () => {
        try {
            const response = await axios.get(process.env.VUE_APP_DB_URL + '/api/users');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    fetchUserById: async (id) => {
        try {
            const response = await axios.get(process.env.VUE_APP_DB_URL + `/api/users/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    updateUser: async (reqDto, id) => {
        try {
            const response = await axios.put(process.env.VUE_APP_DB_URL + `/api/users/${id}`, reqDto);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default UserService;