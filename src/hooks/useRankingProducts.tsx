import { useEffect, useState } from 'react';

import apiClient from '@/api/index';
import type { GetRankingProductsResponse, ProductData } from '@/api/types/apiTypes';
import type { RankingFilterOption } from '@/types';

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
}

export const useRankingProducts = (filterOption: RankingFilterOption): [ProductData[] | null, { isLoading: boolean; isError: boolean }] => {
  const [fetchState, setFetchState] = useState<FetchState<ProductData[]>>({
    isLoading: true,
    isError: false,
    data: null,
  });

  useEffect(() => {
    const fetchRankingProducts = async () => {
      try {
        const response = await apiClient.get<GetRankingProductsResponse>('/api/v1/ranking/products', {
          params: {
            targetType: filterOption.targetType,
            rankType: filterOption.rankType,
          },
        });
        setFetchState({ isLoading: false, isError: false, data: response.data.products });
      } catch (error) {
        console.error(error);
        setFetchState({ isLoading: false, isError: true, data: null });
      }
    };
    fetchRankingProducts();
  }, [filterOption]);

  return [fetchState.data, { isLoading: fetchState.isLoading, isError: fetchState.isError }];
};
