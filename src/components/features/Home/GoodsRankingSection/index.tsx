import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import apiClient from '@/api';
import type { GetRankingProductsResponse,ProductData } from '@/api/types/apiTypes';
import { Container } from '@/components/common/layouts/Container';
import Loading from '@/styles/Loading';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [loading, setLoading] = useState(true);
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });
  const [rankingProducts, setRankingProducts] = useState<ProductData[]>([]);
  useEffect(() => {
    const fetchRankingProducts = async () => {
      try {
        const response = await apiClient.get<GetRankingProductsResponse>('/api/v1/ranking/products', {
          params: {
            targetType: filterOption.targetType,
            rankType: filterOption.rankType,
          },
        });
        setRankingProducts(response.data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRankingProducts();
  }, [filterOption]);

  if (loading) {
    return <Loading />
  }

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        <GoodsRankingList goodsList={rankingProducts} />
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

