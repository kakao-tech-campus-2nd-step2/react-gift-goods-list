import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getThemes } from '@/api/api';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import ThemeHeroSection from '@/components/features/Theme/ThemeHeroSection';
import type { ThemeData } from '@/types/response';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await getThemes();
        const foundTheme = response.themes.find((t: ThemeData) => t.key === themeKey);
        setCurrentTheme(foundTheme || null);
      } catch (error) {
        console.error('Error fetching theme:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTheme();
  }, [themeKey]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!currentTheme) {
    return <p>Theme not found</p>;
  }

  console.log('Rendering ThemePage with themeKey:', themeKey);

  return (
    <>
      <ThemeHeroSection theme={currentTheme} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
