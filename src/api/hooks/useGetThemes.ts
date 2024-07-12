import { useEffect, useState } from 'react';
import axios from 'axios';
import type { ThemeData, ThemesResponse } from '@/types';

export const useGetThemes = () => {
  const [data, setData] = useState<ThemeData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await axios.get<ThemesResponse>('https://react-gift-mock-api-git-main-faddishcorns-projects.vercel.app/api/v1/themes');
        setData(response.data.themes);
      } catch (error) {
        console.error('Error fetching themes:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThemes();
  }, []);

  return { data, isLoading, isError };
};