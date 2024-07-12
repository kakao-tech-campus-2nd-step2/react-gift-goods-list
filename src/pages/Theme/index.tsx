import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { getThemes } from '@/api/api';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import ThemeHeroSection from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';
import type { ThemeData } from '@/types/response';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await getThemes();
        const foundTheme = response.themes.find((t: ThemeData) => t.key === themeKey);
        setCurrentTheme(foundTheme || null);
      } catch (error) {
        console.error('Error fetching theme:', error);
      }
    };
    fetchTheme();
  }, [themeKey]);

  if (!currentTheme) {
    return <Navigate to={RouterPath.notFound} />;
  }

  console.log('Rendering ThemePage with themeKey:', themeKey); // 디버깅 코드 추가

  return (
    <>
      <ThemeHeroSection theme={currentTheme} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
