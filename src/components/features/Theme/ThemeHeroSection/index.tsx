import styled from '@emotion/styled';
import { useEffect,useState } from 'react';

import { fetchThemes } from '@/api/api';
//import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { ThemeData } from '@/types';


type Props = {
  themeKey: string;
};

export const ThemeHeroSection = ({ themeKey }: Props) => {

  const [currentTheme, setCurrentTheme] = useState<ThemeData | null> (null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getTheme = async () => {
      try {
        const response = await fetchThemes()
        const theme = getCurrentTheme(themeKey, response.themes)
        setCurrentTheme(theme || null)
      } catch(err) {
        console.error('Failed to load themes', err)
      } finally {
        setLoading(false)
      }
    }
    getTheme()
  }, [themeKey])

  if (loading) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }


  if (!currentTheme) {
    return null;
  }

  const { backgroundColor = '#333', label, title, description } = currentTheme;

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
  padding: 20px;
  text-align: center;
`;

export const getCurrentTheme = (themeKey: string, themeList: ThemeData[]): ThemeData | undefined => {
  return themeList.find((theme) => theme.key === themeKey);
};
