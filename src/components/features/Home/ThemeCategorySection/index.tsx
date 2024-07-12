import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import { BASE_URL, type ThemeData } from '@/types';

import { ThemeCategoryItem } from './ThemeCategoryItem';

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
}

export const ThemeCategorySection = () => {
  const [fetchState, setFetchState] = useState<FetchState<ThemeData[]>>({
    isLoading: true,
    isError: false,
    data: null,
  });

  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/themes`);
        setFetchState({ isLoading: false, isError: false, data: res.data.themes });
      } catch (err) {
        console.error('Error Fetching ThemeData', err);
        setFetchState({ isLoading: false, isError: true, data: null });

        if (axios.isAxiosError(err)) {
          switch (err.response?.status) {
            case 400:
              console.error('Bad Request');
              break;
            case 404:
              console.error('Not Found');
              break;
            case 500:
              console.error('Internal Server Error');
              break;
            default:
              console.error(`Unknown Error ${err.response?.status}`);
              break;
          }
        }
      }
    };
    fetchThemeData();
  }, []);

  if (fetchState.isLoading) {
    return <div>Loading...</div>;
  }

  if (fetchState.isError) {
    return <div>Error loading data</div>;
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
          {fetchState.data?.map((theme) => (
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
