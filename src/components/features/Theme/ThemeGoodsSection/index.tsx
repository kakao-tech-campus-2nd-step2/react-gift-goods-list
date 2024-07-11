import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { Message } from '@/styles';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';
import type { FetchState } from '@/types';
import { BASE_URL } from '@/types';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [currentGoodsList, setCurrentGoodsList] = useState<GoodsData[]>([]);
  const [isData, setIsData] = useState(false);
  const [fetchState, setFetchState] = useState<FetchState<GoodsData>>({
    isLoading: true,
    isError: false,
    data: null,
  });

  useEffect(() => {
    const fetchGoodsList = async () => {
      try {
        const maxResults = 20;
        const queryParams = `?maxResults=${maxResults}`;
        const res = await axios.get(`${BASE_URL}/api/v1/themes/${themeKey}/products${queryParams}`);
        setFetchState({ isLoading: false, isError: false, data: res.data.products });
        setCurrentGoodsList(res.data.products);
        setIsData(res.data.products.length > 0);
      } catch (err) {
        console.error('Error fetching goods list', err);
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
    fetchGoodsList();
  }, [themeKey]);

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
  };

  return (
    <Wrapper>
      <Container>
        {renderList()}
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {currentGoodsList.map((goods) => (
            <DefaultGoodsItems
              key={goods.id}
              imageSrc={goods.imageURL}
              title={goods.name}
              amount={goods.price.sellingPrice}
              subtitle={goods.brandInfo.name}
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
