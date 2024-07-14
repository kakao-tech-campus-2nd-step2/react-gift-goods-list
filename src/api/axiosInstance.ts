import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://react-gift-mock-api-sugoring.vercel.app/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
