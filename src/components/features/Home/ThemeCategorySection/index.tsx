import styled from '@emotion/styled';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { API_ENDPOINT } from '@/api/constants/apiPath';
import { fetchData } from '@/api/fetchData';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { GetThemeListResponse, ThemeList } from '@/types';

import { ThemeCategoryItem } from './ThemeCategoryItem';

const fetchThemeList = async () => {
  const { data } = await fetchData<GetThemeListResponse>(API_ENDPOINT.THEMES);
  return data.themes;
};

export const ThemeCategorySection = () => {
  const { data } = useSuspenseQuery<ThemeList[]>({
    queryKey: ['themeList'],
    queryFn: () => fetchThemeList(),
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
          {data.map((theme) => (
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
