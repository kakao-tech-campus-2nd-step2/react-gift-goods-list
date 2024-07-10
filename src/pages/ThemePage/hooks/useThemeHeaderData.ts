import { useEffect } from 'react';

import { useFetchData } from '@/hooks/useFetchData';
import { fetchThemeHeaderData } from '@/services/themeData';
import { ThemeHeaderData } from '@/types/themeType';

export const useThemeHeaderData = (themeKey: string) => {
  const {
    data: themeHeader,
    loading,
    error,
    fetchData,
  } = useFetchData<ThemeHeaderData>();

  useEffect(() => {
    (async () => {
      await fetchData(() => fetchThemeHeaderData(themeKey));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { themeHeader, loading, error };
};
