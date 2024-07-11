import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import apiClient from '@/api';
import type { GetThemesResponse, ThemeData } from '@/api/types/apiTypes';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [themes, setThemes] = useState<ThemeData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await apiClient.get<GetThemesResponse>('/api/v1/themes');
        setThemes(response.data.themes);
      } catch (error) {
        console.error(error);
      } finally { // 오류가 발생하더라도 loading을 false로 변경해야함
      setLoading(false);
      }
    };
    fetchThemes();
  }, []);

  if (loading) {
    return <LoadingScreen>Loading...</LoadingScreen>;
  }

  return (
    <>
      <ThemeHeroSection themes={themes} themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};

const LoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
