import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosInstance } from '.';
import type { Theme } from './types';

export const useThemes = () =>
  useQuery<Theme[]>({
    queryKey: ['themes'],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get('v1/themes');
        return response.data.themes;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            console.error('존재하지 않는 테마입니다:', error);
            throw new Error('존재하지 않는 테마입니다.');
          } else {
            console.error('데이터를 불러오는 중에 문제가 발생했습니다:', error);
            throw new Error('데이터를 불러오는 중에 문제가 발생했습니다.');
          }
        } else {
          console.error('Unexpected error occurred:', error);
          throw new Error('Unexpected error occurred');
        }
      }
    },
  });
