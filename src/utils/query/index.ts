import { axiosInstance } from '@utils/network';
import RequestURLs from '@constants/RequestURLs';
import { QueryKey } from '@tanstack/react-query';
import { RankingProductsResponse, ThemesResponse } from '@/types/response';
import { ThemeDataRepository } from '@/types';

export const fetchThemes = async () => {
  const response = await axiosInstance.get<ThemesResponse>(RequestURLs.THEMES);
  const tmpThemes: ThemeDataRepository = {};

  if (response.data.themes) {
    response.data.themes.forEach((theme) => {
      tmpThemes[theme.key] = theme;
    });
  }

  return tmpThemes;
};

export const fetchProducts = async ({ queryKey }:{ queryKey: QueryKey }) => {
  const queryParams = queryKey[1];
  const response = await axiosInstance
    .get<RankingProductsResponse>(RequestURLs.RANKING_PRODUCTS, { params: queryParams });

  return response.data.products || [];
};
