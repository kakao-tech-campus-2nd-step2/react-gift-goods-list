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
  error: boolean;
  refetch: () => void;
};

function useAxios<T>(options: AxiosRequestConfig): UseAxiosReturn<T> {
  const [data, setData] = useState<AjaxResult<T>>({ success: false, data: null });
  const [state, setState] = useState<'Wait' | 'Loading' | 'Success' | 'Error'>('Wait');

  const fetchData = useCallback(async () => {
    setState('Loading');
    const result = await axios(options)
      .then((response) => {
        setState('Success');
        return { success: true, data: response.data } as AjaxResult<T>;
      })
      .catch((error) => {
        setState('Error');
        return { success: false, data: error } as AjaxResult<T>;
      });
    setData(result);
  }, [options]);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading: state === 'Loading' || state === 'Wait',
    error: state === 'Error',
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
