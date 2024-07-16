import { AxiosError } from 'axios';
import { useEffect,useState } from 'react';

import apiClient from '@/api';
import type { ProductData,RankingProductsResponse } from '@/types';
import type { RankingFilterOption } from '@/types';
import createErrorMessage from '@/utils/createErrorMessage';

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
  errorMessage: string | null;
}

export const useRankingProducts = (filterOption: RankingFilterOption) => {
  const [fetchState, setFetchState] = useState<FetchState<ProductData[]>>({
    isLoading: true,
    isError: false,
    data: null,
    errorMessage: null,
  });

  useEffect(() => {
    const fetchRankingProducts = async () => {
      try {
        const response = await apiClient.get<RankingProductsResponse>('/api/v1/ranking/products', {
          params: {
            targetType: filterOption.targetType,
            rankType: filterOption.rankType,
          },
        });
        setFetchState({ isLoading: false, isError: false, data: response.data.products, errorMessage: null });
      } catch (err) {
        const error = err as AxiosError;
        console.error(error);
        const errorMessage = error instanceof AxiosError ? createErrorMessage(error.response) : 'An unknown error occurred';
        setFetchState({ isLoading: false, isError: true, data: null, errorMessage: errorMessage });
      }
    };
    fetchRankingProducts();
  }, [filterOption]);

  return [fetchState.data, { isLoading: fetchState.isLoading, isError: fetchState.isError, errorMessage: fetchState.errorMessage }] as const;
};
