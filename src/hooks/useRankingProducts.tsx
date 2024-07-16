import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import apiClient from '@/api';
import type { ProductData,RankingProductsResponse } from '@/types';
import type { RankingFilterOption } from '@/types';
import createErrorMessage from '@/utils/createErrorMessage';

const fetchRankingProducts = async (filterOption: RankingFilterOption) => {
  try {
    const response = await apiClient.get<RankingProductsResponse>('/api/v1/ranking/products', {
      params: {
        targetType: filterOption.targetType,
        rankType: filterOption.rankType,
      },
    });
    return response.data.products;
  } catch (err) {
    const error = err as AxiosError;
    const errorMessage = error instanceof AxiosError ? createErrorMessage(error.response) : 'An unknown error occurred';
    console.error('Error fetching ranking products:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const useRankingProducts = (filterOption: RankingFilterOption) => {
  const { data, error, isLoading, isError } = useQuery<ProductData[], Error>(
    ['rankingProducts', filterOption],
    () => fetchRankingProducts(filterOption)
  );

  return [data, { isLoading, isError, errorMessage: error?.message }] as const;
};
