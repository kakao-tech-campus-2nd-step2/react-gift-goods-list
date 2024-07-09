import { useEffect, useState } from 'react';

import { fetchThemeData } from '@/pages/HomePage/services/themeList';
import { ThemeListData } from '@/types/themeType';

export const useThemeListData = () => {
  const [themeList, setThemeList] = useState<ThemeListData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetchThemeData();
      if (response.themes) setThemeList(response.themes);
      if (response.error) setError(response.error);
      setLoading(false);
    };

    fetchData();
  }, []);

  return { themeList, loading, error };
};
