import { useInfiniteQuery } from 'react-query';
import { QUERY_KEYS } from '@/utils/queryKeys';
import { fetchData } from '@/api/utils/fetchData';
import type { GoodsResponse } from '@/types';

type UseThemeGoodsProps = {
  themeKey: string;
};

const fetchThemeGoods = async ({ pageParam = '0', themeKey }: { pageParam?: string; themeKey: string }): Promise<GoodsResponse> => {
  const data = await fetchData<GoodsResponse>(`https://react-gift-mock-api-git-main-faddishcorns-projects.vercel.app/api/v1/themes/${themeKey}/products`, {
    pageToken: pageParam,
  });
  return data;
};

export const useThemeGoods = ({ themeKey }: UseThemeGoodsProps) => {
  return useInfiniteQuery<GoodsResponse, Error>(
    QUERY_KEYS.themeGoods(themeKey),
    ({ pageParam = '0' }) => fetchThemeGoods({ pageParam, themeKey }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
    }
  );
};
