import { useQuery } from '@tanstack/react-query';

import { ApiService } from '@/api/index';
import type {
  APIError,
  GetRankingProductsParameters,
  GetRankingProductsResponse,
} from '@/api/types';

export const useFetchRankingProducts = (params: GetRankingProductsParameters) => {
  return useQuery<GetRankingProductsResponse, APIError>({
    queryKey: ['rankingProducts', params],
    queryFn: () => ApiService.fetchRankingProducts(params),
  });
};
