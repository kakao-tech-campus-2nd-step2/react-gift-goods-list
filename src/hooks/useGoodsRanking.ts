import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from 'axios';

import type { GoodsData } from '@/types';
import type { GoodsResponse } from '@/types';
import type { RankingFilterOption } from '@/types';

const fetchGoodsRanking = async (options: RankingFilterOption) => {
  const url = `https://react-gift-mock-api-seungbeom.vercel.app/api/v1/ranking/products?targetType=${options.targetType}&rankType=${options.rankType}`;
  const response = await axios.get<GoodsResponse>(url);
  return response.data.products;
};

export const useGoodsRanking = (filterOption: RankingFilterOption) => {
  const {
    data: goodsItem,
    isLoading,
    error,
  } = useQuery<GoodsData[], AxiosError>({
    queryKey: ['goods', filterOption],
    queryFn: () => fetchGoodsRanking(filterOption),
    retry: 0,
  });
  return { goodsItem, isLoading, error };
};
