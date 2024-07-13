import type { ThemeProductResponse, ThemesResponse } from '@/types/index';

import api from './api';

export const fetchThemes = async (): Promise<ThemesResponse> => {
  const response = await api.get<ThemesResponse>('/api/v1/themes');
  return response.data;
};

export const fetchThemeProducts = async (
  themeKey: string,
  maxResults: number = 20,
  pageParam: number = 0,
): Promise<ThemeProductResponse> => {
  const response = await api.get<ThemeProductResponse>(`/api/v1/themes/${themeKey}/products`, {
    params: {
      maxResults,
      page: pageParam,
    },
  });
  return response.data;
};
