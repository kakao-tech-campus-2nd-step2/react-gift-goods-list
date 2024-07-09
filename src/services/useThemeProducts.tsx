import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { instantAxios } from '.';
import type { FetchState, Product } from './types';

export type ProductResponseData = {
  products: Product[];
  nextPageToken?: string;
  pageInfo?: {
    resultsPerPage: number;
    totalResults: number;
  };
};

export const useThemeProducts = (themeKey: string) => {
  const [fetchState, setFetchState] = useState<FetchState<ProductResponseData>>({
    isLoading: true,
    isError: false,
    data: null,
  });

  useEffect(() => {
    const getThemeProducts = async (pageToken?: string) => {
      try {
        setFetchState({ isLoading: true, isError: false, data: null });
        const response = await instantAxios.get<ProductResponseData>(`v1/themes/${themeKey}/products`, {
          params: {
            pageToken,
            maxResults: 20,
          },
        });
        setFetchState({ isLoading: false, isError: false, data: response.data });
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            console.error(404, '선물 테마 Key에 해당하는 선물 테마가 없습니다.');
          }
          if (error.response?.status === 400) {
            console.error(400, '데이터를 불러오는 중에 문제가 발생했습니다.');
          }
          setFetchState({ isLoading: false, isError: true, data: null });
        }
      }
    };
    getThemeProducts();
  }, [themeKey]);

  return { ...fetchState };
};
