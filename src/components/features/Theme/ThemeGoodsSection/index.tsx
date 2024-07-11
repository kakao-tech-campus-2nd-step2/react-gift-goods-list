import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";

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

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [themeGoods, setThemeGoods] = useState<GoodsData[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");

  useEffect(() => {
    const fetchThemeProducts = async () => {
      setLoading(true);
      try {
        const products = await getThemeProducts(themeKey, undefined, 20);
        setThemeGoods(products.products);
        setError(false);
      } catch (error) {
        console.error("Error fetching theme products:", error);
        setThemeGoods([]);
        setError(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchThemeProducts();
  }, [themeKey]);

  return (
    <>
      {isLoading ? (
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
              {themeGoods.map(({ id, imageURL, name, price, brandInfo }) => (
                <DefaultGoodsItems
                  key={id}
                  imageSrc={imageURL}
                  title={name}
                  amount={price.sellingPrice}
                  subtitle={brandInfo.name}
                />
              ))}
            </Grid>
          </Container>
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
  -webkit-box-pack: center;
  justify-content: center;
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
