import type { AxiosError } from 'axios';
import { useEffect,useState } from 'react';

import apiClient from '@/api';
import type { ProductData,RankingProductsResponse } from '@/types';
import type { RankingFilterOption } from '@/types';

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
        let errorMessage = 'An unknown error occurred';
        if (error.response) {
          switch (error.response.status) {
            case 400:
              errorMessage = '400 Bad Request: 요청이 올바르지 않습니다.';
              break;
            case 401:
              errorMessage = '401 Unauthorized: 인증이 필요합니다.';
              break;
            case 403:
              errorMessage = '403 Forbidden: 접근 권한이 없습니다.';
              break;
            case 404:
              errorMessage = '404 Not Found: 요청한 리소스를 찾을 수 없습니다.';
              break;
            case 500:
              errorMessage = '500 Internal Server Error: 서버에 오류가 발생했습니다.';
              break;
            default:
              errorMessage = `Unexpected error: ${error.response.status}`;
          }
        }
        setFetchState({ isLoading: false, isError: true, data: null, errorMessage: errorMessage });
      }
    };
    fetchRankingProducts();
  }, [filterOption]);

  return [fetchState.data, { isLoading: fetchState.isLoading, isError: fetchState.isError, errorMessage: fetchState.errorMessage }] as const;
};
