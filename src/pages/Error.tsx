import { css } from '@emotion/css';
import { useParams } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import Header from '@/components/features/Header';

export default () => {
    const httpStatus = useParams().http_status;
    const errorOrigin = useParams().error_origin;
    return (
        <div>
            <Header />
            <Container>
                <h2 className={h1Style}>문제가 발생했습니다!</h2>
                <p>아래 메세지를 복사해 이메일로 문의해주세요: glue0440@kangwon.ac.kr</p>
                <p className={snippetStyle}>
                    HTTP Status: {httpStatus} <br />
                    Error Origin: {errorOrigin} <br />
                    추가 설명:
                </p>
            </Container>
        </div>
    );
};

const h1Style = css`
    font-weight: 700;
    margin-bottom: 10px;
`;
const snippetStyle = css`
    padding: 20px;
    margin: 20px 0;
    border-radius: 5px;
    background-color: #bbb;
`;
