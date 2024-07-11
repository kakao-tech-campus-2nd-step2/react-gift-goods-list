import styled from '@emotion/styled';

import loadingImg from '@/assets/loading.gif';

export const Loader = () => {
  return <StyledLoader src={loadingImg} alt="Loading..." />;
};

const StyledLoader = styled.img`
  display: block;
  margin: 0 auto;
`;
