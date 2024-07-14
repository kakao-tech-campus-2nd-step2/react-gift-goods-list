import styled from '@emotion/styled';
import { isAxiosError } from 'axios';
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
    } catch (err: unknown) {
      console.error(err)
      if (isAxiosError(err)) {
        // 서버가 상태 코드를 응답한 경우
        if (err.response) {
          switch (err.response.status) {
            case 404:
              setError('Themes not found');
              break;
            case 500:
              setError('Internal server error');
              break;
            default:
              setError('An unexpected error occurred');
          }
        } else if (err.request) {
          // 요청이 만들어졌지만 응답을 받지 못한 경우
          setError('Network error');
        }
      } else {
        // 다른 에러인 경우
        setError('ranking products를 fetch하는데 실패함')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRankingProducts(filterOption)
  }, [filterOption])

  if (loading)
    return (
      <LoadingWrapper>Loading...</LoadingWrapper>
    )
  
  if (error)
    return (
      <ErrorWrapper>{error}</ErrorWrapper>
  )

  if (goodsList.length === 0)
    return (
      <NoDataWrapper>No ranking products available</NoDataWrapper>
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

const LoadingWrapper = styled.div`
  padding: 20px;
  text-align: center;
`;

const ErrorWrapper = styled.div`
  padding: 20px;
  text-align: center;
  color: red;
`;

const NoDataWrapper = styled.div`
  padding: 20px;
  text-align: center;
`;
