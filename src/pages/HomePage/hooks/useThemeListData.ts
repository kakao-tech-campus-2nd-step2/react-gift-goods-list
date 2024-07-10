import { useEffect } from 'react';

import { useFetchData } from '@/hooks/useFetchData';
import { fetchThemeData } from '@/services/themeList';
import { ThemeListData } from '@/types/themeType';

export const useThemeListData = () => {
  const { data, loading, error, setData, setLoading, setError } =
    useFetchData<ThemeListData[]>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetchThemeData();

      if (response.themes) setData(response.themes);

      if (response.error) setError(response.error);

      setLoading(false);
    };

    fetchData();
  }, [setData, setLoading, setError]);

  return { data, loading, error };
};
