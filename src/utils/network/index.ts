import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// eslint-disable-next-line import/prefer-default-export
export { axiosInstance };
