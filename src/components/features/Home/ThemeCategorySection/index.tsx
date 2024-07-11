import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { Message } from '@/styles';
import { breakpoints } from '@/styles/variants';
import type { FetchState } from '@/types';
import { BASE_URL, type ThemeData } from '@/types';

import { ThemeCategoryItem } from './ThemeCategoryItem';

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
      }
    };
    fetchThemeData();
  }, []);

  if (fetchState.isLoading) {
    return <Message>로딩 중...</Message>;
  }

  if (fetchState.isError) {
    return <Message>데이터를 불러오는 중에 문제가 발생했습니다.</Message>;
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
