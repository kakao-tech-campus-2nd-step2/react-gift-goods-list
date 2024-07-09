import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { LoadingSpinner } from '@/components/common/Loading/Loading';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { getTheme, getThemes } from '@/libs/api';
import { RouterPath } from '@/routes/path';
import type { GoodsData, ThemeData } from '@/types';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [label, setLabel] = useState<ThemeData | null>(null);
  const [goods, setGoods] = useState<GoodsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const themes = await getThemes();
        const currentTheme = themes.themes.find((theme: ThemeData) => theme.key === themeKey);

        if (!currentTheme) {
          setError(true);
          return;
        }

        const data = await getTheme(themeKey);
        setLabel(currentTheme); // Assuming the API returns theme data under `data.theme`
        setGoods(data.products); // Assuming the API returns product data under `data.products`
        setLoading(false);
        console.log(data);
      } catch (err) {
        console.error('Failed to fetch theme data:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchTheme();
  }, [themeKey]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !label || !goods) {
    return <Navigate to={RouterPath.notFound} />;
  }

  return (
    <>
      <ThemeHeroSection theme={label} />
      <ThemeGoodsSection goods={goods} />
    </>
  );
};
