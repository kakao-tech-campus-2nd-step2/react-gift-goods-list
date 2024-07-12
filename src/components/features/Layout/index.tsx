import styled from '@emotion/styled';
import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { getThemes } from '@/apis/themes/themes';
import { SetThemeContext } from '@/context/themeContext';
import { handleStatusCode } from '@/hooks/useGoodsSectionControl';

import { Footer } from './Footer';
import { Header, HEADER_HEIGHT } from './Header';

let isInit = true;

export const Layout = () => {
  const setThemes = useContext(SetThemeContext);

  useEffect(() => {
    if (setThemes && isInit) {
      getThemes()
        .then((data) => {
          isInit = false;
          setThemes(data.themes);
        })
        .catch((err) => {
          handleStatusCode(err);
        });
    }
  }, [setThemes]);

  return (
    <Wrapper>
      <Header />
      <InnerWrapper>
        <Outlet />
        <Footer />
      </InnerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const InnerWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  margin-top: ${HEADER_HEIGHT};
`;
