import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

import { GoodsData } from '@/types';
import { getData } from '@/api';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });
  const [rankingProducts, setRankingProducts] = useState<GoodsData[]>([]);

  useEffect(() => {
    const getRankingProducts = async () => {
      try {
        const { targetType, rankType } = filterOption;
        const data = await getData(
          `/api/v1/ranking/products?targetType=${targetType}&rankType=${rankType}`,
        );
        setRankingProducts(data.products);
      } catch (error) {
        console.error('Error fetching ranking products:', error);
      }
    };

    getRankingProducts();
  }, [filterOption])

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        <GoodsRankingList goodsList={rankingProducts} />
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
