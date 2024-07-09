import { useEffect, useState } from 'react';

import { fetchThemeHeaderData } from '@/pages/ThemePage/services/themeHeader';
import { ThemeHeaderData } from '@/types/themeType';

export const useThemeHeaderData = (themeKey: string) => {
  const [themeHeader, setThemeHeader] = useState<ThemeHeaderData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchThemeData = async () => {
      setLoading(true);
      const response = await fetchThemeHeaderData(themeKey);
      if (response.themeHeaderContents)
        setThemeHeader(response.themeHeaderContents);
      if (response.error) setError(response.error);
      setLoading(false);
    };
    fetchThemeData();
  }, [themeKey]);

  return { themeHeader, loading, error };
};
