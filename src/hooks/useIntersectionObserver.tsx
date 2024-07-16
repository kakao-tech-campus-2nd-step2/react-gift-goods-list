import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
}

export const useIntersectionObserver = ({
  threshold = 0,
  rootMargin = '0px',
  root = null,
}: Props) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const ref = useRef<Element | null>(null);

  const setRef = useCallback(
    (node: Element | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (node) {
        ref.current = node;
        observerRef.current = new IntersectionObserver(
          ([entry]) => {
            setIsIntersecting(entry.isIntersecting);
          },
          {
            root,
            rootMargin,
            threshold,
          },
        );
        observerRef.current.observe(node);
      }
    },
    [root, rootMargin, threshold],
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { ref, isIntersecting, setRef };
};
