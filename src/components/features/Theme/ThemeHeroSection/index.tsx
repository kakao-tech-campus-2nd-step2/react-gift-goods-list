import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { Container } from '@/components/common/layouts/Container';
import { Message } from '@/styles';
import { breakpoints } from '@/styles/variants';
import { BASE_URL, type ThemeData } from '@/types';

type Props = {
  themeKey: string;
};

const fetchThemeHeader = async (): Promise<ThemeData[]> => {
  const { data } = await axios.get(`${BASE_URL}/api/v1/themes`);
  return data.themes;
};

const getCurrentTheme = (themeKey: string, themeList: ThemeData[] | undefined) => {
  return themeList?.find((theme) => theme.key === themeKey);
};

export const ThemeHeroSection = ({ themeKey }: Props) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeData | undefined>();
  const { data, isLoading, isError } = useQuery<ThemeData[]>(
    ['ThemeData', themeKey],
    fetchThemeHeader,
  );

  useEffect(() => {
    if (data) {
      const theme = getCurrentTheme(themeKey, data);
      setCurrentTheme(theme);
    }
  }, [data, themeKey]);

  if (isLoading) {
    return <Message>Loading...</Message>;
  }

  if (isError) {
    return <Message>데이터를 불러오는 중에 문제가 발생했습니다.</Message>;
  }

  if (!currentTheme) {
    return null;
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
