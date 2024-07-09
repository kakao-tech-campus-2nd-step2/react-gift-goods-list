import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { fetchThemes } from '@/api/fetchThemes';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { getCurrentTheme, ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();

  useEffect(() => {
    (async () => {
      try {
        const themes = await fetchThemes();
        const currentTheme = getCurrentTheme(themeKey, themes);

        if (!currentTheme) {
          return <Navigate to={RouterPath.notFound} />;
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [themeKey]);

  return (
    <>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
