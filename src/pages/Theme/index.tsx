import { Navigate, useParams } from 'react-router-dom';

import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import {
  getCurrentTheme,
  ThemeHeroSection,
} from '@/components/features/Theme/ThemeHeroSection';
import { ThemeProductProvider } from '@/provider/Theme/ThemeProductProvider';
import { useThemeContext } from '@/provider/Theme/ThemeProvider';
import { RouterPath } from '@/routes/path';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const { themes, isLoading } = useThemeContext();

  const currentTheme = getCurrentTheme(themeKey, themes);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentTheme) {
    return <Navigate to={RouterPath.notFound} />;
  }

  return (
    <>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeProductProvider themeKey={themeKey}>
        <ThemeGoodsSection themeKey={themeKey} />
      </ThemeProductProvider>
    </>
  );
};
