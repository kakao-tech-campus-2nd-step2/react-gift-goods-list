import { BACKEND_API } from '@/constants/api';
import { GetRankingResponse, RankingFilter } from '@/pages/HomePage/types';
import { ProductData } from '@/types/productType';

interface FetchRankingsResponse {
  products: ProductData[];
  error?: string;
}

export const fetchRankings = async (
  filter: RankingFilter
): Promise<FetchRankingsResponse> => {
  try {
    const response = await BACKEND_API.get<GetRankingResponse>(
      '/api/v1/ranking/products',
      {
        params: {
          targetType: filter.targetType,
          rankType: filter.rankType,
        },
      }
    );
    return { products: response.data.products, error: undefined };
  } catch (error) {
    return { products: [], error: '데이터를 불러올 수 없습니다.' };
  }
};
