import styled from '@emotion/styled';
import type { AxiosError } from 'axios';
import { useCallback, useRef } from 'react';
import type { QueryFunctionContext } from 'react-query';
import { useInfiniteQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { Loader } from '@/components/common/Spinner';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';
import apiClient from '@/utils/api';

const getProductsByTheme = async ({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<[string, string]>) => {
  const themeKey = queryKey[1];
  const response = await apiClient.get<{ products: GoodsData[] }>(`/themes/${themeKey}/products`, {
    params: {
      maxResults: 20,
      page: pageParam,
    },
  });
  return {
    products: response.data.products,
    nextPage: pageParam + 1,
    isLast: response.data.products.length === 0,
  };
};

export const ThemeProductsSection = () => {
  const { themeKey } = useParams<{ themeKey: string }>();
  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['themeProducts', themeKey ?? ''],
    getProductsByTheme,
    {
      getNextPageParam: (lastPage) => (!lastPage.isLast ? lastPage.nextPage : undefined),
      enabled: !!themeKey,
    },
  );

  const observer = useRef<IntersectionObserver>();

  const lastItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, fetchNextPage, hasNextPage],
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    const axiosError = error as AxiosError;
    const errorMessage =
      axiosError.response?.status === 404 ? '상품을 찾을 수 없습니다.' : '오류가 발생했습니다.';
    return <div>{errorMessage}</div>;
  }

  if (!data || data.pages[0].products.length === 0) {
    return <div>상품이 없어요.</div>;
  }

  return (
    <ProductsContainer>
      <Container>
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {data.pages.map((page, pageIndex) =>
            page.products.map(({ id, imageURL, name, price, brandInfo }, index) => {
              if (pageIndex === data.pages.length - 1 && index === page.products.length - 1) {
                return (
                  <div key={id} ref={lastItemRef}>
                    <DefaultGoodsItems
                      key={id}
                      imageSrc={imageURL}
                      title={name}
                      amount={price.sellingPrice}
                      subtitle={brandInfo.name}
                    />
                  </div>
                );
              } else {
                return (
                  <DefaultGoodsItems
                    key={id}
                    imageSrc={imageURL}
                    title={name}
                    amount={price.sellingPrice}
                    subtitle={brandInfo.name}
                  />
                );
              }
            }),
          )}
        </Grid>
        <div ref={loadMoreTriggerRef} />
      </Container>
    </ProductsContainer>
  );
};

const ProductsContainer = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;
