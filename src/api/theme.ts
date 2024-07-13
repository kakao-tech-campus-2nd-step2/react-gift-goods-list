import { useQuery } from 'react-query';

import type { ProductsResponse, ThemeResponse } from '../types/api';
import api from './index';

const fetchThemes = async (): Promise<ThemeResponse> => {
    const response = await api.get<ThemeResponse>('/api/v1/themes');
    return response.data;
};

export const useThemes = () => {
    return useQuery('themes', fetchThemes);
};

const fetchThemeProducts = async (themeKey: string, pageToken?: string, maxResults: number = 20): Promise<ProductsResponse> => {
    const response = await api.get<ProductsResponse>(`/api/v1/themes/${themeKey}/products`, {
        params: {
            pageToken,
            maxResults
        }
    });
    return response.data;
};

export const useThemeProducts = (themeKey: string, pageToken?: string, maxResults: number = 20) => {
    return useQuery(['themeProducts', themeKey, pageToken, maxResults], () => fetchThemeProducts(themeKey, pageToken, maxResults));
};
