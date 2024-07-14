import { useQuery } from '@tanstack/react-query';
import { createContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { fetchHomeTheme } from '@/apis/fetch';
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

  const { data = { themes: [] }, isLoading } = useQuery<ThemePageProps>({
    queryKey: ['themes'],
    queryFn: fetchHomeTheme,
  });

  const currentTheme = getCurrentTheme(themeKey, data?.themes);

  if (!isLoading) if (!currentTheme) return <Navigate to={RouterPath.notFound} />;

  return (
    <ThemePageContext.Provider value={data}>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </ThemePageContext.Provider>
  );
};
