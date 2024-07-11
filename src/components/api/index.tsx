import axios from 'axios';

const BASE_URL = 'https://react-gift-mock-api-harugi7.vercel.app';


type QueryParams = Record<string, string | number | boolean>;

const objectToQueryParams = (params: QueryParams): string => {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`)
    .join('&');

  return `?${queryParams}`;
};

type ErrorCase =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'INTERNAL_SERVER_ERROR'
  | 'UNEXPECTED_ERROR';

const ERROR_MESSAGES: Record<ErrorCase, string> = {
  BAD_REQUEST: 'Bad Request: The server could not understand the request due to invalid syntax.',
  UNAUTHORIZED: 'Unauthorized: Access is denied due to invalid credentials.',
  FORBIDDEN: 'Forbidden: You do not have the necessary permissions to access this resource.',
  NOT_FOUND: 'Not Found: The requested resource could not be found.',
  INTERNAL_SERVER_ERROR:
    'Internal Server Error: The server has encountered a situation it does not know how to handle.',
  UNEXPECTED_ERROR: 'An unexpected error occurred.',
};

const handleFetchError = (error: unknown, endpoint: string) => {
  if (axios.isAxiosError(error) && error.response) {
    const { status } = error.response;
    let errorCase: ErrorCase = 'UNEXPECTED_ERROR';

    switch (status) {
      case 400:
        errorCase = 'BAD_REQUEST';
        break;
      case 401:
        errorCase = 'UNAUTHORIZED';
        break;
      case 403:
        errorCase = 'FORBIDDEN';
        break;
      case 404:
        errorCase = 'NOT_FOUND';
        break;
      case 500:
        errorCase = 'INTERNAL_SERVER_ERROR';
        break;
    }

    console.error(`Error fetching data from ${endpoint}: ${ERROR_MESSAGES[errorCase]}`);
    throw new Error(ERROR_MESSAGES[errorCase]);
  } else {
    console.error(`Error fetching data from ${endpoint}: ${ERROR_MESSAGES.UNEXPECTED_ERROR}`);
    throw new Error(ERROR_MESSAGES.UNEXPECTED_ERROR);
  }
};

export const fetchData = async (endpoint: string, queryParams?: QueryParams) => {
  try {
    const url = `${BASE_URL}${endpoint}${queryParams ? objectToQueryParams(queryParams) : ''}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      handleFetchError(error, endpoint);
    }
  }
};
