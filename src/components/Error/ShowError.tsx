import styled from '@emotion/styled';

import errorImg from '@/assets/error-icon.png';
import { Image } from '@/components/common/Image/Image';

export default function ShowError(fetchError: string | null) {
  return (
    <div>
      <ErrorBox>
        <div style={{ padding: 20 }}>
          <Image src={errorImg} alt="errorImg" width={50} />
        </div>
        <div>{fetchError}</div>
      </ErrorBox>
    </div>
  );
}

const ErrorBox = styled.div`
  background-color: rgb(250, 250, 252);
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
