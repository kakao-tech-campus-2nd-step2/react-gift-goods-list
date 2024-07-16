import { useParams } from 'react-router-dom';

import apiClient from '@/api';
import type { GetThemesResponse, ThemeData } from '@/api/types/apiTypes';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { getCurrentTheme } from '@/components/features/Theme/ThemeHeroSection';
import { useThemes } from '@/hooks/useThemes';
import ErrorMessage from '@/styles/ErrorMessage';
import Loading from '@/styles/Loading';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [themes, { isLoading, isError, errorMessage}] = useThemes();

  if (isLoading) {
    return <Loading />
  }

  if (isError || !themes) {
    return (
      <ErrorMessage>
        에러가 발생했습니다.
        <br />
        {errorMessage}
      </ErrorMessage>
    )
  }

  return (
    <>
      <ThemeHeroSection currentTheme={getCurrentTheme(themeKey, themes)} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
