import { useParams } from 'react-router-dom';

import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { getCurrentTheme } from '@/components/features/Theme/ThemeHeroSection';
import { useThemes } from '@/hooks/useThemes';
import Loading from '@/styles/Loading';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [themes, { isLoading, isError}] = useThemes();

  if (isLoading) {
    return <Loading />
  }

  if (isError || !themes) {
    return (
      <div>
        에러가 발생했습니다.
      </div>
    )
  }

  return (
    <>
      <ThemeHeroSection currentTheme={getCurrentTheme(themeKey, themes)} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
