import styled from '@emotion/styled';
import axios from 'axios';
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
        if (axios.isAxiosError(error)) {
          if (error.response) {
            switch (error.response.status) {
              case 404:
                setErrorMessage('상품을 찾을 수 없습니다.');
                break;
              case 500:
                setErrorMessage('서버 오류가 발생했습니다.');
                break;
              default:
                setErrorMessage('예기치 않은 오류가 발생했습니다.');
            }
          } else if (error.request) {
            setErrorMessage('요청이 있지만 응답을 받지 못한 경우');
          } else {
            setErrorMessage('오류 설정문제발생');
          }
        } else {
          setErrorMessage('예기치 않은 오류가 발생했습니다.');
        }
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
