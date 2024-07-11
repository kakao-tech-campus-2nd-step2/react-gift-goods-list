import axios from 'axios';

const BASE_URL = 'https://react-gift-mock-api-anheejeong.vercel.app';

export const getData = async<T,>(req: string): Promise<T> => {
    try {
        const response = await axios.get<T>(`${BASE_URL}${req}`);
        return response.data;
    } catch (error) {
        const err = error as Error;
        console.error('Error fetching data:', err.message);
        await logErrorToServer(error);
        throw new Error('데이터를 가져오는 중에 문제가 발생했습니다. 나중에 다시 시도해주세요.');
    }
};

const logErrorToServer = async (error: any) => {
    try {
        await axios.post(`${BASE_URL}/log`, {
            message: error.message,
            stack: error.stack,
        });
    } catch (logError) {
        const logErr = logError as Error
        console.error('Error logging to server:', logErr.message);
    }
};