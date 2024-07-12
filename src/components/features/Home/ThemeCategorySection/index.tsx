import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { fetchThemes } from '@/api/fetchThemes';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { ThemeData } from '@/types';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection = () => {
  const { data: themes } = useQuery<ThemeData[]>({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
        >
          {themes?.map((theme) => (
            <Link to={getDynamicPath.theme(theme.key)} key={theme.id}>
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
