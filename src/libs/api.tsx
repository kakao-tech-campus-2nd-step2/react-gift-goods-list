import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'https://react-gift-mock-api-nnoonjy.vercel.app';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000, // 타임아웃 설정
});

// API 호출 함수
export const getThemes = async () => {
  try {
    const response = await apiClient.get('/api/v1/themes');
    return response.data;
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};

export const getTheme = async (themeKey: string, maxResults: number = 20) => {
  try {
    const response = await apiClient.get(`/api/v1/themes/${themeKey}/products`, {
      params: { maxResults },
    });
    return response.data;
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};

export const getRankingProducts = async (params: { targetType: string; rankType: string }) => {
  try {
    const response = await apiClient.get('/api/v1/ranking/products', { params });
    return response.data;
  } catch (error) {
    throw new Error((error as AxiosError).message);
  }
};
