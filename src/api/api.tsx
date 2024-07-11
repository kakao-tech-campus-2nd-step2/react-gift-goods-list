import axios from 'axios';

import type {GoodsData,ThemeData } from '@/types';

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

  export const fetchThemeProducts = async (themeKey: string, maxResults: number = 20): Promise<GoodsData[]> => {
    try {
      const response = await axiosInstance.get(`api/v1/themes/${themeKey}/products`, {
        params: { maxResults }
      });
      if (response.status === 200) {
        return response.data.products;
      } else {
        console.error("Failed to get theme products", response);
        return [];
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
  