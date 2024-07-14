import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { Container } from '@/components/common/layouts/Container/Container';
import ShowError from '@/components/Error/ShowError';
import Loading from '@/components/Loading/Loading';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types/types';
import type { product } from '@/types/types';
import { fetchData } from '@/utils/api/api';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const [products, setProducts] = useState<product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const response = await fetchData('/api/v1/ranking/products', {
          targetType: filterOption.targetType,
          rankType: filterOption.rankType,
        });
        setProducts(response.products);
      } catch (error) {
        setFetchError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filterOption]);

  if (loading) {
    return Loading();
  }
  if (fetchError) {
    return ShowError(fetchError);
  }
  if (products?.length == 0) {
    return ShowError('데이터 없음');
  }

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
