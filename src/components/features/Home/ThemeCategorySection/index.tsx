import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchThemes } from 'src/api/themes';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { ThemeData } from '@/types';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection = () => {
  const [themes, setThemes] = useState<ThemeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getThemes = async () => {
      try {
        const data = await fetchThemes();
        console.log('Fetched themes:', data); // 응답 데이터 구조 확인
        setThemes(data.themes ?? []); // If data.themes is undefined, set to empty array
      } catch (err) {
        console.error('Error fetching themes:', err);
        setError('Error loading themes');
      } finally {
        setIsLoading(false);
      }
    };

    getThemes();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
        >
          {themes && themes.length > 0 ? (
            themes.map(theme => (
              <Link key={theme.id} to={getDynamicPath.theme(theme.key)}>
                <ThemeCategoryItem
                  image={theme.imageURL}
                  label={theme.label}
                />
              </Link>
            ))
          ) : (
            <div>No themes available</div>
          )}
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
