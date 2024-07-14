import axiosInstance from '@/api/axiosInstance';
import type { ThemeData,ThemeProductResponse  } from '@/types';

export const fetchThemeProduct = async (themeKey: string, maxResults: number = 20): Promise<ThemeProductResponse> => {
  const response = await axiosInstance.get(`/api/v1/themes/${themeKey}/products`, {
    params: {
      maxResults,
    },
  });
  return response.data;
};

export const fetchThemes = async (): Promise<ThemeData[]> => {
  const response = await axiosInstance.get('/api/v1/themes');
  return response.data.themes;
};