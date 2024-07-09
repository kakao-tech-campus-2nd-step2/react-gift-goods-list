import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { getCurrentTheme, ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';
import { ThemeData } from '@/types/index';
import { fetchThemesFromAPI } from '@/api/api';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const themes = await fetchThemesFromAPI();
        const theme = getCurrentTheme(themeKey, themes);
        if (!theme) {
          setFetchError(new Error('Theme not found'));
        } else {
          setCurrentTheme(theme);
        }
      } catch (error) {
        setFetchError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, [themeKey]);

  if (loading) return <div>Loading...</div>;
  if (fetchError || !currentTheme) {
    return <Navigate to={RouterPath.notFound} />;
  }

  return (
    <>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
