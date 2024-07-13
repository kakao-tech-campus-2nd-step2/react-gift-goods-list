import styled from '@emotion/styled';
import type { QueryFunctionContext } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import type { FetchThemeProductsResponse } from '@/api/fetchThemeProducts';
import { fetchThemeProducts } from '@/api/fetchThemeProducts';
import { FetchDataUI } from '@/components/common/FetchDataUI';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';

type Props = {
  themeKey: string;
};

const fetchProductList = async (
  themeKey: string,
  pageToken: string = '',
): Promise<FetchThemeProductsResponse> => {
  const res = await fetchThemeProducts(themeKey, pageToken);
  return res;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, isLoading, isError, error } =
    useInfiniteQuery<FetchThemeProductsResponse>({
      queryKey: ['products', themeKey],
      queryFn: ({ pageParam = '' }: QueryFunctionContext) =>
        fetchProductList(themeKey, pageParam as string),
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    });

  useEffect(() => {
    if (inView && !isLoading) {
      fetchNextPage();
    }
  }, [inView, isLoading, fetchNextPage]);

  return (
    <Wrapper>
      <Container>
        <FetchDataUI
          loading={isLoading}
          error={isError ? (error as Error).message : null}
          data={data?.pages.flatMap((page) => page.products) || []}
        >
          <Grid
            columns={{
              initial: 2,
              md: 4,
            }}
            gap={16}
          >
            {data?.pages
              .flatMap((page) => page.products)
              ?.map(({ id, imageURL, name, price, brandInfo }) => (
                <DefaultGoodsItems
                  key={id}
                  imageSrc={imageURL}
                  title={name}
                  amount={price.sellingPrice}
                  subtitle={brandInfo.name}
                />
              ))}
          </Grid>
        </FetchDataUI>
        <div ref={ref} style={{ height: '20px' }} />
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
