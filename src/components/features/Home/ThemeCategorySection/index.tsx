import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getThemes } from 'src/api/themeApi';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { Theme } from '@/types/api';

import { ThemeCategoryItem } from './ThemeCategoryItem';


export const ThemeCategorySection = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const data = await getThemes();
        setThemes(data.themes);
      } catch (error) {
        console.error('Error fetching themes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
            <Link key={theme.id} to={`/theme/${theme.key}`}>
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
export { getThemes };

