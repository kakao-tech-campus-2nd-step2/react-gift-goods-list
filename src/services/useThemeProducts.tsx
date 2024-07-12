import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosInstance } from '.';
import type { ProductWithPageData } from './types';

export const useThemeProducts = (themeKey: string) =>
  useInfiniteQuery<ProductWithPageData>({
    queryKey: ['themeProducts', themeKey],
    queryFn: async ({ pageParam = 0 }) => {
      try {
        const response = await axiosInstance.get<ProductWithPageData>(`v1/themes/${themeKey}/products`, {
          params: {
            pageToken: pageParam,
            maxResults: 20,
          },
        });
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            console.error('선물 테마 Key에 해당하는 선물 테마가 없습니다:', error);
            throw new Error('선물 테마 Key에 해당하는 선물 테마가 없습니다.');
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
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
    initialPageParam: 0,
  });
