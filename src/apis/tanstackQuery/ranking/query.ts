import { useQuery } from '@tanstack/react-query';

import { GetRankingProduct } from '@/apis/endpoints/ranking/useGetRankingProduct';
import type { RankingFilterOption } from '@/types/index';

export const useGetRankingProductQuery = (filters: RankingFilterOption) => {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['rankingProducts', filters],
    queryFn: () => GetRankingProduct(filters),
  });

  return { data, isLoading, isFetching, isError, error };
};
