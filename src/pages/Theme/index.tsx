import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { fetchThemes } from '@/api/api';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';
import type { ThemeData } from '@/types';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const themes = await fetchThemes();
        const foundTheme = themes.find((theme: ThemeData) => theme.key === themeKey);
        if (!foundTheme) {
          setIsLoading(false);
          return;
        }
        setCurrentTheme(foundTheme);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch themes:', error);
        setIsLoading(false);
      }
    };

    fetchThemeData();
  }, [themeKey]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentTheme) {
    return <Navigate to={RouterPath.notFound} replace />;
  }

  return (
    <>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
