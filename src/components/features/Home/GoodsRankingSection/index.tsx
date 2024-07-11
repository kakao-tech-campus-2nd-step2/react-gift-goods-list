import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import { Container } from '@/components/common/layouts/Container';
import Loading from '@/components/common/Status/loading';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

import { fetchData } from '../../../common/API/api';
import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

interface ProductData {
  id: number;
  name: string;
  imageURL: string;
  wish: {
    wishCount: number;
    isWished: boolean;
  };
  price: {
    basicPrice: number;
    discountRate: number;
    sellingPrice: number;
  };
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
}

export const GoodsRankingSection: React.FC = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const [fetchState, setFetchState] = useState<FetchState<ProductData[]>>({
    isLoading: true,
    isError: false,
    data: null,
  });

  useEffect(() => {
    const fetchRankingProducts = async (filters: RankingFilterOption) => {
      setFetchState({ isLoading: true, isError: false, data: null });
      try {
        const response = await fetchData('/api/v1/ranking/products', filters);
        setFetchState({ isLoading: false, isError: false, data: response.products });
      } catch (error) {
        setFetchState({ isLoading: false, isError: true, data: null });
      }
    };

    fetchRankingProducts(filterOption);
  }, [filterOption]);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {fetchState.isLoading ? (
          <Loading />
        ) : fetchState.isError ? (
          <ErrorMessage>데이터를 불러오는 중에 문제가 발생했습니다.</ErrorMessage>
        ) : fetchState.data && fetchState.data.length > 0 ? (
          <GoodsRankingList goodsList={fetchState.data} />
        ) : (
          <EmptyMessage>보여줄 상품이 없어요!</EmptyMessage>
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

const ErrorMessage = styled.p`
  text-align: center;
  margin-top: 20px;
`;

const EmptyMessage = styled.p`
  color: #000;
  text-align: center;
  margin-top: 20px;
`;

export default GoodsRankingSection;