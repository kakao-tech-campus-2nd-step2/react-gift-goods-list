import styled from '@emotion/styled';
import type { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { Loader } from '@/components/common/Spinner';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import apiClient from '@/utils/api';

import { ThemeCategoryItem } from './ThemeCategoryItem';

type ThemeInfo = {
  id: number;
  key: string;
  label: string;
  title: string;
  description?: string;
  backgroundColor: string;
  imageURL: string;
};

const fetchThemeCategories = async () => {
  const response = await apiClient.get<{ themes: ThemeInfo[] }>('/themes');
  return response.data.themes;
};

export const ThemeCategorySection = () => {
  const {
    data: themes,
    isLoading,
    isError,
    error,
  } = useQuery('themeCategories', fetchThemeCategories);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    const axiosError = error as AxiosError;
    const errorMessage =
      axiosError.response?.status === 404 ? '테마를 찾을 수 없습니다.' : '오류가 발생했습니다.';
    return <div>{errorMessage}</div>;
  }

  if (!themes || themes.length === 0) {
    return <div>테마가 없어요.</div>;
  }

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
        >
          {themes.map((theme) => (
            <Link key={theme.id} to={getDynamicPath.theme(theme.key)}>
              <ThemeCategoryItem image={theme.imageURL} label={theme.label} />
            </Link>
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 14px 14px 3px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 45px 52px 23px;
  }
`;
