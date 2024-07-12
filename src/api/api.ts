import axios from 'axios';

const api = axios.create({
  baseURL: 'https://react-gift-mock-api-kimdayeon.vercel.app', // Mock API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
