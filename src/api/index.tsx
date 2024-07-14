import { useQuery } from '@tanstack/react-query';

import { ThemeData, GoodsData } from '@/types';
import { fetchInstance } from './instance';

type ThemesResponse = {
  themes: ThemeData[];
};

const getThemes = async (): Promise<ThemesResponse> => {
  const response = await fetchInstance.get('/v1/themes');
  return response.data;
};

export const useThemes = () => {
  return useQuery({
    queryKey: ['themes'],
    queryFn: getThemes,
  });
};

//

type GoodsResponse = {
  products: GoodsData[];
};

const getRankingProducts = async (targetType: string, rankType: string): Promise<GoodsResponse> => {
  const queryParams = `?targetType=${targetType}&rankType=${rankType}`;

  const response = await fetchInstance.get(`/v1/ranking/products${queryParams}`);
  return response.data;
};

export const useRankingProducts = (targetType: string, rankType: string) => {
  return useQuery({
    queryKey: ['rankingProducts'],
    queryFn: () => getRankingProducts(targetType, rankType),
  });
};

//

const getThemeProducts = async (themeKey: string): Promise<GoodsResponse> => {
  const response = await fetchInstance.get(`/v1/themes/${themeKey}/products`);
  return response.data;
};

export const useThemeProducts = (themeKey: string) => {
  return useQuery({
    queryKey: ['themeProducts', themeKey],
    queryFn: () => getThemeProducts(themeKey),
  });
};
