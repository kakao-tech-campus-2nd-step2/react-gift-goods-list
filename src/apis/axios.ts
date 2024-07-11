const baseURL = 'https://react-gift-mock-api-jaeanhan.vercel.app';

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
