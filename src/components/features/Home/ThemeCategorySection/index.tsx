import styled from '@emotion/styled';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useGetThemeCategoryQuery } from '@/apis/tanstackQuery/theme/query';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { ThemeData } from '@/types/index';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection = () => {
  const { data, isLoading, isError } = useGetThemeCategoryQuery();

  const themes = data?.themes;

  console.log(themes);

  return (
    <Wrapper>
      <Container>
        {isLoading ? (
          <LoadingStatus>
            <Spinner animation="border" role="status" variant="secondary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </LoadingStatus>
        ) : isError ? (
          <LoadingStatus>Something Goes Run!</LoadingStatus>
        ) : (
          <Grid
            columns={{
              initial: 4,
              md: 6,
            }}
          >
            {themes?.map((theme: ThemeData) => (
              <Link key={theme.id} to={getDynamicPath.theme(theme.key)}>
                <ThemeCategoryItem image={theme.imageURL || ''} label={theme.label} />
              </Link>
            ))}
          </Grid>
        )}
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

const LoadingStatus = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;
