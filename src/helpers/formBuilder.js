export const formBuilder = (payload, fields) => {

    const formData = new FormData();

    Object.keys(fields).map((value) => {
        formData.append(value,payload[value]);
        return value;
    })

    formData.append('method', 'PUT');

    return formData;

}