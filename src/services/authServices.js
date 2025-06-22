import axios from 'axios';


const API_BASE_URL = 'https://localhost:7162/api'; 

const authService = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      return response.data; 
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed due to network error.';
      throw new Error(errorMessage);
    }
  },
};

export default authService;