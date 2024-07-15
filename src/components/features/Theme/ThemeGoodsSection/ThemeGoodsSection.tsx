import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container/Container';
import { Grid } from '@/components/common/layouts/Grid/Grid';
import ShowError from '@/components/Error/ShowError';
import Loading from '@/components/Loading/Loading';
import { breakpoints } from '@/styles/variants';
import type { product } from '@/types/types';
import { fetchData } from '@/utils/api/api';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const fetchProducts = async ({
    pageParam = '1',
  }: {
    pageParam?: string;
  }): Promise<{
    products: product[];
    nextPageToken?: string;
    pageInfo: { totalResults: number };
  }> => {
    const response = await fetchData(`/api/v1/themes/${themeKey}/products`, {
      pageToken: pageParam,
      maxResults: 10,
    });
    return response;
  };

  const {
    data: productData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['products', themeKey],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    initialPageParam: '1',
  });

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return Loading();
  }
  if (error) {
    return ShowError((error as Error).message);
  }
  if (!productData || productData.pages.length === 0) {
    return ShowError('데이터 없음');
  }

  const products = productData.pages.flatMap((page) => page.products);

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
          {products.map((product: product) => (
            <DefaultGoodsItems
              key={product.id}
              imageSrc={product.imageURL}
              title={product.name}
              amount={product.price.sellingPrice}
              subtitle={product.brandInfo.name}
            />
          ))}
        </Grid>
      </Container>
      <div ref={ref} />
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
