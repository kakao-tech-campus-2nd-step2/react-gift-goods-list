import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import type { QueryFunctionContext } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { startTransition, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import type { ProductData } from '@/api';
import { getThemeProducts } from '@/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';

type Props = {
  themeKey: string;
};

export type ThemeProductsResponse = {
  products: ProductData[];
  nextPageToken: number | null;
};

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const ThemeGoodsSection: React.FC<Props> = ({ themeKey }) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const { ref, inView } = useInView();

  const fetchThemeProducts = async ({ pageParam = 1 }: QueryFunctionContext): Promise<ThemeProductsResponse> => {
    const response = await getThemeProducts(themeKey, pageParam as number);

    return {
      products: response.products,
      nextPageToken: response.nextPageToken ? Number(response.nextPageToken) : null,
    };
  };

  const {
    data,
    fetchNextPage,
    isLoading: loading,
    isFetchingNextPage,
    isError: hasError,
  } = useInfiniteQuery<ThemeProductsResponse, Error>({
    queryKey: ['themeProducts', themeKey],
    queryFn: fetchThemeProducts,
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    initialPageParam: 1,
  });

  useEffect(() => {
    if (data) {
      const allProducts = data.pages.flatMap((page) => page.products);
      // Wrap state update in startTransition
      startTransition(() => {
        setProducts(allProducts);
      });
    }
  }, [data]);

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      // Wrap function call in startTransition
      startTransition(() => {
        fetchNextPage();
      });
    }
  }, [inView, isFetchingNextPage, fetchNextPage]);

  if (loading) {
    return <LoadingWrapper><LoadingSpinner /></LoadingWrapper>;
  }

  if (hasError) {
    return <ErrorWrapper>에러가 발생했습니다.</ErrorWrapper>;
  }

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
        {isFetchingNextPage && <LoadingWrapper><LoadingSpinner /></LoadingWrapper>}
        <div ref={ref} />
      </Container>
      {!loading && products.length === 0 && <NoProductsWrapper>상품이 없어요.</NoProductsWrapper>}
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

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%; 
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 5px solid #aaa;
  border-top: 5px solid transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 20px;
`;

const NoProductsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 18px;
`;