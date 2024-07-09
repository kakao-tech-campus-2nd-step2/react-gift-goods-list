import { useEffect, useState } from 'react';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';
import { getRankingProducts } from '@/apis/Ranking/ranking.api';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { GoodsData, RankingFilterOption } from '@/types';
// import { GoodsMockList } from '@/types/mock';
import styled from '@emotion/styled';

// interface RankingProduct {
//   id: number;
//   key: string;
//   label: string;
//   imageURL: string;
//   title: string;
//   description: string;
//   backgroundColor: string;
// }

export const GoodsRankingSection = () => {
  const [rankingData, setRankingData] = useState<GoodsData[]>([]);
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH_RECEIVE',
  });

  // GoodsMockData를 21번 반복 생성

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const data = await getRankingProducts(
          filterOption.targetType,
          filterOption.rankType
        );
        if (Array.isArray(data.products)) {
          setRankingData(data.products);
        } else {
          console.error('Data is not an array:', data.products);
        }
      } catch (error) {
        console.error(`Failed to fetch themes: ${error}`);
      }
    };

    fetchRankingData();
  }, [filterOption]);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter
          filterOption={filterOption}
          onFilterOptionChange={setFilterOption}
        />
        <GoodsRankingList goodsList={rankingData} />
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
