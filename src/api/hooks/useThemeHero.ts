import { useQuery } from '@tanstack/react-query';

import { fetchThemes } from '@/api/services/themes';

export const useThemeHero = (themeKey: string) => {
  const { data, status, error } = useQuery({
    queryKey: ['themeData', themeKey],
    queryFn: () => fetchThemes(),
  });

  const themeHero = data?.themes.find((theme) => theme.key === themeKey);

  return { themeHero, status, error };
};
