import axios from 'axios';

const BASE_URL = 'https://react-gift-mock-api-anheejeong.vercel.app';

export const getData = async (req: string) => {
    try {
        const response = await axios.get(`${BASE_URL}${req}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${req}:`, error);
        throw error;
    }
};