import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://react-gift-mock-api-sigma.vercel.app/',
  timeout: 10000,
});
