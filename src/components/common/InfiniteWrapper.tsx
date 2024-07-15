import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import type { InfiniteData, QueryFunctionContext, QueryKey } from 'react-query';

import loadingGif from '@/assets/loading.gif';
import type { ThemeProductResponse } from '@/types';
import { useInfiniteData } from '@/utils/useInfiniteData';

interface InfiniteWrapperProps {
  queryKey: QueryKey;
  queryFn: (context: QueryFunctionContext<QueryKey>) => Promise<ThemeProductResponse>;
  children: (data: InfiniteData<ThemeProductResponse>) => ReactNode;
}

export const InfiniteWrapper = ({ queryKey, queryFn, children }: InfiniteWrapperProps) => {
  const { data, errorMessage, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteData<ThemeProductResponse>({ queryKey, queryFn });
  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <Loader src={loadingGif} alt="Loading..." />;
  }

  if (errorMessage) {
    return <Message>{errorMessage}</Message>;
  }

  return (
    <>
      {data && children(data)}
      <div ref={ref} />
      {isFetchingNextPage && <Loader src={loadingGif} alt="Loading more..." />}
    </>
  );
};

const Loader = styled.img`
  display: block;
  margin: 0 auto;
`;

const Message = styled.p`
  width: 100%;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
`;
