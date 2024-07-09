import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { ProductData, RankingFilterOption } from '@/types';
import { fetchRankingFromAPI } from '@/api/api';
// import { GoodsMockList } from '@/types/mock';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [rankProducts, setRankProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  useEffect(() => {
    const fetchRankingProducts = async () => {
      try {
        const fetchedRankProducts = await fetchRankingFromAPI();
        setRankProducts(fetchedRankProducts);
      } catch (error) {
        setFetchError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchRankingProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (fetchError) return <div>Error loading themes</div>;

  // GoodsMockData를 21번 반복 생성

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        <GoodsRankingList goodsList={rankProducts} />
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
