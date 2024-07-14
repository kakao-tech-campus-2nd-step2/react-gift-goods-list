import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { useRankingProducts } from '@/api/hooks/useRankingProducts';
import { Container } from '@/components/common/layouts/Container';
import { ErrorMessageContainer } from '@/styles';
import { RankingFilterOption } from '@/types';
import { GoodsRankingFilter } from './GoodsRankingFilter';
import { GoodsRankingList } from './GoodsRankingList';

export const GoodsRankingSection = () => {
  const { data, isLoading, isError, refetch } = useRankingProducts('ALL', 'MANY_WISH');

  const [selectedTarget, setSelectedTarget] = useState<RankingFilterOption['targetType']>('ALL');
  const [selectedRank, setSelectedRank] = useState<RankingFilterOption['rankType']>('MANY_WISH');

  useEffect(() => {
    refetch();
  }, [selectedTarget, selectedRank, refetch]);

  const handleFilterChange = (
    targetType: RankingFilterOption['targetType'],
    rankType: RankingFilterOption['rankType'],
  ) => {
    setSelectedTarget(targetType);
    setSelectedRank(rankType);
  };

  if (isLoading) return <ErrorMessageContainer>Loading...</ErrorMessageContainer>;

  return (
    <StyledGoodsRankingSection>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter onFilterChange={handleFilterChange} />
        <GoodsRankingList isError={isError} goodsList={data?.products ?? []} />
      </Container>
    </StyledGoodsRankingSection>
  );
};

const StyledGoodsRankingSection = styled.section`
  padding: 0px 16px 32px;
`;

const Title = styled.h2`
  color: #000;
  width: 100%;
  text-align: left;
  font-size: 20px;
  line-height: 30px;
  font-weight: 700;
`;
