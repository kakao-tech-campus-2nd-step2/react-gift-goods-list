import styled from '@emotion/styled';

import loadingImg from '@/assets/Dual Ring.gif';
import { Image } from '@/components/common/Image/Image';

export default function Loading() {
  return (
    <div>
      <LoadingBox>
        <Image src={loadingImg} alt="loadingImg" width={50} />
      </LoadingBox>
    </div>
  );
}

const LoadingBox = styled.div`
  background-color: #fff;
  padding: 16px;
  border-radius: 4px;
  margin: 16px 0;
  text-align: center;
  font-size: 25px;
  height: 250px;
  display: flex;
  flex-bias: column;
  justify-content: center;
  align-items: center;
`;
