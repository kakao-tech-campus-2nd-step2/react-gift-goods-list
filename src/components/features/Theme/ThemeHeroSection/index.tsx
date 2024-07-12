import styled from '@emotion/styled'
import { useEffect, useState } from 'react'

import fetchData from '@/api'
import { Container } from '@/components/common/layouts/Container'
import { breakpoints } from '@/styles/variants'
import type { ThemeData } from '@/types'

type Props = {
  themeKey: string
}

export const getCurrentTheme = (themeKey: string, themeList: ThemeData[]) => {
  return themeList.find((theme) => theme.key === themeKey);
};

export const ThemeHeroSection = ({ themeKey }: Props) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeData>()
  const [loading, setLoading] = useState(true)

  // themeKey 가 변할 때 마다 실행
  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const data = await fetchData(`api/v1/themes`)
        const theme = getCurrentTheme(themeKey, data.themes)

        setCurrentTheme(theme)
        setLoading(false)
        console.log('[ThemeHeroSection] Fetch Theme Data Success: ', data.themes)
      }
      catch (error) {
        console.error('[ThemeHeroSection] Fetch Theme Data Fail: ', error)
        setLoading(false)
      }
    }
    fetchThemeData()
  }, [themeKey])
  
  if (loading) {
    return (
      <LoadingWrapper>
        <Spinner />
        <LoadingText>Loading...</LoadingText>
      </LoadingWrapper>
    )
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
  height: 100px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  margin-top: 10px;
  font-size: 1.2rem;
  color: #555;
`;
