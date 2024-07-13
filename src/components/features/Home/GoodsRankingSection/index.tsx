import styled from '@emotion/styled';
import { useState } from 'react';

import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { GoodsData, RankingFilterOption } from '@/types';
import useFetch from '@/utils/api';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const { isLoading, isError, data } = useFetch<{ products: GoodsData[] }>(
    '/api/v1/ranking/products',
    filterOption,
  );

  console.log('Fetch state:', { isLoading, isError, data });

  const renderContent = () => {
    if (isLoading) {
      return <Description>로딩 중</Description>;
    }
    if (isError) {
      return <Description>데이터를 불러오는 중에 문제가 발생했습니다.</Description>;
    }
    if (data && data.products.length > 0) {
      return <GoodsRankingList goodsList={data.products} />;
    }
    return <Description>보여줄 상품이 없어요!</Description>;
  };

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {renderContent()}
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

const Description = styled.div`
  width: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;
