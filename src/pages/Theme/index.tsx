import { createContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import useFetch from '@/apis/useFetch';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { getCurrentTheme, ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';
import type { ThemeData } from '@/types';

interface ThemePageProps {
  themes: ThemeData[];
}

export const ThemePageContext = createContext<ThemePageProps>({ themes: [] });

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();

  const initialThemes = { themes: [] };
  const { data, status } = useFetch<ThemePageProps>(`/api/v1/themes`, initialThemes);

  const currentTheme = getCurrentTheme(themeKey, data?.themes);

  if (!status.loading) if (!currentTheme) return <Navigate to={RouterPath.notFound} />;

  return (
    <ThemePageContext.Provider value={data}>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </ThemePageContext.Provider>
  );
};
