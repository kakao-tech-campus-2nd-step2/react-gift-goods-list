import styled from "@emotion/styled";
import axios from "axios";
import { useCallback, useRef, useState } from "react";
import { useQuery } from "react-query";

import { getThemeProducts } from "@/api";
import { DefaultGoodsItems } from "@/components/common/GoodsItem/Default";
import { Container } from "@/components/common/layouts/Container";
import { Grid } from "@/components/common/layouts/Grid";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { breakpoints } from "@/styles/variants";
import type { GoodsData } from "@/types";

type Props = {
  themeKey: string;
};

type ApiResuts = {
  products: GoodsData[];
  pageInfo: {
    totalResults: number;
  };
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [themeGoods, setThemeGoods] = useState<GoodsData[]>([]);
  const [page, setPage] = useState<string>("0");
  const [totalItems, setTotalItems] = useState<number>(0);
  const [errMessage, setErrMessage] = useState<string>("");

  const { isLoading, isError } = useQuery<ApiResuts>(
    ["themeGoods", themeKey, page],
    () => getThemeProducts(themeKey, page, 20),
    {
      onSuccess: (result) => {
        setThemeGoods((prev) => [...prev, ...(result.products ? result.products : [])]);
        setTotalItems(result.pageInfo.totalResults);
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          switch (error.response.status) {
            case 400:
              setErrMessage("에러가 발생했습니다.");
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

  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || totalItems <= themeGoods.length) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => (parseInt(prevPage) + 1).toString());
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, totalItems, themeGoods.length],
  );

  return (
    <>
      {isLoading && themeGoods.length === 0 ? (
        <StyledDiv>
          <LoadingSpinner />
        </StyledDiv>
      ) : isError ? (
        <MessageDiv>{errMessage}</MessageDiv>
      ) : themeGoods.length ? (
        <Wrapper>
          <Container>
            <Grid
              columns={{
                initial: 2,
                md: 4,
              }}
              gap={16}
            >
              {themeGoods.map(({ id, imageURL, name, price, brandInfo }, index) => {
                if (index === themeGoods.length - 1) {
                  return (
                    <div ref={lastItemRef} key={id}>
                      <DefaultGoodsItems
                        imageSrc={imageURL}
                        title={name}
                        amount={price.sellingPrice}
                        subtitle={brandInfo.name}
                      />
                    </div>
                  );
                }
                return (
                  <DefaultGoodsItems
                    key={id}
                    imageSrc={imageURL}
                    title={name}
                    amount={price.sellingPrice}
                    subtitle={brandInfo.name}
                  />
                );
              })}
            </Grid>
          </Container>
          {isLoading && (
            <StyledDiv>
              <LoadingSpinner />
            </StyledDiv>
          )}
        </Wrapper>
      ) : (
        <MessageDiv>상품이 없어요.</MessageDiv>
      )}
    </>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;

const StyledDiv = styled.div`
  width: 100%;
  padding: 40px 16px 60px;
  display: flex;
  justify-content: center;
`;

const MessageDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
`;
