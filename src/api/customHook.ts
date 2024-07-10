import { fetchThemesFromAPI, fetchProductsByTheme, fetchRankingFromAPI } from '@/api/api';
import type { ThemeData, ProductData, RankingFilterOption } from '@/types';
import { useFetchData } from '@/api/dataFetch';

export const useFetchThemes = () => {
  return useFetchData<ThemeData[]>(fetchThemesFromAPI);
};

export const useFetchProductsByTheme = (themeKey: string) => {
  return useFetchData<ProductData[]>(() => fetchProductsByTheme(themeKey));
};

export const useFetchRanking = (filterOption: RankingFilterOption) => {
  return useFetchData<ProductData[]>(() => fetchRankingFromAPI(filterOption));
};
