import axios from 'axios';
import { useQuery } from 'react-query';

import type { GoodsData,InfiniteQueryResponse,ThemeData } from '@/types';

const axiosInstance = axios.create({
    baseURL: 'https://react-gift-mock-api-leedyun.vercel.app/',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  export const fetchThemes = async (): Promise<ThemeData[]> => {
    const response = await axiosInstance.get<{ themes: ThemeData[] }>('api/v1/themes');
    return response.data.themes;
  };
  
  export const fetchRankingProducts = async (targetType: string, rankType: string): Promise<GoodsData[]> => {
    const response = await axiosInstance.get<{ products: GoodsData[] }>('api/v1/ranking/products', {
      params: { targetType, rankType },
    });
    return response.data.products;
  };

  export const fetchThemeProducts = async (
    themeKey: string,
    pageToken?: string,
    maxResults: number = 20
  ): Promise<InfiniteQueryResponse> => {
    const params = pageToken ? { pageToken, maxResults } : { maxResults };
    const response = await axiosInstance.get(`/api/v1/themes/${themeKey}/products`, { params });
    return {
      products: response.data.products,
      nextPageToken: response.data.nextPageToken,
    };
  };

  export const fetchTheme = async (themeKey: string): Promise<ThemeData> => {
    const response = await axiosInstance.get<ThemeData>(`/api/v1/themes/${themeKey}`);
    return response.data;
  };

export const useThemes = () => useQuery('themes', fetchThemes);
export const useRankingProducts = (targetType: string, rankType: string) => useQuery(['rankingProducts', targetType, rankType], () => fetchRankingProducts(targetType, rankType));
export const useThemeProducts = (themeKey: string, pageToken?: string) => 
  useQuery(
    ['themeProducts', themeKey, pageToken],
    () => fetchThemeProducts(themeKey, pageToken),
    {
      keepPreviousData: true, 
    }
  );

  