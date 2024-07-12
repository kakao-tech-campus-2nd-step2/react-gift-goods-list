import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { getRankingProducts } from '@/api/api';
import { Container } from '@/components/common/layouts/Container';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Loading } from '@/components/ui/Loading';
import { NoDataMessage } from '@/components/ui/NoDataMessage';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';
import type { ProductData } from '@/types/response';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const [goodsList, setGoodsList] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRankingProduts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getRankingProducts(filterOption);
        setGoodsList(data.products);
      } catch (err) {
        console.log('Error fetching ranking products:', err);
        if (axios.isAxiosError(err) && err.response) {
          switch (err.response.status) {
            case 404:
              setError('Ranking products not found.');
              break;
            case 500:
              setError('Server error. Please try again later.');
              break;
            default:
              setError('An error occurred while fetching data.');
          }
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRankingProduts();
  }, [filterOption]);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message="No ranking products found" />
        ) : goodsList.length === 0 ? (
          <NoDataMessage message="No ranking products found." />
        ) : (
          <GoodsRankingList goodsList={goodsList} />
        )}
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
