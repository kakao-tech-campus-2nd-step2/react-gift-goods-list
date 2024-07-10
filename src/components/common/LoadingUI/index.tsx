import styled from '@emotion/styled';

export default () => {
    return (
        <div>
            <Spinner />
        </div>
    );
};
const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.3);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #fee500;
    animation: spin 1s linear infinite;
    margin: 50px auto;

    @keyframes spin {
        70% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
