import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { Container } from '@/components/common/layouts/Container';
import { getRankingProducts } from '@/libs/api';
import { breakpoints } from '@/styles/variants';
import type { GoodsData, RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const [goodsList, setGoodsList] = useState<GoodsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchRankingProducts = async (filter: RankingFilterOption) => {
    try {
      setLoading(true);
      const data = await getRankingProducts({
        targetType: filter.targetType,
        rankType: filter.rankType,
      });
      setGoodsList(data.products);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch ranking products:', err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankingProducts(filterOption);
  }, [filterOption]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load ranking products.</div>;
  }

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        <GoodsRankingList goodsList={goodsList} />
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
