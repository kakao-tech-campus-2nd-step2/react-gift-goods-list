import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchThemes } from '@/api/api';
import { Container } from '@/components/common/layouts/Container';
import { Loading } from '@/components/common/Loading';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { ThemeData } from '@/types';

type Props = {
  themeKey: string;
};

export const ThemeHeroSection = ({ themeKey }: Props) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 관리하는 상태 변수
  const navigate = useNavigate();

  useEffect(() => {
    const getTheme = async () => {
      try {
        const themes = await fetchThemes(); // API 호출로 테마 데이터를 가져옴
        const foundTheme = themes.find((theme: ThemeData) => theme.key === themeKey); // themeKey에 맞는 테마를 찾음
        if (!foundTheme) {
          navigate(RouterPath.home); // 테마를 찾지 못하면 홈으로 리다이렉트
          return;
        }
        setCurrentTheme(foundTheme); // 테마를 찾으면 상태에 설정
      } catch (error) {
        console.error('Failed to fetch themes:', error);
        navigate(RouterPath.home);
      } finally {
        setIsLoading(false);
      }
    };

    getTheme();
  }, [themeKey, navigate]);

  if (isLoading) {
    return <Loading />; // 로딩 중일 때는 로딩 컴포넌트를 표시
  }

  if (!currentTheme) {
    return null; // 현재 테마가 없으면 null 반환
  }

  const { backgroundColor, label, title, description } = currentTheme; // 테마 데이터에서 필요한 정보 추출

  return (
    <Wrapper backgroundColor={backgroundColor}>
      <Container>
        <Label>{label}</Label>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section<{ backgroundColor: string }>`
  padding: 27px 20px 23px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 50px 20px;
  }
`;

const Label = styled.p`
  font-weight: 700;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 20px;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  color: #fff;
  font-size: 18px;
  -webkit-line-clamp: 2;
  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 30px;
    padding-top: 12px;
  }
`;

const Description = styled.p`
  padding-top: 5px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.55);
  @media screen and (min-width: ${breakpoints.sm}) {
    padding-top: 12px;
    font-size: 24px;
  }
`;
