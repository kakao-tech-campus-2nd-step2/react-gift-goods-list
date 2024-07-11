import styled from '@emotion/styled';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { fetchRankingProducts } from '@/api/api';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { GoodsData, RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const { data: goodsList, isLoading, isError } = useQuery<GoodsData[], Error>(
    ['rankingProducts', filterOption],
    () => fetchRankingProducts(filterOption.targetType, filterOption.rankType),
    {
      keepPreviousData: true, 
      onError: (fetchError) => console.error('Failed to fetch products:', fetchError)
    }
  );

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {isLoading ? (
          <LoadingMessage>Loading...</LoadingMessage>
        ) : isError ? (
          <ErrorMessage>에러가 발생했습니다.</ErrorMessage>
        ) : !goodsList || goodsList.length === 0 ? (
          <ErrorMessage>보여줄 상품이 없어요!</ErrorMessage>
        ) : (
          <GoodsRankingList goodsList={goodsList} />
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 0 16px 32px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 0 16px 80px;
  }
`;

const Title = styled.h2`
  color: #000;
  width: 100%;
  text-align: left;
  font-size: 20px;
  line-height: 30px;
  font-weight: 700;

  @media screen and (min-width: ${breakpoints.sm}) {
    text-align: center;
    font-size: 35px;
    line-height: 50px;
  }
`;

const LoadingMessage = styled.div`
  color: #0070f3;
  text-align: center;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  margin-top: 20px;
`;
