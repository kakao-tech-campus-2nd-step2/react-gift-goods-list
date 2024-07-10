import styled from '@emotion/styled';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axiosInstance from '@/api/axiosInstance';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { ThemeCategoryItem } from './ThemeCategoryItem';

type Theme = {
  key: string;
  imageURL: string;
  label: string;
}

export const ThemeCategorySection = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTheme = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get('/api/v1/themes');
      console.log('Fetch themes: ', response.data.themes);
      setThemes(response.data.themes);
    } catch (err: unknown) {
      console.error(err);
      if (isAxiosError(err)) {
        // 서버가 상태 코드를 응답한 경우
        if (err.response) {
          switch (err.response.status) {
            case 404:
              setError('Themes not found');
              break;
            case 500:
              setError('Internal server error');
              break;
            default:
              setError('An unexpected error occurred');
          }
        } else if (err.request) {
          // 요청이 만들어졌지만 응답을 받지 못한 경우
          setError('Network error');
        }
      } else {
        // 다른 에러인 경우
        setError('Failed to fetch themes');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheme();
  }, []);

  if (loading) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  if (error) {
    return <ErrorWrapper>{error}</ErrorWrapper>;
  }

  if (themes.length === 0) {
    return <NoDataWrapper>No themes available</NoDataWrapper>;
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
            <Link key={theme.key} to={getDynamicPath.theme(theme.key)}>
              <ThemeCategoryItem
                image={theme.imageURL}
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

const LoadingWrapper = styled.div`
  padding: 20px;
  text-align: center;
`;

const ErrorWrapper = styled.div`
  padding: 20px;
  text-align: center;
  color: red;
`;

const NoDataWrapper = styled.div`
  padding: 20px;
  text-align: center;
`;
