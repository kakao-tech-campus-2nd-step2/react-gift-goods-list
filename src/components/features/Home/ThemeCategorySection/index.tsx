import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { fetchThemes } from '@/api/api';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { ThemeData } from '@/types';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection = () => {
  const { data: themes, isLoading, isError } = useQuery<ThemeData[], Error>('themes', fetchThemes);

  if (isLoading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (isError) {
    return <ErrorMessage>에러가 발생했습니다.</ErrorMessage>;
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
          {themes && themes.map((theme, index) => (
            <Link key={`${theme.id}-${index}`} to={getDynamicPath.theme(theme.key)}>
              <ThemeCategoryItem
                image={theme.imageURL}
                label={theme.label}
              />
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

const LoadingMessage = styled.div`
  color: #0070f3;
  text-align: center;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  margin-top: 20px;
`;