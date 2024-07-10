import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchThemes } from '@/api/themes';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { Message } from '@/components/common/Message';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { ThemeData } from '@/types/api';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection = () => {
  const [themes, setThemes] = useState<ThemeData[]>([]);

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getThemes = async () => {
      setLoading(true);
      setIsError(false);

      try {
        const themesData = await fetchThemes();
        setThemes(themesData);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };

    getThemes();
  }, []);

  return (
    <Wrapper>
      <Container>
      {loading && <Message>로딩중</Message>}
        {!loading && isError && <Message>데이터를 불러오는 중에 문제가 발생했습니다.</Message>}
        {!loading && !isError && themes.length === 0 && <Container><Message>보여줄 상품이 없어요!</Message></Container>}
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
        >
          {themes.map((theme) => (
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
