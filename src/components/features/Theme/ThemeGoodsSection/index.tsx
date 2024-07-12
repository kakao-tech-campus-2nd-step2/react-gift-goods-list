import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect,useState } from 'react';

import instance from '@/api/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { Loading } from '@/components/common/Loading/Loading';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [goodsList, setGoodsList] = useState<GoodsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsError(false);
        const maxResults = 20;
        const response = await instance.get(`api/v1/themes/${themeKey}/products`, {
          params: { maxResults }
        });
        setGoodsList(response.data.products);
      } catch (error) {
        setIsError(true);

        if (axios.isAxiosError(error) && error.response) {
          switch (error.response.status) {
            case 400:
              setErrorMessage("400, Bad Request.")
              break;
          }
        } else {
          setErrorMessage("400, Bad Request.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  fetchItems();
  }, [themeKey]);

  if (isLoading) {
    return (
      <Loading />
    )
  }

  if (isError) {
    return (
      <Wrapper>
        <ErrorWrapper>{errorMessage}</ErrorWrapper>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {goodsList.map(({ id, imageURL, name, price, brandInfo }) => (
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
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;

const ErrorWrapper = styled.div`
width: 100%;
font-size: 150px;
text-align: center;
color: red;
`