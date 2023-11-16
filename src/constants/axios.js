import axios from 'axios';
import { getData } from '../helpers/localstorage';
import { keys } from './config';

const baseUrl = "http://localhost:8000/api";

const http = axios.create({
    baseURL: baseUrl
});

http.interceptors.request.use(
    (config) => {

        const token = getData(keys.API_TOKEN) ? getData(keys.API_TOKEN) : null;

        if (token) {

            config.headers = {
                ...config.headers,
                authorization: `Bearer ${token}`,
                Accept: "application/json"
            };
        }
        return config;

    },
    (error) => {
        return Promise.reject(error)
    }
);

export default http;