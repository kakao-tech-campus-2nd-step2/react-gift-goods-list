import { Navigate, useParams } from 'react-router-dom';

import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { getCurrentTheme, ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { useThemes } from '@/context/themeContext';
import { RouterPath } from '@/routes/path';

export const ThemePage = () => {
  const themes = useThemes();
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const currentTheme = getCurrentTheme(themeKey, themes);

  if (!currentTheme) {
    return <Navigate to={RouterPath.root} />;
  }

  return (
    <>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
