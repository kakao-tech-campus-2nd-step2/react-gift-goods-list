import styled from '@emotion/styled';
import type { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

import { getThemeProducts } from '../../../../api/api';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection: React.FC<Props> = ({ themeKey }) => {
  const navigate = useNavigate();

  const [goodsList, setGoodsList] = useState<GoodsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!themeKey) {
      navigate('/');
      return;
    }

    const fetchThemeProducts = async () => {
      try {
        const response = await getThemeProducts(themeKey);
        if (response.products.length === 0) {
          setError('상품이 없습니다.');
        } else {
          setGoodsList(response.products);
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        if (axiosError.response) {
          switch (axiosError.response.status) {
            case 404:
              setError('데이터를 찾을 수 없습니다.');
              break;
            case 500:
              setError('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
              break;
            default:
              setError('알 수 없는 오류가 발생했습니다.');
          }
        } else {
          setError('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchThemeProducts();
  }, [themeKey, navigate]);

  if (loading) {
    return (
      <LoadingContainer>
        <ClipLoader color="#36d7b7" loading={loading} size={50} />
        <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error) {
    return <TextView>{error}</TextView>;
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
          {goodsList.map((product) => (
            <DefaultGoodsItems
              key={product.id}
              imageSrc={product.imageURL}
              title={product.name}
              amount={product.price.sellingPrice}
              subtitle={product.brandInfo.name}
            />
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
`;

const LoadingText = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #36d7b7;
`;
