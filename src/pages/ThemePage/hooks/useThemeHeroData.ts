import { useQuery } from '@tanstack/react-query';

import { fetchThemeHeroData } from '@/services/themeData';

export const useThemeHeroData = (themeKey: string) => {
  return useQuery({
    queryKey: ['themeHero', themeKey],
    queryFn: () => fetchThemeHeroData(themeKey),
  });
};
