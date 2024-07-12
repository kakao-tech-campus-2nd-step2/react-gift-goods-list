import { Link } from 'react-router-dom';

import { ThemeCategoryItem } from './ThemeCategoryItem';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { useThemeContext } from '@/provider/Theme/ThemeProvider';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import styled from '@emotion/styled';

export const ThemeCategorySection = () => {
  const { themes } = useThemeContext();

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
        >
          {themes.map((data) => (
            <Link to={getDynamicPath.theme(data.key)} key={data.id}>
              <ThemeCategoryItem image={data.imageURL} label={data.label} />
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
