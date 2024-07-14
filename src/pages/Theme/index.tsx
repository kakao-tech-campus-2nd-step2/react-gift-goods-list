import { useLocation, useParams } from 'react-router-dom';

import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';

interface ThemeState {
  label: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const location = useLocation();

  const state = location.state as ThemeState;

  if (!state) {
    return <div>Invalid state</div>;
  }

  const { label, title, description, backgroundColor } = state;
  const theme = {
    label: label,
    title: title,
    description: description,
    backgroundColor: backgroundColor,
    themeKey: themeKey, // themeKey 추가
  };

  return (
    <>
      <ThemeHeroSection theme={theme} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
