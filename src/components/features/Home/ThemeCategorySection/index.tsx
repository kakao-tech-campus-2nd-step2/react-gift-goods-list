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

  useEffect(() => {
    const getThemes = async () => {
      try {
        const themesData = await fetchThemes(); // API 호출로 테마 데이터를 가져옴
        setThemes(themesData); // 테마 데이터를 상태에 설정
      } catch (error) {
        console.error('Failed to fetch themes:', error); // 에러 발생 시 콘솔에 출력
      } finally {
        setIsLoading(false); // 데이터 로딩이 완료되면 로딩 상태를 false로 설정
      }
    };

    getThemes();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <Wrapper>
      <Container>
        {isLoading ? (
          <Loading /> // 로딩 중일 때 로딩 컴포넌트 표시
        ) : (
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
        )}
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
