import styled from '@emotion/styled';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { fetchRankingProducts } from '@/api/ranking';
import { DataWrapper } from '@/components/common/DataWrapper';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption, RankingProductsResponse } from '@/types';
import { getErrorMessage } from '@/utils/errorHandler';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const { data, error, isLoading } = useQuery<RankingProductsResponse, Error>(
    ['rankingProducts', filterOption],
    () => fetchRankingProducts(filterOption),
  );
  const errorMessage = error ? getErrorMessage(error) : null;

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        <DataWrapper isLoading={isLoading} errorMessage={errorMessage}>
          {data?.products.length === 0 ? (
            <Message>보여줄 상품이 없어요!</Message>
          ) : (
            data && <GoodsRankingList goodsList={data.products} />
          )}
        </DataWrapper>
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
