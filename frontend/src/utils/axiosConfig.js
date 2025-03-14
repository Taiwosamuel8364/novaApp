import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
  validateStatus: function (status) {
    return status < 500; // Don't reject if status is less than 500
  }
});

axiosInstance.interceptors.request.use(
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

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 404) {
      window.location.href = '/404';
      return Promise.reject(response);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    } else if (error.response?.status === 404) {
      window.location.href = '/404';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
