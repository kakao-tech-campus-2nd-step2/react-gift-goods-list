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
  BAD_REQUEST: '잘못된 요청: 서버가 유효하지 않은 구문으로 요청을 이해하지 못했습니다.',
  UNAUTHORIZED: '인증되지 않음: 유효하지 않은 자격 증명으로 인해 액세스가 거부되었습니다.',
  FORBIDDEN: '금지됨: 이 리소스에 액세스할 권한이 없습니다.',
  NOT_FOUND: '찾을 수 없음: 요청한 리소스를 찾을 수 없습니다.',
  INTERNAL_SERVER_ERROR: '내부 서버 오류: 서버가 처리할 수 없는 상황을 만났습니다.',
  UNEXPECTED_ERROR: '예기치 않은 오류가 발생했습니다.',
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
