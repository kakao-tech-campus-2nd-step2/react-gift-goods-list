import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getThemes } from '@/api';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { ThemeCategoryItem } from './ThemeCategoryItem';

interface Theme {
  key: string;
  label: string;
  image: string;
}

export const ThemeCategorySection = () => {
  const [themes, setThemes] = useState<Theme[]>([]);

  useEffect(() => {
    const fetchThemesData = async () => {
      try {
        const themesData = await getThemes();
        const formattedThemes = themesData.map(theme => ({
          key: theme.key,
          label: theme.label,
          image: theme.imageURL,
        }));
        setThemes(formattedThemes);
      } catch (error) {
        console.error('Error fetching themes:', error);
      }
    };

    fetchThemesData();
  }, []);

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
        >
          {themes.map((theme, index) => (
            <Link key={index} to={getDynamicPath.theme(theme.key)}>
              <ThemeCategoryItem
                image={theme.image}
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

export default ThemeCategorySection;