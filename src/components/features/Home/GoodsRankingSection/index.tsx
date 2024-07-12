import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import instance from '@/api/api';
import { Container } from '@/components/common/layouts/Container';
import { Loading } from '@/components/common/Loading/Loading';
import { breakpoints } from '@/styles/variants';
import type { GoodsData, RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {

  const [goodsList, setGoodsList] = useState<GoodsData[]>([]);
  const [isLoading, setIsLoading]=useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  useEffect(()=> {
    const fetchRankingItems = async () => {
      try {
        const { targetType, rankType } = filterOption;
        const response = await instance.get(
          `api/v1/ranking/products?targetType=${targetType}&rankType=${rankType}`,
          );
          setGoodsList(response.data.products)
      } catch (error) {
        setIsError(true);

        if (axios.isAxiosError(error) && error.response) {
          switch (error.response.status) {
            case 400:
              setErrorMessage("400, Bad Request.");
              break;
          }
        } else {
          setErrorMessage("400, Bad Request.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchRankingItems();
  }, [filterOption]);

  if (isLoading) {
    return (
      <Loading />
    );
  };

  if (isError) {
    return (
      <Wrapper>
        <ErrorWrapper>{errorMessage}</ErrorWrapper>
      </Wrapper>
    )
  }

  // GoodsMockData를 21번 반복 생성

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        <GoodsRankingList goodsList={goodsList} />
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

const ErrorWrapper = styled.div`
width: 100%;
font-size: 150px;
text-align: center;
color: red;
`