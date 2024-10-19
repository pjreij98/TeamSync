import axios from 'axios';

const API_BASE_URL = process.env.BACKEND_URL; // Update with your backend URL

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
        console.log(response);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Add more API methods as needed

export default api;
