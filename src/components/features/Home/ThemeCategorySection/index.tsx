import styled from '@emotion/styled';
import type { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import ErrorMessage from '@/components/common/Status/errorMessage';
import Loading from '@/components/common/Status/loading';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { fetchData } from '../../../common/API/api';
import { ThemeCategoryItem } from './ThemeCategoryItem';


interface ThemeData {
  id: number;
  key: string;
  label: string;
  title: string;
  description: string;
  backgroundColor: string;
  imageURL?: string;
}

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  errorCode?: string;
  errorMessage?: string;
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
        const data = await fetchData('/api/v1/themes');
        setFetchState({ isLoading: false, isError: false, data: data.themes });
      } catch (error) {
        const axiosError = error as AxiosError;
        setFetchState({
          isLoading: false,
          isError: true,
          data: null,
          errorCode: axiosError.code,
          errorMessage: axiosError.message,
        });
      }
    };

    fetchThemes();
  }, []);

  if (fetchState.isLoading)
    return <Loading />;
  if (fetchState.isError)
    return (
      <ErrorMessage
        code={fetchState.errorCode}
        message={fetchState.errorMessage || '데이터를 불러오는 중에 문제가 발생했습니다.'}
      />
    );


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
                image={theme.imageURL || "https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png"}
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
