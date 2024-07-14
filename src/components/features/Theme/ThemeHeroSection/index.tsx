import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { fetchThemes } from '@/api/themes';
import { Container } from '@/components/common/layouts/Container';
import { Loading, LoadingContainer } from '@/components/common/Loading';
import { Message } from '@/components/common/Message';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { ThemeData } from '@/types/api';

type Props = {
  themeKey: string;
};

export const ThemeHeroSection = ({ themeKey }: Props) => {
  const navigate = useNavigate();
  const { data, isError, isLoading } = useQuery('themes', fetchThemes);

  if (isLoading) {
    return <LoadingContainer><Loading /></LoadingContainer>;
  }

  if (isError) {
    return <Message>데이터를 불러오는 중에 문제가 발생했습니다.</Message>;
  }

  const currentTheme = data?.find((theme: ThemeData) => theme.key === themeKey);

  if (!currentTheme) {
    navigate(RouterPath.home);
    return null;
  }

  return (
    <Wrapper backgroundColor={currentTheme.backgroundColor!}>
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

export const getCurrentTheme = (themeKey: string, themeList: ThemeData[]) => {
  return themeList.find((theme) => theme.key === themeKey);
};
