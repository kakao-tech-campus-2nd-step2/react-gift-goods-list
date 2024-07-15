import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { fetchThemes } from '@/api/Api';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';
import type { ThemeData } from '@/types';

type Props = {
  themeKey: string;
  theme: ThemeData;
};

export const ThemeHeroSection = ({ themeKey }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [themes, setThemes] = useState<ThemeData[]>([]);

  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchThemes();
        setThemes(data.themes);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          switch (err.response?.status) {
            case 400:
              setError(new Error('죄송합니다. 요청이 잘못되었습니다. 다시 시도해 주세요.'));
              break;
            case 404:
              setError(new Error('찾을 수 없습니다. 요청하신 페이지를 찾을 수 없습니다.'));
              break;
            case 500:
              setError(new Error('서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'));
              break;
            default:
              setError(
                new Error(`알 수 없는 오류가 발생했습니다. 오류 코드: ${err.response?.status}`),
              );
              break;
          }
        }
      }
    };
    fetchThemeData();
  }, []);

  const currentTheme = getCurrentTheme(themeKey, themes);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!currentTheme) {
    return <div>Theme not found</div>;
  }

  return (
    <Wrapper backgroundColor={currentTheme.backgroundColor}>
      <Container>
        <Label>{currentTheme.label}</Label>
        <Title>{currentTheme.title}</Title>
        {currentTheme.description && <Description>{currentTheme.description}</Description>}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section<{ backgroundColor: string }>`
  padding: 27px 20px 23px;
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 50px 20px;
  }
`;

const Label = styled.p`
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.7);

  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 20px;
    line-height: 24px;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  color: #fff;
  font-size: 18px;
  line-height: 26px;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;

  @media screen and (min-width: ${breakpoints.sm}) {
    font-size: 30px;
    line-height: 40px;
    padding-top: 12px;
    word-break: break-word;
  }
`;

const Description = styled.p`
  padding-top: 5px;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.55);
  word-break: break-all;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding-top: 12px;
    font-size: 24px;
    line-height: 32px;
  }
`;

export const getCurrentTheme = (themeKey: string, themeList: ThemeData[]) => {
  return themeList.find((theme) => theme.key === themeKey);
};
