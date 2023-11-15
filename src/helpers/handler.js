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
        return { message: error.message, status: 0 }
    }
}

/**
 * Http response handler for api call
 * @param {*} result 
 * @returns 
 */
export const httpResponseHandler = (result) => {
    return result;
}