import styled from '@emotion/styled'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { Container } from '@/components/common/layouts/Container'
import { BASE_URL } from '@/constants'
import { breakpoints } from '@/styles/variants'
import type { ThemeData } from '@/types'

type Props = {
  themeKey: string
}

const fetchThemeHero = async (): Promise<ThemeData[]> => {
  const response = await axios.get(`${BASE_URL}api/v1/themes`)
  return response.data.themes
}

const getCurrentTheme = (themeKey: string, themeList: ThemeData[]) => {
  return themeList.find((theme) => theme.key === themeKey);
};

export const ThemeHeroSection = ({ themeKey }: Props) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeData | undefined>()
  const { data, isLoading, isError } = useQuery<ThemeData[]>(['ThemeData', themeKey], fetchThemeHero)

  useEffect(() => {
    if (data) {
      const theme = getCurrentTheme(themeKey, data)
      setCurrentTheme(theme)
    }
  }, [data, themeKey])
  
  if (isError) {
    return (
      <ErrorWrapper>
        <ErrorText>데이터를 불러오는 중 오류가 발생하였습니다.</ErrorText>
      </ErrorWrapper>
    );
  }

  if (isLoading) {
    return (
      <LoadingWrapper>
        <Spinner />
        <LoadingText>Loading...</LoadingText>
      </LoadingWrapper>
    );
  }

  if (!currentTheme) {
    return null
  }

  return (
    <Wrapper backgroundColor={currentTheme.backgroundColor}>
      <Container>
        <Label>{currentTheme.label}</Label>
        <Title>{currentTheme.title}</Title>
        {currentTheme.description && <Description>{currentTheme.description}</Description>}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section<{ backgroundColor: string }>`
  padding: 27px 20px 23px;
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 50px 20px;
  }
`;

const Label = styled.p`
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.7);

  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 20px;
    line-height: 24px;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  color: #fff;
  font-size: 18px;
  line-height: 26px;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;

  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 30px;
    line-height: 40px;
    padding-top: 12px;
    word-break: break-word;
  }
`;

const Description = styled.p`
  padding-top: 5px;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.55);
  word-break: break-all;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding-top: 12px;
    font-size: 24px;
    line-height: 32px;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

const ErrorText = styled.div`
  font-size: 1.5rem;
  color: #ff6347;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  margin-top: 10px;
  font-size: 1.2rem;
  color: #555;
`;
