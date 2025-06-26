import axios from 'axios';
import API_BASE_URL from '../config/apiConfig'




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