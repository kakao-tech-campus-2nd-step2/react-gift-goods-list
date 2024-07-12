import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { Navigate, useParams } from 'react-router-dom';

import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { getThemes } from '@/api';
// import { RouterPath } from '@/routes';
import { ThemeData } from '@/types';

export const Theme = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { themeKey = '' } = useParams<{ themeKey: string }>();

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await getThemes();
        const themes: ThemeData[] = response.themes;
        // console.log('themes:', themes);
        const matchedTheme = themes.find((theme: ThemeData) => theme.key === themeKey);
        // console.log('matched theme:', matchedTheme);

        if (matchedTheme) {
          setCurrentTheme(matchedTheme);
          //   console.log('current theme: ', currentTheme);
        } else {
          console.error(`No theme found for key: ${themeKey}`);
          setIsError(true);
        }
      } catch (error) {
        console.error('Error fetching themes:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThemes();
  }, [themeKey]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading themes.</p>;
  if (!currentTheme) return <p>No current theme</p>;
  //   if (!currentTheme) return <Navigate to={RouterPath.notFound} />;

  return (
    <>
      <ThemeHeroSection theme={currentTheme} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
