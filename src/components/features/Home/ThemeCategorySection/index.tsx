import styled from '@emotion/styled';
import { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';

import apiClient from '@/api/index';
import type { GetThemesResponse, ThemeData } from '@/api/types/apiTypes';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection = () => {

  const [themeCategory, setThemeCategory] = useState<ThemeData[]>([]);
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await apiClient.get<GetThemesResponse>('/api/v1/themes');
        setThemeCategory(response.data.themes);
      } catch (error) {
        console.error(error);
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
          {themeCategory.map((theme) => {
            return (
              <Link
                key={theme.id}
                to={getDynamicPath.theme(theme.key)}
              >
                <ThemeCategoryItem image={theme.imageURL} label={theme.label}/>
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
