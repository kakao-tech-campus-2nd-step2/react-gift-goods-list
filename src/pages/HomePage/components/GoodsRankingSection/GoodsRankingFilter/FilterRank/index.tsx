import { RankButtons } from '@/pages/HomePage/data/filterButton';
import { RankingFilter } from '@/types/productType';

import { Callout } from '@/components/Callout';

import { ActiveGiftButton } from './ActiveGiftButton';
import { calloutStyle } from './styles';

type FilterRankProps = {
  rankFilter: RankingFilter['rankType'];
  setRankFilter: (
    key: keyof RankingFilter,
    value: RankingFilter[keyof RankingFilter]
  ) => void;
};

export const FilterRank = ({ rankFilter, setRankFilter }: FilterRankProps) => {
  return (
    <Callout justifyContent="space-around" theme="skyblue" css={calloutStyle}>
      {RankButtons.map((filter) => (
        <ActiveGiftButton
          key={filter.index}
          label={filter.label}
          isActive={filter.value === rankFilter}
          onClick={() => setRankFilter('rankType', filter.value)}
        />
      ))}
    </Callout>
  );
};
