import { useEffect } from 'react';

import { useFetchData } from '@/hooks/useFetchData';
import { fetchThemeHeaderData } from '@/services/themeData';
import { ThemeHeaderData } from '@/types/themeType';

export const useThemeHeaderData = (themeKey: string) => {
  const {
    data: themeHeader,
    loading,
    error,
    setData,
    setLoading,
    setError,
  } = useFetchData<ThemeHeaderData>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetchThemeHeaderData(themeKey);

      if (response.themeHeaderContents) setData(response.themeHeaderContents);

      if (response.error) setError(response.error);

      setLoading(false);
    };
    fetchData();
  }, [themeKey, setData, setLoading, setError]);

  return { themeHeader, loading, error };
};
