import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchThemes } from '@/api/api';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { ThemeData } from '@/types';

type Props = {
  themeKey: string;
};

export const ThemeHeroSection = ({ themeKey }: Props) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getTheme = async () => {
      try {
        const themes = await fetchThemes();
        const foundTheme = themes.find((theme: ThemeData) => theme.key === themeKey);
        if (!foundTheme) {
          navigate('/');
          return;
        }
        setCurrentTheme(foundTheme);
      } catch (error) {
        console.error('Failed to fetch themes:', error);
        navigate('/');
      }
    };

    getTheme();
  }, [themeKey, navigate]);

  if (!currentTheme) {
    return null;
  }

  const { backgroundColor, label, title, description } = currentTheme;

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
