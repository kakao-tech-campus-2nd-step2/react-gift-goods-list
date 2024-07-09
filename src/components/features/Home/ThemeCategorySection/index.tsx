import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import Api from '../../../common/API/api';
import { ThemeCategoryItem } from './ThemeCategoryItem';

interface ThemeData {
  id: number;
  key: string;
  label: string;
  title: string;
  description: string;
  backgroundColor: string;
}

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
}

export const ThemeCategorySection: React.FC = () => {
  const [fetchState, setFetchState] = useState<FetchState<ThemeData[]>>({
    isLoading: true,
    isError: false,
    data: null,
  });

  useEffect(() => {
    const fetchThemes = async () => {
      setFetchState({ isLoading: true, isError: false, data: null });
      try {
        const response = await Api.get<{ themes: ThemeData[] }>('/api/v1/themes');
        //console.log('API response:', response.data);
        setFetchState({ isLoading: false, isError: false, data: response.data.themes });

      } catch (error) {
        console.error('Error fetching themes:', error);
        setFetchState({ isLoading: false, isError: true, data: null });
      }
    };

    fetchThemes();
  }, []);

  if (fetchState.isLoading) return <p>Loading...</p>;
  if (fetchState.isError) return <p>Failed to fetch themes</p>;

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
            <Link to={getDynamicPath.theme(theme.key)} key={theme.id}>
              <ThemeCategoryItem
                image="https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png"
                label={theme.label}
              />
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

export default ThemeCategorySection;