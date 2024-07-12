// import styled from '@emotion/styled';
import styled from '@emotion/styled'
import { SyncLoader } from 'react-spinners';

export const Loading = () => {
  return (
    <LoadingWrapper>
      <SyncLoader 
        color='#d381ff'
        loading={true}    // false도 사용 가능!
        size='20px'
        speedMultiplier={0.8}
    />
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`