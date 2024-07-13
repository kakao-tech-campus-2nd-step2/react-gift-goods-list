import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useState } from 'react';

import type { ProductData } from '@/api/api';
import axiosInstance from '@/api/axiosInstance';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

const fetchRankingProducts = async (filters: RankingFilterOption): Promise<ProductData[]> => {
  const response = await axiosInstance.get('/api/v1/ranking/products', { params: filters });
  return response.data.products;
};

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const {
    data: goodsList,
    error,
    isLoading,
  } = useQuery<ProductData[], Error>({
    queryKey: ['rankingProducts', filterOption],
    queryFn: () => fetchRankingProducts(filterOption),
    staleTime: 5000, // 5초 동안 이전 데이터를 유지
  });

  if (isLoading) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  if (error) {
    let errorMessage: string;
    if (isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            errorMessage = 'Themes not found';
            break;
          case 500:
            errorMessage = 'Internal server error';
            break;
          default:
            errorMessage = 'An unexpected error occurred';
        }
      } else {
        errorMessage = 'Network error';
      }
    } else {
      errorMessage = 'Failed to fetch ranking products';
    }
    return <ErrorWrapper>{errorMessage}</ErrorWrapper>;
  }

  if (!goodsList || goodsList.length === 0) {
    return <NoDataWrapper>No ranking products available</NoDataWrapper>;
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
