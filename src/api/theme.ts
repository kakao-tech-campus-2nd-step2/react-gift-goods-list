import type { ProductsResponse,ThemeResponse } from '../types/api';
import api from './index';

export const fetchThemes = async (): Promise<ThemeResponse> => {
  const response = await api.get<ThemeResponse>('/api/v1/themes');
  return response.data;
};

export const fetchThemeProducts = async (themeKey: string, pageToken?: string, maxResults: number = 20): Promise<ProductsResponse> => {
    const response = await api.get<ProductsResponse>(`/api/v1/themes/${themeKey}/products`, {
        params: {
            pageToken,
            maxResults
        }
    });
    return response.data;
};
