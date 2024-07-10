import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { getCurrentTheme, ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';
import { type ThemeData } from '@/types';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const [themes, setThemes] = useState<ThemeData[]>([]);
  const [currentTheme, setCurrentTheme] = useState<ThemeData>();

  const url = 'https://react-gift-mock-api-two.vercel.app/api/v1/themes';
  useEffect(() => {
    axios.get(url).then((res) => {
      setThemes(res.data.themes);
      // console.log(res.data.themes); // API로부터 받은 실제 데이터 출력
    });
  }, []); // 의존성 배열을 빈 배열로 설정하여 마운트 시에만 실행되도록 함
  console.log(themes); // 첫 렌더링에서는 빈 배열, 업데이트 후에는 API 데이터를 출력

  // 아래 방식으로 themes를 확인해봐도 빈 배열이 뜬다..
  useEffect(() => {
    console.log(themes);
  }, [themes]);

  useEffect(() => {
    setCurrentTheme(getCurrentTheme(themeKey, themes));
  }, [themeKey, themes]);

  if (!currentTheme) {
    return <Navigate to={RouterPath.notFound} />;
  }
  return (
    <>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
