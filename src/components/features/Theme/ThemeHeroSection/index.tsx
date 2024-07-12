import styled from '@emotion/styled';
import { Navigate } from 'react-router-dom';

import { fetchThemes } from '@/api/theme';
import { DataWrapper } from '@/components/common/DataWrapper';
import { Container } from '@/components/common/layouts/Container';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { ThemeData, ThemesResponse } from '@/types';

type Props = {
  themeKey: string;
};

export const ThemeHeroSection = ({ themeKey }: Props) => {
  return (
    <DataWrapper<ThemesResponse> queryKey="themes" queryFn={fetchThemes}>
      {(data) => {
        const currentTheme = data.themes.find((theme) => theme.key === themeKey);

        if (!currentTheme) {
          return <Navigate to={RouterPath.home} />;
        }

        const { backgroundColor, label, title, description } = currentTheme;

        return (
          <Wrapper backgroundColor={backgroundColor}>
            <Container>
              <Label>{label}</Label>
              <Title>{title}</Title>
              {description && <Description>{description}</Description>}
            </Container>
          </Wrapper>
        );
      }}
    </DataWrapper>
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
