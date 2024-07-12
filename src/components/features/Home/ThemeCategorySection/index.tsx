import styled from '@emotion/styled';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { BASE_URL } from '@/constants';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { ThemeData } from '@/types';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const fetchThemeCategory = async () => {
  const response = await axios.get(`${BASE_URL}api/v1/themes`)
  return response.data.themes
}

/*
  useQuery hooks 는 다음과 같은 객체 반환
  {
    data?: TData,                // 쿼리 데이터
    error?: Error,               // 에러 객체 (에러가 없으면 undefined)
    isError: boolean,            // 에러 여부를 나타내는 불리언 값
    isLoading: boolean,          // 데이터 로딩 중 여부를 나타내는 불리언 값
    isSuccess: boolean,          // 데이터 요청 성공 여부를 나타내는 불리언 값
    refetch: (options?) => void, // 쿼리 재요청 함수
    remove: () => void,          // 쿼리 제거 함수
  }
*/

export const ThemeCategorySection = () => {
  const { data, isError, isLoading } = useQuery<ThemeData[]>(['ThemeData'], fetchThemeCategory) 

  if (isError) {
    return (
      <ErrorWrapper>
        <ErrorText>데이터를 불러오는 중 오류가 발생하였습니다.</ErrorText>
      </ErrorWrapper>
    );
  }

  if (isLoading) {
    return (
      <LoadingWrapper>
        <Spinner />
        <LoadingText>Loading...</LoadingText>
      </LoadingWrapper>
    );
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
          {data?.map((theme) => (
            // 각 Theme Detail Page로 이동할 링크
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

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

const ErrorText = styled.div`
  font-size: 1.5rem;
  color: #ff6347;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  margin-top: 10px;
  font-size: 1.2rem;
  color: #555;
`;


