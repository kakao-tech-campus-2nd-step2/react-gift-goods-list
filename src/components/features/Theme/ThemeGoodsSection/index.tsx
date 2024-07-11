import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';

import { fetchThemeProducts } from '@/api/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData, InfiniteQueryResponse } from '@/types';


interface ThemeGoodsSectionProps {
  themeKey: string;
}

export const ThemeGoodsSection = ({ themeKey }: ThemeGoodsSectionProps) => {
  const observerRef = useRef(null);
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<InfiniteQueryResponse, Error>(
    ['themeProducts', themeKey],
    ({ pageParam = '' }) => fetchThemeProducts(themeKey, pageParam, 20),
    {
      getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
    }
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentElement = observerRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) {
    return <LoadingMessage>Loading products...</LoadingMessage>;
  }

  if (isError) {
    return <ErrorMessage>에러가 발생했습니다.</ErrorMessage>;
  }

  return (
    <Wrapper>
      <Container>
        <Grid columns={{ initial: 2, md: 4 }} gap={16}>
          {data?.pages.map((page) =>
            page.products.map((product: GoodsData) => (
              <DefaultGoodsItems
                key={product.id}
                imageSrc={product.imageURL}
                title={product.name}
                amount={product.price.sellingPrice}
                subtitle={product.brandInfo.name}
              />
            ))
          )}
          <div ref={observerRef} style={{ height: "20px", width: "100%" }} />
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  overflow-y: auto;
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 16px;
`;