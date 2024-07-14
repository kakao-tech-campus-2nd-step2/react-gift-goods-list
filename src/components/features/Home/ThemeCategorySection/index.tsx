import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import axiosInstance from '@/api/axiosInstance';
import { Loading } from '@/api/Loading';
import { NoData } from '@/api/NoData';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { ThemeData } from '@/types';

import { ThemeCategoryItem } from './ThemeCategoryItem';

const fetchThemes = async () => {
  const response = await axiosInstance.get('/api/v1/themes');
  return response.data;
};

export const ThemeCategorySection = () => {
  const { data, isLoading, error } = useQuery<{ themes: ThemeData[] }>('themes', fetchThemes);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <NoData message="An error occurred while fetching data." />;
  }

  if (!data || !Array.isArray(data.themes) || data.themes.length === 0) {
    return <NoData />;
  }

  const { themes } = data;

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
