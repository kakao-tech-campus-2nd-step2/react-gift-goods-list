import styled from '@emotion/styled';
import { useState } from 'react';

import useFetch from '@/apis/useFetch';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const initialGoodsList = { products: [] };
  const { data, status } = useFetch(
    `/api/v1/ranking/products?targetType=${filterOption.targetType}&rankType=${filterOption.rankType}`,
    initialGoodsList,
  );
  const goodsList = data?.products ?? [];

  let currentStatus;
  if (status.loading) currentStatus = <StatusDiv>로딩중...</StatusDiv>;
  if (status.error)
    currentStatus = <StatusDiv>데이터를 불러오는 중에 문제가 발생했습니다.</StatusDiv>;
  if (goodsList.length === 0) currentStatus = <StatusDiv>보여줄 상품이 없어요!</StatusDiv>;

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {status.error || goodsList.length === 0 ? (
          currentStatus
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

const StatusDiv = styled.div`
  width: 100%;
  text-align: center;
  padding: 40px 16px 60px;
`;
