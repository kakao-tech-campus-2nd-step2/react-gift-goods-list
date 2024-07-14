import styled from '@emotion/styled';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { API_ENDPOINT } from '@/api/constants/apiPath';
import { fetchData } from '@/api/fetchData';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

interface ProductResponse {
  products: GoodsData[];
  nextPageToken: string | null;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

type Props = {
  themeKey: string;
};

const fetchGoodsData = async (themeKey: string, pageParam: string) => {
  const params = {
    maxResults: 20,
    pageToken: pageParam,
  };
  const { data } = await fetchData<ProductResponse>(API_ENDPOINT.THEME_PRODUCTS(themeKey), params);
  console.log(data);
  return data;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['goodsData', themeKey],
    queryFn: ({ pageParam = '1' }) => fetchGoodsData(themeKey, pageParam),
    initialPageParam: '1',
    getNextPageParam: (lastPage: ProductResponse) => lastPage.nextPageToken || undefined,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
          {data.pages.map((page) =>
            page.products.map((product) => (
              <DefaultGoodsItems
                key={product.id}
                imageSrc={product.imageURL}
                title={product.name}
                amount={product.price.sellingPrice}
                subtitle={product.brandInfo.name}
              />
            )),
          )}
        </Grid>
        <div ref={ref}>
          {isFetchingNextPage
            ? '다음 페이지 로딩 중..'
            : hasNextPage
              ? '상품 로딩 중..'
              : '보여드릴 상품이 더 이상 없습니다.'}
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
