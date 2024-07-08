import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getThemes } from '@/libs/api';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { ThemesData } from '@/types';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection = () => {
  const [themes, setThemes] = useState<ThemesData[]>([]);
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const data = await getThemes();
        setThemes(data.themes);
      } catch (error) {
        console.error('Failed to fetch themes:', error);
      }
    };

    fetchThemes();
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
          {themes.map((theme) => (
            <Link key={theme.key} to={getDynamicPath.theme(theme.key)}>
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
