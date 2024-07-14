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
  pageToken: number,
  maxResults = 20,
): Promise<{ products: ProductData[]; nextPageToken: number | null }> => {
  const response = await api.get<{
    products: ProductData[];
    nextPageToken: string | null;
    pageInfo: { totalResults: number; resultsPerPage: number };
  }>(`/api/v1/themes/${themeKey}/products`, {
    params: {
      pageToken,
      maxResults,
    },
  });
  const { products, pageInfo } = response.data;
  const calculatedNextPageToken =
    pageToken * maxResults >= pageInfo.totalResults ? null : pageToken + 1;

  return {
    products,
    nextPageToken: calculatedNextPageToken,
  };
};
