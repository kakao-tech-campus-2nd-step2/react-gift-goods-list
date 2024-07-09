import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { ThemeCategoryItem } from './ThemeCategortItem';

import { Container } from '@/components/common/Layout/Container';
import { Grid } from '@/components/common/Layout/Grid';
import { useThemes } from '@/services/useThemes';

export const ThemeCategory = () => {
  const { isLoading, isError, data } = useThemes();
  const ThemeCategoryList = data?.themes ?? [];

  if (isLoading || isError) {
    return null;
  }

  return (
    <ThemeWrapper>
      <Container flexDirection="row" alignItems="center" justifyContent="center" maxWidth="1024px">
        <Grid columns={{ init: 4, xs: 4, lg: 6 }} gap={60}>
          {ThemeCategoryList.map((theme) => (
            <Link to={`theme/${theme.key}`} key={theme.id}>
              <ThemeCategoryItem src={theme.imageURL} title={theme.label} />
            </Link>
          ))}
        </Grid>
      </Container>
    </ThemeWrapper>
  );
};

const ThemeWrapper = styled.div`
  width: 100%;
  padding: 40px 20px;
  padding-top: 70px;
`;
