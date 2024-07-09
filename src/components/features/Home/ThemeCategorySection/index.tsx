import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { ThemeCategoryItem } from './ThemeCategoryItem';

type ThemeProps = {
  id: number;
  key: string;
  label: string;
  title: string;
  description: string;
  backgroundColor: string;
  imageURL: string;
};

export const ThemeCategorySection = () => {
  const [themes, setThemes] = useState<ThemeProps[]>();
  const url = 'https://react-gift-mock-api-two.vercel.app/api/v1/themes';

  useEffect(() => {
    axios.get(url).then((response) => {
      setThemes(response.data.themes);
      console.log(response.data.themes);
    });
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
          {themes &&
            themes.map((theme) => (
              <Link to={getDynamicPath.theme(theme.key)}>
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
