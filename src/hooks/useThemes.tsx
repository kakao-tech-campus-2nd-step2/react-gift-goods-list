import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import apiClient from '@/api/index';
import type { ThemeData, ThemesResponse } from '@/types';
import createErrorMessage from '@/utils/createErrorMessage';

const fetchThemes = async () => {
  try {
    const response = await apiClient.get<ThemesResponse>('/api/v1/themes');
    return response.data.themes;
  } catch (err) {
    const error = err as AxiosError;
    const errorMessage = error instanceof AxiosError ? createErrorMessage(error.response) : 'An unknown error occurred';
    console.error('Error fetching themes:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const useThemes = () => {
  const { data, error, isLoading, isError } = useQuery<ThemeData[], Error>(
    'themes',
    fetchThemes
  );

  return [data, { isLoading, isError, errorMessage: error?.message }] as const;
};