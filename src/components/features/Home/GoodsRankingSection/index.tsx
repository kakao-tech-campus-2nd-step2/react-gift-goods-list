import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { fetchRankingProducts } from '@/api/api';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption, RankingProductsResponse } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection: React.FC = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });
  const [rankingProducts, setRankingProducts] = useState<RankingProductsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadRankingProducts = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const response = await fetchRankingProducts(filterOption.targetType, filterOption.rankType);
        setRankingProducts(response);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage('Failed to load ranking products');
        setIsLoading(false);
      }
    };

    loadRankingProducts();
  }, [filterOption]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {rankingProducts && <GoodsRankingList goodsList={rankingProducts.products} />}
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
