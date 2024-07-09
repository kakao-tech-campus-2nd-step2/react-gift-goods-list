import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getThemes } from "@/api";
import { Container } from "@/components/common/layouts/Container";
import { Grid } from "@/components/common/layouts/Grid";
import { getDynamicPath } from "@/routes/path";
import { breakpoints } from "@/styles/variants";
import type { ThemeData } from "@/types";

import { ThemeCategoryItem } from "./ThemeCategoryItem";

export const ThemeCategorySection = () => {
  const [categories, setCategories] = useState<Array<ThemeData>>([]);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const themes = await getThemes();
        setCategories(themes);
      } catch (error) {
        console.error("Error fetching themes:", error);
      }
    };

    fetchThemes();
  }, []);

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
        >
          {categories.map((element) => (
            <Link key={element.key} to={getDynamicPath.theme(element.key)}>
              <ThemeCategoryItem image={element.imageURL} label={element.label} />
            </Link>
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 14px 14px 3px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 45px 52px 23px;
  }
`;
