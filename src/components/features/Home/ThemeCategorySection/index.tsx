import { fetchThemesFromAPI } from '@/api/api';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { ThemeData } from '@/types/index';
import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection = () => {
  const [themes, setThemes] = useState<ThemeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const fetchedThemes = await fetchThemesFromAPI();
        console.log('API response:', fetchedThemes);
        setThemes(fetchedThemes);
      } catch (error) {
        console.error('Error fetching themes:', error);
        setFetchError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (fetchError) return <div>Error loading themes</div>;

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
            <Link key={theme.id} to={getDynamicPath.theme(theme.key)}>
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
