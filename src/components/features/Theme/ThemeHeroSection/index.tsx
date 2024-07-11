import styled from '@emotion/styled';
import type { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchData } from '@/components/common/API/api';
import { Container } from '@/components/common/layouts/Container';
import ErrorMessage from '@/components/common/Status/errorMessage';
import Loading from '@/components/common/Status/loading';
import { breakpoints } from '@/styles/variants';

interface ThemeData {
  id: number;
  key: string;
  label: string;
  title: string;
  description: string;
  backgroundColor: string;
}

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  errorCode?: string;
  data: T | null;
}

type Props = {
  themeKey: string;
};

const ThemeHeroSection: React.FC<Props> = ({ themeKey }) => {
  const [fetchState, setFetchState] = useState<FetchState<ThemeData[]>>({
    isLoading: true,
    isError: false,
    data: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTheme = async (key: string) => {
      setFetchState({ isLoading: true, isError: false, data: null });
      try {
        const data = await fetchData('/api/v1/themes', { key });
        setFetchState({ isLoading: false, isError: false, data: data.themes });
      } catch (error) {
        const axiosError = error as AxiosError;
        setFetchState({
          isLoading: false,
          isError: true,
          data: null,
          errorMessage: axiosError.message,
          errorCode: axiosError.code,
        });
      }
    };

    if (themeKey) {
      fetchTheme(themeKey);
    }
  }, [themeKey]);

  useEffect(() => {
    if (!fetchState.isLoading && !fetchState.isError && !fetchState.data?.find((theme) => theme.key === themeKey)) {
      console.log('Invalid theme key, redirecting...');
      navigate('/');
    }
  }, [fetchState, themeKey, navigate]);

  if (fetchState.isLoading)
    return <Loading />;
  if (fetchState.isError)
    return <ErrorMessage message={fetchState.errorMessage || '데이터를 불러오는 중에 문제가 발생했습니다.'} code={fetchState.errorCode} />;

  const currentTheme = fetchState.data?.find((theme) => theme.key === themeKey);
  if (!currentTheme) {
    return null;
  }

  const { backgroundColor, label, title, description } = currentTheme;

  return (
    <Wrapper backgroundColor={backgroundColor}>
      <Container>
        <Label>{label}</Label>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section<{ backgroundColor: string }>`
  padding: 27px 20px 23px;
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 50px 20px;
  }
`;

const Label = styled.p`
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.7);

  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 20px;
    line-height: 24px;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  color: #fff;
  font-size: 18px;
  line-height: 26px;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;

  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 30px;
    line-height: 40px;
    padding-top: 12px;
    word-break: break-word;
  }
`;

const Description = styled.p`
  padding-top: 5px;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.55);
  word-break: break-all;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding-top: 12px;
    font-size: 24px;
    line-height: 32px;
  }
`;

export default ThemeHeroSection;