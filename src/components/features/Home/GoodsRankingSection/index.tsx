import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import type { ProductData } from '@/api/api';
import axiosInstance from '@/api/axiosInstance';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

//import { GoodsMockList } from '@/types/mock';
import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  // GoodsMockData를 21번 반복 생성

  const [goodsList, setGoodsList] = useState<ProductData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRankingProducts = async (filters: RankingFilterOption) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axiosInstance.get('/api/v1/ranking/products', { params: filters })
      setGoodsList(response.data.products)
    } catch (err) {
      console.error(err)
      setError('ranking products를 fetch하는데 실패함')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRankingProducts(filterOption)
  }, [filterOption])

  if (loading)
    return (
      <div>Loading...</div>
    )
  
  if (error)
    return (
      <div>{error}</div>
  )

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
