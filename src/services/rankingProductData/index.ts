import { ERROR_MESSAGES } from '@/constants/errorMessage';
import { BACKEND_API } from '@/services/api';
import { ProductData, RankingFilter } from '@/types/productType';

import { GetProductRankingRequest, GetProductRankingResponse } from './types';

interface FetchRankingProductListResponse {
  products: ProductData[];
  error?: string;
}

export const fetchRankingProductData = async (
  filter: RankingFilter
): Promise<FetchRankingProductListResponse> => {
  try {
    const params: GetProductRankingRequest = {
      targetType: filter.targetType,
      rankType: filter.rankType,
    };

    const response = await BACKEND_API.get<GetProductRankingResponse>(
      '/api/v1/ranking/products',
      { params }
    );

    return { products: response.data.products, error: undefined };
  } catch (error) {
    if (error instanceof Error) {
      return { products: [], error: error.message };
    }

    return { products: [], error: ERROR_MESSAGES.UNKNOWN_ERROR };
  }
};
