import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { ThemeCategoryItem } from './ThemeCategoryItem';

interface ThemeCategoryAPI {
  backgroundColor: string;
  description: string;
  id: number;
  imageURL: string;
  key: string;
  label: string;
  title: string;
}
export const ThemeCategorySection = () => {
  const [themeCategory, setThemeCategory] = useState<ThemeCategoryAPI[]>();
  useEffect(() => {
    const fetchThemes = async () => {
      const response = await axios.get(process.env.REACT_APP_API_KEY + '/api/v1/themes');
      setThemeCategory(response.data.themes);
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
          {themeCategory?.map((theme) => (
            <Link to={getDynamicPath.theme(theme.key)} key={theme.key}>
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
