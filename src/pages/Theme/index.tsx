import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';
import type { ThemeData, ThemesResponse } from '@/types';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const response = await axios.get<ThemesResponse>('https://react-gift-mock-api-ychy61.vercel.app/api/v1/themes');
        const foundTheme = response.data.themes.find(theme => theme.key === themeKey);
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
