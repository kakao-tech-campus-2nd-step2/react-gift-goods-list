import { useInfiniteQuery,useQuery } from 'react-query';

import type { ProductsResponse, ThemeResponse } from '../types/api';
import api from './index';

const fetchThemes = async (): Promise<ThemeResponse> => {
    const response = await api.get<ThemeResponse>('/api/v1/themes');
    return response.data;
};

export const useThemes = () => {
    return useQuery('themes', fetchThemes);
};

const fetchThemeProducts = async (themeKey: string, pageParam?: string, maxResults: number = 20): Promise<ProductsResponse> => {
    const response = await api.get<ProductsResponse>(`/api/v1/themes/${themeKey}/products`, {
        params: {
            pageToken: pageParam,
            maxResults
        }
    });
    return response.data;
};

export const useThemeProducts = (themeKey: string, maxResults: number = 20) => {
    return useInfiniteQuery(
        ['themeProducts', themeKey],
        ({ pageParam }) => fetchThemeProducts(themeKey, pageParam, maxResults),
        {
            getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
        }
    );
};
