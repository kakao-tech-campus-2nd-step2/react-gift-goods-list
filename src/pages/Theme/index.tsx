import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { getCurrentTheme, ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';
import { useFetchThemes, useFetchProductsByTheme } from '@/api/customHook';
import Loading from '@/components/Loading';

import { ProductData } from '@/types';

export const ThemePage: React.FC = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const { data: themes, loading, error } = useFetchThemes();
  const [nextPageToken, setNextPageToken] = useState<number | null>(0);
  const [items, setItems] = useState<ProductData[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const { data: productsData } = useFetchProductsByTheme(themeKey, nextPageToken ?? 0);

  useEffect(() => {
    if (productsData) {
      setItems((prevItems) => [...prevItems, ...productsData.products]);
      setNextPageToken(productsData.nextPageToken);
      setIsFetching(false);
    }
  }, [productsData]);

  const fetchMoreItems = useCallback(() => {
    if (isFetching || nextPageToken === null) return;
    setIsFetching(true);
  }, [isFetching, nextPageToken]);

  useEffect(() => {
    if (themes) {
      const currentTheme = getCurrentTheme(themeKey, themes);
      if (currentTheme) {
        setNextPageToken(0);
        setItems([]);
      }
    }
  }, [themes, themeKey]);

  const handleScroll = useCallback(() => {
    if (window.scrollY >= window.innerHeight - 50) {
      fetchMoreItems();
    }
  }, [fetchMoreItems, isFetching]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loading) return <Loading />;
  if (error || !themes) return <Navigate to={RouterPath.notFound} />;

  const currentTheme = getCurrentTheme(themeKey, themes);
  if (!currentTheme) return <Navigate to={RouterPath.notFound} />;

  return (
    <>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection items={items} />
    </>
  );
};
