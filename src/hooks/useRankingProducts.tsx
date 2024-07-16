import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { getRankingProducts } from '@/libs/api';
import type { RankingFilterOption } from '@/types';

export const useRankingProducts = (filterOption: RankingFilterOption) => {
  const { data, isLoading, isFetching, refetch, error } = useQuery(
    ['rankingProducts', filterOption],
    () => getRankingProducts(filterOption),
    {
      keepPreviousData: true,
    },
  );

  const isEmpty = useMemo(() => {
    if (!data || typeof data === 'string') return false;
    return data.products.length === 0;
  }, [data]);

  const errorState = useMemo(() => {
    if (error) return (error as Error).message;
    if (typeof data === 'string') return data;
    return '';
  }, [error, data]);

  return {
    data,
    isLoading,
    isFetching,
    isEmpty,
    errorState,
    refetch,
  };
};
