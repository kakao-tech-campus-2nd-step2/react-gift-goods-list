import styled from '@emotion/styled';
// import { GoodsMockList } from '@/types/mock';
import { useCallback, useEffect, useRef } from 'react';
import { Spinner } from 'react-bootstrap';

import { useGetThemeProductQuery } from '@/apis/tanstackQuery/theme/query';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const { products, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, error } =
    useGetThemeProductQuery(themeKey);

  const observerTarget = useRef(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const currentObserverTarget = observerTarget.current;
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, option);

    if (currentObserverTarget) observer.observe(currentObserverTarget);

    return () => {
      if (currentObserverTarget) observer.unobserve(currentObserverTarget);
    };
  }, [handleObserver]);

  if (isError) return <LoadingMessage>{error?.message}</LoadingMessage>;

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {products.map(({ id, imageURL, name, price, brandInfo }) => (
            <DefaultGoodsItems
              key={id}
              imageSrc={imageURL}
              title={name}
              amount={price.sellingPrice}
              subtitle={brandInfo.name}
            />
          ))}
        </Grid>
        {(isLoading || isFetchingNextPage) && (
          <LoadingMessage>
            <Spinner animation="border" role="status" variant="secondary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </LoadingMessage>
        )}
        <div ref={observerTarget} />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;

const LoadingMessage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
