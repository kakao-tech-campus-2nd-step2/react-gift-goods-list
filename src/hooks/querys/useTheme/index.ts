import { useQuery } from '@tanstack/react-query';

import mock from '@/apis/index';

export default function useTheme() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['themes'],
    queryFn: () => mock.getThemes(),
  });
  return { data, isLoading, error };
}
