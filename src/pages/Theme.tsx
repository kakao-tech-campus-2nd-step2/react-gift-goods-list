import { useParams } from 'react-router-dom';

import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';

export const Theme = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();

  return (
    <>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
