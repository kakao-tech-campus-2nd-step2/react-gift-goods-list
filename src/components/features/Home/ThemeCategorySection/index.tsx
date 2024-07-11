import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { ThemeCategoryItem } from './ThemeCategoryItem';
import LoadingSpinner from '@/components/common/Loading';

import { ThemeData } from '@/types';
import { getData } from '@/api';
import { useEffect, useState } from 'react';

interface ThemeResponse {
  themes: ThemeData[];
}

export const ThemeCategorySection = () => {
  const [themeData, setThemeData] = useState<ThemeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getThemeData = async () => {
      try {
        const data = await getData<ThemeResponse>('/api/v1/themes');
        setThemeData(data.themes);
      } catch (error) {
        console.error('Error fetching theme data:', error);
      } finally {
        setLoading(false);
      }
    };

    getThemeData();
  }, [])

  return (
    <Wrapper>
      <Container>
        {loading ?
          <LoadingSpinner /> :
          <Grid
            columns={{
              initial: 4,
              md: 6,
            }}
          >
            {themeData.map((themeItem) => (
              <Link key={themeItem.key} to={getDynamicPath.theme(themeItem.key)}>
                <ThemeCategoryItem
                  image={themeItem.imageURL}
                  label={themeItem.label}
                />
              </Link>
            ))}
          </Grid>
        }
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
