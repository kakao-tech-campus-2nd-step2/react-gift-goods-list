import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { Message } from '@/styles';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';
import { BASE_URL } from '@/types';

type FetchProps = {
  pageParam?: number;
  themeKey: string;
};

const fetchGoodsList = async ({ pageParam, themeKey }: FetchProps) => {
  const maxResults = 20;
  const params: { maxResults: number; pageToken?: number } = { maxResults };
  if (pageParam) {
    params.pageToken = pageParam;
  }
  const res = await axios.get(`${BASE_URL}/api/v1/themes/${themeKey}/products`, { params });
  return res.data;
};

export const ThemeGoodsSection = ({ themeKey }: { themeKey: string }) => {
  const { ref, inView } = useInView();

  const { data, isError, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['goodsList', themeKey],
      ({ pageParam = 0 }) =>
        fetchGoodsList({ pageParam: pageParam === 0 ? undefined : pageParam, themeKey }),
      {
        getNextPageParam: (lastPage, pages) => {
          if (lastPage.products.length < 20) {
            return undefined;
          }
          return pages.length; // This ensures the next page token starts from 1
        },
      },
    );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const renderList = () => {
    if (isError) {
      return <Message>데이터를 불러오는 중에 문제가 발생했습니다.</Message>;
    }
    if (isLoading && !isFetchingNextPage) {
      return <Message>로딩 중...</Message>;
    }
    if (!data || data.pages[0].products.length === 0) {
      return <Message>보여줄 상품이 없습니다!</Message>;
    }
  };

  return (
    <Wrapper>
      <Container>
        {renderList()}
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
