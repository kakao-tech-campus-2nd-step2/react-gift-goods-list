import type { ThemeProductsRequest,ThemeProductsResponse, ThemesResponse } from '../types';
import axiosInstance from './axiosInstance';

export const fetchThemes = async (): Promise<ThemesResponse> => {
  const response = await axiosInstance.get<ThemesResponse>('/api/v1/themes');
  return response.data;
};

export const fetchThemeProducts = async (params: ThemeProductsRequest): Promise<ThemeProductsResponse> => {
  const response = await axiosInstance.get<ThemeProductsResponse>(`/api/v1/themes/${params.themeKey}/products`, {
    params: {
      pageToken: params.pageToken,
      maxResults: params.maxResults ?? 20,
    },
  });
  return response.data;
};
