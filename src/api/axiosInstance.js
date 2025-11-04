import axios from 'axios';

// Alamat backend Spring Boot
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true // 🔹 wajib untuk session cookie (JSESSIONID)
});

// Middleware (interceptor)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.error("Sesi tidak valid atau sudah habis. Redirect ke login.");
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
