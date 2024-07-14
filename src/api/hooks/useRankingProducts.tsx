import { useQuery } from '@tanstack/react-query';

import { fetchInstance } from '@/api/instance';
import { GoodsData } from '@/types';

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
