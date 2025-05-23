import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend base URL
  timeout: 10000,
});

// Add request interceptor for auth headers
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;