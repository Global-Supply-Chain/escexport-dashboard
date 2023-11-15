export const payloadHandler = (payload, value, field, fn) => {
    let updatePayload = {...payload};
    updatePayload[field] = value;
    fn(updatePayload);
};