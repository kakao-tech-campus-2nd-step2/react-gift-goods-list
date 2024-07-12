import styled from "@emotion/styled";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

import { getRankingProducts } from "@/api";
import { Container } from "@/components/common/layouts/Container";
import { breakpoints } from "@/styles/variants";
import type { RankingFilterOption } from "@/types";
import type { GoodsData } from "@/types";

import { GoodsRankingFilter } from "./Filter";
import { GoodsRankingList } from "./List";

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: "ALL",
    rankType: "MANY_WISH",
  });
  const [errMessage, setErrMessage] = useState<string>("");

  const {
    data: rankingProducts,
    isLoading,
    isError,
  } = useQuery<GoodsData[]>(
    ["rankingProducts", filterOption],
    () => getRankingProducts(filterOption),
    {
      onError: (error) => {
        console.error("Error fetching RankingProducts:", error);

        if (axios.isAxiosError(error) && error.response) {
          switch (error.response.status) {
            case 400:
              setErrMessage("데이터를 불러오는 중에 문제가 발생했습니다.");
              break;
            default:
              setErrMessage("알 수 없는 오류가 발생했습니다.");
          }
        } else {
          setErrMessage("알 수 없는 오류가 발생했습니다.");
        }
      },
    },
  );

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {isLoading ? (
          <MessageDiv>로딩중</MessageDiv>
        ) : isError ? (
          <MessageDiv>{errMessage}</MessageDiv>
        ) : rankingProducts && rankingProducts.length ? (
          <GoodsRankingList goodsList={rankingProducts} />
        ) : (
          <MessageDiv>보여줄 상품이 없어요!</MessageDiv>
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

const MessageDiv = styled.div`
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
