import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { getRankingProducts } from "@/api";
import { Container } from "@/components/common/layouts/Container";
import { breakpoints } from "@/styles/variants";
import type { RankingFilterOption } from "@/types";
import type { GoodsData } from "@/types";

import { GoodsRankingFilter } from "./Filter";
import { GoodsRankingList } from "./List";

export const GoodsRankingSection = () => {
  const [rankingProducts, setRankingProducts] = useState<GoodsData[]>([]);
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: "ALL",
    rankType: "MANY_WISH",
  });

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const products = await getRankingProducts(filterOption);
        setRankingProducts(products);
      } catch (error) {
        console.error("Error fetching RankingProducts:", error);
        setRankingProducts([]);
      }
    };

    fetchThemes();
  }, [filterOption]);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {rankingProducts.length ? (
          <GoodsRankingList goodsList={rankingProducts} />
        ) : (
          <ErrorDiv>데이터를 불러오는 중에 문제가 발생했습니다.</ErrorDiv>
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

const ErrorDiv = styled.div`
  width: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  padding: 40px 16px 60px;
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
