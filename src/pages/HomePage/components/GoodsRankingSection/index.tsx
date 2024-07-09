import { useEffect, useState } from 'react';

import { BACKEND_API } from '@/constants/api';
import { useRankFilters } from '@/pages/HomePage/hooks/useRankFilters';
import { GetRankingResponse, ProductData } from '@/pages/HomePage/types';

import { Content } from '@/components/Content';
import { Container } from '@/components/ui/Layout/Container';

import { GoodsRankingFilter } from './GoodsRankingFilter';
import { GoodsRankingList } from './GoodsRankingList';
import { titleStyle } from './styles';

export const GoodsRankingSection = () => {
  const { filter, handleFilter } = useRankFilters();

  const [rankData, setRankData] = useState<ProductData[]>([]);

  useEffect(() => {
    const fetchRankData = async () => {
      try {
        const response = await BACKEND_API.get('/api/v1/ranking/products', {
          params: {
            targetType: filter.targetType,
            rankType: filter.rankType,
          },
        });
        const data: GetRankingResponse = response.data;
        setRankData(data.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRankData();
  }, [filter]);

  return (
    <Content flexDirection="column" height="fit-content" gap="2rem">
      <Container justifyContent="center" css={titleStyle}>
        실시간 급상승 선물랭킹
      </Container>
      <GoodsRankingFilter filter={filter} handleFilter={handleFilter} />
      <GoodsRankingList goodsList={rankData} filter={filter} />
    </Content>
  );
};
