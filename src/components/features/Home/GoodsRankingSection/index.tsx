import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { fetchRankingProducts } from '@/api/Api';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { GoodsData, RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  // GoodsMockData를 21번 반복 생성

  const [rankingProducts, setRankingProducts] = useState<GoodsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchRankingProducts(filterOption);
        setRankingProducts(data.products || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching ranking products: ', err);
        setLoading(false);
        setError(err as Error);
        setRankingProducts([]);
        if (axios.isAxiosError(err)) {
          switch (err.response?.status) {
            case 400:
              setError(new Error('요청이 잘못되었습니다. 다시 시도해 주세요.'));
              break;
            case 404:
              setError(new Error('요청하신 페이지를 찾을 수 없습니다.'));
              break;
            case 500:
              setError(new Error('서버 에러. 잠시 후 다시 시도해 주세요.'));
              break;
            default:
              setError(new Error('알 수 없는 오류가 발생했습니다. ${err.response?.status}'));
              break;
          }
        }
      }
    };
    fetchRanking();
  }, [filterOption]);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {loading ? (
          <LoadingIndicator>Loading...</LoadingIndicator>
        ) : error ? (
          <ErrorMessage>Error fetching ranking products: {error.message}</ErrorMessage>
        ) : (
          <GoodsRankingList goodsList={rankingProducts} />
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

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 20px;
  font-weight: bold;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: red;
  font-size: 16px;
  font-weight: bold;
`;
