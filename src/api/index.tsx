import axios from 'axios';

const apiClient = axios.create({
	baseURL: 'https://react-gift-mock-api-mingkyeongg.vercel.app/',
	headers: {
		'Content-type': 'application/json',
	},
});
export default apiClient;