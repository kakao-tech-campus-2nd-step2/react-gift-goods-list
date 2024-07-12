import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { axiosInstance } from '@/api';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { GoodsData, RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
}

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const [fetchState, setFetchState] = useState<FetchState<GoodsData[]>>({
    isLoading: true,
    isError: false,
    data: null,
  });

  useEffect(() => {
    const fetchRanking = async () => {
      setFetchState({ isLoading: true, isError: false, data: [] });
      try {
        const response = await axiosInstance.get('/api/v1/ranking/products', {
          params: {
            targetType: filterOption.targetType,
            rankType: filterOption.rankType,
          },
        });
        const { products } = response.data;
        setFetchState({ isLoading: false, isError: false, data: products });
      } catch (error) {
        console.error('Error fetching ranking:', error);
        setFetchState({ isLoading: false, isError: true, data: null });
      }
    };

    fetchRanking();
  }, [filterOption]);

  const { isLoading, isError, data } = fetchState;

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {isLoading ? (
          <Description>로딩 중</Description>
        ) : isError ? (
          <Description>데이터를 불러오는 중에 문제가 발생했습니다.</Description>
        ) : data && data.length > 0 ? (
          <GoodsRankingList goodsList={data} />
        ) : (
          <Description>보여줄 상품이 없어요!</Description>
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

const Description = styled.div`
  width: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;
