import { Navigate, useParams } from 'react-router-dom';

import { useGetThemes } from '@/api';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { getCurrentTheme, ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();

  const { data: themeListResponse, loading: isThemeListLoading } = useGetThemes();

  const themeList = themeListResponse?.data?.themes || [];

  const currentTheme = getCurrentTheme(themeKey, themeList);

  if (isThemeListLoading) {
    return <div>Loading...</div>;
  } else if (!currentTheme) {
    return <Navigate to={RouterPath.notFound} />;
  }

  return (
    <>
      <ThemeHeroSection themeKey={themeKey} themeList={themeList} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
