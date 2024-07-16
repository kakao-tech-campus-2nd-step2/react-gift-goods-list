import type { AxiosResponse } from 'axios';

const createErrorMessage = (response: AxiosResponse | undefined): string => {
  if (!response) {
    return 'An unknown error occurred';
  }

  switch (response.status) {
    case 400:
      return '400 Bad Request: 요청이 올바르지 않습니다.';
    case 401:
      return '401 Unauthorized: 인증이 필요합니다.';
    case 403:
      return '403 Forbidden: 접근 권한이 없습니다.';
    case 404:
      return '404 Not Found: 요청한 리소스를 찾을 수 없습니다.';
    case 500:
      return '500 Internal Server Error: 서버에 오류가 발생했습니다.';
    default:
      return `Unexpected error: ${response.status}`;
  }
};

export default createErrorMessage;