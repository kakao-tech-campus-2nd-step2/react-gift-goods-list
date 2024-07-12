import styled from '@emotion/styled';

import type { Rank, RankingProductType, Target } from '.';
import { RankFilter } from './RankFilter';
import { TargetFilter } from './TargetFilter';

import { Container } from '@/components/common/Layout/Container';

export interface IChangeFilter {
  filter: RankingProductType;
  changeFilter: ({ targetType, rankType }: Partial<RankingProductType>) => void;
}
export const Filter = ({ filter, changeFilter }: IChangeFilter) => {
  const onTargetChange = (targetType: Target) => {
    changeFilter({ targetType });
  };

  const onRankChange = (rankType: Rank) => {
    changeFilter({ rankType });
  };
  return (
    <FilterWrapper>
      <Container flexDirection="column" maxWidth="1024px">
        <TargetFilter targetValue={filter.targetType} onTargetChange={onTargetChange} />
        <RankFilter rankValue={filter.rankType} onRankChange={onRankChange} />
      </Container>
    </FilterWrapper>
  );
};
const FilterWrapper = styled.div`
  width: 100%;
`;
