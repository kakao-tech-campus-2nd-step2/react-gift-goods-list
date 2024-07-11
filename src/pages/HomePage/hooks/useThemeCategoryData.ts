import { useEffect } from 'react';

import { useFetchData } from '@/hooks/useFetchData';
import { fetchThemeCategoryData } from '@/services/themeData';
import { ThemeCategoryData } from '@/types/themeType';

export const useThemeCategoryData = () => {
  const {
    data: themeCategoryList,
    loading,
    error,
    fetchData,
  } = useFetchData<ThemeCategoryData[]>();

  useEffect(() => {
    (async () => {
      await fetchData(() => fetchThemeCategoryData());
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { themeCategoryList, loading, error };
};
