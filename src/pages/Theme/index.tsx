import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchThemes } from '@/api/api';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const themes = await fetchThemes();
        const foundTheme = themes.find(t => t.key === themeKey);
        if (!foundTheme) {
          setError('Theme not found.');
        } else {
          setError('');
        }
      } catch (fetchError) {
        console.error('Failed to fetch themes', fetchError);
        setError('An error occurred while fetching theme details.');
      } finally {
        setLoading(false);
      }
    })();
  }, [themeKey]);

  if (loading) {
    return <LoadingMessage>Loading theme details...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  padding: 20px;
  font-size: 16px;
`;