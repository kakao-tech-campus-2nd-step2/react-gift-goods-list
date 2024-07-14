import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { Loading } from '@/api/Loading';
import { fetchThemes } from '@/api/themeApi';
import { HeroSection } from '@/components/features/Theme/HeroSection';
import { ProductSection } from '@/components/features/Theme/ProductSection';
import { RouterPath } from '@/routes/path';
import type { ThemeData } from '@/types';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getThemes = async () => {
      try {
        const themes = await fetchThemes();
        const theme = themes.find((t) => t.key === themeKey);
        setCurrentTheme(theme || null);
      } catch (error) {
        console.error('Error fetching themes:', error);
        setCurrentTheme(null);
      } finally {
        setLoading(false);
      }
    };

    getThemes();
  }, [themeKey]);

  if (loading) {
    return <Loading />;
  }

  if (!currentTheme) {
    return <Navigate to={RouterPath.home} />;
  }

  return (
    <>
      <HeroSection themeKey={themeKey} />
      <ProductSection themeKey={themeKey} />
    </>
  );
};
