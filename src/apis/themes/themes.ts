import axiosInstance from '@/apis/axios';
import type { ThemeProductsResponse, ThemesResponse } from '@/apis/themes/type';

export const getThemes = async () => {
  const response = await axiosInstance.get<ThemesResponse>('/api/v1/themes');
  return response.data;
};

export const getThemeProducts = async (
  themeKey: string,
  pageToken?: string,
  maxResults: number = 10,
) => {
  const response = await axiosInstance.get<ThemeProductsResponse>(
    `/api/v1/themes/${themeKey}/products`,
    {
      params: {
        pageToken,
        maxResults,
      },
    },
  );
  return response.data;
};
