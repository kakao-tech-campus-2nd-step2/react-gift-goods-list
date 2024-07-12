import { getThemesProducts } from '@apis/themes';
import { ThemeProductsRequest } from '@/types/requestTypes';
import { ThemeProductsResponse } from '@/types/responseTypes';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useMemo } from 'react';

interface useGoodsItemListQueryProps {
  themeKey: string;
  rowsPerPage: number;
}

export default function useGoodsItemListQuery({ themeKey, rowsPerPage }: useGoodsItemListQueryProps) {
  const queryKey = ['theneProduct', themeKey];
  const queryFn = ({ pageParam = '0' }: QueryFunctionContext) =>
    getThemesProducts({ themeKey, pageToken: pageParam, maxResults: rowsPerPage } as ThemeProductsRequest);

  const { data, isLoading, isError, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery<
    ThemeProductsResponse,
    AxiosError
  >({
    queryKey,
    queryFn,
    initialPageParam: '0',
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });

  const products = useMemo(() => data?.pages.flatMap((page) => page.products) || [], []);

  return { products, isLoading, isError, error, fetchNextPage, isFetchingNextPage, hasNextPage };
}
