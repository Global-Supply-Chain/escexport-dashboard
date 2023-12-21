import axios from 'axios';
import { getData } from '../helpers/localstorage';
import { keys } from './config';
import { baseURL } from './endpoints';


const http = axios.create({
    baseURL: baseURL
});

http.interceptors.request.use(
    (config) => {

        const token = getData(keys.API_TOKEN) ? getData(keys.API_TOKEN) : null;

        if (token) {
            config.headers = {
                ...config.headers,
                authorization: `Bearer ${token}`,
                Accept: "Application/json",
                'Content-Disposition': 'attachment; filename=exportedFile.xlsx',
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            };
        }

        return config;

    },
    (error) => {
        return Promise.reject(error)
    }
);

export default http;