import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface useInfiniteScrollProps {
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export default function useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage }: useInfiniteScrollProps) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return ref;
}
