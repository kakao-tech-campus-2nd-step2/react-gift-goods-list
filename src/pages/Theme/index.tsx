import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { getThemes } from '@/apis/Theme/theme.api';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import {
  getCurrentTheme,
  ThemeHeroSection,
} from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';

// import { ThemeMockList } from '@/types/mock';

interface ThemeItem {
  id: number;
  key: string;
  label: string;
  imageURL: string;
  title: string;
  description?: string;
  backgroundColor: string;
}

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [themeData, setThemeData] = useState<ThemeItem[]>([]);

  useEffect(() => {
    const fetchThemes = async () => {
      const data = await getThemes();
      setThemeData(data.themes);
    };
    fetchThemes();
  }, []);

  // const currentTheme = getCurrentTheme(themeKey, ThemeMockList);
  const currentTheme = getCurrentTheme(themeKey, themeData);

  console.log('themeData: ', themeData);
  console.log('currentTheme:', currentTheme);
  console.log('themeKey:', themeKey);
  if (!currentTheme) {
    return <Navigate to={RouterPath.notFound} />;
  }

  return (
    <>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
// function useState<T>(arg0: never[]): [any, any] {
//   throw new Error('Function not implemented.');
// }
