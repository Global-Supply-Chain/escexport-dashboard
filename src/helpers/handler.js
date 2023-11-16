import { keys } from "../constants/config";
import { removeData } from "./localstorage";

/**
 * Payload handler for update state
 * @param {*} payload 
 * @param {*} value 
 * @param {*} field 
 * @param {*} fn 
 */
export const payloadHandler = (payload, value, field, fn) => {
    let updatePayload = {...payload};
    updatePayload[field] = value;
    fn(updatePayload);
};

/**
 * Http error handler for api call
 * @param {*} error 
 * @returns 
 */
export const httpErrorHandler = (error) =>  {
    
    if(error.code === 'ERR_NETWORK') {
        return { 
            message: error.message, 
            status: 0,
            notification: {
                show: true,
                summary: "Network Error!",
                severity: "error",
                detail: "Please check internet connection"
            } 
        }
    }

    const {status, data } = error.response;

    if(status === 400 || status === 500) {
        return { 
            status: status, 
            message : data.message,
            notification: {
                show: true,
                severity: "warn",
                summary: "Error Message",
                detail: data.message
            }
        }
    }

    if(status === 422) {
        return { status: status, error: data.data }
    }

    if(status === 401) {
        removeData(keys.API_TOKEN);
        //window.location.reload('/auth/login');
        return;
    }
}

/**
 * Http response handler for api call
 * @param {*} result 
 * @returns 
 */
export const httpResponseHandler = (result) => {
    return {
        status: result.status,
        data: result.data.data
    }
}