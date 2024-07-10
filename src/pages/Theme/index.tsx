import { Spinner } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';

import { useGetThemeCategoryQuery } from '@/apis/tanstackQuery/theme/query';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { getCurrentTheme, ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const { data, isLoading } = useGetThemeCategoryQuery();

  if (isLoading) {
    return (
      <Spinner animation="border" role="status" variant="secondary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (!data) {
    return null;
  }

  const currentTheme = getCurrentTheme(themeKey, data?.themes);

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
