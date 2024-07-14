import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { fetchRankingProducts } from '@/api/rankingProducts';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { GoodsData, RankingFilterOption, RankingProductsResponse } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const [goodsList, setGoodsList] = useState<GoodsData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRankingProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response: RankingProductsResponse = await fetchRankingProducts(filterOption);
        console.log('API Response:', response); // 응답 데이터를 콘솔에 출력
        if (response && response.products) {
          setGoodsList(response.products);
        } else {
          setGoodsList([]);
        }
      } catch (err) {
        console.error('Fetching ranking products failed:', err);
        if (axios.isAxiosError(err) && err.response) {
          switch (err.response.status) {
            case 400:
              setError('잘못된 요청입니다.');
              break;
            case 401:
              setError('인증이 필요합니다.');
              break;
            case 404:
              setError('리소스를 찾을 수 없습니다.');
              break;
            case 500:
              setError('서버 오류가 발생했습니다.');
              break;
            default:
              setError('알 수 없는 오류가 발생했습니다.');
          }
        } else {
          setError('네트워크 오류가 발생했습니다.');
        }
        setGoodsList([]);
      } finally {
        setIsLoading(false);
      }
    };

    getRankingProducts();
  }, [filterOption]);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {isLoading ? (
          <Loading>Loading...</Loading>
        ) : error ? (
          <Error>{error}</Error>
        ) : goodsList.length === 0 ? (
          <NoData>보여줄 상품이 없어요!</NoData>
        ) : (
          <GoodsRankingList goodsList={goodsList} isLoading={false} error={null} />
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

const Loading = styled.div`
  text-align: center;
  font-size: 18px;
`;

const Error = styled.div`
  color: red;
  text-align: center;
  font-size: 18px;
`;

const NoData = styled.div`
  text-align: center;
  font-size: 18px;
  padding: 20px 0;
`;
