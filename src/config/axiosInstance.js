import axios from 'axios';
const API_BASE_URL = 'https://localhost:7162/api';
// Load from .env (Vite version)


// สร้าง axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
});

// Request Interceptor: แนบ access token ทุก request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//  Response Interceptor: จัดการ error และ refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ดัก 401 และพยายาม refresh token
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/login') &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        // เรียก API refresh token
        const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = refreshResponse.data.accessToken;

        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        window.location.href = '/'; 

        return Promise.reject(refreshError);
      }
    }

    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.warn('Bad Request:', data.message || data);
          break;
        case 403:
          console.warn('Forbidden:', data.message || data);
          break;
        case 500:
          console.error('Server Error:', data.message || data);
          break;
        default:
          console.warn('API Error:', data.message || data);
      }
    } else {
      console.error('Network/Unexpected Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
