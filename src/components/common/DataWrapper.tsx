import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import type { QueryFunction, QueryKey } from 'react-query';

import loadingGif from '@/assets/loading.gif';
import { useData } from '@/utils/useData';

interface DataWrapperProps<TData> {
  queryKey: QueryKey;
  queryFn: QueryFunction<TData>;
  children: (data: TData) => ReactNode;
}

export const DataWrapper = <TData,>({ queryKey, queryFn, children }: DataWrapperProps<TData>) => {
  const { data, isLoading } = useData<TData>({ queryKey, queryFn });

  if (isLoading) {
    return <Loader src={loadingGif} alt="Loading..." />;
  }

  return <>{data && children(data)}</>;
};

const Loader = styled.img`
  display: block;
  margin: 0 auto;
`;
