import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';

import { GoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { HeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';
import type { ThemeData } from '@/types';
import apiClient from '@/utils/api';

const getThemeDetails = async (themeKey: string) => {
  const response = await apiClient.get<{ themes: ThemeData[] }>('/themes');
  return response.data.themes.find((theme) => theme.key === themeKey);
};

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();

  const {
    data: currentTheme,
    isLoading: isThemeLoading,
    isError: isThemeError,
  } = useQuery(['theme', themeKey], () => getThemeDetails(themeKey), {
    enabled: !!themeKey,
  });

  if (isThemeLoading) {
    return <div>Loading...</div>;
  }

  if (isThemeError || !currentTheme) {
    return <Navigate to={RouterPath.home} />;
  }

  return (
    <>
      <HeroSection />
      <GoodsSection />
    </>
  );
};
