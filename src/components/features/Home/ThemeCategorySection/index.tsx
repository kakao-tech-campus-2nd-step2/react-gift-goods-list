import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchThemes } from '@/api/api';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { Loading } from '@/components/common/Loading';
import { breakpoints } from '@/styles/variants';
import type { ThemesResponse } from '@/types';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection = () => {
  const [themes, setThemes] = useState<ThemesResponse['themes']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchThemes(setError); // API 호출로 테마 데이터를 가져옴
        setThemes(data); // 테마 데이터를 상태에 설정
        setError(null); // 에러 상태 초기화
      } catch (err) {
        console.error(err); // 에러 발생 시 콘솔에 출력
        setError('테마 데이터를 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.'); // 에러 메시지 상태 업데이트
      } finally {
        setIsLoading(false); // 데이터 로딩이 완료되면 로딩 상태를 false로 설정
      }
    };

    fetchData();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행


  if (isLoading) {
    return <Loading />; // 로딩 중일 때
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>; // 에러 발생 시
  }

  if (themes.length === 0) {
    return <EmptyMessage>테마 목록이 비어있습니다.</EmptyMessage>;
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
            {themes.map((theme) => (
              <Link key={theme.id} to={`/theme/${theme.key}`}>
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

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-size: 20px;
  padding: 20px;
  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 35px;
    padding: 30px;
  }
`;

const EmptyMessage = styled.p`
  color: #555;
  text-align: center;
  font-size: 20px;
  padding: 20px;
  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 35px;
    padding: 30px;
  }
`;
