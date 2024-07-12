import axios, { AxiosError } from 'axios';

import { API_ERROR_MESSAGES } from '@/constants/errorMessage';

export const BACKEND_API = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL,
  baseURL: 'https://react-gift-mock-api-ppochaco.vercel.app',
});

function getErrorMessage(error: AxiosError): string {
  if (error.response) {
    switch (error.response.status) {
      case 404:
        return API_ERROR_MESSAGES.DATA_NOT_FOUND;
      default:
        return API_ERROR_MESSAGES.FETCH_ERROR;
    }
  }

  if (error.request) {
    return API_ERROR_MESSAGES.NETWORK_ERROR;
  }

  return API_ERROR_MESSAGES.UNKNOWN_ERROR;
}

BACKEND_API.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const customError = new Error(getErrorMessage(error));
    return Promise.reject(customError);
  }
);
