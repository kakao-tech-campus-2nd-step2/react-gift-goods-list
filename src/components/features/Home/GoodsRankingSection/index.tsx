import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { getRankingProducts } from '@/api/api';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';
import type { ProductData } from '@/types/response'; // 수정된 부분

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const [goodsList, setGoodsList] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRankingProduts = async () => {
      setLoading(true);
      try {
        const data = await getRankingProducts(filterOption);
        setGoodsList(data.products);
      } catch (error) {
        console.log('Error fetching ranking products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRankingProduts();
  }, [filterOption]);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {loading ? (
          <LoadingMessage>Loading...</LoadingMessage>
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

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 20px;
  padding: 20px;
`;
