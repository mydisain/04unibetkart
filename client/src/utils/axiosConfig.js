import axios from 'axios';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001', // Use environment variable in production
  withCredentials: true, // Important for CORS with credentials
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Log the API URL for debugging
console.log('API URL:', process.env.REACT_APP_API_URL || 'http://localhost:5001');

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;
    
    if (userInfo && userInfo.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Enhanced error logging
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers,
        url: error.response.config.url,
        method: error.response.config.method
      });
      
      // Handle specific error codes
      if (error.response.status === 401 || error.response.status === 403) {
        console.error('Authentication error:', error.response.data);
        // You could redirect to login page or dispatch a logout action here
      } else if (error.response.status === 405) {
        console.error('Method not allowed error. Check if the API endpoint supports this HTTP method.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error (no response):', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
