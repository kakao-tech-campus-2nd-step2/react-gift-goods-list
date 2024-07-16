import type { AxiosError } from 'axios';
import axios from 'axios';

import { HTTP_ERROR_MESSAGES } from './errorMessages';

export const handleError = (error: AxiosError): string => {
  if (axios.isAxiosError(error) && error.response) {
    const status = error.response.status;
    if (status >= 100 && status < 200) {
      return HTTP_ERROR_MESSAGES.INFORMATIONAL_RESPONSE;
    } else if (status >= 300 && status < 400) {
      return HTTP_ERROR_MESSAGES.REDIRECTION_REQUIRED;
    } else if (status >= 400 && status < 500) {
      return HTTP_ERROR_MESSAGES.CLIENT_ERROR;
    } else if (status >= 500) {
      return HTTP_ERROR_MESSAGES.SERVER_ERROR;
    }
  }
  return HTTP_ERROR_MESSAGES.UNKNOWN_ERROR;
};
