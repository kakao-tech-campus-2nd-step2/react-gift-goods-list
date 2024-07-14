import styled from '@emotion/styled';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { ThemeCategoryItem } from './ThemeCategoryItem';

interface Theme {
  id: number;
  key: string;
  label: string;
  imageURL: string;
}

const fetchThemes = async (): Promise<Theme[]> => {
  const { data } = await axios.get(
    'https://react-gift-mock-api-daeun0726.vercel.app/api/v1/themes',
  );
  return data.themes;
};

export const ThemeCategorySection = () => {
  const { data, isError, isLoading } = useQuery<Theme[]>('themes', fetchThemes);

  if (isLoading) {
    return (
      <LoadingWrapper>
        <LoadingSpinner />
        <p>Loading...</p>
      </LoadingWrapper>
    );
  }

  if (isError) {
    return (
      <ErrorWrapper>
        <ErrorMessage>Error loading data.</ErrorMessage>
      </ErrorWrapper>
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
          {data && data.length > 0 ? (
            data.map((theme) => (
              <Link key={theme.key} to={getDynamicPath.theme(theme.key)}>
                <ThemeCategoryItem image={theme.imageURL} label={theme.label} />
              </Link>
            ))
          ) : (
            <NoDataWrapper>No themes available.</NoDataWrapper>
          )}
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
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  animation: spin 1s ease infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 18px;
  margin-bottom: 20px;
`;

const NoDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 18px;
  color: gray;
`;
