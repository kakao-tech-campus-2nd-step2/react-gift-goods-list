import { useInfiniteQuery } from 'react-query';
import type { GoodsResponse } from '@/types';

type UseThemeGoodsProps = {
  themeKey: string;
};

const fetchThemeGoods = async ({ pageParam = '0', themeKey }: { pageParam?: string, themeKey: string }): Promise<GoodsResponse> => {
  const response = await fetch(`https://react-gift-mock-api-git-main-faddishcorns-projects.vercel.app/api/v1/themes/${themeKey}/products?pageToken=${pageParam}`);
  if (!response.ok) {
    throw new Error('Failed to fetch goods');
  }
  return response.json();
};

export const useThemeGoods = ({ themeKey }: UseThemeGoodsProps) => {
  return useInfiniteQuery<GoodsResponse, Error>(
    ['themeGoods', themeKey],
    ({ pageParam = '0' }) => fetchThemeGoods({ pageParam, themeKey }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
    }
  );
};
