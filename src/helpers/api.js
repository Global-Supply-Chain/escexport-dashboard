import http from "../constants/axios"
import { httpErrorHandler, httpResponseHandler } from "./handler"

/**
 * Http get method request
 * @param {*} path 
 * @param {*} params 
 * @returns 
 */
export const getRequest = async (path, params) => {
    try {
        const result = await http.get(path);
        return httpResponseHandler(result);
    } catch (error) {
        return httpErrorHandler(error);
    }
}

/**
 * Http post method request 
 * @param {*} path 
 * @param {*} payload 
 * @returns 
 */
export const postRequest = async (path, payload) => {
    try {
        const result = await http.post(path, payload);
        return httpResponseHandler(result);
    } catch (error) {
        return httpErrorHandler(error);
    }
}

/**
 * Http put method request
 * @param {*} path 
 * @param {*} payload 
 * @returns 
 */
export const putRequest = async (path, payload) => {
    try {
        const result = await http.put(path, payload);
        return httpResponseHandler(result);
    } catch (error) {
        return httpErrorHandler(error);
    }
}

/**
 * Http delete method request
 * @param {*} path 
 * @returns 
 */
export const delRequest = async (path) => {
    try {
        const result = await http.put(path);
        return httpResponseHandler(result);
    } catch (error) {
        return httpErrorHandler(error);
    }  
}