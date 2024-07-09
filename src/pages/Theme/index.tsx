import { useLocation, useParams } from 'react-router-dom';

import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const location = useLocation();
  const { label, title, description, backgroundColor } = location.state;
  const theme = {
    label: label,
    title: title,
    description: description,
    backgroundColor: backgroundColor,
  };

  return (
    <>
      <ThemeHeroSection theme={theme} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
