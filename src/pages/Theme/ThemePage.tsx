import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection/ThemeHeroSection';
import type { ThemeData } from '@/types/types';
import { fetchData } from '@/utils/api/api';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [themes, setThemes] = useState<ThemeData[]>([]);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await fetchData('/api/v1/themes');
        setThemes(response.themes);
      } catch (error) {
        console.error('Error fetching themes:', error);
      }
    };
    fetchThemes();
  }, [themeKey]);

  if (themes.length === 0) {
    return <div>no Data</div>;
  }

  return (
    <>
      <ThemeHeroSection themes={themes} themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
