import axios from 'axios';

const instance = axios.create({
  baseURL: `https://kakao-tech-campus-mock-sercer-root-yongjin.vercel.app`,
});

export default instance;
