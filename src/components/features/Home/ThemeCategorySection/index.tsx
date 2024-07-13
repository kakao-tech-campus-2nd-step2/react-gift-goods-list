import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
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
};

const fetchThemes = async (): Promise<Theme[]> => {
  const response = await axiosInstance.get('/api/v1/themes');
  return response.data.themes;
};

export const ThemeCategorySection = () => {
  const { data, error, isLoading } = useQuery<Theme[], Error>({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });

  if (isLoading) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  if (error) {
    let errorMessage: string;
    if (isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            errorMessage = 'Themes not found';
            break;
          case 500:
            errorMessage = 'Internal server error';
            break;
          default:
            errorMessage = 'An unexpected error occurred';
        }
      } else {
        errorMessage = 'Network error';
      }
    } else {
      errorMessage = 'Failed to fetch themes';
    }
    return <ErrorWrapper>{errorMessage}</ErrorWrapper>;
  }

  const themes = Array.isArray(data) ? data : [];

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
