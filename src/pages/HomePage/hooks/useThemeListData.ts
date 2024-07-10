import { useEffect } from 'react';

import { useFetchData } from '@/hooks/useFetchData';
import { fetchThemeData } from '@/services/themeData';
import { ThemeListData } from '@/types/themeType';

export const useThemeListData = () => {
  const {
    data: themeList,
    loading,
    error,
    fetchData,
  } = useFetchData<ThemeListData[]>();

  useEffect(() => {
    (async () => {
      await fetchData(() => fetchThemeData());
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { themeList, loading, error };
};
