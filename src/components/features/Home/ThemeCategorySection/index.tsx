import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import useFetch from '@/apis/useFetch';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { ThemeCategoryItem } from './ThemeCategoryItem';

interface Theme {
  id: number;
  key: string;
  label: string;
  imageURL: string;
  title: string;
  description?: string;
  backgroundColor: string;
}

interface ThemesResponse {
  themes: Theme[];
}
export const ThemeCategorySection = () => {
  const initialThemes = { themes: [] };
  const { data, status } = useFetch<ThemesResponse>('/api/v1/themes', initialThemes);

  let currentStatus;

  if (status.loading) currentStatus = <div>로딩중...</div>;
  if (status.error) currentStatus = <div>에러에러</div>;

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
        >
          {currentStatus}
          {data.themes.map((theme: Theme) => {
            return (
              <Link to={getDynamicPath.theme(theme.key)} key={theme.id}>
                <ThemeCategoryItem image={theme.imageURL} label={theme.label} />
              </Link>
            );
          })}
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
