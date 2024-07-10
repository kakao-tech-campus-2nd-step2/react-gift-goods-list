import axios from 'axios';

const BASE_URL = 'https://react-gift-mock-api-harugi7.vercel.app';


type QueryParams = Record<string, string | number | boolean>;

const objectToQueryParams = (params: QueryParams): string => {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`)
    .join('&');

  return queryParams;
};

export const fetchData = async (endpoint: string, queryParams?: QueryParams) => {
  try {
    const url = queryParams
      ? `${BASE_URL}${endpoint}?${objectToQueryParams(queryParams)}`
      : `${BASE_URL}${endpoint}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status } = error.response;
      let errorMessage: string = 'An error occurred while fetching data.';

      switch (status) {
        case 400:
          errorMessage =
            'Bad Request: The server could not understand the request due to invalid syntax.';
          break;
        case 401:
          errorMessage = 'Unauthorized: Access is denied due to invalid credentials.';
          break;
        case 403:
          errorMessage =
            'Forbidden: You do not have the necessary permissions to access this resource.';
          break;
        case 404:
          errorMessage = 'Not Found: The requested resource could not be found.';
          break;
        case 500:
          errorMessage =
            'Internal Server Error: The server has encountered a situation it does not know how to handle.';
          break;
        default:
          errorMessage = `Unexpected Error: ${status}`;
      }

      throw new Error(errorMessage);
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};
