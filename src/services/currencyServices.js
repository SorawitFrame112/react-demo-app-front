import axiosInstance from '../config/axiosInstance';

const CurrentcyService = {
  getCurrentcies: async () => {
    try {
      const response = await axiosInstance.get(`/currency`);
      return response.data; 
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'failed due to load currency';
      throw new Error(errorMessage);
    }
  },
};

export default CurrentcyService;