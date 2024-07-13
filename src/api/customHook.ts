import { fetchThemesFromAPI, fetchProductsByTheme, fetchRankingFromAPI } from '@/api/api';
import type { ThemeData, ProductData, RankingFilterOption } from '@/types';
import { useFetchData } from '@/api/dataFetch';

export const useFetchThemes = () => {
  return useFetchData<ThemeData[]>(fetchThemesFromAPI);
};

export const useFetchProductsByTheme = (themeKey: string, pageToken: number) => {
  return useFetchData<{ products: ProductData[]; nextPageToken: number | null }>(() =>
    fetchProductsByTheme(themeKey, pageToken),
  );
};

export const useFetchRanking = (filterOption: RankingFilterOption) => {
  return useFetchData<ProductData[]>(() => fetchRankingFromAPI(filterOption));
};
