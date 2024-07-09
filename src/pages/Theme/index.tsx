import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { fetchThemes } from '@/api/api';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { getCurrentTheme, ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';
import { ThemeData } from '@/types';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const themes = await fetchThemes();
        const foundTheme = getCurrentTheme(themeKey, themes);
        if (!foundTheme) {
          setHasError(true);
        } else {
          setCurrentTheme(foundTheme);
        }
      } catch (fetchError) {
        console.error('Failed to fetch themes', fetchError);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [themeKey]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (hasError || !currentTheme) {
    return <Navigate to={RouterPath.notFound} />;
  }
  return (
    <>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
