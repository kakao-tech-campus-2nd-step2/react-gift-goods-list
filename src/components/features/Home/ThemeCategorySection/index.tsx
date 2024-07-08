import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { ThemeCategoryItem } from './ThemeCategoryItem';

interface Theme {
  id: number;
  key: string;
  label: string;
  imageURL: string;
}

export const ThemeCategorySection = () => {
  const [themeList, setThemeList] = useState<Theme[]>([]);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await axios.get(
          'https://react-gift-mock-api-daeun0726.vercel.app/api/v1/themes',
        );
        setThemeList(response.data.themes);
        console.log('themeList:', themeList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTheme();
  }, [themeList]);

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
        >
          {themeList.map((theme) => (
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
