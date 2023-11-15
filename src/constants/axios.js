import axios from 'axios';
import { getData } from '../helpers/localstorage';
import { keys } from './config';

const baseUrl = "http://localhost:8000/api";

const http = axios.create({
    baseURL: baseUrl
});

http.interceptors.request.use(
    (config) => {
        const token = getData(keys.API_TOKEN);
        config.headers.Authorization = "Bearer " + token;
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

export default http;