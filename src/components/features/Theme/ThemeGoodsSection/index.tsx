import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import type { GetThemeProductsResponse, ProductData } from '@/api/api';
import { fetchThemeProducts } from '@/api/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';

type Props = {
  themeKey: string;
};

type FetchProductsParams = {
  pageParam?: string;
  themeKey: string;
};

const fetchProducts = async ({
  pageParam = '',
  themeKey,
}: FetchProductsParams): Promise<GetThemeProductsResponse> => {
  const response = await fetchThemeProducts({ themeKey, maxResults: 20, pageToken: pageParam });
  return response;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['themeProducts', themeKey],
      queryFn: ({ pageParam = '' }) => fetchProducts({ pageParam, themeKey }),
      initialPageParam: '1',
      getNextPageParam: (lastPage: GetThemeProductsResponse) => lastPage.nextPageToken ?? undefined,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  if (isError) {
    const errorMessage = isAxiosError(error)
      ? error.response?.status === 404
        ? 'Products not found'
        : error.response?.status === 500
          ? 'Internal server error'
          : 'An unexpected error occurred'
      : 'Failed to load products';
    return <ErrorWrapper>{errorMessage}</ErrorWrapper>;
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
          {data?.pages.map((page, pageIndex) =>
            page.products.map(({ id, imageURL, name, price, brandInfo }: ProductData) => (
              <DefaultGoodsItems
                key={`${id}-${pageIndex}`}
                imageSrc={imageURL}
                title={name}
                amount={price.sellingPrice}
                subtitle={brandInfo.name}
              />
            )),
          )}
        </Grid>
        <div ref={ref}>
          {isFetchingNextPage ? <LoadingWrapper>Loading more...</LoadingWrapper> : null}
        </div>
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

const LoadingWrapper = styled.div`
  padding: 20px;
  text-align: center;
`;

const ErrorWrapper = styled.div`
  padding: 20px;
  text-align: center;
  color: red;
`;
