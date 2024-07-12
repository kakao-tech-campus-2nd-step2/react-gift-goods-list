import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';

import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';
import type { GoodsData, ThemeData } from '@/types';
import apiClient from '@/utils/api';

const getThemeDetails = async (themeKey: string) => {
  const response = await apiClient.get<{ themes: ThemeData[] }>('/themes');
  return response.data.themes.find((theme) => theme.key === themeKey);
};

const getThemeProducts = async (themeKey: string) => {
  const response = await apiClient.get<{ products: GoodsData[] }>(`/themes/${themeKey}/products`, {
    params: {
      maxResults: 20,
    },
  });
  return response.data.products;
};

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();

  const {
    data: currentTheme,
    isLoading: isThemeLoading,
    isError: isThemeError,
  } = useQuery(['theme', themeKey], () => getThemeDetails(themeKey));

  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery(['themeProducts', themeKey], () => getThemeProducts(themeKey));

  if (isThemeLoading || isProductsLoading) {
    return <div>Loading...</div>;
  }

  if (isThemeError || isProductsError || !currentTheme) {
    return <Navigate to={RouterPath.home} />;
  }

  return (
    <>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection products={products || []} />
    </>
  );
};
