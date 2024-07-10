import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://react-gift-mock-api-pearl.vercel.app/'
});

export default axiosInstance;
