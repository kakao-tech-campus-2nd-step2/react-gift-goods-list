import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { ThemeData } from '@/types';

import { ThemeCategoryItem } from './ThemeCategoryItem';
export const ThemeCategorySection = () => {
  const fetchThemes = async () => {
    const response = await axios.get(process.env.REACT_APP_API_KEY + '/api/v1/themes');
    return response.data.themes;
  };

  const { data } = useQuery<ThemeData[]>({ queryKey: ['themes'], queryFn: fetchThemes });

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
        >
          {data?.map((theme) => (
              <Link
              to={getDynamicPath.theme(theme.key)}
              state={{
                label: theme.label,
                title: theme.title,
                description: theme.description,
                backgroundColor: theme.backgroundColor,
              }}
              key={theme.key}
            >
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