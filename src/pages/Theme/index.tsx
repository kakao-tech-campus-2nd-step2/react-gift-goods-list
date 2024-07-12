import type { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';

import { Loader } from '@/components/common/Spinner';
import { ThemeProductsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeader } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';
import type { ThemeData } from '@/types';
import apiClient from '@/utils/api';

const fetchThemeDetails = async (themeKey: string) => {
  const response = await apiClient.get<{ themes: ThemeData[] }>('/themes');
  return response.data.themes.find((theme) => theme.key === themeKey);
};

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();

  const {
    data: currentTheme,
    isLoading: isThemeLoading,
    isError: isThemeError,
    error,
  } = useQuery(['theme', themeKey], () => fetchThemeDetails(themeKey), {
    enabled: !!themeKey,
  });

  if (isThemeLoading) {
    return <Loader />;
  }

  if (isThemeError) {
    const axiosError = error as AxiosError;
    const errorMessage =
      axiosError.response?.status === 404 ? '테마를 찾을 수 없습니다.' : '오류가 발생했습니다.';
    return <div>{errorMessage}</div>;
  }

  if (!currentTheme) {
    return <Navigate to={RouterPath.home} />;
  }

  return (
    <>
      <ThemeHeader />
      <ThemeProductsSection />
    </>
  );
};
