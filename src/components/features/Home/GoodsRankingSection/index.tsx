import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { fetchRankingProducts } from '@/api/ranking';
import { Container } from '@/components/common/layouts/Container';
import { Loader } from '@/components/common/Loader';
import { breakpoints } from '@/styles/variants';
import type { ProductData, RankingFilterOption, RankingProductsResponse } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });
  const [goodsList, setGoodsList] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRankingProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: RankingProductsResponse = await fetchRankingProducts(filterOption);
        setGoodsList(data.products);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          switch (err.response.status) {
            case 400:
              setError('잘못된 요청입니다.');
              break;
            case 404:
              setError('상품을 찾을 수 없습니다.');
              break;
            case 500:
              setError('서버 오류가 발생했습니다.');
              break;
            default:
              setError('오류가 발생했습니다.');
          }
        } else {
          setError('네트워크 오류가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadRankingProducts();
  }, [filterOption]);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : goodsList.length === 0 ? (
          <Message>보여줄 상품이 없어요!</Message>
        ) : (
          <GoodsRankingList goodsList={goodsList} />
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

const Message = styled.p`
  width: 100%;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
`;
