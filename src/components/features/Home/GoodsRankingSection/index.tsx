import styled from '@emotion/styled';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { GoodsData, RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

const fetchRankingProducts = async (filterOption: RankingFilterOption): Promise<GoodsData[]> => {
  const { data } = await axios.get(
    'https://react-gift-mock-api-daeun0726.vercel.app/api/v1/ranking/products',
    {
      params: {
        targetType: filterOption.targetType,
        rankType: filterOption.rankType,
      },
    },
  );
  return data.products;
};

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const { data, isError, isLoading } = useQuery<GoodsData[]>(
    ['rankingProducts', filterOption],
    () => fetchRankingProducts(filterOption),
  );

  if (isLoading) {
    return (
      <LoadingWrapper>
        <LoadingSpinner />
        <p>Loading...</p>
      </LoadingWrapper>
    );
  }

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {isError ? (
          <ErrorWrapper>
            <ErrorMessage>Error loading data.</ErrorMessage>
          </ErrorWrapper>
        ) : data && data.length > 0 ? (
          <GoodsRankingList goodsList={data} />
        ) : (
          <NoDataWrapper>No ranking data available.</NoDataWrapper>
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

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  animation: spin 1s ease infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
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

const ErrorWrapper = styled.div`
  padding: 20px 0 30px;
  width: 100%;
  font-size: 18px;
  text-align: center;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 0 60px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 18px;
  margin-bottom: 20px;
`;

const NoDataWrapper = styled.div`
  padding: 20px 0 30px;
  width: 100%;
  font-size: 18px;
  color: gray;
  text-align: center;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 0 60px;
  }
`;
