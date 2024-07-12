import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { fetchRankingProducts } from '@/api/ranking';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { GoodsData,RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

const initialFilterOption: RankingFilterOption = {
  targetType: 'ALL',
  rankType: 'MANY_WISH_RECEIVE',
};

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>(initialFilterOption);
  const [goodsList, setGoodsList] = useState<GoodsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const getRankingProducts = async () => {
      setLoading(true);
      try {
        const response = await fetchRankingProducts(filterOption.targetType, filterOption.rankType);
        if (response.products.length === 0) {
          setFetchError('상품이 없습니다');
        } else {
          setGoodsList(response.products);
          setFetchError(null);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          switch (error.response.status) {
            case 404:
              setFetchError('상품을 찾을 수 없습니다');
              break;
            case 500:
              setFetchError('서버 오류가 발생했습니다');
              break;
            default:
              setFetchError('예상치 못한 오류가 발생했습니다');
          }
        } else {
          setFetchError('상품을 불러오는 데 실패했습니다');
        }
      } finally {
        setLoading(false);
      }
    };

    getRankingProducts();
  }, [filterOption]);

  return (
    <Wrapper>
      <Container>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {loading ? (
          <LoadingMessage>로딩 중...</LoadingMessage>
        ) : fetchError ? (
          <ErrorMessage>{fetchError}</ErrorMessage>
        ) : goodsList.length === 0 ? (
          <NoDataMessage>상품이 없습니다</NoDataMessage>
        ) : (
          <GoodsRankingList goodsList={goodsList} />
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 40px 0;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 60px 0;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: red;
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #666;
`;
