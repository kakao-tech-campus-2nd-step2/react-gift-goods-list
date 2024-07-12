import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { fetchThemeProducts } from '@/api/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import { GoodsData } from '@/types';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection: React.FC<Props> = ({ themeKey }) => {
  const [goodsList, setGoodsList] = useState<GoodsData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadGoodsData = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const productsResponse = await fetchThemeProducts(themeKey);
        if (productsResponse.products.length === 0) {
          setErrorMessage('상품이 없어요.');
        } else {
          setGoodsList(productsResponse.products);
        }
        setIsLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            switch (error.response.status) {
              case 404:
                setErrorMessage('상품을 찾을 수 없습니다.');
                break;
              case 500:
                setErrorMessage('서버 오류가 발생했습니다.');
                break;
              default:
                setErrorMessage('예기치 않은 오류가 발생했습니다.');
            }
          } else if (error.request) {
            setErrorMessage('요청이 있지만 응답을 받지 못했습니다.');
          } else {
            setErrorMessage('요청 설정 중 오류가 발생했습니다.');
          }
        } else {
          setErrorMessage('에러가 발생했습니다.');
        }
        setIsLoading(false);
      }
    };

    loadGoodsData();
  }, [themeKey]);

  if (isLoading) {
    return <Message>Loading...</Message>;
  }

  if (errorMessage) {
    return <Message>{errorMessage}</Message>;
  }
  if (goodsList.length === 0) {
    return <Message>상품이 없습니다.</Message>;
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

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.5em;
  color: #999;
`;
