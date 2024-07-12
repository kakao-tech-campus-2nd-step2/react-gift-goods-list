import { useQuery } from '@tanstack/react-query';

import { fetchThemeData } from '@/services/themeData';

export const useThemeHeroData = (themeKey: string) => {
  const { data, status, error } = useQuery({
    queryKey: ['themeData', themeKey],
    queryFn: () => fetchThemeData(),
  });

  const themeHero = data?.themes.find((theme) => theme.key === themeKey);

  return { themeHero, status, error };
};
