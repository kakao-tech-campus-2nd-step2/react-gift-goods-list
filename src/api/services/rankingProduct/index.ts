import { BACKEND_API } from '@/api/instance';
import { ERROR_MESSAGES } from '@/constants/errorMessage';
import { RankingFilter } from '@/types/productType';

import { GetProductRankingRequest, GetProductRankingResponse } from './types';

export const fetchRankingProduct = async (filter: RankingFilter) => {
  try {
    const params: GetProductRankingRequest = {
      targetType: filter.targetType,
      rankType: filter.rankType,
    };

    const response = await BACKEND_API.get<GetProductRankingResponse>(
      '/api/v1/ranking/products',
      { params }
    );

    return response.data.products;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
