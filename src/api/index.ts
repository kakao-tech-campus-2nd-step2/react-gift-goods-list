/* eslint-disable react-hooks/exhaustive-deps */
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
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    refetch: fetchData,
  };
}

export function useGetRankingProducts(
  params: GetRankingProductsRequestBody,
): UseAxiosReturn<GetRankingProductsResponseBody> {
  return useAxios<GetRankingProductsResponseBody>({
    method: 'GET',
    url: '/api/v1/ranking/products',
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