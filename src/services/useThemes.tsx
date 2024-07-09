import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { instantAxios } from '.';
import type { FetchState, Theme } from './types';

export type ThemeResponseData = {
  themes: Theme[];
};

export const useThemes = () => {
  const [fetchState, setFetchState] = useState<FetchState<ThemeResponseData>>({
    isLoading: true,
    isError: false,
    data: null,
  });

  useEffect(() => {
    const getThemes = async () => {
      try {
        setFetchState({ isLoading: true, isError: false, data: null });
        const response = await instantAxios.get<ThemeResponseData>('v1/themes');
        setFetchState({ isLoading: false, isError: false, data: response.data });
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            console.error(404, '존재하지 않는 테마입니다.');
          }
          if (error.response?.status === 400) {
            console.error(400, '데이터를 불러오는 중에 문제가 발생했습니다.');
          }
          setFetchState({ isLoading: false, isError: true, data: null });
        }
      }
    };
    getThemes();
  }, []);

  return { ...fetchState };
};
