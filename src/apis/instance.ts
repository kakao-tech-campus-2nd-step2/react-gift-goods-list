import axios, { AxiosError } from 'axios';
import { ERROR } from '@utils/constants/message';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
});

const statusMessages: { [key: number]: string } = {
  400: ERROR.DATA_FETCH,
  401: ERROR.UNAUTHORIZED,
  403: ERROR.FORBIDDEN,
  404: ERROR.NOT_FOUND,
  408: ERROR.TIMEOUT,
  409: ERROR.CONFLICT,
  500: ERROR.SERVER_ERROR,
};

axiosInstance.interceptors.response.use(
  (res) => res,
  (e: AxiosError) => {
    if (e.response) {
      const message = statusMessages[e.response.status];
      e.message = message;
    }
    return Promise.reject(e);
  },
);

export default axiosInstance;
