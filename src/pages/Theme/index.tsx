import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { fetchThemes } from '@/api/api';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { getCurrentTheme, ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';
import type { ThemeData } from '@/types';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getTheme = async () => {
      try {
        const response = await fetchThemes();
        const theme = getCurrentTheme(themeKey, response.themes);
        setCurrentTheme(theme || null);
      } catch (err) {
        console.error('Failed to load themes', err);
        setError('테마를 불러오는데 실패했습니다. 잠시후에 다시 시도하세요.')
      } finally {
        setIsLoading(false);
      }
    };

    getTheme();
  }, [themeKey]);

  if (isLoading) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  if (error) {
    return <ErrorWrapper>{error}</ErrorWrapper>;
  }

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

const LoadingWrapper = styled.div`
  padding: 20px;
  text-align: center;
`;

const ErrorWrapper = styled.div`
  padding: 20px;
  text-align: center;
  color: red;
`;
