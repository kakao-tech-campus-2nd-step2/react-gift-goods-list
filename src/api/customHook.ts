import { useCallback } from 'react';
import { fetchThemesFromAPI, fetchRankingFromAPI } from '@/api/api';
import type { ThemeData, ProductData, RankingFilterOption } from '@/types';
import { useFetchData } from '@/api/dataFetch';

export const useFetchThemes = () => {
  return useFetchData<ThemeData[]>(fetchThemesFromAPI);
};

export const useFetchRanking = (filterOption: RankingFilterOption) => {
  const fetchRanking = useCallback(() => fetchRankingFromAPI(filterOption), [filterOption]);
  return useFetchData<ProductData[]>(fetchRanking);
};
