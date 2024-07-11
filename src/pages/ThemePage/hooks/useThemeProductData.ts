import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchThemeProductData } from '@/services/themeProductData';

export const useInfiniteThemeProducts = (themeKey: string) => {
  return useInfiniteQuery({
    queryKey: ['themeProducts', themeKey],
    queryFn: ({ pageParam }) => fetchThemeProductData(themeKey, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length : undefined;
    },
  });
};
