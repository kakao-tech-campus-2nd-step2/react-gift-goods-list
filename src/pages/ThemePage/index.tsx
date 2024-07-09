import { useNavigate, useParams } from 'react-router-dom';

import ROUTES from '@/constants/routes';
import BaseLayout from '@/layouts/BaseLayout';

import { ThemeGoods } from './components/ThemeGoods';
import { ThemeHeader } from './components/ThemeHeader';

export const ThemePage = () => {
  const navigate = useNavigate();
  const { themeKey } = useParams();

  if (!themeKey) {
    navigate(ROUTES.HOME);
    return null;
  }

  return (
    <BaseLayout>
      <ThemeHeader themeKey={themeKey} />
      <ThemeGoods themeKey={themeKey} />
    </BaseLayout>
  );
};
