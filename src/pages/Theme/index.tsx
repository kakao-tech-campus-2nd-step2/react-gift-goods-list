import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';

import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';

import Loading from '@/components/Loading';
import { fetchThemesFromAPI, fetchProductsByTheme } from '@/api/api';

import { ThemeData } from '@/types';

export const ThemePage: React.FC = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();

  const {
    data: themes,
    isLoading: themesLoading,
    isError: themesError,
  } = useQuery<ThemeData[]>('themes', fetchThemesFromAPI);

  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['products', themeKey],
    ({ pageParam = 0 }) => fetchProductsByTheme(themeKey, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextPageToken,
    },
  );

  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (themesLoading || isLoading) return <Loading />;
  if (themesError || isError || !themes) return <Navigate to={RouterPath.notFound} />;

  const currentTheme = themes.find((theme) => theme.key === themeKey);
  if (!currentTheme) return <Navigate to={RouterPath.notFound} />;

  const products = data?.pages.flatMap((page) => page.products) || [];

  return (
    <>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection items={products} />
      <div ref={ref} />
    </>
  );
};
