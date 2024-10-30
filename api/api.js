import axios from 'axios';

const api = axios.create({
    baseURL: `https://darling-treefrog-settled.ngrok-free.app/api`,
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
