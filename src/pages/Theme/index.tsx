import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import type { ThemeData } from '@/api';
import { getThemes } from '@/api';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';

const ThemePage: React.FC = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const themes = await getThemes();
        const foundTheme = themes.find((theme) => theme.key === themeKey);
        setCurrentTheme(foundTheme || null);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching themes:', error);
        setLoading(false);
      }
    };

    fetchTheme();
  }, [themeKey]);

  if (loading) {
    return <div>로딩중...</div>;
  }

  if (!currentTheme) {
    return <Navigate to={RouterPath.notFound} />;
  }

  return (
    <>
      <header style={{
        backgroundColor: currentTheme.backgroundColor,
        padding: '60px 20px',
        color: '#fff',
        marginBottom: '20px',
        textAlign: 'left', 
      }}>
        <p style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '10px' }}> {currentTheme.label}</p>
        <h1 style={{ textAlign: 'left', fontWeight: 'bold',marginBottom: '10px' }}>{currentTheme.title}</h1>
        <p style={{ textAlign: 'left', marginBottom: '5px' }}>{currentTheme.description}</p>
      </header>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};

export default ThemePage;