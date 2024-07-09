import axios from 'axios';
import { ProductData, ThemeData, RankingFilterOption } from '@/types/index';

const api = axios.create({
  baseURL: 'https://react-gift-mock-api-hojeong26-git-main-hojeongs-projects.vercel.app',
});

export const fetchThemesFromAPI = async (): Promise<ThemeData[]> => {
  const response = await api.get<{ themes: ThemeData[] }>('/api/v1/themes');
  return response.data.themes;
};

export const fetchRankingFromAPI = async (
  filterOption: RankingFilterOption,
): Promise<ProductData[]> => {
  const response = await api.get<{ products: ProductData[] }>('api/v1/ranking/products', {
    params: filterOption,
  });
  return response.data.products;
};

export const fetchProductsByTheme = async (
  themeKey: string,
  maxResults = 20,
): Promise<ProductData[]> => {
  const response = await api.get<{ products: ProductData[] }>(
    `/api/v1/themes/${themeKey}/products`,
    {
      params: {
        maxResults,
      },
    },
  );
  return response.data.products;
};
