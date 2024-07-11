import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection/ThemeHeroSection';
import type { ThemeData } from '@/types/types';
import { url } from '@/utils/url/url';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [themes, setThemes] = useState<ThemeData[]>([]);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await axios.get(
          `${url}/api/v1/themes`,
        );
        setThemes(response.data.themes);
      } catch (error) {
        console.error('Error fetching themes:', error);
      }
    };

    fetchThemes();
  }, []);

  console.log(themes);

  return (
    <>
      <ThemeHeroSection themes={themes} themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
