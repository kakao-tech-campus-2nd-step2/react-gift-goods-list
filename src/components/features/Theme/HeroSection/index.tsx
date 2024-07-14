import styled from '@emotion/styled';
import { useQuery } from 'react-query';

import axiosInstance from '@/api/axiosInstance';
import { Loading } from '@/api/Loading';
import { NoData } from '@/api/NoData';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { ThemeData } from '@/types';

type Props = {
  themeKey: string;
};

const fetchThemes = async () => {
  const response = await axiosInstance.get('/api/v1/themes');
  return response.data;
};

export const HeroSection = ({ themeKey }: Props) => {
  const { data, isLoading, error } = useQuery<{ themes: ThemeData[] }>('themes', fetchThemes);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <NoData message="An error occurred while fetching data." />;
  }

  if (!data || !Array.isArray(data.themes)) {
    return <NoData />;
  }

  const currentTheme = data.themes.find((theme) => theme.key === themeKey);

  if (!currentTheme) {
    return <NoData />;
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
