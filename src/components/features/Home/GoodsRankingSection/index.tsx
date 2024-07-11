import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import fetchData from '@/api';
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

  const [rankingProducts, setRankingProducts] = useState<GoodsData[]>([])
  const [loading, setLoading] = useState(true)

  // filterOption 에 변화가 생길 때 마다 실행
  useEffect(() => {
    const fetchRankingProductData = async () => {
      try {
        const { targetType, rankType } = filterOption
        const data = await fetchData(
          `api/v1/ranking/products?targetType=${targetType}&rankType=${rankType}`,
        )

        setRankingProducts(data.products)
        setLoading(false)
        console.log('[GoodsRankingSection] Fetch Goods Ranking Data Success: ', data.products)        
      }
      catch (error) {
        console.error('[GoodsRankingSection] Fetch Goods Ranking Data Fail: ', error)
        setLoading(false)
      }
    }
    fetchRankingProductData()
  }, [filterOption]);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {loading ? (
          <LoadingWrapper>
            <Spinner />
            <LoadingText>Loading...</LoadingText>
          </LoadingWrapper>
        ) : rankingProducts.length === 0 ? (
          <NoDataWrapper>
            <NoDataText>No ranking products available</NoDataText>
          </NoDataWrapper>
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
