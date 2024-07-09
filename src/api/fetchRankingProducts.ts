import type { RankingFilterOption } from '@/types';
import type { GoodsData } from '@/types';

import instance from './api';

export const fetchRankingProducts = async (
  targetType: RankingFilterOption['targetType'],
  rankType: RankingFilterOption['rankType'],
): Promise<GoodsData[]> => {
  const res = await instance.get<{ products: GoodsData[] }>('/api/v1/ranking/products', {
    params: {
      targetType,
      rankType,
    },
  });
  return res.data.products;
};
