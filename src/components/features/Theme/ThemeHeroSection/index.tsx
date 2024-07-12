import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchThemes } from '@/api/api';
import { Container } from '@/components/common/layouts/Container';
import { Loading } from '@/components/common/Loading';
import { breakpoints } from '@/styles/variants';
import type { ThemeData } from '@/types';

type Props = {
  themeKey: string;
};

export const ThemeHeroSection = ({ themeKey }: Props) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 관리하는 상태 변수
  const [error, setError] = useState<string | null>(null); // 에러 메시지를 저장할 상태
  const navigate = useNavigate();

  useEffect(() => {
    const getTheme = async () => {
      try {
        const themes = await fetchThemes(setError); // API 호출로 테마 데이터를 가져옴
        const foundTheme = themes.find((theme: ThemeData) => theme.key === themeKey) ?? null; // themeKey에 맞는 테마를 찾음
        setCurrentTheme(foundTheme); // 테마를 찾으면 상태에 설정
        setError(null); // 에러 상태 초기화
      } catch (err) {
        console.error('Failed to fetch themes:', err);
        setError('테마 데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.'); // 에러 메시지 상태 업데이트
      } finally {
        setIsLoading(false);
      }
    };

    getTheme();
  }, [themeKey, navigate]);

  if (isLoading) {
    return <Loading />; // 로딩 중일 때는 로딩 컴포넌트를 표시
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>; // 에러 발생 시 에러 메시지 표시
  }

  if (!currentTheme) {
    return <EmptyMessage>테마 목록이 비어있습니다.</EmptyMessage>; // 현재 테마가 없으면 빈 메시지 반환
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

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-size: 20px;
  padding: 20px;
  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 35px;
    padding: 30px;
  }
`;

const EmptyMessage = styled.p`
  color: #555;
  text-align: center;
  font-size: 20px;
  padding: 20px;
  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 35px;
    padding: 30px;
  }
`;
