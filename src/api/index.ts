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

const apiClient = axios.create({
  baseURL: 'https://react-gift-mock-api-00306.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiRequest = async <T>(url: string, options?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.request<T>({
    url,
    ...options,
  });
  return response.data;
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
