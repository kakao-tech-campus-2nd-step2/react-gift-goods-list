import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { fetchThemes } from '../../../../api/Api';
import { ThemeCategoryItem } from './ThemeCategoryItem';

interface Theme {
  id: string;
  key: string;
  label: string;
  imageURL: string;
}

export const ThemeCategorySection = () => {
  const [categories, setCategories] = useState<Theme[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchThemes();
        setCategories(data.themes);
      } catch (err) {
        console.error('Error fetching theme categories:', err);
      }
    };
    fetchCategories();
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
          {categories &&
            categories.map((theme) => (
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
