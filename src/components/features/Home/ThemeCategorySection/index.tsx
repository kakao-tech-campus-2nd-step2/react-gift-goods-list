import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { useTheme } from '@/hooks/useTheme';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection = () => {
  const { themes } = useTheme();

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
              {typeof theme.imageURL === 'string' && (
                <ThemeCategoryItem image={theme.imageURL} label={theme.label} key={theme.id} />
              )}
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
