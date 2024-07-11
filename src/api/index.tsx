// import axios from 'axios';

// const BASE_URL = 'https://react-gift-mock-api-anheejeong.vercel.app';

// export const getData = async<T,>(req: string): Promise<T> => {
//     try {
//         const response = await axios.get<T>(`${BASE_URL}${req}`);
//         return response.data;
//     } catch (error) {
//         const err = error as Error;
//         console.error('Error fetching data:', err.message);
//         await logErrorToServer(error);
//         throw new Error('데이터를 가져오는 중에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
//     }
// };

// const logErrorToServer = async (error: any) => {
//     try {
//         await axios.post(`${BASE_URL}/log`, {
//             message: error.message,
//             stack: error.stack,
//         });
//     } catch (logError) {
//         const logErr = logError as Error
//         console.error('Error logging to server:', logErr.message);
//     }
// };

import axios from 'axios';

const BASE_URL = 'https://react-gift-mock-api-anheejeong.vercel.app';

export const getData = async <T,>(req: string): Promise<T> => {
    try {
        const response = await axios.get<T>(`${BASE_URL}${req}`);
        return response.data;
    } catch (err) {
        const error = err as any;

        let errorMessage = '데이터를 가져오는 중에 문제가 발생했습니다. 나중에 다시 시도해주세요.';

        if (axios.isAxiosError(error)) {
            if (error.response) {
                // 서버가 응답을 반환했지만 2xx 범위에 있지 않음
                switch (error.response.status) {
                    case 400:
                        errorMessage = '잘못된 요청입니다.';
                        break;
                    case 401:
                        errorMessage = '인증이 필요합니다.';
                        break;
                    case 403:
                        errorMessage = '접근이 금지되었습니다.';
                        break;
                    case 404:
                        errorMessage = '요청하신 리소스를 찾을 수 없습니다.';
                        break;
                    case 500:
                        errorMessage = '서버에 오류가 발생했습니다.';
                        break;
                    default:
                        errorMessage = `오류가 발생했습니다: ${error.response.status}`;
                }
            } else if (error.request) {
                // 요청이 전송되었지만 응답이 없음
                errorMessage = '서버로부터 응답이 없습니다.';
            } else {
                // 요청 설정 중에 오류가 발생함
                errorMessage = `요청 오류: ${error.message}`;
            }
        } else {
            errorMessage = `알 수 없는 오류: ${error.message}`;
        }

        console.error(`Error fetching data from ${req}:`, errorMessage);
        await logErrorToServer(error);
        throw new Error(errorMessage);
    }
};

const logErrorToServer = async (error: any) => {
    try {
        await axios.post(`${BASE_URL}/log`, {
            message: error.message,
            stack: error.stack,
        });
    } catch (logError) {
        console.error('Error logging to server:', (logError as Error).message);
    }
};
