import { useQuery } from 'react-query';
import { fetchData } from '@/api/utils/fetchData';
import type { ThemeData, ThemesResponse } from '@/types';

const fetchThemes = async (): Promise<ThemeData[]> => {
  const data = await fetchData<ThemesResponse>('https://react-gift-mock-api-git-main-faddishcorns-projects.vercel.app/api/v1/themes');
  return data.themes;
};

export const useThemes = () => {
  return useQuery<ThemeData[], Error>('themes', fetchThemes);
};
