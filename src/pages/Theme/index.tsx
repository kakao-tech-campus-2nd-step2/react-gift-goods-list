import { useEffect,useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { fetchThemeProducts, fetchThemes } from '@/api/Api';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';
import type { GoodsData, ThemeData } from '@/types';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [categories, setCategories] = useState<ThemeData | null>(null);
  const [goods, setGoods] = useState<GoodsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchThemesData = async () => {
      try {
        const themes = await fetchThemes();
        const data = await fetchThemeProducts(themeKey);
        const selectedTheme = themes.themes.find((theme: ThemeData) => theme.key === themeKey);

        if (selectedTheme) {
          setCategories(selectedTheme);
          setGoods(data.products);
          setLoading(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch themes: ', err);
        setLoading(false);
        setError(true);
      }
    };

    fetchThemesData();
  }, [themeKey]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !categories || !goods) {
    return <Navigate to={RouterPath.notFound} />;
  }

  return (
    <>
      <ThemeHeroSection themeKey={themeKey} theme={categories} />
      <ThemeGoodsSection themeKey={themeKey} goods={goods} />
    </>
  );
};
