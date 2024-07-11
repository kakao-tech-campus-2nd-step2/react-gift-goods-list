import axios from 'axios';
import { useQuery } from 'react-query';

import type {GoodsData,InfiniteQueryResponse,ThemeData } from '@/types';

const axiosInstance = axios.create({
    baseURL: 'https://react-gift-mock-api-leedyun.vercel.app/',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const fetchThemes = async (): Promise<ThemeData[]> => {
    try {
      const response = await axiosInstance.get<{themes : ThemeData[]}>('api/v1/themes');
      if (response.status === 200 && response.data) {
        return response.data.themes;
      } else {
        console.error("No themes data received", response);
        return [];
      }
    } catch (error) {
      console.error("Failed to fetch themes", error);
      return [];
    }
  }
  

  export const fetchRankingProducts = async (targetType: string, rankType: string): Promise<GoodsData[]> => {
    try {
      const response = await axiosInstance.get('api/v1/ranking/products', {
        params: { targetType, rankType }
      });
      if (response.status === 200) {
        return response.data.products;
      } else {
        console.error("Failed to get ranking products", response);
        return [];
      }
    } catch (error) {
      console.error("Failed to fetch ranking products", error);
      throw new Error("Network error or server is down");
    }
  }

  export const fetchThemeProducts = async (
    themeKey: string,
    pageToken: string | undefined,
    maxResults: number = 20
  ): Promise<InfiniteQueryResponse> => {
    const params = pageToken ? { pageToken, maxResults } : { maxResults };
    try {
      const response = await axiosInstance.get(`/api/v1/themes/${themeKey}/products`, {
        params
      });
      if (response.status === 200) {
        return {
          products: response.data.products,
          nextPageToken: response.data.nextPageToken 
        };
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (error) {
      console.error("Failed to fetch theme products", error);
      throw new Error("Network error or server is down");
    }
  };

  export const fetchTheme = async (themeKey: string): Promise<ThemeData> => {
    try {
      const response = await axiosInstance.get<ThemeData>(`/api/v1/themes/${themeKey}`, {
      });
      if (response.status === 200 && response.data) {
        return response.data;
      } else {
        throw new Error("No theme data received");
      }
    } catch (error) {
      console.error("Failed to fetch theme", error);
      throw error;
    }
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

  