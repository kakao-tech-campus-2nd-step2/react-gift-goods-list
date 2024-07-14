import styled from '@emotion/styled';
import { Navigate,useParams } from 'react-router-dom';

import { useThemes } from '@/api/theme';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { getCurrentTheme, ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { RouterPath } from '@/routes/path';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const { data: themes, error, isLoading } = useThemes();

  const currentTheme = themes ? getCurrentTheme(themeKey, themes.themes) : null;

  if (isLoading) return <MessageDiv>로딩 중...</MessageDiv>;
  if (error) return <MessageDiv color="red">테마를 불러오는 중 오류가 발생했습니다.</MessageDiv>;
  if (!currentTheme) {
    return <Navigate to={RouterPath.notFound} />;
  }

  return (
    <>
      <ThemeHeroSection theme={currentTheme} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};

const MessageDiv = styled.div<{ color?: string }>`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: ${({ color }) => color || '#666'};
`;
