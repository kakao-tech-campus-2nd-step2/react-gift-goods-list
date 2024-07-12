import { useQuery } from 'react-query';
import axios from 'axios';
import type { ThemeData, ThemesResponse } from '@/types';

const fetchThemes = async (): Promise<ThemeData[]> => {
  const { data } = await axios.get<ThemesResponse>('https://react-gift-mock-api-git-main-faddishcorns-projects.vercel.app/api/v1/themes');
  return data.themes;
};

export const useGetThemes = () => {
  return useQuery<ThemeData[], Error>('themes', fetchThemes);
};
