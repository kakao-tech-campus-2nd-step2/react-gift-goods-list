// import styled from '@emotion/styled';
import { SyncLoader } from 'react-spinners';

export const Loading = () => {
  return (
    <SyncLoader 
      color='#d381ff'
      loading={true}    // false도 사용 가능!
      size='20'
      speedMultiplier={0.8}
    />
  );
};

// const Spinner = styled.div`
// `