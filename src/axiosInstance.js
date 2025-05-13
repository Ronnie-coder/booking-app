import axios from 'axios';

// Set up Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Use your deployed URL for prod
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;