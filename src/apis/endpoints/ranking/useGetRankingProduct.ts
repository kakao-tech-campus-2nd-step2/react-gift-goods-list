import { instance } from '@/apis/endpoints/index';
import type { GoodsData, RankingFilterOption } from '@/types/index';

interface RankingAPIResponse {
  products: GoodsData[];
}

export const GetRankingProduct = async (
  filters: RankingFilterOption = { targetType: 'ALL', rankType: 'MANY_WISH_RECEIVE' },
): Promise<RankingAPIResponse> => {
  try {
    const params = new URLSearchParams({
      targetType: filters.targetType,
      rankType: filters.rankType,
    }).toString();

    const response = await instance.get(`/api/v1/ranking/products?${params}`);
    return response.data;
  } catch (err) {
    console.error('Failed to fetch ranking products:', err);
    throw new Error('Ranking products could not be fetched. Please try again later.');
  }
};
