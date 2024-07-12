import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchThemeProduct } from '@/api/services/themeProduct';

export const useInfiniteThemeProducts = (themeKey: string) => {
  const { data, status, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['themeProducts', themeKey],
    queryFn: ({ pageParam }) => fetchThemeProduct(themeKey, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length : undefined;
    },
  });

  const themeProducts = data?.pages.flatMap((page) => page);

  return { themeProducts, status, error, fetchNextPage, hasNextPage };
};
