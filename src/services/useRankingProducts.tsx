import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosInstance } from '.';
import type { ProductResponseData } from './useThemeProducts';

import type { RankingProductType } from '@/components/Home/GiftRanking';

export const useRankingProducts = ({ targetType, rankType }: RankingProductType) =>
  useQuery({
    queryKey: ['rankingProducts', targetType, rankType],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<ProductResponseData>(
          `v1/ranking/products?targetType=${targetType}&rankType=${rankType}`,
        );
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            console.error('해당하는 랭킹 상품이 없습니다:', error);
            throw new Error('해당하는 랭킹 상품이 없습니다.');
          } else {
            console.error('데이터를 불러오는 중에 문제가 발생했습니다:', error);
            throw new Error('데이터를 불러오는 중에 문제가 발생했습니다.');
          }
        } else {
          console.error('Unexpected error occurred:', error);
          throw new Error('Unexpected error occurred');
        }
      }
    },
  });
