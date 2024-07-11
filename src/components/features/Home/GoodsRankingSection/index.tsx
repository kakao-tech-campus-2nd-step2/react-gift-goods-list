import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { getRankingProducts } from '@/api';
import { Container } from '@/components/common/layouts/Container';
import { GoodsData, RankingFilterOption } from '@/types';
import { GoodsRankingFilter } from './GoodsRankingFilter';
import { GoodsRankingList } from './GoodsRankingList';

export const GoodsRankingSection = () => {
  const [goodsList, setGoodsList] = useState<GoodsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [selectedTarget, setSelectedTarget] = useState<RankingFilterOption['targetType']>('ALL');
  const [selectedRank, setSelectedRank] = useState<RankingFilterOption['rankType']>('MANY_WISH');

  useEffect(() => {
    const fetchRankingProducts = async () => {
      try {
        const data = await getRankingProducts(selectedTarget, selectedRank);
        setGoodsList(data.products);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchRankingProducts();
  }, [selectedTarget, selectedRank]);

  const handleFilterChange = (
    targetType: RankingFilterOption['targetType'],
    rankType: RankingFilterOption['rankType'],
  ) => {
    setSelectedTarget(targetType);
    setSelectedRank(rankType);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <StyledGoodsRankingSection>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter onFilterChange={handleFilterChange} />
        <GoodsRankingList isError={isError} goodsList={goodsList} />
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
