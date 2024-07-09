import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';
import type { ThemeData } from '@/types';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);

  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const response = await fetch(
          'https://react-gift-mock-api-daeun0726.vercel.app/api/v1/themes',
        );
        const data = await response.json();
        const foundTheme = data.themes.find((theme: ThemeData) => theme.key === themeKey);
        setCurrentTheme(foundTheme || null);
      } catch (error) {
        console.error('Failed to fetch theme data:', error);
        setCurrentTheme(null);
      }
    };

    fetchThemeData();
  }, [themeKey]);

  if (currentTheme === null) {
    return <div>Loading...</div>;
  }

  if (!currentTheme) {
    return <Navigate to={RouterPath.notFound} />;
  }

  return (
    <>
      <ThemeHeroSection currentTheme={currentTheme} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
