import type { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';

import { Loader } from '@/components/common/Spinner';
import { ThemeProductsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeader } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';
import type { ThemeData } from '@/types';
import apiClient from '@/utils/api';

const fetchThemeData = async (themeKey: string) => {
  const response = await apiClient.get<{ themes: ThemeData[] }>('/themes');
  return response.data.themes.find((theme) => theme.key === themeKey);
};

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();

  const {
    data: selectedTheme,
    isLoading: themeLoading,
    isError: themeError,
    error,
  } = useQuery(['theme', themeKey], () => fetchThemeData(themeKey), {
    enabled: !!themeKey,
  });

  if (themeLoading) {
    return <Loader />;
  }

  if (themeError) {
    const axiosError = error as AxiosError;
    const errorMessage =
      axiosError.response?.status === 404 ? '테마를 찾을 수 없습니다.' : '오류가 발생했습니다.';
    return <div>{errorMessage}</div>;
  }

  if (!selectedTheme) {
    return <Navigate to={RouterPath.home} />;
  }

  return (
    <>
      <ThemeHeader />
      <ThemeProductsSection />
    </>
  );
};
