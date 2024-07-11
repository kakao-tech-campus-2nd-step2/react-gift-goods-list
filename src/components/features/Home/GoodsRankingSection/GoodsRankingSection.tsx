import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Container } from '@/components/common/layouts/Container/Container';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types/types';
import type { product } from '@/types/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const [products, setProducts] = useState<product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'https://react-gift-mock-api-ten.vercel.app/api/v1/ranking/products',
          {
            params: {
              targetType: filterOption.targetType,
              rankType: filterOption.rankType,
            },
          },
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching themes:', error);
      }
    };

    fetchProducts();
  }, [filterOption]);

  // GoodsMockData를 21번 반복 생성
  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        <GoodsRankingList productsList={products} />
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
