import type { RankingFilterOption } from '@/types';
import type { Product } from '@/types/product';

import instance from '../instance';
import API from '../path';

export const getRanking = async ({
  rankType,
  targetType,
}: RankingFilterOption): Promise<Product[]> => {
  const res = await instance.get(API.RANKING, {
    params: {
      rankType,
      targetType,
    },
  });
  return res.data!.products;
};
