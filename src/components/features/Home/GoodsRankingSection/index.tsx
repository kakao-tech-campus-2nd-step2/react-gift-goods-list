import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';
import type { GoodsData } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
}

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const [fetchState, setFetchState] = useState<FetchState<GoodsData[]>>({
    isLoading: true,
    isError: false,
    data: null,
  });

  const [isData, setIsData] = useState(true);

  // filterOption 마다 API 요청 다르게
  useEffect(() => {
    const fetchGoodsData = async () => {
      try {
        const res = await axios.get(
          `https://react-gift-mock-api-diwoni.vercel.app/api/v1/ranking/products?targetType=${filterOption.targetType}&rankType=${filterOption.rankType}`,
        );
        setFetchState({ isLoading: false, isError: false, data: res.data.products });
        setIsData(res.data.products.length > 0);
      } catch (err) {
        console.error('Error Fetching GoodsData', err);
        setFetchState({ isLoading: false, isError: true, data: null });
      }
    };
    fetchGoodsData();
  }, [filterOption]);

  const renderList = () => {
    if (fetchState.isError) {
      return <div>데이터를 불러오는 중에 문제가 발생했습니다.</div>;
    }
    if (!isData) {
      return <div>보여줄 상품이 없습니다!</div>;
    }
    if (fetchState.isLoading) {
      return <div>로딩 중</div>;
    }
    return <GoodsRankingList goodsList={fetchState.data} />;
  };

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {renderList()}
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
