import { TargetButtons } from '@/pages/HomePage/data/filterButton';
import { RankingFilter } from '@/types/productType';

import { Container } from '@/components/ui/Layout/Container';

import { ActiveTargetButton } from './ActiveTargetButton';

type FilterTargetProps = {
  targetFilter: RankingFilter['targetType'];
  setTargetFilter: (
    key: keyof RankingFilter,
    value: RankingFilter[keyof RankingFilter]
  ) => void;
};

export const FilterTarget = ({
  targetFilter,
  setTargetFilter,
}: FilterTargetProps) => {
  return (
    <Container justifyContent="space-around">
      {TargetButtons.map((filter) => {
        return (
          <ActiveTargetButton
            key={filter.index}
            icon={filter.text.icon}
            label={filter.text.label}
            isActive={filter.value === targetFilter}
            onClick={() => setTargetFilter('targetType', filter.value)}
          />
        );
      })}
    </Container>
  );
};
