import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { useGetThemes } from '@/api';
import type { ThemeData } from '@/api/type';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection = () => {
  const { data: themesResponse } = useGetThemes();
  const themes = themesResponse?.data?.themes;

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
        >
          {themes?.map((theme: ThemeData) => (
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
