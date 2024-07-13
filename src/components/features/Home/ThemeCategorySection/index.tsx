import styled from '@emotion/styled';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import { BASE_URL, type ThemeData } from '@/types';

import { ThemeCategoryItem } from './ThemeCategoryItem';

const fetchThemeCategories = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/v1/themes`);
  return data.themes;
};

export const ThemeCategorySection = () => {
  const { data, isLoading, isError } = useQuery<ThemeData[]>(['ThemeData'], fetchThemeCategories);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
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
          {data?.map((theme) => (
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
