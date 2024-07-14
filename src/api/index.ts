/* eslint-disable react-hooks/exhaustive-deps */
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

import { vercelApi } from '@/api/axiosInstance';
import type {
  GetRankingProductsRequestBody,
  GetRankingProductsResponseBody,
  GetThemesProductsRequestBody,
  GetThemesProductsResponseBody,
  GetThemesResponseBody,
} from '@/api/type';

function useAxiosQuery<T>(
  axiosOptions: AxiosRequestConfig,
  keys: string[],
  queryOptions?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>,
  axiosInstance: AxiosInstance = vercelApi,
): UseQueryResult<T> {
  return useQuery({
    queryKey: keys,
    queryFn: async (): Promise<T> => axiosInstance(axiosOptions).then((res) => res.data),
    ...(queryOptions || {}),
  });
}

export function useGetRankingProducts({
  targetType,
  rankType,
}: GetRankingProductsRequestBody): UseQueryResult<GetRankingProductsResponseBody> {
  return useAxiosQuery<GetRankingProductsResponseBody>(
    {
      method: 'GET',
      url: '/api/v1/ranking/products',
      params: { targetType, rankType },
    },
    ['ranking', targetType, rankType],
  );
}

export function useGetThemes(): UseQueryResult<GetThemesResponseBody> {
  return useAxiosQuery<GetThemesResponseBody>(
    {
      method: 'GET',
      url: '/api/v1/themes',
    },
    ['themes'],
  );
}

export function useGetThemesProducts({
  themeKey,
  ...params
}: GetThemesProductsRequestBody): UseQueryResult<GetThemesProductsResponseBody> {
  return useAxiosQuery<GetThemesProductsResponseBody>(
    {
      method: 'GET',
      url: `/api/v1/themes/${themeKey}/products`,
      params,
    },
    ['themes', themeKey],
  );
}
