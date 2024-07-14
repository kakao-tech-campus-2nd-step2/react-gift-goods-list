import { useInfiniteQuery } from '@tanstack/react-query';

import mock from '@/apis/index';

export default function useProduct(themeKey: string) {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['product', themeKey],
    queryFn: ({ pageParam }) =>
      mock.getProductWithTheme({
        themeKey,
        pageToken: pageParam,
        maxResults: 20,
      }),
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });

  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
