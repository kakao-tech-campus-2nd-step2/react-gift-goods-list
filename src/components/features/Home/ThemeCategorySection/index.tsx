import styled from "@emotion/styled";
import { useContext } from "react";
import { Link } from "react-router-dom";

import type { ThemeProp } from "@/App";
import { ThemesContext } from "@/App";
import { Container } from "@/components/common/layouts/Container";
import { Grid } from "@/components/common/layouts/Grid";
import { getDynamicPath } from "@/routes/path";
import { breakpoints } from "@/styles/variants";
import type { ThemeData } from "@/types";

import { ThemeCategoryItem } from "./ThemeCategoryItem";

export const ThemeCategorySection = () => {
  const ThemesApi: ThemeProp = useContext(ThemesContext);
  const themes: ThemeData[] = ThemesApi.data;

  return (
    <>
      {ThemesApi.isLoading ? (
        <MessageDiv>로딩중</MessageDiv>
      ) : ThemesApi.isError ? (
        <MessageDiv>데이터를 불러오는 중에 문제가 발생했습니다.</MessageDiv>
      ) : themes.length ? (
        <Wrapper>
          <Container>
            <Grid
              columns={{
                initial: 4,
                md: 6,
              }}
            >
              {themes.map((element) => (
                <Link key={element.key} to={getDynamicPath.theme(element.key)}>
                  <ThemeCategoryItem image={element.imageURL} label={element.label} />
                </Link>
              ))}
            </Grid>
          </Container>
        </Wrapper>
      ) : (
        <MessageDiv>보여줄 테마가 없어요!</MessageDiv>
      )}
    </>
  );
};

const Wrapper = styled.section`
  padding: 14px 14px 3px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 45px 52px 23px;
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
