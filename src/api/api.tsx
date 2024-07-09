import axios from 'axios';

import {GoodsData,ThemeData } from '@/types';

const API_URL = axios.create({
    baseURL: 'https://react-gift-mock-api-leedyun.vercel.app/',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const fetchThemes = async (): Promise<ThemeData[]> => {
    try {
      const response = await API_URL.get<{themes : ThemeData[]}>('/api/v1/themes');
      if (response.status === 200 && response.data && response.data.themes) {
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
  

  export const fetchRankingProducts = async(targetType:string, rankType:string) : Promise<GoodsData[]> => {
    const response = await axios.get(`${API_URL}/ranking/products`, {
        params : {targetType, rankType}
    });
    return response.data.products;
  }

  export const fetchThemeProducts = async (themeKey: string): Promise<GoodsData[]> => {
    const response = await axios.get(`${API_URL}/themes/${themeKey}/products`, {
      params: { maxResults: 20 }
    });
    return response.data.products;
  };