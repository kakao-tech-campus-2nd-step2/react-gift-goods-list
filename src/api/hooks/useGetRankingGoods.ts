import { useQuery } from 'react-query';
import axios from 'axios';
import type { RankingFilterOption, GoodsData } from '@/types';

export const useGetRankingGoods = (filterOption: RankingFilterOption) => {
  return useQuery<GoodsData[], Error>(
    ['rankingGoods', filterOption],
    async () => {
      try {
        const response = await axios.get('https://react-gift-mock-api-git-main-faddishcorns-projects.vercel.app/api/v1/ranking/products', {
          params: filterOption,
        });

        // 추가검증
        if (!response || !response.data || !Array.isArray(response.data.products)) {
          throw new Error('유효하지 않은 response');
        }

        return response.data.products;
      } catch (error) {
        console.error('ranking goods fetching에 실패하였습니다.:', error);
        throw new Error('fetching ranking goods 실패');
      }
    },
    {
      keepPreviousData: true,
    }
  );
};
