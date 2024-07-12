import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { ThemeData } from '@/types';
import apiClient from '@/utils/api';

const fetchThemeData = async (themeKey: string) => {
  const response = await apiClient.get<{ themes: ThemeData[] }>('/themes');
  return response.data.themes.find((theme) => theme.key === themeKey);
};

export const HeroSection = () => {
  const { themeKey } = useParams<{ themeKey: string }>();

  const {
    data: theme,
    isLoading,
    isError,
  } = useQuery(['theme', themeKey], () => fetchThemeData(themeKey!), {
    enabled: !!themeKey,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !theme) {
    return <Navigate to={RouterPath.home} />;
  }

  return (
    <SectionWrapper backgroundColor={theme.backgroundColor}>
      <Container>
        <Label>{theme.label}</Label>
        <Title>{theme.title}</Title>
        {theme.description && <Description>{theme.description}</Description>}
      </Container>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.section<{ backgroundColor: string }>`
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
