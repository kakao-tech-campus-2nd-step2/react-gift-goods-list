import { useQuery } from 'react-query';
import type { RankingFilterOption, GoodsData } from '@/types';
import { fetchData } from '@/api/utils/fetchData';

export const useGetRankingGoods = (filterOption: RankingFilterOption) => {
  return useQuery<GoodsData[], Error>(
    ['rankingGoods', filterOption],
    async () => {
      const data = await fetchData<GoodsData[]>('https://react-gift-mock-api-git-main-faddishcorns-projects.vercel.app/api/v1/ranking/products', {
        params: filterOption,
      });
      // 추가 검증
      if (!data || !Array.isArray(data)) {
        throw new Error('유효하지 않은 response');
      }
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
};
