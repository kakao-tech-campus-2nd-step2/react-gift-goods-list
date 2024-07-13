import {
  useCallback,
} from 'react';
import { axiosInstance, replacePathParams } from '@utils/network';
import RequestURLs from '@constants/RequestURLs';
import { useInfiniteQuery } from '@tanstack/react-query';
import { QueryKeys } from '@constants/QueryKeys';
import { ThemeProductsResponse } from '@/types/response';

interface FetchParams {
  themeKey: string;
}

const MAX_RESULTS_PER_PAGE = 20;

function useFetchThemeProducts({ themeKey }: FetchParams) {
  const fetchPage = useCallback(async ({ pageParam = '' }) => {
    const url = replacePathParams(RequestURLs.THEME_PRODUCTS, { themeKey });
    const params = {
      maxResults: MAX_RESULTS_PER_PAGE,
      nextPageToken: pageParam === '' ? undefined : pageParam,
    };

    const response = await axiosInstance.get<ThemeProductsResponse>(url, {
      params,
    });

    return response.data;
  }, [themeKey]);
  const {
    data: productResponse,
    fetchNextPage, hasNextPage,
    isFetchingNextPage, isFetching,
  } = useInfiniteQuery({
    initialData: undefined,
    initialPageParam: undefined,
    queryKey: [QueryKeys.THEME_PRODUCTS, themeKey],
    queryFn: fetchPage,
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
  });

  return {
    productResponse, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching,
  };
}

export default useFetchThemeProducts;
