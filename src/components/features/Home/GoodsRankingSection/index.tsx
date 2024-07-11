import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Container } from '@/components/common/layouts/Container';
import { Message } from '@/styles';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';
import type { FetchState } from '@/types';
import { BASE_URL, type RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

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

  const [isData, setIsData] = useState(false);

  // filterOption 마다 API 요청 다르게
  useEffect(() => {
    const fetchGoodsData = async () => {
      try {
        const queryParams = `?targetType=${filterOption.targetType}&rankType=${filterOption.rankType}`;
        const res = await axios.get(`${BASE_URL}/api/v1/ranking/products${queryParams}`);
        setFetchState({ isLoading: false, isError: false, data: res.data.products });
        setIsData(res.data.products.length > 0); // 데이터가 있다면 true
      } catch (err) {
        console.error('Error Fetching GoodsData', err);
        setFetchState({ isLoading: false, isError: true, data: null });

        if (axios.isAxiosError(err)) {
          switch (err.response?.status) {
            case 400:
              console.error('Bad Request');
              break;
            case 404:
              console.error('Not Found');
              break;
            case 500:
              console.error('Internal Server Error');
              break;
            default:
              console.error(`Unknown Error ${err.response?.status}`);
              break;
          }
        }
      }
    };
    fetchGoodsData();
  }, [filterOption]);

  const renderList = () => {
    if (fetchState.isError) {
      return <Message>데이터를 불러오는 중에 문제가 발생했습니다.</Message>;
    }
    if (fetchState.isLoading) {
      return <Message>로딩 중...</Message>;
    }
    if (!isData) {
      return <Message>보여줄 상품이 없습니다!</Message>;
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
