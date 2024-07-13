import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { getRankingGoods } from '@/api';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection: React.FC = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const { data: goodsList, error, isLoading, refetch } = useQuery(
    ['rankingGoods', filterOption],
    () => getRankingGoods(filterOption),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    refetch();
  }, [filterOption, refetch]);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {isLoading ? (
          <LoadingMessage>로딩 중...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>데이터를 불러오는데 실패하였습니다.</ErrorMessage>
        ) : (
          <GoodsRankingList goodsList={goodsList || []} />
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

const ErrorMessage = styled.div`
  color: #ff0000;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
`;

const LoadingMessage = styled.div`
  color: #000;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
`;
