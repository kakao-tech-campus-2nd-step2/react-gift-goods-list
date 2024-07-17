import { getThemesProducts } from '@apis/themes';
import { ThemeProductsRequest } from '@/types/requestTypes';
import { ThemeProductsResponse } from '@/types/responseTypes';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useMemo } from 'react';

interface useGoodsItemListQueryProps {
  themeKey: string;
  rowsPerPage: number;
}

export default function useGoodsItemListQuery({ themeKey, rowsPerPage }: useGoodsItemListQueryProps) {
  const { data, isLoading, isError, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery<
    ThemeProductsResponse,
    AxiosError
  >({
    queryKey: ['themeProduct', themeKey],
    queryFn: ({ pageParam = '0' }) =>
      getThemesProducts({ themeKey, pageToken: pageParam, maxResults: rowsPerPage } as ThemeProductsRequest),
    initialPageParam: '0',
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });

  const products = useMemo(() => data?.pages.flatMap((page) => page.products) || [], [data]);

  return { products, isLoading, isError, error, fetchNextPage, isFetchingNextPage, hasNextPage };
}
