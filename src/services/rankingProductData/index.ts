import { ERROR_MESSAGES } from '@/constants/errorMessage';
import { BACKEND_API } from '@/services/api';
import { ProductData, RankingFilter } from '@/types/productType';

export const fetchRankingProductData = async (filter: RankingFilter) => {
  try {
    const response = await BACKEND_API.get<{ products: ProductData[] }>(
      '/api/v1/ranking/products',
      {
        params: {
          targetType: filter.targetType,
          rankType: filter.rankType,
        },
      }
    );

    return response.data.products;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
