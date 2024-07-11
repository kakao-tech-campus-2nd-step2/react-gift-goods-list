import axios from 'axios';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';

import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';
import type { ThemeData } from '@/types';

const fetchThemeData = async (): Promise<ThemeData[]> => {
  const { data } = await axios.get(
    'https://react-gift-mock-api-daeun0726.vercel.app/api/v1/themes',
  );
  return data.themes;
};

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const { data: themes, isLoading, isError } = useQuery<ThemeData[]>('themes', fetchThemeData);
  const currentTheme = themes?.find((theme) => theme.key === themeKey) || null;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !currentTheme) {
    return <Navigate to={RouterPath.notFound} />;
  }

  return (
    <>
      <ThemeHeroSection currentTheme={currentTheme} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
