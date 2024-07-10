import { useParams } from 'react-router-dom';

import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  return (
    <>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
