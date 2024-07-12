import type { RankingFilterOption } from '@/types';
import type { Product } from '@/types/product';

import instance from '../instance';
import API from '../path.constants';

interface RankingResponse {
  products: Product[];
}

export const getRanking = async ({ rankType, targetType }: RankingFilterOption) => {
  const { data } = await instance.get<RankingResponse>(API.RANKING, {
    params: {
      rankType,
      targetType,
    },
  });
  return data.products;
};
