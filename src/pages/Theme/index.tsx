import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { fetchThemes } from '@/api/theme';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { getCurrentTheme, ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';
import type { ThemeData } from '@/types/api';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [themes, setThemes] = useState<ThemeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const getThemes = async () => {
      setLoading(true);
      try {
        const response = await fetchThemes();
        setThemes(response.themes);
        setFetchError(null);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          switch (error.response.status) {
            case 404:
              setFetchError('테마를 찾을 수 없습니다');
              break;
            case 500:
              setFetchError('서버 오류가 발생했습니다');
              break;
            default:
              setFetchError('예상치 못한 오류가 발생했습니다');
          }
        } else {
          setFetchError('테마를 불러오는 데 실패했습니다');
        }
      } finally {
        setLoading(false);
      }
    };

    getThemes();
  }, []);

  const currentTheme = getCurrentTheme(themeKey, themes);

  if (loading) return <MessageDiv>로딩 중...</MessageDiv>;
  if (fetchError) return <MessageDiv color="red">{fetchError}</MessageDiv>;
  if (!currentTheme) {
    return <Navigate to={RouterPath.notFound} />;
  }

  return (
    <>
      <ThemeHeroSection theme={currentTheme} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};

const MessageDiv = styled.div<{ color?: string }>`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: ${({ color }) => color || '#666'};
`;
