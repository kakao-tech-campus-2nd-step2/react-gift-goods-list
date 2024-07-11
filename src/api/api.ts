import axios from 'axios';

import { RankingProductsResponse, ThemeProductsResponse, ThemesResponse } from '@/types';
import { RankingProductsMockList, ThemeMockList, ThemeProductsMockList } from '@/types/mock';

const API_URL = 'https://react-gift-mock-api-eunkyung.vercel.app';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchThemes = async (): Promise<ThemesResponse> => {
  try {
    const response = await apiClient.get<ThemesResponse>('/api/v1/themes');
    return response.data;
  } catch (error) {
    console.warn('Failed to fetch themes, using mock data instead.');
    return { themes: ThemeMockList };
  }
};

export const fetchRankingProducts = async (
  targetType: string,
  rankType: string,
): Promise<RankingProductsResponse> => {
  try {
    const response = await axios.get<RankingProductsResponse>('/api/v1/ranking/products', {
      params: {
        targetType,
        rankType,
      },
    });
    return response.data;
  } catch (error) {
    console.warn('랭킹상품 실패..');
    return { products: RankingProductsMockList };
  }
};

export const fetchThemeProducts = async (themeKey: string): Promise<ThemeProductsResponse> => {
  try {
    const response = await axios.get<ThemeProductsResponse>(
      `${API_URL}/api/v1/themes/${themeKey}/products`,
      {
        params: {
          maxResults: 20,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.warn('Failed to fetch theme products, using mock data instead.');
    return { products: ThemeProductsMockList };
  }
};
