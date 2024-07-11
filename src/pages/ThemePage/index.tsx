import { useNavigate, useParams } from 'react-router-dom';

import ROUTES from '@/constants/routes';
import BaseLayout from '@/layouts/BaseLayout';

import { ThemeGoodsSection } from './components/ThemeGoodsSection';
import { ThemeHeroSection } from './components/ThemeHeroSection';

export const ThemePage = () => {
  const navigate = useNavigate();
  const { themeKey } = useParams();

  if (!themeKey) {
    navigate(ROUTES.HOME);
    return null;
  }

  return (
    <BaseLayout>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </BaseLayout>
  );
};
