import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { fetchThemes } from '@/api/api';
import { Loading } from '@/components/common/Loading';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';
import type { ThemeData, ThemesResponse } from '@/types';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 관리하는 상태 변수
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThemeData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const themes: ThemesResponse['themes'] = await fetchThemes(setError); // API 호출로 테마 데이터를 가져옴
        const foundTheme = themes.find((theme) => theme.key === themeKey); // themeKey에 맞는 테마를 찾음
        if (!foundTheme) {
          setError('테마를 찾을 수 없습니다.');
        } else {
          setCurrentTheme(foundTheme); // 테마를 찾으면 상태에 설정
        }
      } catch (err) {
        console.error('Failed to fetch themes:', err);
        setError('테마 데이터를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchThemeData();
  }, [themeKey]);

  if (isLoading) {
    return <Loading />; // 로딩 중일 때는 로딩 컴포넌트를 표시
  }

  if (error || !currentTheme) {
    return <Navigate to={RouterPath.notFound} replace />; // 에러 발생 또는 테마를 찾지 못했을 때 404 페이지로 리다이렉트
  }

  return (
    <>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
