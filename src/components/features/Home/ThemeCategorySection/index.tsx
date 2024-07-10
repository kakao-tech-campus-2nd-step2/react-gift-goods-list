import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { ThemeCategoryItem } from './ThemeCategoryItem';

import { useFetchThemes } from '@/api/customHook';

export const ThemeCategorySection = () => {
  const { data: themes, loading, error } = useFetchThemes();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
        >
          {themes &&
            themes.map((theme) => (
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
