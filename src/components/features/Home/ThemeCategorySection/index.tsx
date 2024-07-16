import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import { type ThemeData } from '@/types';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection = () => {
  const url = 'https://react-gift-mock-api-two.vercel.app/api/v1/themes';

  const fetchData = () => {
    return axios.get(url).then((res) => {
      return res.data.themes;
    });
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['fetchThemeCategory'],
    queryFn: fetchData, //api 함수
  });

  if (isLoading) {
    return (
      <Container>
        <div>데이터를 로딩중입니다.</div>
      </Container>
    );
  }

  if (isError) {
    if (error instanceof Error) {
      return (
        <Container>
          <div>Error: {error.message}</div>
        </Container>
      );
    }
  }
  if (data.length === 0)
    return (
      <Container>
        <div>데이터가 존재하지 않습니다.</div>
      </Container>
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
          {data.map((theme: ThemeData) => (
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
