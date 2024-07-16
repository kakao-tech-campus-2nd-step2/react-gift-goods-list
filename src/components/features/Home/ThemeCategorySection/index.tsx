import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { fetchThemes } from '@/api/theme';
import { DataWrapper } from '@/components/common/DataWrapper';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { ThemesResponse } from '@/types/index';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection = () => {
  return (
    <Wrapper>
      <Container>
        <DataWrapper<ThemesResponse> queryKey="themes" queryFn={fetchThemes}>
          {(data) => (
            <Grid
              columns={{
                initial: 4,
                md: 6,
              }}
            >
              {data.themes.map((theme) => (
                <Link key={theme.id} to={getDynamicPath.theme(theme.key)}>
                  <ThemeCategoryItem image={theme.imageURL} label={theme.label} />
                </Link>
              ))}
            </Grid>
          )}
        </DataWrapper>
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
