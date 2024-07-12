import styled from '@emotion/styled'
import axios from 'axios';
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default'
import { Container } from '@/components/common/layouts/Container'
import { Grid } from '@/components/common/layouts/Grid'
import { BASE_URL } from '@/constants';
import { breakpoints } from '@/styles/variants'
import type { GoodsData } from '@/types'

type FetchProps = {
  pageParam?: number
  themeKey: string
};

const fetchGoodsList = async ({ pageParam, themeKey }: FetchProps) => {
  const maxResults = 20
  const params: { maxResults: number; pageToken?: number } = { maxResults }
  if (pageParam) {
    params.pageToken = pageParam
  }
  const response = await axios.get(`${BASE_URL}api/v1/themes/${themeKey}/products`, { params })
  return response.data
}

export const ThemeGoodsSection = ({ themeKey }: { themeKey: string }) => {
  const { ref, inView } = useInView()

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
          return pages.length;
        },
      },
    );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isError) {
    return (
      <ErrorWrapper>
        <ErrorText>데이터를 불러오는 중 오류가 발생하였습니다.</ErrorText>
      </ErrorWrapper>
    );
  }

  if (isLoading && !isFetchingNextPage) {
    return (
      <LoadingWrapper>
        <Spinner />
        <LoadingText>Loading...</LoadingText>
      </LoadingWrapper>
    )

  }
  if (!data || data.pages[0].products.length === 0) {
    return (
      <NoDataWrapper>
        <NoDataText>No data available</NoDataText>
      </NoDataWrapper>
    )
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

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  margin-top: 10px;
  font-size: 1.2rem;
  color: #555;
`;

const NoDataWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

const NoDataText = styled.div`
  font-size: 1.5rem;
  color: #999;
`;

const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

const ErrorText = styled.div`
  font-size: 1.5rem;
  color: #ff6347;
`;