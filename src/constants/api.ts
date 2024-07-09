import axios from 'axios';

export const BACKEND_API = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL,
  baseURL: 'https://react-gift-mock-api-ppochaco.vercel.app',
});
