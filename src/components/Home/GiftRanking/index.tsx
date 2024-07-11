import styled from '@emotion/styled';
import { useState } from 'react';

import { Filter } from './Filter';
import { FilteredList } from './FilteredList';

import { HandleBox, Loading } from '@/components/common/Handle';
import { Container } from '@/components/common/Layout/Container';
import type { RANK_FILTER_ITEMS, TARGET_FILTER_ITEMS } from '@/constant/Filter';
import { useRankingProducts } from '@/services/useRankingProducts';

export type Target = (typeof TARGET_FILTER_ITEMS)[number]['name'];
export type Rank = (typeof RANK_FILTER_ITEMS)[number]['name'];

export interface RankingProductType {
  targetType: Target;
  rankType: Rank;
}
export const GiftRanking = () => {
  const [filter, setFilter] = useState<RankingProductType>({ targetType: 'ALL', rankType: 'MANY_WISH' });

  const changeFilter = ({ targetType, rankType }: Partial<RankingProductType>) => {
    setFilter((prev) => ({ targetType: targetType ?? prev.targetType, rankType: rankType ?? prev.rankType }));
  };

  const { data, isLoading, isError } = useRankingProducts(filter);
  const filterdList = data?.products ?? [];

  const HandleFilteredList = () => {
    if (isLoading) {
      return <Loading />;
    }
    if (isError) {
      return <HandleBox>데이터를 불러오는 도중에 문제가 발생했습니다.</HandleBox>;
    }
    return <FilteredList filterdList={filterdList} />;
  };

  return (
    <RankingWrapper>
      <Container flexDirection="column" justifyContent="center" maxWidth="1024px">
        <Title>실시간 급상승 선물랭킹</Title>
        <Filter filter={filter} changeFilter={changeFilter} />
        <HandleFilteredList />
      </Container>
    </RankingWrapper>
  );
};

const RankingWrapper = styled.div`
  width: 100%;
  padding: 40px 20px;
`;
const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 20px;
    text-align: left;
  }
`;
