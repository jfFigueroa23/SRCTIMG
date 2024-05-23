import axios from 'axios';
import { getEnvVariables } from '../journal/helpers/getEnVariables';

const { VITE_API_URL } = getEnvVariables();


const TestApi = axios.create({
    baseURL: VITE_API_URL,
});


export default TestApi;