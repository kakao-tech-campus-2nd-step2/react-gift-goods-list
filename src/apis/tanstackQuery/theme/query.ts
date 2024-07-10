import { useQuery } from '@tanstack/react-query';

import { GetThemeCategory } from '@/apis/endpoints/theme/useGetThemeCategory';

export const useGetThemeCategoryQuery = () => {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['themeCategories'],
    queryFn: () => GetThemeCategory(),
  });

  return { data, isLoading, isFetching, isError, error };
};
