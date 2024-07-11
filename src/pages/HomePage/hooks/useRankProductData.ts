import { useQuery } from '@tanstack/react-query';

import { fetchRankingProductData } from '@/services/rankingProductData';
import { RankingFilter } from '@/types/productType';

export const useRankProductData = (filter: RankingFilter) => {
  return useQuery({
    queryKey: ['rankProducts', filter],
    queryFn: () => fetchRankingProductData(filter),
  });
};
