import { useQuery } from '@tanstack/react-query';

import { instantAxios } from '.';
import type { ProductResponseData } from './useThemeProducts';

import type { RankingProductType } from '@/components/Home/GiftRanking';

export const useRankingProducts = ({ targetType, rankType }: RankingProductType) =>
  useQuery({
    queryKey: ['rankingProducts', targetType, rankType],
    queryFn: async () => {
      const response = await instantAxios.get<ProductResponseData>(
        `v1/ranking/products?targetType=${targetType}&rankType=${rankType}`,
      );
      return response.data;
    },
  });
