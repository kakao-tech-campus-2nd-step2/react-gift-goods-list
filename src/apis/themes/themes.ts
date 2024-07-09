import axiosInstance from '@/apis/axios';
import type { ThemeProductsResponse, ThemesResponse } from '@/apis/themes/type';
import type { GetThemeProductsType } from '@/apis/themes/type';

export const getThemes = async () => {
  const response = await axiosInstance.get<ThemesResponse>('/api/v1/themes');
  return response.data;
};

export const getThemeProducts = async ({
  themeKey,
  pageToken,
  maxResults = 10,
}: GetThemeProductsType) => {
  const response = await axiosInstance.get<ThemeProductsResponse>(
    `/api/v1/themes/${themeKey}/products`,
    {
      params: {
        pageToken,
        maxResults,
      },
      timeout: 5000,
    },
  );
  return response.data;
};
