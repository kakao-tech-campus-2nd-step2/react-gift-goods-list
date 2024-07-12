import styled from '@emotion/styled';

import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';

export const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <FooterLogo src="https://img1.kakaocdn.net/thumb/C140x20@2x.fwebp.q82/?fname=https%3A%2F%2Fgift-s.kakaocdn.net%2Fdn%2Fgift%2Fimages%2Fm640%2Fpc_smallbi_201223.png" alt="카카오톡 선물하기 로고2" />
      </Container>
    </Wrapper>
  );
};

export const Wrapper = styled.footer`
  padding: 28px 16px 88px;
  width: 100%;
  max-width: 100vw;
  background-color: #fafafc;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 120px;
  }
`;

const FooterLogo = styled.img`
  height: 20px;
`;
