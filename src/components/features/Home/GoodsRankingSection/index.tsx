import styled from '@emotion/styled';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { getRankingProducts } from '@/api/rankingApi';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const { data, isLoading, isError } = useQuery(
    ['rankingProducts', filterOption],
    () => getRankingProducts(filterOption),
    {
      keepPreviousData: true,
      retry: false, 
    }
  );

  if (isLoading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }

  if (isError) {
    return (
      <Wrapper>
        <Container>
          <Title>실시간 급상승 선물랭킹</Title>
          <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
          <CenteredMessage>데이터를 불러오는 중에 문제가 발생했습니다.</CenteredMessage>
        </Container>
      </Wrapper>
    );
  }

  if (!data || data.products.length === 0) {
    return (
      <Wrapper>
        <Container>
          <Title>실시간 급상승 선물랭킹</Title>
          <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
          <CenteredMessage>보여줄 상품이 없어요!</CenteredMessage>
        </Container>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        <GoodsRankingList goodsList={data.products} />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 0 16px 32px;
  text-align: center;

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

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

const Loader = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left-color: #000;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const CenteredMessage = styled.p`
  text-align: center;
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

export default GoodsRankingSection;