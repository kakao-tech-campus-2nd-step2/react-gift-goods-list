import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://react-gift-mock-api-hyo2.vercel.app/api/',
});
