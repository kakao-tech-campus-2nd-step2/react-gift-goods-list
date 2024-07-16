import { useCallback, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';

import { getTheme } from '@/libs/api';

export const useThemeGoods = (themeKey: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery(
    ['themeGoods', themeKey],
    ({ pageParam = 1 }) => getTheme(themeKey, pageParam * 20),
    {
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.products || lastPage.products.length < 20) {
          return undefined;
        }
        return pages.length + 1;
      },
    },
  );

  const observer = useRef<IntersectionObserver | null>(null);
  const lastGoodsElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    lastGoodsElementRef,
  };
};
