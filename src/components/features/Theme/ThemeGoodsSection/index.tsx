import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

type Props = {
  themeKey: string;
  pageParam?: number;
};

type ProductResponse = {
  products: GoodsData[];
  pageToken: number;
};

const BASE_URL = 'https://kakao-tech-campus-mock-server.vercel.app';

const fetchThemeProducts = async ({
  themeKey,
  pageParam,
}: {
  themeKey: string;
  pageParam?: number;
}): Promise<ProductResponse> => {
  const maxResults = 20;
  const params: { maxResults: number; pageToken?: number } = { maxResults };
  if (pageParam) {
    params.pageToken = pageParam;
  }
  const response = await axios.get(`${BASE_URL}/api/v1/themes/${themeKey}/products`, { params });
  return response.data;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const { inView, ref } = useInView();
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<ProductResponse, AxiosError>(
      ['themeProducts', themeKey],
      ({ pageParam = 0 }) =>
        fetchThemeProducts({ pageParam: pageParam === 0 ? undefined : pageParam, themeKey }),
      {
        getNextPageParam: (lastPage: ProductResponse) => {
          if (lastPage.products.length < 20) {
            return undefined;
          }
          return lastPage.pageToken + 1;
        },
      },
    );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
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
          {data?.pages.map((page) =>
            page.products.map((goods: GoodsData) => (
              <DefaultGoodsItems
                key={goods.id}
                imageSrc={goods.imageURL}
                title={goods.name}
                amount={goods.price.sellingPrice}
                subtitle={goods.brandInfo.name}
              />
            )),
          )}
        </Grid>
        <div ref={ref}>{isFetchingNextPage ? '상품 추가로 불러오는 중...' : ''}</div>
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
