import { css } from '@emotion/css';
import { useParams } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import Header from '@/components/features/Header';

export default () => {
    const { http_statis: httpStatus } = useParams();
    const { error_origin: errorOrigin } = useParams();
    return (
        <div>
            <Header />
            {errorOrigin ? (
                <Container>
                    <h2 className={h1Style}>문제가 발생했습니다.</h2>
                    <p>아래 메세지를 복사해 이메일로 문의해주세요: glue0440@kangwon.ac.kr</p>
                    <p className={snippetStyle}>
                        HTTP Status: {httpStatus} <br />
                        Error Origin: {errorOrigin} <br />
                        추가 설명:
                    </p>
                </Container>
            ) : (
                <Container>
                    <h2 className={h1Style}>페이지를 찾을 수 없습니다.</h2>
                    <p>주소를 확인해주세요.</p>
                </Container>
            )}
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
