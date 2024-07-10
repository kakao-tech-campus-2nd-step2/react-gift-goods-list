import styled from '@emotion/styled';
import { Navigate, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import { useCurrentTheme } from '@/api/hooks/useCurrentTheme';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const { isLoading, currentTheme } = useCurrentTheme({ themeKey });

  if (isLoading) {
    return (
      <LoadingContainer>
        <ClipLoader color="#36d7b7" loading={isLoading} size={50} />
        <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
    );
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

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
`;

const LoadingText = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #36d7b7;
`;
