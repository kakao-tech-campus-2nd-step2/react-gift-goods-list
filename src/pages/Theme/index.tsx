import { Navigate, useParams } from 'react-router-dom';

import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { getCurrentTheme, ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';
import { useFetchThemes } from '@/api/customHook';
import Loading from '@/components/Loading';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const { data: themes, loading, error } = useFetchThemes();

  if (loading) return <Loading />;
  if (error || !themes) return <Navigate to={RouterPath.notFound} />;

  const currentTheme = getCurrentTheme(themeKey, themes);
  if (!currentTheme) return <Navigate to={RouterPath.notFound} />;

  return (
    <>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
