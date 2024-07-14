import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container/Container';
import { Grid } from '@/components/common/layouts/Grid/Grid';
import ShowError from '@/components/Error/ShowError';
import Loading from '@/components/Loading/Loading';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { Theme } from '@/types/types';
import { fetchData } from '@/utils/api/api';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection = () => {
  const fetchThemes = async (): Promise<Theme[]> => {
    const response = await fetchData(`/api/v1/themes`);
    return response.themes;
  };

  const {
    data: themes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });

  if (isLoading) {
    return Loading();
  }
  if (error) {
    return ShowError((error as Error).message);
  }
  if (!themes || themes?.length === 0) {
    return ShowError('데이터 없음');
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
            <Link key={theme.id} to={getDynamicPath.theme(`${theme.key}`)}>
              <ThemeCategoryItem imageURL={theme.imageURL} label={theme.label} />
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
