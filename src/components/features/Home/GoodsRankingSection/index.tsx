import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import type { GetRankingProductsParameters } from '@/api/types';
import { Container } from '@/components/common/layouts/Container';
import { useFetchRankingProducts } from '@/hooks/useFetchRankingProducts';
import { breakpoints } from '@/styles/variants';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<GetRankingProductsParameters>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const { data, error } = useFetchRankingProducts(filterOption);

  useEffect(() => {
    const fetchRankingProducts = async () => {
      setErrorMessage(null);
      try {
        const response = await ApiService.fetchRankingProducts(filterOption);
        setRankingProducts(response.products);
      } catch (error) {
        if (error as APIError) {
          setErrorMessage(handleApiError(error as APIError));
        }
      }
    };

    fetchRankingProducts();
  }, [filterOption]);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        <GoodsRankingList
          goodsList={data?.products || []}
          errorMessage={error ? error.message : ''}
        />
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
