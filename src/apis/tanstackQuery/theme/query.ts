import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getThemeCategory } from '@/apis/endpoints/theme/useGetThemeCategory';
import type { ThemeProductAPIResponse } from '@/apis/endpoints/theme/useGetThemeProduct';
import { getThemeProducts } from '@/apis/endpoints/theme/useGetThemeProduct';

export const useGetThemeCategoryQuery = () => {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['themeCategories'],
    queryFn: () => getThemeCategory(),
  });

  return { data, isLoading, isFetching, isError, error };
};

export const useGetThemeProductQuery = (themeKey: string, maxResults: number = 20) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteQuery<ThemeProductAPIResponse>({
      queryKey: ['themeProducts', themeKey],
      queryFn: ({ pageParam }) =>
        getThemeProducts(themeKey, pageParam as string | undefined, maxResults),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    });

  const flattenedProducts = data?.pages.flatMap((page) => page.products) || [];
  const totalResults = data?.pages[0]?.pageInfo.totalResults || 0;

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    products: flattenedProducts,
    totalResults,
  };
};
