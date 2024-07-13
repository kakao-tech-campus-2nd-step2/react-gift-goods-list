import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import ShowError from '@/components/Error/ShowError';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection/ThemeHeroSection';
import Loading from '@/components/Loading/Loading';
import type { ThemeData } from '@/types/types';
import { fetchData } from '@/utils/api/api';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [themes, setThemes] = useState<ThemeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThemes = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const response = await fetchData('/api/v1/themes');
        setThemes(response.themes);
      } catch (error) {
        setFetchError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchThemes();
  }, [themeKey]);

  if (loading) {
    return Loading();
  }
  if (fetchError) {
    return ShowError(fetchError);
  }
  if (themes.length == 0) {
    return ShowError('데이터 없음');
  }

  return (
    <>
      <ThemeHeroSection themes={themes} themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
