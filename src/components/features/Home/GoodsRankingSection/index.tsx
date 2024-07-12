import styled from '@emotion/styled';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { Container } from '@/components/common/layouts/Container';
import { BASE_URL } from '@/constants';
import { breakpoints } from '@/styles/variants';
import type { GoodsData, RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

const fetchRankingList = async (filterOption: RankingFilterOption) => {
  const params = {
    targetType: filterOption.targetType,
    rankType: filterOption.rankType
  }
  const response = await axios.get(`${BASE_URL}api/v1/ranking/products`, { params })
  return response.data.products
}

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const { data, isLoading, isError } = useQuery<GoodsData[]>(['rankingList', filterOption], () =>
    fetchRankingList(filterOption)
  )

  const renderingFunc = () => {
    if (isError) {
      return (
        <ErrorWrapper>
          <ErrorText>데이터를 불러오는 중 오류가 발생하였습니다.</ErrorText>
        </ErrorWrapper>
      );
    }
  
    if (isLoading) {
      return (
        <LoadingWrapper>
          <Spinner />
          <LoadingText>Loading...</LoadingText>
        </LoadingWrapper>
      );
    }
  
    if (data?.length === 0) {
      return (
        <NoDataWrapper>
          <NoDataText>No data available</NoDataText>
        </NoDataWrapper>
      )
    }
    return <GoodsRankingList goodsList={data} />
  }

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {renderingFunc()}
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 100%;
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
  width: 100%;
`;

const NoDataText = styled.div`
  font-size: 1.5rem;
  color: #999;
  text-align: center;
`;

const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 100%;
`;

const ErrorText = styled.div`
  font-size: 1.5rem;
  color: #e74c3c;
  text-align: center;
`;
