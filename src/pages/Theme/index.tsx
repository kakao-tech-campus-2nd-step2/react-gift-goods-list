import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { fetchThemes } from '@/api/api';
import { Loading } from '@/components/common/Loading';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';
import type { ThemeData } from '@/types';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 관리하는 상태 변수

  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const themes = await fetchThemes(); // API 호출로 테마 데이터를 가져옴
        const foundTheme = themes.find((theme) => theme.key === themeKey); // themeKey에 맞는 테마를 찾음
        if (!foundTheme) {
          setIsLoading(false); // 테마를 찾지 못하면 로딩 상태를 false로 설정
          return;
        }
        setCurrentTheme(foundTheme); // 테마를 찾으면 상태에 설정
      } catch (error) {
        console.error('Failed to fetch themes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchThemeData();
  }, [themeKey]);

  if (isLoading) {
    return <Loading />; // 로딩 중일 때는 로딩 컴포넌트를 표시
  }

  if (!currentTheme) {
    return <Navigate to={RouterPath.notFound} replace />; // 테마를 찾지 못했을 때 404 페이지로 리다이렉트
  }

  return (
    <>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
