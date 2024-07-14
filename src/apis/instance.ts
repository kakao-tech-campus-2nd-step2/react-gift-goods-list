import type { AxiosError } from 'axios';
import axios from 'axios';

import ERROR_MESSAGE from './errorCode.constants';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const handleAxiosError = (error: AxiosError) => {
  const statusCode = error.response?.status?.toString();
  if (statusCode && statusCode in ERROR_MESSAGE) {
    throw new Error(ERROR_MESSAGE[statusCode as unknown as keyof typeof ERROR_MESSAGE]);
  }
  throw error;
};

instance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error);
    }
    throw error;
  },
);

export default instance;
