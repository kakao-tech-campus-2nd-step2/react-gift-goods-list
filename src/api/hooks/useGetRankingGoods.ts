import { useQuery } from 'react-query';
import axios from 'axios';
import type { RankingFilterOption, GoodsData } from '@/types';

export const useGetRankingGoods = (filterOption: RankingFilterOption) => {
  return useQuery<GoodsData[], Error>(
    ['rankingGoods', filterOption],
    async () => {
      const response = await axios.get('https://react-gift-mock-api-git-main-faddishcorns-projects.vercel.app/api/v1/ranking/products', {
        params: filterOption,
      });
      return response.data.products;
    },
    {
      keepPreviousData: true,
    }
  );
};