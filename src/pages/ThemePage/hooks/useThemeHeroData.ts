import { useEffect } from 'react';

import { useFetchData } from '@/hooks/useFetchData';
import { fetchThemeHeroData } from '@/services/themeData';
import { ThemeHeroData } from '@/types/themeType';

export const useThemeHeroData = (themeKey: string) => {
  const {
    data: themeHero,
    loading,
    error,
    fetchData,
  } = useFetchData<ThemeHeroData>();

  useEffect(() => {
    (async () => {
      await fetchData(() => fetchThemeHeroData(themeKey));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { themeHero, loading, error };
};
