import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import type {
  AjaxResult,
  GetRankingProductsRequestBody,
  GetRankingProductsResponseBody,
  GetThemesProductsRequestBody,
  GetThemesProductsResponseBody,
  GetThemesResponseBody,
} from '@/api/type';

axios.defaults.baseURL = 'https://react-gift-mock-api-jasper200207.vercel.app';

export type UseAxiosReturn<T> = {
  data: AjaxResult<T>;
  loading: boolean;
  refetch: () => void;
};

function useAxios<T>(options: AxiosRequestConfig): UseAxiosReturn<T> {
  const [data, setData] = useState<AjaxResult<T>>({ success: false, data: null });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const result = await axios(options)
      .then((response) => {
        return { success: true, data: response.data } as AjaxResult<T>;
      })
      .catch((error) => {
        return { success: false, data: error } as AjaxResult<T>;
      });
    setData(result);
    setLoading(false);
  }, [options]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (fetchData) {
      fetchData();
    }
  }, [fetchData]);

  return {
    data,
    loading,
    refetch,
  };
}

export function useGetRankingProducts(
  params: GetRankingProductsRequestBody,
): UseAxiosReturn<GetRankingProductsResponseBody> {
  return useAxios<GetRankingProductsResponseBody>({
    method: 'GET',
    url: '/api/v1/ranking',
    params,
  });
}

export function useGetThemes(): UseAxiosReturn<GetThemesResponseBody> {
  return useAxios<GetThemesResponseBody>({
    method: 'GET',
    url: '/api/v1/themes',
  });
}

export function useGetThemesProducts({
  themeKey,
  ...params
}: GetThemesProductsRequestBody): UseAxiosReturn<GetThemesProductsResponseBody> {
  return useAxios<GetThemesProductsResponseBody>({
    method: 'GET',
    url: `/api/v1/themes/${themeKey}/products`,
    params,
  });
}
