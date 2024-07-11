import styled from '@emotion/styled';
import type { AxiosError } from 'axios'; 
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { fetchThemes } from '@/api/api';
import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();

  const { data: themes, isLoading, isError, error } = useQuery('themes', fetchThemes);

  if (isLoading) {
    return <LoadingMessage>Loading theme details...</LoadingMessage>;
  }

  const axiosError = error as AxiosError;

  if (isError) {
    return <ErrorMessage>Error: {axiosError.message}</ErrorMessage>;
  }

  const currentTheme = themes?.find((theme: { key: string; }) => theme.key === themeKey);

  if (!currentTheme) {
    return <ErrorMessage>Theme not found.</ErrorMessage>;
  }

  return (
    <>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  padding: 20px;
  font-size: 16px;
`;