import { BACKEND_API } from '@/constants/api';
import { ERROR_MESSAGES } from '@/constants/errorMessage';
import {
  GetProductRankingRequest,
  GetProductRankingResponse,
  ProductData,
  RankingFilter,
} from '@/types/productType';

interface FetchRankingProductListResponse {
  products: ProductData[];
  error?: string;
}

export const fetchRankingProductList = async (
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
    return { products: [], error: ERROR_MESSAGES.FETCH_ERROR };
  }
};
