import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate, useParams } from 'react-router-dom';

import { ThemeErrorFallback } from '@/api/ThemeErrorFallback';
import ROUTES from '@/constants/routes';
import BaseLayout from '@/layouts/BaseLayout';

import { Skeleton } from '@/components/ui/Skeleton';

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
      <ErrorBoundary FallbackComponent={ThemeErrorFallback}>
        <Suspense fallback={<Skeleton width="100vw" height="13rem" />}>
          <ThemeHeroSection themeKey={themeKey} />
        </Suspense>
      </ErrorBoundary>
      <ThemeGoodsSection themeKey={themeKey} />
    </BaseLayout>
  );
};
