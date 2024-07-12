import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import apiClient from '@/api';
import type { GetThemesResponse, ThemeData } from '@/api/types/apiTypes';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
// import { RouterPath } from '@/routes/path';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [themes, setThemes] = useState<ThemeData[]>([]);
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await apiClient.get<GetThemesResponse>('/api/v1/themes');
        setThemes(response.data.themes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchThemes();
  }, []);

  return (
    <>
      <ThemeHeroSection themes={themes} themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
