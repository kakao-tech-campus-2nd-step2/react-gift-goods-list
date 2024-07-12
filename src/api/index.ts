import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { ENDPOINTS } from './endpoints';
import type {
  GetRankingProductsParameters,
  GetRankingProductsResponse,
  GetThemeProductsParameters,
  GetThemeProductsResponse,
  GetThemesResponse,
} from './types';
import { APIError } from './types';

const apiClient = axios.create({
  baseURL: 'https://react-gift-mock-api-00306.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiRequest = async <T>(url: string, options?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient.request<T>({
      url,
      ...options,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 0;
      let message = '알 수 없는 오류가 발생했습니다.';
      console.log(status);
      switch (status) {
        case 400:
          message = '데이터를 불러오는데 문제가 발생했습니다.';
          break;
        case 401:
          message = '로그인이 필요합니다. 로그인 후 다시 시도해주세요.';
          break;
        case 403:
          message = '접근 권한이 없습니다.';
          break;
        case 408:
          message = '요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.';
          break;
        case 0:
          message = '인터넷 연결이 불안정합니다. 네트워크 상태를 확인해주세요.';
          break;
        default:
          message = '알 수 없는 오류가 발생했습니다.';
          break;
      }

      throw new APIError(message, status || 0);
    } else {
      throw new APIError('알 수 없는 오류가 발생했습니다.', 0);
    }
  }
};

export const ApiService = {
  fetchThemes: async (): Promise<GetThemesResponse> => {
    return apiRequest<GetThemesResponse>(ENDPOINTS.THEMES);
  },

  fetchRankingProducts: async (
    params: GetRankingProductsParameters,
  ): Promise<GetRankingProductsResponse> => {
    return apiRequest<GetRankingProductsResponse>(ENDPOINTS.RANKING_PRODUCTS, { params });
  },

  fetchThemeProducts: async (
    params: GetThemeProductsParameters,
  ): Promise<GetThemeProductsResponse> => {
    const { themeKey, ...parameters } = params;
    return apiRequest<GetThemeProductsResponse>(ENDPOINTS.THEME_PRODUCTS(themeKey), {
      params: parameters,
    });
  },
};
