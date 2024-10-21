import axios from 'axios';

const api = axios.create({
    baseURL: `http://192.168.1.78:8080/api`,
    headers: {
        'Content-Type': 'application/json',
        
    },
});

// Example: Authentication
export const login = async (username, password) => {
    try {
        const response = await api.post('/auth/login', { username, password });
        console.log("USER DATA U FUCKING IDIOT " + JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default api;
