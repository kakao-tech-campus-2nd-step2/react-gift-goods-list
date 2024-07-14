import styled from '@emotion/styled';
import { useState } from 'react';

import { useRankingProducts } from '@/api/ranking';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

const initialFilterOption: RankingFilterOption = {
  targetType: 'ALL',
  rankType: 'MANY_WISH_RECEIVE',
};

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>(initialFilterOption);
  const { data: goodsList, error, isLoading } = useRankingProducts(filterOption.targetType, filterOption.rankType);

  return (
    <Wrapper>
      <Container>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {isLoading ? (
          <MessageDiv>로딩 중...</MessageDiv>
        ) : error ? (
          <MessageDiv color="red">상품을 불러오는 중 오류가 발생했습니다.</MessageDiv>
        ) : !goodsList ? (
          <MessageDiv>상품이 없습니다</MessageDiv>
        ) : goodsList.products.length === 0 ? (
          <MessageDiv>상품이 없습니다</MessageDiv>
        ) : (
          <GoodsRankingList goodsList={goodsList.products} />
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 40px 0;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 60px 0;
  }
`;

const MessageDiv = styled.div<{ color?: string }>`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: ${({ color }) => color || '#666'};
`;
