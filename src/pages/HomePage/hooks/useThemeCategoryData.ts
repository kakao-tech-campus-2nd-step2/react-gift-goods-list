import { useQuery } from '@tanstack/react-query';

import { fetchThemeCategoryData } from '@/services/themeData';

export const useThemeCategoryData = () => {
  return useQuery({
    queryKey: ['themeCategoryList'],
    queryFn: () => fetchThemeCategoryData(),
  });
};
