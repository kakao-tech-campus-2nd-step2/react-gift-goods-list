import { useCallback,useRef, useState } from 'react';
import { useInfiniteQuery,useQuery } from 'react-query';

import { getTheme,getThemes } from '@/libs/api';
import type { ThemeData } from '@/types';

export const useTheme = (themeKey: string) => {
  const [error, setError] = useState<string>('');
  const [theme, setTheme] = useState<ThemeData | null>(null);

  const { isLoading: isThemeLoading, isError: isThemeError } = useQuery(['themes'], getThemes, {
    onSuccess: (data) => {
      const currentTheme = data.themes.find(
        (currentData: ThemeData) => currentData.key === themeKey,
      );
      if (!currentTheme) {
        setError('Theme을 찾을 수 없습니다.');
      } else {
        setTheme(currentTheme);
      }
    },
    onError: (err) => {
      setError((err as Error).message);
    },
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isGoodsLoading,
  } = useInfiniteQuery(
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
    theme,
    isThemeLoading,
    isThemeError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isGoodsLoading,
    lastGoodsElementRef,
  };
};
