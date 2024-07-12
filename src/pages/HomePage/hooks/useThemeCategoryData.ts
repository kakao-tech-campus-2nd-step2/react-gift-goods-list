import { useQuery } from '@tanstack/react-query';

import { fetchThemeData } from '@/services/themeData';

export const useThemeCategoryData = () => {
  const { data, status, error } = useQuery({
    queryKey: ['themeData'],
    queryFn: () => fetchThemeData(),
  });

  const themeCategoryList = data?.categories;

  return { themeCategoryList, status, error };
};
