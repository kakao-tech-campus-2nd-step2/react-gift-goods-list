import axios from 'axios';

import ERROR_MESSATE from './errorCode.constants';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const isHasErrorMessage = Object.keys(ERROR_MESSATE).includes(error.response.status.toString());

    if (isHasErrorMessage) {
      throw new Error(ERROR_MESSATE[error.response.status as keyof typeof ERROR_MESSATE]);
    }
  },
);

export default instance;
