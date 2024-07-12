import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'https://react-gift-mock-api-nnoonjy.vercel.app';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 타임아웃 설정
});

// Axios 에러 처리 함수
const setError = (error: AxiosError) => {
  if (error.response) {
    // 서버가 응답을 보낸 경우 (status code가 2xx가 아닌 경우)
    const status = error.response.status;
    switch (status) {
      case 400:
        return '잘못된 요청입니다.';
      case 401:
        return '인증되지 않은 사용자입니다.';
      case 403:
        return '접근이 금지되었습니다.';
      case 404:
        return '요청한 자원을 찾을 수 없습니다.';
      case 500:
        return '서버에 오류가 발생했습니다.';
      default:
        return `알 수 없는 오류가 발생했습니다. 상태 코드: ${status}`;
    }
  } else if (error.request) {
    // 요청이 전송되었으나 응답을 받지 못한 경우
    return '서버로부터 응답을 받지 못했습니다.';
  } else {
    // 요청을 설정하는 중에 오류가 발생한 경우
    return '요청을 설정하는 중에 오류가 발생했습니다.';
  }
};

export const getThemes = async () => {
  try {
    const response = await apiClient.get('/api/v1/themes');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // AxiosError 타입으로 캐스팅하여 처리
      const axiosError = error as AxiosError;
      console.error('getThemes 요청 중 오류 발생:', setError(axiosError));
      return setError(axiosError);
    } else {
      // 기타 다른 에러 처리
      console.error('getThemes 요청 중 오류 발생:', error);
      throw error;
    }
  }
};

export const getRankingProducts = async (params: { targetType: string; rankType: string }) => {
  try {
    const response = await apiClient.get('/api/v1/ranking/products', { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // AxiosError 타입으로 캐스팅하여 처리
      const axiosError = error as AxiosError;
      console.error('getRankingProducts 요청 중 오류 발생:', setError(axiosError));
      return setError(axiosError);
    } else {
      // 기타 다른 에러 처리
      console.error('getRankingProducts 요청 중 오류 발생:', error);
      throw error;
    }
  }
};

export const getTheme = async (themeKey: string, maxResults: number = 20) => {
  try {
    const response = await apiClient.get(`/api/v1/themes/${themeKey}/products`, {
      params: { maxResults },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // AxiosError 타입으로 캐스팅하여 처리
      const axiosError = error as AxiosError;
      console.error('getTheme 요청 중 오류 발생:', setError(axiosError));
      return setError(axiosError);
    } else {
      // 기타 다른 에러 처리
      console.error('getTheme 요청 중 오류 발생:', error);
      throw error;
    }
  }
};
