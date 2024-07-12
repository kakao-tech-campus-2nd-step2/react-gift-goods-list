import axios from 'axios';

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error) && error.response) {
    switch (error.response.status) {
      case 400:
        return '잘못된 요청입니다.';
      case 404:
        return '데이터를 찾을 수 없습니다.';
      case 500:
        return '서버 오류가 발생했습니다.';
      default:
        return '오류가 발생했습니다.';
    }
  } else {
    return '네트워크 오류가 발생했습니다.';
  }
};
