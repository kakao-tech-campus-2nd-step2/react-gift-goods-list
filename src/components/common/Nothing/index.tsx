import React from 'react';
import styled from '@emotion/styled';

const Nothing: React.FC = () => {
    return (
        <Wrapper>
            보여줄 상품이 없어요!
        </Wrapper>
    )
};

export default Nothing;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  content-justify: center;
  font-size: 15px;
`