import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import { type ThemeData } from '@/types';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection = () => {
  const [themes, setThemes] = useState<ThemeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>();

  const url = 'https://react-gift-mock-api-two.vercel.app/api/v1/themes';
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setThemes(res.data.themes);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching themes:', err);
        setError(err); // 에러 메시지 설정
      })
      .finally(() => {
        setLoading(false); // 로딩 상태 해제
      });
  }, []);

  if (loading)
    return (
      <Container>
        <div>데이터를 로딩중입니다.</div>
      </Container>
    );
  if (error)
    return (
      <Container>
        <div>Error: {error}</div>
      </Container>
    );
  if (themes.length === 0)
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
