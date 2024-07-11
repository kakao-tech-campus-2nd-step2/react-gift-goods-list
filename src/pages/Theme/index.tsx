import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { fetchThemes } from '@/api/api';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { getCurrentTheme, ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { ThemeData } from '@/types';

export const ThemePage: React.FC = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadThemeData = async () => {
      try {
        const themesResponse = await fetchThemes();
        const theme = getCurrentTheme(themeKey, themesResponse.themes);
        if (!theme) {
          setErrorMessage('Invalid theme key');
          setIsLoading(false);
          return;
        }
        setCurrentTheme(theme);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage('Failed to load theme data');
        setIsLoading(false);
      }
    };

    loadThemeData();
  }, [themeKey]);

  if (isLoading) {
    return <Message>Loading...</Message>;
  }

  if (errorMessage) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {currentTheme && <ThemeHeroSection theme={currentTheme} />}
      <ThemeGoodsSection themeKey={themeKey} />;
    </>
  );
};

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.5em;
  color: #999;
`;
