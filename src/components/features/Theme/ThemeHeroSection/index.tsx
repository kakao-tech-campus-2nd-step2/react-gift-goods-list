import styled from '@emotion/styled';
import type { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Loader } from '@/components/common/Spinner';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { ThemeData } from '@/types';
import apiClient from '@/utils/api';

const fetchThemeInfo = async (themeKey: string) => {
  const response = await apiClient.get<{ themes: ThemeData[] }>('/themes');
  return response.data.themes.find((theme) => theme.key === themeKey);
};

export const ThemeHeader = () => {
  const { themeKey } = useParams<{ themeKey: string }>();

  const {
    data: theme,
    isLoading,
    isError,
    error,
  } = useQuery(['theme', themeKey], () => fetchThemeInfo(themeKey!), {
    enabled: !!themeKey,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    const axiosError = error as AxiosError;
    const errorMessage =
      axiosError.response?.status === 404 ? '테마를 찾을 수 없습니다.' : '오류가 발생했습니다.';
    return <div>{errorMessage}</div>;
  }

  if (!theme) {
    return <Navigate to={RouterPath.home} />;
  }

  return (
    <HeaderWrapper backgroundColor={theme.backgroundColor}>
      <Container>
        <HeaderLabel>{theme.label}</HeaderLabel>
        <HeaderTitle>{theme.title}</HeaderTitle>
        {theme.description && <HeaderDescription>{theme.description}</HeaderDescription>}
      </Container>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.section<{ backgroundColor: string }>`
  padding: 27px 20px 23px;
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 50px 20px;
  }
`;

const HeaderLabel = styled.p`
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.7);

  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 20px;
    line-height: 24px;
  }
`;

const HeaderTitle = styled.h1`
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

const HeaderDescription = styled.p`
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
